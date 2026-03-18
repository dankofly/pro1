import Link from 'next/link'
import { JsonLd } from '@/components/json-ld'
import { ExternalLink, Scale, BookOpen } from 'lucide-react'

interface Source {
  name: string
  url: string
  description: string
}

interface RelatedArticle {
  title: string
  href: string
}

interface BreadcrumbItem {
  name: string
  href: string
}

interface ArticleFooterProps {
  sources: Source[]
  relatedArticles: RelatedArticle[]
  breadcrumbs: BreadcrumbItem[]
  lastUpdated?: string
}

export function ArticleFooter({ sources, relatedArticles, breadcrumbs, lastUpdated = '2026-03-18' }: ArticleFooterProps) {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://steuerboard.pro${item.href}`,
    })),
  }

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />

      {/* Author E-E-A-T Badge */}
      <section className="mt-12 mb-8">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-900/50 border border-blue-700">
              <Scale className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-1">Fachlich geprüfter Inhalt</p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Dieser Artikel basiert auf den aktuellen österreichischen Steuergesetzen (EStG, GSVG, KStG) und wird
                regelmäßig auf Aktualität geprüft. Alle Berechnungen und Angaben entsprechen dem Rechtsstand {lastUpdated.slice(0, 4)}.
                Dieser Artikel ersetzt keine individuelle Steuerberatung.
              </p>
              <p className="text-xs text-slate-500 mt-2">Letzte Aktualisierung: {lastUpdated}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quellen */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-400" />
          Quellen und weiterführende Informationen
        </h2>
        <ul className="space-y-3">
          {sources.map((source) => (
            <li key={source.url} className="flex items-start gap-2">
              <ExternalLink className="h-4 w-4 text-slate-500 mt-1 shrink-0" />
              <div>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                >
                  {source.name}
                </a>
                <p className="text-xs text-slate-500">{source.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Verwandte Artikel */}
      {relatedArticles.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Verwandte Artikel</h2>
          <div className="grid gap-3">
            {relatedArticles.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="flex items-center gap-3 bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:bg-slate-800 hover:border-blue-700 transition-colors group"
              >
                <span className="text-blue-400 group-hover:text-blue-300 text-sm font-medium">
                  {article.title}
                </span>
                <span className="text-slate-600 ml-auto">→</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
