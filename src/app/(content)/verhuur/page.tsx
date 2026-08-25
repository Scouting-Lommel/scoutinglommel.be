import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { generateMetadataForPage } from '@/lib/helpers/generateMetadata';
import Blocks from '@/content-blocks';
import { getRentalPage } from './api';
import { getGeneralData } from '../../api';

export const generateMetadata = async (): Promise<Metadata> => {
  const { generalData } = await getGeneralData();
  const { rentalPage } = await getRentalPage();
  if (!rentalPage || !generalData) return {};

  const metadata = await generateMetadataForPage(rentalPage.pageMeta, generalData, rentalPage.slug);

  return { ...metadata };
};

const RentalPage = async (): Promise<JSX.Element> => {
  const { rentalPage } = await getRentalPage();

  if (!rentalPage) notFound();

  return (
    <>
      <Blocks content={rentalPage.blocks} />
    </>
  );
};

export default RentalPage;
