import { Metadata } from 'next';
import type { JSX } from 'react';
import { generateMetadataForPage } from '@/lib/helpers/generateMetadata';
import BlockContainer from '@/components/atoms/BlockContainer';
import Hero from '@/components/organisms/Hero';
import { getGeneralData } from '../api';

export const revalidate = 3600;

export const generateMetadata = async (): Promise<Metadata> => {
  const { generalData } = await getGeneralData();
  if (!generalData) return {};

  const metadata = await generateMetadataForPage(
    {
      pageTitle: 'Registratiedetails',
      pageDescription: 'Scouting Sint-Pieter Lommel',
      slug: 'legal-info',
    },
    generalData.data.attributes,
  );

  return { ...metadata };
};

const LegalInfoPage = (): JSX.Element => {
  return (
    <BlockContainer variant="light" orientation="default" slug="legal-info">
      <Hero title="Registratiedetails" variant="simple" className="sl-layout" />
      <div className="sl-layout">
        <div className="t-weight-bold">Scouting Lommel (VZW)</div>
        <div>Ondernemingsnummer: 0410.966.531</div>
        <div>BTW-nummer: BE 0410.966.531</div>
        <div>Adres: Nieuwe Kopen 4, 3920 Lommel, BE</div>
      </div>
    </BlockContainer>
  );
};

export default LegalInfoPage;
