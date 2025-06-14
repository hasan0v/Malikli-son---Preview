// src/app/layout.tsx (for App Router)
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // This now imports the refactored globals.css
import LayoutBody from './LayoutBody';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Malikli1992',
  description: 'Эксклюзивные ежемесячные дропы от Malikli1992',
};

// Suppress hydration errors in development
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <body suppressHydrationWarning>
        <LayoutBody>{children}</LayoutBody>
      </body>
    </html>
  );
}
