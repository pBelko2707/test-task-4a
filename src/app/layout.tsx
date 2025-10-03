import type { Metadata } from 'next';
import { Montserrat, Raleway, Inter } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const raleway = Raleway({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-raleway',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const gilroy = Inter({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-gilroy',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Тарифы',
  description: 'Выберите подходящий тариф',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${montserrat.className} ${raleway.className} ${gilroy.className}`}
    >
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
