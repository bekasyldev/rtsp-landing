import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LOCALES = ['ru', 'en', 'kk'] as const;
const DEFAULT_LOCALE = 'ru';

function getLocale(request: NextRequest): string {
  const acceptLang = request.headers.get('accept-language') ?? '';
  if (/\bkk\b/.test(acceptLang)) return 'kk';
  if (/\ben\b/.test(acceptLang)) return 'en';
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|.*\\..*).*)'],
};
