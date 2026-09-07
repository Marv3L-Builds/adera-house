import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';

const serif = Cormorant_Garamond({ variable: '--font-editorial', subsets: ['latin'], weight: ['400', '500', '600'], style: ['normal', 'italic'] });
const sans = Manrope({ variable: '--font-ui', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'Adera House — A quieter side of Lagos', template: '%s — Adera House' },
  description: 'A private waterfront hotel on Victoria Island, Lagos. Explore refined rooms, considered dining and deeply local experiences.',
  openGraph: { title: 'Adera House — A quieter side of Lagos', description: 'A private waterfront hotel on Victoria Island, Lagos.', images: ['/og.png'], type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Adera House — A quieter side of Lagos', description: 'A private waterfront hotel on Victoria Island, Lagos.', images: ['/og.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${serif.variable} ${sans.variable}`}>{children}</body></html>;
}
