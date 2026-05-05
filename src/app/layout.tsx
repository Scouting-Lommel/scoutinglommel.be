import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata, Viewport } from 'next';
import { Montserrat, Nunito_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import type { JSX } from 'react';
import { defaultLocale } from '@/i18n/locales';
import { getLayoutData, getSeoData } from '@/lib/api/general/api';
import { DataProvider } from '@/lib/contexts/DataContext';
import { generateMetadataForRootLayout } from '@/lib/helpers/generateMetadata';
import { generateStructuredData } from '@/lib/helpers/generateStructuredData';
import SessionProvider from '@/lib/providers/SessionProvider';
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
  if (!data) return {};

  const metadata = await generateMetadataForRootLayout(data.generalData.data.attributes);

  return { ...metadata };
};

const RootLayout = async ({ children }: Props): Promise<JSX.Element> => {
  const data = await getLayoutData();

  const globalAlert = data.generalData.data.attributes.globalAlert;

  return (
    <html lang={defaultLocale} className={`${montserrat.variable} ${nunitoSans.variable}`}>
      <body>
        <NextIntlClientProvider messages={{ common: commonMessages, dashboard: dashboardMessages, forms: formsMessages }}>
          <SessionProvider>
            <DataProvider data={data}>
              <SkipToContent className="skip-to-content" />

              {globalAlert && globalAlert?.enabled && (
                <GlobalAlert label={globalAlert?.label} variant={globalAlert?.variant} />
              )}

              <Header
                logo={data.generalData.data.attributes.logo}
                mainNavigation={data.generalData.data.attributes.mainNavigation}
                groups={data.groups.data.map((item: any) => item.attributes)}
                rentalLocations={data.rentalLocations.data.map((item: any) => item.attributes)}
              />

              <main className="sl-main" id="main">
                {children}
              </main>

              <Footer
                siteName={data.generalData.data.attributes.siteName}
                vatNumber={data.generalData.data.attributes.vatNumber}
                groupNumber={data.generalData.data.attributes.groupNumber}
                address={data.generalData.data.attributes.address}
                contactItems={data.generalData.data.attributes.contactItems}
                footerNavigation={data.generalData.data.attributes.footerNavigation}
              />
            </DataProvider>
          </SessionProvider>
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData(data.generalData?.data?.attributes)),
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
