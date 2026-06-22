import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CalendarRevalidator from '@/components/molecules/CalendarRevalidator';

type Props = { params: Promise<{ slug: string; key: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return {
    robots: {
      index: false,
      follow: false,
    },
  };
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
