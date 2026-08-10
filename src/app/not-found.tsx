import { Metadata } from 'next';
import type { JSX } from 'react';
import { generateMetadataForPage } from '@/lib/helpers/generateMetadata';
import NotFoundBlock from '@/components/organisms/NotFound';
import { getGeneralData } from './api';

export const generateMetadata = async (): Promise<Metadata> => {
  const { generalData } = await getGeneralData();
  if (!generalData) return {};

  const metadata = await generateMetadataForPage(
    {
      pageTitle: 'Pagina niet gevonden',
      pageDescription: 'Scouting Sint-Pieter Lommel',
    },
    generalData,
  );

  return { ...metadata };
};

const NotFoundPage = (): JSX.Element => {
  return <NotFoundBlock />;
};

export default NotFoundPage;
