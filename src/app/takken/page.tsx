import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { generateMetadataForPage } from '@/lib/helpers/generateMetadata';
import Blocks from '@/content-blocks';
import { getGeneralData } from '../api';
import { getGroupsPage } from './api';

export const revalidate = 3600;

export const generateMetadata = async (): Promise<Metadata> => {
  const { generalData } = await getGeneralData();
  const { groupsPage } = await getGroupsPage();
  if (!groupsPage || !generalData) return {};

  const metadata = await generateMetadataForPage(
    groupsPage.data.attributes.pageMeta,
    generalData.data.attributes,
  );

  return { ...metadata };
};

const GroupsPage = async (): Promise<JSX.Element> => {
  const { groupsPage } = await getGroupsPage();

  if (!groupsPage) notFound();

  return (
    <>
      <Blocks content={groupsPage.data.attributes.blocks} />
    </>
  );
};

export default GroupsPage;
