import { generateApiQuery } from '@/lib/api';
import type { FooterDataQuery, NavigationDataQuery, SeoDataQuery } from '@/types/generated/Graphql';
import { NAVIGATION_DATA, FOOTER_DATA, SEO_DATA } from './queries';

export const getNavigationData = (): Promise<NavigationDataQuery> => {
  return generateApiQuery<NavigationDataQuery>({
    query: NAVIGATION_DATA,
  });
};

export const getFooterData = (): Promise<FooterDataQuery> => {
  return generateApiQuery<FooterDataQuery>({
    query: FOOTER_DATA,
  });
};

export const getSeoData = (): Promise<SeoDataQuery> => {
  return generateApiQuery<SeoDataQuery>({
    query: SEO_DATA,
  });
};

export const getLayoutData = async (): Promise<any> => {
  const [navigationData, footerData] = await Promise.all([getNavigationData(), getFooterData()]);

  return {
    generalData: {
      ...navigationData.generalData,
      ...footerData.generalData,
    },
    groups: navigationData.groups,
    rentalLocations: navigationData.rentalLocations,
  };
};
