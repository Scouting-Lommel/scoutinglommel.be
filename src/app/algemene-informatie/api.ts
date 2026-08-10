import { cache } from 'react';
import { generateApiQuery } from '@/lib/api';
import type { InfoPageQuery, YearThemeQuery } from '@/types/generated/Graphql';
import { INFO_PAGE_QUERY, YEAR_THEME_QUERY } from './query';

export const getInfoPage = cache((): Promise<InfoPageQuery> => {
  return generateApiQuery<InfoPageQuery>({
    query: INFO_PAGE_QUERY,
  });
});

export const getYearTheme = cache((): Promise<YearThemeQuery> => {
  return generateApiQuery<YearThemeQuery>({
    query: YEAR_THEME_QUERY,
  });
});
