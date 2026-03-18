import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://steuerboard.pro'
  const lastUpdated = '2026-03-18'

  return [
    // Homepage
    {
      url: baseUrl,
      lastModified: lastUpdated,
      changeFrequency: 'weekly',
      priority: 1.0,
    },

    // Rechner (höchste Priorität — SEO-Hauptseiten)
    {
      url: `${baseUrl}/rechner`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/einkommensteuer`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/misch-einkommen`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/krypto-steuer`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sachbezug-rechner`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/investitionsfreibetrag`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bilanz`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly',
      priority: 0.7,
    },

    // Steuerwissen-Artikel (SEO-Content)
    {
      url: `${baseUrl}/steuerwissen`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/steuerwissen/svs-nachzahlung-vermeiden`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/steuerwissen/gmbh-vs-einzelunternehmen`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/steuerwissen/svs-beitraege-senken`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/steuerwissen/steueroptimierung-selbststaendige`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/steuerwissen/gewinnfreibetrag-nutzen`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // Produkt-Seiten
    {
      url: `${baseUrl}/pricing`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/steuerberater`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly',
      priority: 0.5,
    },

    // Legal
    {
      url: `${baseUrl}/impressum`,
      lastModified: '2026-01-01',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified: '2026-01-01',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/agb`,
      lastModified: '2026-01-01',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
