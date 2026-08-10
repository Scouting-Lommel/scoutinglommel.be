'use client';

import { createContext, useContext } from 'react';
import type { FooterDataQuery, NavigationDataQuery } from '@/types/generated/Graphql';

export type GeneralData = {
  generalData: Partial<NonNullable<NavigationDataQuery['generalData']>> &
    Partial<NonNullable<FooterDataQuery['generalData']>>;
  groups: NavigationDataQuery['groups'];
  rentalLocations: NavigationDataQuery['rentalLocations'];
};

const DataContext = createContext<GeneralData | null>(null);

export const useGeneralData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useGeneralData must be used within DataProvider');
  }
  return context;
};

export const DataProvider = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: GeneralData;
}) => {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
