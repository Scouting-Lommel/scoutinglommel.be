import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import Typography from '@/components/atoms/Typography';
import Form from '@/components/organisms/Forms';
import Hero from '@/components/organisms/Hero';

export const metadata: Metadata = {
  title: 'Development playground',
  description: 'Development playground',
  robots: {
    index: false,
    follow: false,
  },
};

const PlaygroundPage = async (): Promise<JSX.Element> => {
  const t = await getTranslations('forms.eetfestijnForm');

  return (
    <>
      <BlockContainer variant="light" orientation="default" slug="hero" modSmallPadding>
        <Hero
          title="Playground"
          subtitle="Development playground"
          variant="simple"
          className="sl-layout"
        />
      </BlockContainer>

      <hr />

      <BlockContainer variant="light" orientation="default" slug="eetfestijn-hero" modSmallPadding>
        <div className="sl-layout">
          <h2>{t('hero.title')}</h2>
          <Typography>{t('hero.subtitle')}</Typography>
        </div>
      </BlockContainer>

      <Form variant="eetfestijn" blockProperties={{ slug: 'eetfestijn-form' }} />
    </>
  );
};

export default PlaygroundPage;
