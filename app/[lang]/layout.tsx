import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';
import { getDictionary, hasLocale } from './dictionaries';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export async function generateStaticParams() {
  return [{ lang: 'ru' }, { lang: 'en' }, { lang: 'kk' }];
}

const ogLocales: Record<string, string> = { ru: 'ru_KZ', kk: 'kk_KZ', en: 'en_US' };

export async function generateMetadata({
  params,
}: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${siteUrl}/${lang}`,
      languages: {
        ru: `${siteUrl}/ru`,
        en: `${siteUrl}/en`,
        kk: `${siteUrl}/kk`,
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: ogLocales[lang] ?? 'ru_KZ',
      type: 'website',
      url: `${siteUrl}/${lang}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${manrope.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
