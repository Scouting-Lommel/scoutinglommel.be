import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import Hero from '@/components/organisms/Hero';
import { getGroupPage } from './api';
import ActivitiesSection from './components/ActivitiesSection';
import FileSection from './components/FilesSection';

type Props = {
  params: Promise<{ slug: string }>;
};

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'Takpagina beheren • Dashboard',
  };
};

const DashboardGroupPage = async (props: Props): Promise<JSX.Element> => {
  const { slug } = await props.params;

  const { groups } = await getGroupPage(slug);
  const group = groups[0];

  if (!group) notFound();

  const t = await getTranslations('dashboard.groupsDetail');

  return (
    <div className="sl-layout">
      <BlockContainer slug="group-hero">
        <Hero title={group.pageTitle} subtitle={t('subtitle')} variant="simple" />
      </BlockContainer>

      <FileSection group={group} />
      <ActivitiesSection group={group} />
    </div>
  );
};

export default DashboardGroupPage;
