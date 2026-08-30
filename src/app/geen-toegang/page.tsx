import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import type { JSX } from 'react';
import ErrorBlock from '@/components/organisms/ErrorBlock';

export const metadata: Metadata = {
  title: 'Geen toegang tot deze pagina',
  description: 'Scouting Sint-Pieter Lommel',
  robots: {
    index: false,
    follow: false,
  },
};

const UnauthorizedPage = async (): Promise<JSX.Element> => {
  const t = await getTranslations('common.unauthorized');

  return (
    <ErrorBlock
      code="403"
      heading="Geen toegang"
      description={t('title')}
      buttonLabel={t('button.label')}
    />
  );
};

export default UnauthorizedPage;
