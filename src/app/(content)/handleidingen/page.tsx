import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { generateMetadataForPage } from '@/lib/helpers/generateMetadata';
import Blocks from '@/content-blocks';
import ArticleGrid from '@/components/organisms/ArticleGrid';
import { getManuals, getManualsPage } from './api';
import { getGeneralData } from '../../api';

export const generateMetadata = async (): Promise<Metadata> => {
  const { generalData } = await getGeneralData();
  const { manualsOverviewPage } = await getManualsPage();

  if (!manualsOverviewPage || !generalData) return {};

  const metadata = await generateMetadataForPage(
    manualsOverviewPage.pageMeta,
    generalData,
    manualsOverviewPage.slug,
  );

  return { ...metadata };
};

const ManualsPage = async (): Promise<JSX.Element> => {
  const { manualsOverviewPage } = await getManualsPage();
  const { manuals } = await getManuals();

  if (!manualsOverviewPage) notFound();

  return (
    <>
      <Blocks content={manualsOverviewPage.blocks} />
      <ArticleGrid
        articles={
          manuals?.map((manual) => ({
            id: manual?.documentId,
            title: manual?.title ?? '',
            description: manual?.description ?? '',
            updatedAt: manual?.updatedAt ?? '',
            slug: manual?.slug ?? '',
            locked: manual?.locked ?? false,
            loginCallbackUrl: '/handleidingen',
          })) ?? []
        }
        loginCallbackUrl="/handleidingen"
        modWithToolbar
      />
    </>
  );
};

export default ManualsPage;
