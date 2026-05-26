import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://guhan.dev';
  const now = new Date().toISOString();

  const sections = [
    { path: '', priority: '1.0', freq: 'monthly' },
    { path: '#about', priority: '0.9', freq: 'monthly' },
    { path: '#skills', priority: '0.8', freq: 'monthly' },
    { path: '#experience', priority: '0.8', freq: 'monthly' },
    { path: '#projects', priority: '0.9', freq: 'weekly' },
    { path: '#services', priority: '0.8', freq: 'monthly' },
    { path: '#contact', priority: '0.7', freq: 'monthly' },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sections.map(s => `  <url>
    <loc>${baseUrl}/${s.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${s.freq}</changefreq>
    <priority>${s.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  });
}
