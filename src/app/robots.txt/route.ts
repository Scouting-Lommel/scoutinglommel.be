import { getSiteUrl } from '@/lib/helpers/getSiteUrl';

export const GET = async (): Promise<Response> => {
  const siteUrl = await getSiteUrl();
  const isProduction = process.env.APP_ENV === 'production';

  const lines: string[] = ['User-agent: *', 'Content-Signal: ai-train=no, search=yes, ai-input=no'];

  if (isProduction) {
    lines.push(
      'Allow: /',
      'Disallow: /dashboard',
      'Disallow: /dashboard/*',
      'Disallow: /inloggen',
      'Disallow: /geen-toegang',
      'Disallow: /playground',
    );
  } else {
    lines.push('Disallow: /');
  }

  if (isProduction) {
    lines.push('', `Sitemap: ${siteUrl}/sitemap.xml`);
  }

  return new Response(`${lines.join('\n')}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
};
