import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { generateMetadataForPage } from '@/lib/helpers/generateMetadata';
import Blocks from '@/content-blocks';
import { getGeneralData } from '../api';
import { getPrivacyPage } from './api';

export const revalidate = 3600;

export const generateMetadata = async (): Promise<Metadata> => {
  const { generalData } = await getGeneralData();
  const { privacyPolicyPage } = await getPrivacyPage();
  if (!privacyPolicyPage || !generalData) return {};

  const metadata = await generateMetadataForPage(
    privacyPolicyPage.data.attributes.pageMeta,
    generalData.data.attributes,
  );

  return { ...metadata };
};

const PrivacyPolicyPage = async (): Promise<JSX.Element> => {
  const { privacyPolicyPage } = await getPrivacyPage();

  if (!privacyPolicyPage) notFound();

  return (
    <>
      <Blocks content={privacyPolicyPage.data.attributes.blocks} />
    </>
  );
};

export default PrivacyPolicyPage;
