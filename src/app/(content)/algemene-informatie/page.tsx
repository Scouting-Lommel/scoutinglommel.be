import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { generateMetadataForPage } from '@/lib/helpers/generateMetadata';
import { generateFaqSchema } from '@/lib/helpers/generateStructuredData';
import Blocks from '@/content-blocks';
import { getGeneralData } from '../../api';
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

  const faqBlocks = blocks.filter(
    (b: any) => b.__typename === 'ComponentContentBlocksFaqBlock',
  );
  const allFaqItems = faqBlocks.flatMap((b: any) => b.faqItems ?? []);
  const faqSchema = allFaqItems.length ? generateFaqSchema(allFaqItems) : null;

  return (
    <>
      <Blocks content={blocks} />
      {faqSchema && faqSchema.mainEntity.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
        />
      )}
    </>
  );
};

export default InfoPage;
