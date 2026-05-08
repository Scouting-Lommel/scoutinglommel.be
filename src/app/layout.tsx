import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata, Viewport } from 'next';
import { Montserrat, Nunito_Sans } from 'next/font/google';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import type { JSX } from 'react';
import { defaultLocale } from '@/i18n/locales';
import { getLayoutData, getSeoData } from '@/lib/api/general/api';
import { DataProvider } from '@/lib/contexts/DataContext';
import { generateMetadataForRootLayout } from '@/lib/helpers/generateMetadata';
import { generateStructuredData, generateWebSiteSchema } from '@/lib/helpers/generateStructuredData';
import {
  transformMainNavigation,
  transformFooterNavigation,
} from '@/lib/helpers/transformNavigation';
import SessionProvider from '@/lib/providers/SessionProvider';
import BreadcrumbJsonLd from '@/components/atoms/BreadcrumbJsonLd';
import GlobalAlert from '@/components/atoms/GlobalAlert';
import SkipToContent from '@/components/atoms/SkipToContent';
import Footer from '@/components/organisms/Footer';
import Header from '@/components/organisms/Header';
import commonMessages from '../../locales/nl/common.json';
import dashboardMessages from '../../locales/nl/dashboard.json';
import formsMessages from '../../locales/nl/forms.json';

import '@/app/global.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
  display: 'swap',
  variable: '--font-montserrat',
  preload: true,
});

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
  display: 'swap',
  variable: '--font-nunito-sans',
  preload: true,
});

type Props = { children: React.ReactNode };

export const viewport = async (): Promise<Viewport> => {
  return { themeColor: 'ffffff' };
};

export const generateMetadata = async (): Promise<Metadata> => {
  const data = await getSeoData();
  if (!data || !data.generalData) return {};

  const metadata = await generateMetadataForRootLayout(data.generalData);

  return { ...metadata };
};

const RootLayout = async ({ children }: Props): Promise<JSX.Element> => {
  const data = await getLayoutData();

  if (!data?.generalData) {
    return (
      <html lang={defaultLocale} className={`${montserrat.variable} ${nunitoSans.variable}`}>
        <body>
          <main className="sl-main" id="main">
            {children}
          </main>
        </body>
      </html>
    );
  }

  const globalAlert = data.generalData.globalAlert;
  const mainNavigation = transformMainNavigation(data.mainNavigation);
  const footerNavigation = transformFooterNavigation(data.footerNavigation);

  const groups = data.groups
    .filter((group): group is NonNullable<(typeof data.groups)[number]> => group !== null)
    .map((group) => ({
      name: group.name,
      description: group.description ?? '',
      slug: group.slug ?? '',
    }));
  const rentalLocations = data.rentalLocations
    .filter(
      (location): location is NonNullable<(typeof data.rentalLocations)[number]> =>
        location !== null,
    )
    .map((location) => ({
      name: location.name ?? '',
      description: location.description ?? '',
      slug: location.slug ?? '',
    }));
  const contactItems = (data.generalData.contactItems ?? [])
    .filter(
      (item): item is NonNullable<NonNullable<typeof data.generalData.contactItems>[number]> =>
        item !== null,
    )
    .map((item) => ({
      label: item.label ?? '',
      link: item.link ?? '',
    }));

  return (
    <html lang={defaultLocale} className={`${montserrat.variable} ${nunitoSans.variable}`}>
      <link rel="preconnect" href="https://res.cloudinary.com" />
      <body>
        <NextIntlClientProvider
          messages={{ common: commonMessages, dashboard: dashboardMessages, forms: formsMessages }}
        >
          <SessionProvider>
            <DataProvider data={data}>
              <SkipToContent className="skip-to-content" />

              {globalAlert && globalAlert.enabled && globalAlert.label && (
                <GlobalAlert label={globalAlert.label} variant={globalAlert.variant} />
              )}

              {data.generalData.logo && (
                <Header
                  logo={{
                    ...data.generalData.logo,
                    width: data.generalData.logo.width ?? null,
                    height: data.generalData.logo.height ?? null,
                  }}
                  mainNavigation={mainNavigation}
                  groups={groups}
                  rentalLocations={rentalLocations}
                />
              )}

              <main className="sl-main" id="main">
                {children}
              </main>

              <Footer
                siteName={data.generalData.siteName ?? ''}
                vatNumber={data.generalData.vatNumber ?? ''}
                groupNumber={data.generalData.groupNumber ?? ''}
                address={data.generalData.address ?? ''}
                contactItems={contactItems}
                footerNavigation={footerNavigation}
              />
            </DataProvider>
          </SessionProvider>
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData(data.generalData)).replace(
              /</g,
              '\\u003c',
            ),
          }}
        />
        {generateWebSiteSchema(data.generalData) && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(generateWebSiteSchema(data.generalData)).replace(/</g, '\\u003c'),
            }}
          />
        )}
        <BreadcrumbJsonLd />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
