import { Metadata } from 'next';
import type { JSX } from 'react';
import { generateMetadataForPage } from '@/lib/helpers/generateMetadata';
import UnauthorizedBlock from '@/components/organisms/Unauthorized';
import { getGeneralData } from '../api';

export const revalidate = 3600;

export const generateMetadata = async (): Promise<Metadata> => {
  const { generalData } = await getGeneralData();
  if (!generalData) return {};

  const metadata = await generateMetadataForPage(
    {
      pageTitle: 'Geen toegang tot deze pagina',
      pageDescription: 'Scouting Sint-Pieter Lommel',
      slug: 'geen-toegang',
    },
    generalData.data.attributes,
  );

  return { ...metadata };
};

const UnauthorizedPage = (): JSX.Element => {
  return <UnauthorizedBlock />;
};

export default UnauthorizedPage;
