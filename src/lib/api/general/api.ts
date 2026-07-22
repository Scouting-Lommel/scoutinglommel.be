import { generateApiQuery } from '@/lib/api';
import type { GeneralData } from '@/lib/contexts/DataContext';
import type {
  FooterDataQuery,
  FooterNavigationQuery,
  MainNavigationQuery,
  NavigationDataQuery,
  SeoDataQuery,
} from '@/types/generated/Graphql';
import {
  NAVIGATION_DATA,
  FOOTER_DATA,
  SEO_DATA,
  MAIN_NAVIGATION_QUERY,
  FOOTER_NAVIGATION_QUERY,
} from './queries';

type LayoutData = GeneralData & {
  mainNavigation: MainNavigationQuery['renderNavigation'];
  footerNavigation: FooterNavigationQuery['renderNavigation'];
};

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

export const getMainNavigation = (): Promise<MainNavigationQuery> => {
  return generateApiQuery<MainNavigationQuery>({
    query: MAIN_NAVIGATION_QUERY,
  });
};

export const getFooterNavigation = (): Promise<FooterNavigationQuery> => {
  return generateApiQuery<FooterNavigationQuery>({
    query: FOOTER_NAVIGATION_QUERY,
  });
};

export const getLayoutData = async (): Promise<LayoutData> => {
  const [navigationData, footerData, mainNavData, footerNavData] = await Promise.allSettled([
    getNavigationData(),
    getFooterData(),
    getMainNavigation(),
    getFooterNavigation(),
  ]);

  const navData = navigationData.status === 'fulfilled' ? navigationData.value : null;
  const footData = footerData.status === 'fulfilled' ? footerData.value : null;
  const mainNav = mainNavData.status === 'fulfilled' ? mainNavData.value : null;
  const footerNav = footerNavData.status === 'fulfilled' ? footerNavData.value : null;

  return {
    generalData: {
      ...(navData?.generalData || {}),
      ...(footData?.generalData || {}),
    },
    groups: navData?.groups || [],
    rentalLocations: navData?.rentalLocations || [],
    mainNavigation: mainNav?.renderNavigation || [],
    footerNavigation: footerNav?.renderNavigation || [],
  };
};
