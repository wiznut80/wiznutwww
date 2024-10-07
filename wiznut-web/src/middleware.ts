import { NextResponse, NextRequest } from 'next/server';
import { fallbackLng, locales } from '@/utils/localization/settings';

export function middleware(request: NextRequest) {
  const { pathname, hash } = request.nextUrl;

  console.info('[middleware]:::::::1::::::', pathname);

  // Check if the default locale is in the pathname
  if (pathname === `/`) {
    console.info('[middleware]:::::::2::::::', `${pathname}${hash}`);
    // Redirect to the default locale if the path is `/`
    return NextResponse.redirect(new URL(`/${fallbackLng}${pathname}${hash}`, request.url));
  }

  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
      locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    console.info('[middleware]:::::::3::::::', `${pathname}${hash}`);
    // Rewrite the URL to include the default locale
    return NextResponse.rewrite(new URL(`/${fallbackLng}${pathname}${hash}`, request.url));
  }

  console.info('[middleware]:::::::4::::::', `${pathname}${hash}`);
  // If the pathname includes a locale, continue the request
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|.*\\..*|_next/static|_next/image|manifest.json|assets|favicon.ico|lan).*)']
};
