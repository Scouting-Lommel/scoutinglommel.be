import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { generateMetadataForPage } from '@/lib/helpers/generateMetadata';
import Blocks from '@/content-blocks';
import { getGeneralData } from '../api';
import { getRentalPage } from './api';

export const revalidate = 3600;

export const generateMetadata = async (): Promise<Metadata> => {
  const { generalData } = await getGeneralData();
  const { rentalPage } = await getRentalPage();
  if (!rentalPage || !generalData) return {};

  const metadata = await generateMetadataForPage(
    rentalPage.data.attributes.pageMeta,
    generalData.data.attributes,
  );

  return { ...metadata };
};

const RentalPage = async (): Promise<JSX.Element> => {
  const { rentalPage } = await getRentalPage();

  if (!rentalPage) notFound();

  return (
    <>
      <Blocks content={rentalPage.data.attributes.blocks} />
    </>
  );
};

export default RentalPage;
