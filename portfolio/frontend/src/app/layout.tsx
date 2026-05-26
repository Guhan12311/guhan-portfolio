import type { Metadata } from 'next';
import { Orbitron, Syne, Space_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import CustomCursor from '@/components/ui/CustomCursor';
import ParticleBackground from '@/components/ui/ParticleBackground';
import CommandPalette from '@/components/ui/CommandPalette';
import MouseFollowerGlow from '@/components/ui/MouseFollowerGlow';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://guhan.dev'),
  title: {
    default: 'Guhan A — Full Stack & Generative AI Developer',
    template: '%s | Guhan A',
  },
  description:
    'Results-driven Full Stack Developer and Generative AI enthusiast. Building scalable web apps with React, Next.js, Django, FastAPI, LangChain, OpenAI, and Gemini API.',
  keywords: [
    'Guhan A', 'Full Stack Developer', 'Generative AI Developer',
    'React Developer', 'Next.js', 'LangChain', 'OpenAI', 'Gemini API',
    'Portfolio', 'Tamil Nadu', 'India',
  ],
  authors: [{ name: 'Guhan A', url: 'https://github.com/guhan-a' }],
  creator: 'Guhan A',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: 'Guhan A — Full Stack & Generative AI Developer',
    description: 'Results-driven Full Stack Developer and Generative AI enthusiast.',
    siteName: 'Guhan A Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guhan A — Full Stack & Generative AI Developer',
    description: 'Results-driven Full Stack Developer and Generative AI enthusiast.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${syne.variable} ${spaceMono.variable}`}>
      <body className="bg-dark-950 text-white overflow-x-hidden">
        <ParticleBackground />
        <MouseFollowerGlow />
        <CustomCursor />
        <CommandPalette />
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgba(6,13,24,0.95)',
              color: '#e8eaf0',
              border: '1px solid rgba(0,245,255,0.2)',
              backdropFilter: 'blur(12px)',
              fontFamily: 'var(--font-syne)',
            },
          }}
        />
      </body>
    </html>
  );
}
