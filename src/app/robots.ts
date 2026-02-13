import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/profil', '/admin', '/auth/', '/api/'],
      },
    ],
    sitemap: 'https://steuerboard.pro/sitemap.xml',
  }
}
