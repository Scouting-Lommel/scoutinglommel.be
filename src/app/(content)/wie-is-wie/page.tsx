import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { generateMetadataForPage } from '@/lib/helpers/generateMetadata';
import BlockContainer from '@/components/atoms/BlockContainer';
import Hero from '@/components/organisms/Hero';
import WieIsWie from '@/components/organisms/WieIsWie';
import { getWieIsWie } from './api';
import { getGeneralData } from '../../api';

export const revalidate = 3600;

export const generateMetadata = async (): Promise<Metadata> => {
  const { generalData } = await getGeneralData();

  if (!generalData) return {};

  return generateMetadataForPage(
    {
      pageTitle: 'Wie is wie?',
      pageDescription: generalData.siteDescription,
      slug: 'wie-is-wie',
      noIndex: false,
      metaImage: generalData.image,
    },
    generalData,
  );
};

const WieIsWiePage = async (): Promise<JSX.Element> => {
  const { groups } = await getWieIsWie();

  if (!groups) notFound();

  return (
    <>
      <BlockContainer variant="light" modSmallPadding slug="wie-is-wie">
        <Hero
          title="wie-is-wie"
          subtitle="Leidingoverzicht"
          variant="simple"
          className="sl-layout"
        />
      </BlockContainer>
      <WieIsWie groups={groups} />
    </>
  );
};

export default WieIsWiePage;
