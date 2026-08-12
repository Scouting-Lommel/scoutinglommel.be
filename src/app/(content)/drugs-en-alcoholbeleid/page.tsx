import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { generateMetadataForPage } from '@/lib/helpers/generateMetadata';
import Blocks from '@/content-blocks';
import { getDAPage } from './api';
import { getGeneralData } from '../../api';

export const revalidate = 3600;

export const generateMetadata = async (): Promise<Metadata> => {
  const { generalData } = await getGeneralData();
  const { drugsAlcoholPolicyPage } = await getDAPage();
  if (!drugsAlcoholPolicyPage || !generalData) return {};

  const metadata = await generateMetadataForPage(
    drugsAlcoholPolicyPage.pageMeta,
    generalData,
    drugsAlcoholPolicyPage.slug,
  );

  return { ...metadata };
};

const DrugsAndAlcoholPage = async (): Promise<JSX.Element> => {
  const { drugsAlcoholPolicyPage } = await getDAPage();

  if (!drugsAlcoholPolicyPage) notFound();

  return (
    <>
      <Blocks content={drugsAlcoholPolicyPage.blocks} />
    </>
  );
};

export default DrugsAndAlcoholPage;
