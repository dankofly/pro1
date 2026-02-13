import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { formatEuro } from './format'
import type { SvsResult, SteuerTipp } from './svs-calculator'

interface PdfExportParams {
  gewinn: number
  vorschreibung: number
  result: SvsResult
  steuerTipps: SteuerTipp
}

export function generateSvsReport({ gewinn, vorschreibung, result, steuerTipps }: PdfExportParams): void {
  const doc = new jsPDF()
  const dateStr = new Date().toLocaleDateString('de-AT', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const nettoPercent = gewinn > 0 ? ((result.echtesNetto / gewinn) * 100).toFixed(1) : '0'

  // Header
  doc.setFillColor(15, 23, 42)
  doc.rect(0, 0, 210, 32, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text('SteuerBoard.pro', 14, 16)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Beitragsberechnung | ${dateStr}`, 14, 25)
  doc.text(`Jahresgewinn: ${formatEuro(gewinn)}`, 210 - 14, 16, { align: 'right' })
  doc.text(`Netto-Quote: ${nettoPercent}%`, 210 - 14, 25, { align: 'right' })

  let y = 42

  // Wahrheits-Tabelle
  doc.setTextColor(15, 23, 42)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Die Wahrheits-Tabelle', 14, y)
  y += 2

  autoTable(doc, {
    startY: y,
    head: [['Posten', 'Jährlich', 'Monatlich']],
    body: [
      ['Brutto-Gewinn', formatEuro(gewinn), formatEuro(gewinn / 12)],
      ['- SVS Beiträge', formatEuro(result.endgueltigeSVS), formatEuro(result.endgueltigeSVS / 12)],
      ['- Einkommensteuer', formatEuro(result.einkommensteuer), formatEuro(result.einkommensteuer / 12)],
    ],
    foot: [['ECHTES NETTO', formatEuro(result.echtesNetto), formatEuro(result.echtesNetto / 12)]],
    theme: 'grid',
    headStyles: { fillColor: [100, 116, 139], fontStyle: 'bold', fontSize: 10 },
    bodyStyles: { fontSize: 10 },
    footStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 11 },
    columnStyles: {
      0: { cellWidth: 70 },
      1: { halign: 'right', cellWidth: 55 },
      2: { halign: 'right', cellWidth: 55 },
    },
    margin: { left: 14, right: 14 },
  })

  y = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12

  // Beitrags-Details
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('SVS-Beiträge im Detail', 14, y)
  y += 2

  autoTable(doc, {
    startY: y,
    head: [['Beitragsart', 'Satz', 'Betrag / Jahr']],
    body: [
      ['Pensionsversicherung (PV)', '18,50%', formatEuro(result.pvBeitrag)],
      ['Krankenversicherung (KV)', '6,80%', formatEuro(result.kvBeitrag)],
      ['Selbständigenvorsorge (MV)', '1,53%', formatEuro(result.mvBeitrag)],
      ['Unfallversicherung (UV)', 'fix', formatEuro(result.uvBeitrag)],
    ],
    foot: [['Gesamt SVS', '~26,83% + UV', formatEuro(result.endgueltigeSVS)]],
    theme: 'striped',
    headStyles: { fillColor: [100, 116, 139], fontStyle: 'bold', fontSize: 10 },
    bodyStyles: { fontSize: 10 },
    footStyles: { fillColor: [51, 65, 85], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { halign: 'center', cellWidth: 40 },
      2: { halign: 'right', cellWidth: 60 },
    },
    margin: { left: 14, right: 14 },
  })

  y = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12

  // Kennzahlen
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Wichtige Kennzahlen', 14, y)
  y += 2

  autoTable(doc, {
    startY: y,
    body: [
      ['Beitragsgrundlage', formatEuro(result.beitragsgrundlage)],
      ['Vorläufige SVS (Vorschreibung)', formatEuro(vorschreibung * 12) + ' (' + formatEuro(vorschreibung) + '/Monat)'],
      ['Geschätzte Nachzahlung', formatEuro(result.nachzahlung)],
      ['Spar-Empfehlung pro Monat', formatEuro(result.sparEmpfehlung)],
      ['Steuerersparnis durch SVS', formatEuro(result.steuerErsparnis)],
    ],
    theme: 'plain',
    bodyStyles: { fontSize: 10 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 80 },
      1: { halign: 'right' },
    },
    margin: { left: 14, right: 14 },
  })

  y = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12

  // Steuer-Tipps
  if (steuerTipps.grenzsteuersatz > 0) {
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Steuer-Optimierung', 14, y)
    y += 6

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(60, 60, 60)

    if (steuerTipps.ifbInvestition > 0) {
      doc.setFont('helvetica', 'bold')
      doc.text('Investitionsbedingter Gewinnfreibetrag (IFB):', 14, y)
      y += 5
      doc.setFont('helvetica', 'normal')
      doc.text(
        `Investiere ${formatEuro(steuerTipps.ifbInvestition)} in Hardware/Ausstattung, um ${formatEuro(steuerTipps.ifbErsparnis)} Steuern zu sparen.`,
        14, y, { maxWidth: 180 }
      )
      y += 10
    }

    if (steuerTipps.svsVorauszahlung > 0) {
      doc.setFont('helvetica', 'bold')
      doc.text('SVS-Vorauszahlung erhöhen:', 14, y)
      y += 5
      doc.setFont('helvetica', 'normal')
      doc.text(
        `Zahle ${formatEuro(steuerTipps.svsVorauszahlung)} mehr an die SVS, um ${formatEuro(steuerTipps.svsVorauszahlungErsparnis)} Einkommensteuer zu sparen.`,
        14, y, { maxWidth: 180 }
      )
      y += 10
    }

    doc.text(`Dein Grenzsteuersatz: ${(steuerTipps.grenzsteuersatz * 100).toFixed(0)}%`, 14, y)
  }

  // Footer
  const pageHeight = doc.internal.pageSize.getHeight()
  doc.setFontSize(8)
  doc.setTextColor(150, 150, 150)
  doc.text(
    'Erstellt mit SteuerBoard.pro | Keine Steuerberatung. Alle Angaben ohne Gewähr. Werte 2024/25.',
    105, pageHeight - 10, { align: 'center' }
  )

  doc.save(`SVS-Berechnung-${dateStr.replace(/\./g, '-')}.pdf`)
}
