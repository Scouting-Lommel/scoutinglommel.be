import { useTranslations } from 'next-intl';
import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import Typography from '@/components/atoms/Typography';
import Hero from '@/components/organisms/Hero';
import './Unauthorized.css';

const Unauthorized = (): JSX.Element => {
  const t = useTranslations('common.unauthorized');

  return (
    <BlockContainer variant="light" orientation="default" slug="page-not-found">
      <section className="sl-layout">
        <Hero subtitle="Geen toegang" title="403" variant="simple" className="sl-layout" />
        <Typography className="unauthorized__content">
          <p>{t('title')}</p>
          <p>
            <a href="/">{t('button.label')}</a>
          </p>
        </Typography>
      </section>
    </BlockContainer>
  );
};

export default Unauthorized;
