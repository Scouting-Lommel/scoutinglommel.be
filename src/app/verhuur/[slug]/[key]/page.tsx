import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateMetadataForPage } from '@/lib/helpers/generateMetadata';
import CalendarRevalidator from '@/components/molecules/CalendarRevalidator';
import { getGeneralData } from '../../../api';
import { getRentalLocationPage } from '../api';

type Props = { params: Promise<{ slug: string; key: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;

  const { generalData } = await getGeneralData();
  const { rentalLocations } = await getRentalLocationPage(slug);
  const rentalLocation = rentalLocations[0];

  if (!rentalLocation || !generalData) return {};

  const metadata = await generateMetadataForPage(
    rentalLocation.pageMeta,
    generalData,
  );

  return { ...metadata };
}

const RentalLocationPage = async (props: { params: Promise<{ slug: string; key: string }> }) => {
  const params = await props.params;

  const { slug, key } = params;

  if (slug !== 'settings' || key !== 'revalidate') notFound();

  return (
    <>
      <CalendarRevalidator />
    </>
  );
};

export default RentalLocationPage;
