import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { getSeoData } from '@/lib/api/general/api';
import { generateMetadataForPage } from '@/lib/helpers/generateMetadata';
import Blocks from '@/content-blocks';
import { getHomePage } from './api';

export const revalidate = 3600;

export const generateMetadata = async (): Promise<Metadata> => {
  const [seoData, homePage] = await Promise.all([getSeoData(), getHomePage()]);

  if (!homePage?.homePage || !seoData?.generalData) return {};

  const metadata = await generateMetadataForPage(
    homePage.homePage.pageMeta,
    seoData.generalData,
  );

  return { ...metadata };
};

const HomePage = async (): Promise<JSX.Element> => {
  const { homePage } = await getHomePage();

  if (!homePage) notFound();

  return (
    <>
      <Blocks content={homePage.blocks} />
    </>
  );
};

export default HomePage;
