'use client';
import { useTranslations } from 'next-intl';
import type { JSX } from 'react';
import ErrorBlock from '@/components/organisms/ErrorBlock';

const ErrorPage = ({ error }: { error: Error }): JSX.Element => {
  const t = useTranslations('common.error');
  console.error(error);
  return <ErrorBlock code="500" heading="Er ging iets mis" description={t('title')} buttonLabel={t('button.label')} />;
};
export default ErrorPage;
