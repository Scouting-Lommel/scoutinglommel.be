import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { generateMetadataForPage } from '@/lib/helpers/generateMetadata';
import Blocks from '@/content-blocks';
import { getGeneralData } from '../api';
import { getInfoPage, getYearTheme } from './api';

export const revalidate = 3600;

export const generateMetadata = async (): Promise<Metadata> => {
  const { generalData } = await getGeneralData();
  const { infoPage } = await getInfoPage();
  if (!infoPage || !generalData) return {};

  const metadata = await generateMetadataForPage(infoPage.pageMeta, generalData, infoPage.slug);

  return { ...metadata };
};

const InfoPage = async (): Promise<JSX.Element> => {
  const { infoPage } = await getInfoPage();
  const { yearThemes } = await getYearTheme();

  if (!infoPage) notFound();

  const blocks = [...(infoPage.blocks ?? [])] as Array<{
    __typename: string;
    [key: string]: unknown;
  }>;
  const blockIndex = blocks.findIndex(
    (el) => el.__typename === 'ComponentContentBlocksYearThemeBlock',
  );
  if (blockIndex >= 0 && yearThemes?.[0]) {
    blocks[blockIndex] = { ...blocks[blockIndex], yearTheme: yearThemes[0] };
  }

  return (
    <>
      <Blocks content={blocks} />
    </>
  );
};

export default InfoPage;
