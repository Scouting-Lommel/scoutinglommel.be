import { Metadata } from 'next';
import { getSiteUrl } from './getSiteUrl';

type PageMetaObj = {
  pageTitle: string;
  pageDescription: string;
  slug: string;
  noIndex?: boolean;
  metaImage?: { url: string };
};

type MetaDataObj = {
  siteName: string;
  siteDescription: string;
  url: string;
  image: { url: string };
};

const generateMetadataForRootLayout = async (metaData: MetaDataObj): Promise<Metadata> => {
  const siteUrl = await getSiteUrl();

  const baseUrl = metaData.url || siteUrl;

  return {
    title: {
      default: metaData.siteName || 'Scouting Sint-Pieter Lommel',
      template: `%s • ${metaData.siteName || 'Scouting Sint-Pieter Lommel'}`,
    },
    description: metaData.siteDescription,
    metadataBase: baseUrl ? new URL(baseUrl) : null,
    manifest: '/assets/head/site.webmanifest',
    icons: {
      icon: [
        { url: '/assets/head/favicon-16x16.png', sizes: '16x16' },
        { url: '/assets/head/favicon-32x32.png', sizes: '32x32' },
      ],
      apple: [{ url: '/assets/head/apple-touch-icon.png', sizes: '180x180' }],
      shortcut: { url: '/assets/head/favicon.ico' },
    },
    openGraph: {
      locale: 'nl',
      type: 'website',
      siteName: metaData.siteName || 'Scouting Sint-Pieter Lommel',
      title: metaData.siteName || 'Scouting Sint-Pieter Lommel',
      description: metaData.siteDescription,
      images: metaData.image?.url,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaData.siteName || 'Scouting Sint-Pieter Lommel',
      description: metaData.siteDescription,
      images: metaData.image?.url,
    },
  };
};

const generateMetadataForPage = async (
  pageMeta: PageMetaObj,
  metaData: MetaDataObj,
  path?: string,
): Promise<Metadata> => {
  const siteUrl = await getSiteUrl();

  return {
    title: pageMeta?.pageTitle,
    description: pageMeta?.pageDescription,
    alternates: {
      canonical: `${siteUrl}${path ? '/' + path : ''}${pageMeta?.slug ? '/' + pageMeta?.slug : ''}`,
    },
    robots: {
      index: pageMeta?.noIndex || true,
      follow: pageMeta?.noIndex || true,
    },
    openGraph: {
      locale: 'nl',
      type: 'website',
      siteName: metaData.siteName || 'Scouting Sint-Pieter Lommel',
      title: `${pageMeta?.pageTitle} • ${metaData.siteName}`,
      description: pageMeta?.pageDescription,
      images: pageMeta?.metaImage?.url,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageMeta?.pageTitle,
      description: pageMeta?.pageDescription,
      images: pageMeta?.metaImage?.url,
    },
  };
};

export { generateMetadataForRootLayout, generateMetadataForPage };
