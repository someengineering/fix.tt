import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/ (API routes)
     * - js/ (JavaScript files)
     * - _next/static/ (static files)
     * - _next/image/ (image optimization files)
     * - favicon.ico (favicon file)
     * - apple-touch-icon (Apple touch icon files)
     * - icon- (icon files)
     * - icon.svg (SVG icon file)
     * - sitemap.xml (sitemap file)
     * - manifest.webmanifest (web manifest file)
     * - robots.txt (robots file)
     */
    {
      source:
        '/((?!api/|js/|_next/static/|_next/image/|favicon.ico|apple-touch-icon|icon-|icon.svg|sitemap.xml|manifest.webmanifest|robots.txt)(?!.*opengraph-image-).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  if (url.searchParams.has('qr')) {
    url.searchParams.delete('qr');
    url.searchParams.append('utm_source', 'event');
    url.searchParams.append('utm_medium', 'qr_code');
    url.searchParams.append('utm_campaign', 'cybersecurity_summit_2024');

    return NextResponse.redirect(url);
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const cspHeader = `
    default-src 'self';
    connect-src 'self' https://consentcdn.cookiebot.com https://consent.cookiebot.com;
    script-src 'self' 'unsafe-inline'${
      process.env.NODE_ENV === 'production' ? '' : " 'unsafe-eval'"
    }${
      request.nextUrl.pathname.startsWith('/studio')
        ? ''
        : ` 'nonce-${nonce}' 'strict-dynamic'`
    };
    style-src 'self' 'unsafe-inline';
    style-src-elem 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
    img-src 'self' https://i.ytimg.com https://imgsct.cookiebot.com blob: data:;
    media-src 'self' https://media.transistor.fm https://audio.transistor.fm;
    frame-src 'self' https://www.google.com https://recaptcha.google.com https://www.youtube-nocookie.com https://consentcdn.cookiebot.com https://consent.cookiebot.com;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors ${url.pathname.startsWith('/blog/preview') ? 'https://hashnode.com' : "'none'"};
    ${process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? 'upgrade-insecure-requests;' : ''}
`
    .replace(/\s{2,}/g, ' ')
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}
