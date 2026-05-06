import { Metadata } from 'next';
import { notFound, ReadonlyURLSearchParams } from 'next/navigation';
import type { JSX } from 'react';
import { generateMetadataForPage } from '@/lib/helpers/generateMetadata';
import Blocks from '@/content-blocks';
import Form from '@/components/organisms/Forms';
import { getGeneralData } from '../api';
import { getContactPage } from './api';

type Props = {
  searchParams: Promise<ReadonlyURLSearchParams>;
};

export const generateMetadata = async (): Promise<Metadata> => {
  const { generalData } = await getGeneralData();
  const { contactPage } = await getContactPage();
  if (!contactPage || !generalData) return {};

  const metadata = await generateMetadataForPage(
    contactPage.pageMeta,
    generalData,
  );

  return { ...metadata };
};

const ContactPage = async (props: Props): Promise<JSX.Element> => {
  const searchParams = await props.searchParams;
  const { contactPage } = await getContactPage();

  if (!contactPage) notFound();

  return (
    <>
      <Blocks content={contactPage.blocks} />
      <Form variant="contact" blockProperties={{ slug: 'contact-form' }} props={searchParams} />
    </>
  );
};

export default ContactPage;
