import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { generateMetadataForPage } from '@/lib/helpers/generateMetadata';
import Blocks from '@/content-blocks';
import { getPrivacyPage } from './api';
import { getGeneralData } from '../../api';

export const generateMetadata = async (): Promise<Metadata> => {
  const { generalData } = await getGeneralData();
  const { privacyPolicyPage } = await getPrivacyPage();
  if (!privacyPolicyPage || !generalData) return {};

  const metadata = await generateMetadataForPage(
    privacyPolicyPage.pageMeta,
    generalData,
    privacyPolicyPage.slug,
  );

  return { ...metadata };
};

const PrivacyPolicyPage = async (): Promise<JSX.Element> => {
  const { privacyPolicyPage } = await getPrivacyPage();

  if (!privacyPolicyPage) notFound();

  return (
    <>
      <Blocks content={privacyPolicyPage.blocks} />
    </>
  );
};

export default PrivacyPolicyPage;
