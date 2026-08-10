import { Metadata } from 'next';
import { getSiteUrl } from './getSiteUrl';

type MetaImage = {
  url?: string | null;
  width?: number | null;
  height?: number | null;
  alternativeText?: string | null;
};

type PageMetaObj = {
  pageTitle?: string | null;
  pageDescription?: string | null;
  slug?: string | null;
  noIndex?: boolean | null;
  metaImage?: MetaImage | null;
};

type MetaDataObj = {
  siteName?: string | null;
  siteDescription?: string | null;
  url?: string | null;
  image?: MetaImage | null;
};

const toMetadataImage = (image?: MetaImage | null) => {
  if (!image?.url) return undefined;

  return {
    url: image.url,
    ...(image.width ? { width: image.width } : {}),
    ...(image.height ? { height: image.height } : {}),
    ...(image.alternativeText ? { alt: image.alternativeText } : {}),
  };
};

const generateMetadataForRootLayout = async (metaData: MetaDataObj): Promise<Metadata> => {
  const siteUrl = await getSiteUrl();

  const baseUrl = metaData.url || siteUrl;

  return {
    title: {
      default: metaData.siteName || 'Scouting Sint-Pieter Lommel',
      template: `%s • ${metaData.siteName || 'Scouting Sint-Pieter Lommel'}`,
    },
    description: metaData.siteDescription ?? undefined,
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
      locale: 'nl_BE',
      type: 'website',
      siteName: metaData.siteName || 'Scouting Sint-Pieter Lommel',
      title: metaData.siteName || 'Scouting Sint-Pieter Lommel',
      description: metaData.siteDescription ?? undefined,
      url: baseUrl ?? undefined,
      images: toMetadataImage(metaData.image),
    },
    twitter: {
      card: 'summary_large_image',
      title: metaData.siteName || 'Scouting Sint-Pieter Lommel',
      description: metaData.siteDescription ?? undefined,
      images: toMetadataImage(metaData.image),
    },
  };
};

const generateMetadataForPage = async (
  pageMeta: PageMetaObj | null | undefined,
  metaData: MetaDataObj | null | undefined,
  path?: string | null,
): Promise<Metadata> => {
  const siteUrl = await getSiteUrl();

  const pageUrl = `${siteUrl}${path ? '/' + path : ''}${pageMeta?.slug ? '/' + pageMeta?.slug : ''}`;
  const socialTitle =
    pageMeta?.pageTitle && metaData?.siteName
      ? `${pageMeta.pageTitle} • ${metaData.siteName}`
      : (pageMeta?.pageTitle ?? metaData?.siteName ?? undefined);

  return {
    title: pageMeta?.pageTitle ?? undefined,
    description: pageMeta?.pageDescription ?? undefined,
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: !(pageMeta?.noIndex ?? false),
      follow: !(pageMeta?.noIndex ?? false),
    },
    openGraph: {
      locale: 'nl_BE',
      type: 'website',
      siteName: metaData?.siteName || 'Scouting Sint-Pieter Lommel',
      title: socialTitle,
      description: pageMeta?.pageDescription ?? undefined,
      url: pageUrl,
      images: toMetadataImage(pageMeta?.metaImage ?? metaData?.image),
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: pageMeta?.pageDescription ?? undefined,
      images: toMetadataImage(pageMeta?.metaImage ?? metaData?.image),
    },
  };
};

export { generateMetadataForRootLayout, generateMetadataForPage };
