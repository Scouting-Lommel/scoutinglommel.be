import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
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
  const t = await getTranslations('common.whoIsWho');

  if (!groups) notFound();

  return (
    <>
      <BlockContainer variant="light" modSmallPadding slug="wie-is-wie">
        <Hero title={t('title')} subtitle={t('subtitle')} variant="simple" className="sl-layout" />
      </BlockContainer>
      <WieIsWie groups={groups} />
    </>
  );
};

export default WieIsWiePage;
