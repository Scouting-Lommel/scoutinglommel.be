import { generateApiQuery } from '@/lib/api';
import type { GeneralData } from '@/lib/contexts/DataContext';
import type { EventSiteContext } from '@/lib/helpers/generateEventSchema';
import { getSiteUrl } from '@/lib/helpers/getSiteUrl';
import type {
  EventSiteContextQuery,
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
  EVENT_SITE_CONTEXT,
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

// The CMS url wins when it is absolute; otherwise fall back to the request/env
// origin so schema.org always receives an absolute URL.
const getAbsoluteSiteUrl = async (cmsUrl?: string | null): Promise<string> => {
  if (cmsUrl && /^https?:\/\//i.test(cmsUrl)) return cmsUrl;
  return getSiteUrl();
};

export const getEventSiteContext = async (): Promise<EventSiteContext | null> => {
  const { generalData } = await generateApiQuery<EventSiteContextQuery>({
    query: EVENT_SITE_CONTEXT,
  });

  if (!generalData) return null;

  const { siteName, url, address, logo, image } = generalData;
  if (!siteName && !url && !address && !logo?.url && !image?.url) return null;

  return {
    name: siteName ?? null,
    url: await getAbsoluteSiteUrl(url),
    imageUrl: image?.url ?? null,
    logoUrl: logo?.url ?? null,
    address: address ?? null,
  };
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
