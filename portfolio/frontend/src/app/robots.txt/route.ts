import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://guhan.dev';
  const content = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml

# Block AI scrapers
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /
`;
  return new NextResponse(content, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
