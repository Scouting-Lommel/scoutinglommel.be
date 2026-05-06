import { generateApiQuery } from '@/lib/api';
import { NAVIGATION_DATA, FOOTER_DATA, SEO_DATA } from './queries';

export const getNavigationData = (): Promise<any> => {
  return generateApiQuery({
    query: NAVIGATION_DATA,
  });
};

export const getFooterData = (): Promise<any> => {
  return generateApiQuery({
    query: FOOTER_DATA,
  });
};

export const getSeoData = (): Promise<any> => {
  return generateApiQuery({
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
