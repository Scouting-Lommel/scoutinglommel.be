import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { generateMetadataForPage } from '@/lib/helpers/generateMetadata';
import BlockContainer from '@/components/atoms/BlockContainer';
import WieIsWie from '@/components/organisms/WieIsWie';
import { getGeneralData } from '../api';
import { getWieIsWie } from './api';

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
        <div className="sl-layout">
          <h1 className="t-headline-1">Wie is wie?</h1>
        </div>
      </BlockContainer>
      <WieIsWie groups={groups} />
    </>
  );
};

export default WieIsWiePage;
