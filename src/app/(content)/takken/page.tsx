import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { generateMetadataForPage } from '@/lib/helpers/generateMetadata';
import Blocks from '@/content-blocks';
import { getGroupsPage } from './api';
import { getGeneralData } from '../../api';

export const generateMetadata = async (): Promise<Metadata> => {
  const { generalData } = await getGeneralData();
  const { groupsPage } = await getGroupsPage();
  if (!groupsPage || !generalData) return {};

  const metadata = await generateMetadataForPage(groupsPage.pageMeta, generalData, groupsPage.slug);

  return { ...metadata };
};

const GroupsPage = async (): Promise<JSX.Element> => {
  const { groupsPage } = await getGroupsPage();

  if (!groupsPage) notFound();

  return (
    <>
      <Blocks content={groupsPage.blocks} />
    </>
  );
};

export default GroupsPage;
