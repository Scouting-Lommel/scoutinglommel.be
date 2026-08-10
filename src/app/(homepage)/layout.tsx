import type { JSX } from 'react';
import { getLayoutData } from '@/lib/api/general/api';
import { generateStructuredData, generateWebSiteSchema } from '@/lib/helpers/generateStructuredData';

const HomePageLayout = async ({ children }: { children: React.ReactNode }): Promise<JSX.Element> => {
  const data = await getLayoutData();

  if (!data?.generalData) return <>{children}</>;

  const websiteSchema = generateWebSiteSchema(data.generalData);

  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData(data.generalData)).replace(/</g, '\\u003c'),
        }}
      />
      {websiteSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema).replace(/</g, '\\u003c'),
          }}
        />
      )}
    </>
  );
};

export default HomePageLayout;