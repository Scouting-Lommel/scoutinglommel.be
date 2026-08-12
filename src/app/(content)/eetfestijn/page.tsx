import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { JSX } from 'react';
import { generateMetadataForPage } from '@/lib/helpers/generateMetadata';
import BlockContainer from '@/components/atoms/BlockContainer';
import Form from '@/components/organisms/Forms';
import Hero from '@/components/organisms/Hero';
import { getGeneralData } from '../../api';

export const generateMetadata = async (): Promise<Metadata> => {
  const { generalData } = await getGeneralData();
  if (!generalData) return {};

  const metadata = await generateMetadataForPage(
    {
      pageTitle: 'Eetfestijn',
      pageDescription: 'Schrijf je in voor ons eetfestijn!',
    },
    generalData,
  );

  return { ...metadata };
};

const EetfestijnPage = async (): Promise<JSX.Element> => {
  if (process.env.APP_ENV !== 'development') return notFound();

  const t = await getTranslations('forms.eetfestijnForm');

  return (
    <>
      <BlockContainer variant="light" orientation="default" slug="eetfestijn-hero" modSmallPadding>
        <Hero
          title={t('hero.title')}
          subtitle={t('hero.subtitle')}
          variant="simple"
          className="sl-layout"
        />
      </BlockContainer>

      <Form variant="eetfestijn" blockProperties={{ slug: 'eetfestijn-form' }} />
    </>
  );
};

export default EetfestijnPage;
