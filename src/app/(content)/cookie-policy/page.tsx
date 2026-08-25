import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { generateMetadataForPage } from '@/lib/helpers/generateMetadata';
import Blocks from '@/content-blocks';
import { getCookiePage } from './api';
import { getGeneralData } from '../../api';

export const generateMetadata = async (): Promise<Metadata> => {
  const { generalData } = await getGeneralData();
  const { cookiePolicyPage } = await getCookiePage();
  if (!cookiePolicyPage || !generalData) return {};

  const metadata = await generateMetadataForPage(
    cookiePolicyPage.pageMeta,
    generalData,
    cookiePolicyPage.slug,
  );

  return { ...metadata };
};

const CookiePolicyPage = async (): Promise<JSX.Element> => {
  const { cookiePolicyPage } = await getCookiePage();

  if (!cookiePolicyPage) notFound();

  return (
    <>
      <Blocks content={cookiePolicyPage.blocks} />
    </>
  );
};

export default CookiePolicyPage;
