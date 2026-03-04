import { readFileSync } from 'fs'
import { join } from 'path'

export type ChapterId =
  | 'A-einfuehrung'
  | 'B-finanzverfassung'
  | 'C-einkommensteuer'
  | 'D-koerperschaftsteuer'
  | 'E-internationales'
  | 'F-umsatzsteuer'
  | 'G-verkehrsteuern'
  | 'H-verfassung'
  | 'I-finanzbehoerden'
  | 'J-verfahrensrecht'
  | 'K-rechtsanwendung'
  | 'L-finanzstrafrecht'

export interface ChapterMeta {
  id: ChapterId
  title: string
  shortTitle: string
}

export const CHAPTERS: ChapterMeta[] = [
  { id: 'A-einfuehrung', title: 'Einführung in das Steuerrecht', shortTitle: 'Einführung' },
  { id: 'B-finanzverfassung', title: 'Finanzverfassung und Finanzausgleich', shortTitle: 'Finanzverfassung' },
  { id: 'C-einkommensteuer', title: 'Einkommensteuer', shortTitle: 'ESt' },
  { id: 'D-koerperschaftsteuer', title: 'Körperschaftsteuer', shortTitle: 'KöSt' },
  { id: 'E-internationales', title: 'Internationales Steuerrecht', shortTitle: 'Internat. StR' },
  { id: 'F-umsatzsteuer', title: 'Umsatzsteuer', shortTitle: 'USt' },
  { id: 'G-verkehrsteuern', title: 'Verkehrsteuern', shortTitle: 'Verkehrsteuern' },
  { id: 'H-verfassung', title: 'Verfassungsrechtliche Grundlagen', shortTitle: 'Verfassung' },
  { id: 'I-finanzbehoerden', title: 'Organisation der Finanzbehörden', shortTitle: 'Finanzbehörden' },
  { id: 'J-verfahrensrecht', title: 'Abgabenverfahrensrecht (BAO)', shortTitle: 'BAO' },
  { id: 'K-rechtsanwendung', title: 'Rechtsanwendung im Steuerrecht', shortTitle: 'Rechtsanwendung' },
  { id: 'L-finanzstrafrecht', title: 'Finanzstrafrecht', shortTitle: 'Finanzstrafrecht' },
]

const chapterCache = new Map<ChapterId, string>()

export function loadChapter(id: ChapterId): string {
  const cached = chapterCache.get(id)
  if (cached) return cached

  const filePath = join(process.cwd(), 'src', 'lib', 'tax-knowledge', 'chapters', `${id}.md`)
  const content = readFileSync(filePath, 'utf-8')
  chapterCache.set(id, content)
  return content
}
