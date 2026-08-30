import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import type { JSX } from 'react';
import ErrorBlock from '@/components/organisms/ErrorBlock';

export const metadata: Metadata = {
  title: 'Pagina niet gevonden',
  description: 'Scouting Sint-Pieter Lommel',
  robots: {
    index: false,
    follow: false,
  },
};

const NotFoundPage = async (): Promise<JSX.Element> => {
  const t = await getTranslations('common.notFound');

  return (
    <ErrorBlock
      code="404"
      heading="Pagina niet gevonden"
      description={t('title')}
      buttonLabel={t('button.label')}
    />
  );
};

export default NotFoundPage;
