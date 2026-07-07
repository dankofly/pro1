import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { formatEuro } from './format'
import type { SvsResult, SteuerTipp } from './svs-calculator'
import type { RuecklagenplanPayload } from './ruecklagenplan'

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

// ── SVS-Rücklagenplan (49-€-Tripwire) ───────────────────────────────────────
// Eigenständiges Produkt, kein Ersatz für den Pro-Steuerberater-Report:
// beantwortet genau eine Frage ("Wie viel lege ich ab wann zurück?") als
// umsetzbarer 12-Monats-Plan.

export function generateRuecklagenplan(p: RuecklagenplanPayload): void {
  const doc = new jsPDF()
  const dateStr = new Date().toLocaleDateString('de-AT', { day: '2-digit', month: '2-digit', year: 'numeric' })

  // Header
  doc.setFillColor(15, 23, 42)
  doc.rect(0, 0, 210, 32, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text('SteuerBoard.pro', 14, 16)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`SVS-Rücklagenplan ${p.y} | ${dateStr}`, 14, 25)
  doc.text(`Jahresgewinn: ${formatEuro(p.g)}`, 210 - 14, 16, { align: 'right' })
  doc.text(`Rücklage: ${formatEuro(p.rg)}/Monat`, 210 - 14, 25, { align: 'right' })

  let y = 42

  // 1. Ausgangslage
  doc.setTextColor(15, 23, 42)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('1. Deine Ausgangslage', 14, y)
  y += 2

  autoTable(doc, {
    startY: y,
    body: [
      ['Jahresgewinn', formatEuro(p.g)],
      ['Vorläufige SVS (aktuelle Vorschreibung)', p.vs > 0 ? `${formatEuro(p.vs)} (${formatEuro(p.vs / 4)}/Quartal)` : 'keine Angabe'],
      ['Endgültige SVS (berechnet)', formatEuro(p.se)],
      ['Voraussichtliche SVS-Nachzahlung', formatEuro(Math.max(0, p.nz))],
      ['Einkommensteuer (Prognose)', formatEuro(p.est)],
      ['Echtes Netto', formatEuro(p.net)],
    ],
    theme: 'plain',
    bodyStyles: { fontSize: 10 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 95 },
      1: { halign: 'right' },
    },
    margin: { left: 14, right: 14 },
  })

  y = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12

  // 2. Der Plan
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('2. Dein monatlicher Rücklagenplan', 14, y)
  y += 2

  autoTable(doc, {
    startY: y,
    head: [['Zweck', 'Pro Monat', 'Pro Jahr']],
    body: [
      ['SVS (Differenz + Endabrechnung)', formatEuro(p.rs), formatEuro(p.rs * 12)],
      ['Einkommensteuer', formatEuro(p.re), formatEuro(p.re * 12)],
    ],
    foot: [['GESAMT-RÜCKLAGE', formatEuro(p.rg), formatEuro(p.rg * 12)]],
    theme: 'grid',
    headStyles: { fillColor: [100, 116, 139], fontStyle: 'bold', fontSize: 10 },
    bodyStyles: { fontSize: 10 },
    footStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 11 },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { halign: 'right', cellWidth: 50 },
      2: { halign: 'right', cellWidth: 50 },
    },
    margin: { left: 14, right: 14 },
  })

  y = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12

  // 3. 12-Monats-Verlauf (kumuliert)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('3. So wächst dein Polster', 14, y)
  y += 2

  const monate = ['Jän', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
  // SVS-Quartalsvorschreibungen: Fälligkeit Ende Feb / Mai / Aug / Nov
  const quartalsMonate = new Set([1, 4, 7, 10])
  autoTable(doc, {
    startY: y,
    head: [['Monat', 'Rücklage', 'Kumuliert', 'Hinweis']],
    body: monate.map((m, i) => [
      `${m} ${p.y}`,
      formatEuro(p.rg),
      formatEuro(p.rg * (i + 1)),
      quartalsMonate.has(i) && p.vs > 0 ? `SVS-Vorschreibung fällig (${formatEuro(p.vs / 4)})` : '',
    ]),
    theme: 'striped',
    headStyles: { fillColor: [100, 116, 139], fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { fontSize: 9 },
    columnStyles: {
      0: { cellWidth: 28 },
      1: { halign: 'right', cellWidth: 32 },
      2: { halign: 'right', cellWidth: 32 },
      3: { fontSize: 8, textColor: [100, 116, 139] },
    },
    margin: { left: 14, right: 14 },
  })

  // Neue Seite für Umsetzung
  doc.addPage()
  y = 20

  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(15, 23, 42)
  doc.text('4. So setzt du den Plan um', 14, y)
  y += 8

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(60, 60, 60)
  const schritte = [
    `1. Eröffne ein eigenes Unterkonto ("Steuern & SVS"). Getrenntes Geld wird nicht versehentlich ausgegeben.`,
    `2. Richte einen Dauerauftrag über ${formatEuro(p.rg)} ein, Ausführung am Monatsersten. Rücklage zuerst, nicht vom Restgeld.`,
    `3. Zahle die SVS-Quartalsvorschreibungen (Ende Feb, Mai, Aug, Nov) aus diesem Konto.`,
    Math.max(0, p.nz) > 500
      ? `4. Deine voraussichtliche Nachzahlung von ${formatEuro(p.nz)} kommt nach dem Steuerbescheid. Mit diesem Plan ist sie am Ende des Jahres gedeckt.`
      : `4. Aktuell droht keine große Nachzahlung. Der Plan hält das so, auch wenn dein Gewinn steigt.`,
    `5. Aktualisiere die Berechnung, sobald sich dein Gewinn spürbar ändert (ab ca. +/- 10 %) oder ein neuer Bescheid kommt.`,
  ]
  for (const s of schritte) {
    doc.text(s, 14, y, { maxWidth: 180 })
    y += 12
  }

  y += 4
  doc.setFontSize(9)
  doc.setTextColor(120, 120, 120)
  doc.text(
    'Warum die Rücklage höher ist als die aktuelle Vorschreibung: Die SVS schreibt vorläufig auf Basis ' +
    'deines Gewinns von vor 3 Jahren vor (§ 25a GSVG). Steigt dein Gewinn, kommt die Differenz später ' +
    'als Nachzahlung. Dieser Plan legt sie von Anfang an zur Seite.',
    14, y, { maxWidth: 180 }
  )

  // Footer auf beiden Seiten
  const pageHeight = doc.internal.pageSize.getHeight()
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text(
      `Erstellt mit SteuerBoard.pro | Planungs- und Orientierungstool, keine Steuerberatung. Alle Angaben ohne Gewähr. | Seite ${i}/${pageCount}`,
      105, pageHeight - 10, { align: 'center' }
    )
  }

  doc.save(`SVS-Ruecklagenplan-${p.y}.pdf`)
}
