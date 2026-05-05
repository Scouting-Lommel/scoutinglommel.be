import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { generateMetadataForPage } from '@/lib/helpers/generateMetadata';
import Blocks from '@/content-blocks';
import Form from '@/components/organisms/Forms';
import { getGeneralData } from '../api';
import { getRegisterPage, getGeneralDataForRegisterPage } from './api';

export const revalidate = 3600;

export const generateMetadata = async (): Promise<Metadata> => {
  const { generalData } = await getGeneralData();
  const { registerPage } = await getRegisterPage();
  if (!registerPage || !generalData) return {};

  const metadata = await generateMetadataForPage(
    registerPage.data.attributes.pageMeta,
    generalData.data.attributes,
  );

  return { ...metadata };
};

const RegisterPage = async (): Promise<JSX.Element> => {
  const { registerPage } = await getRegisterPage();
  const { generalData } = await getGeneralDataForRegisterPage();

  if (!registerPage) notFound();

  return (
    <>
      <Blocks content={registerPage.data.attributes.blocks} />
      <Form
        variant="register"
        blockProperties={{ slug: 'register-form' }}
        props={generalData.data.attributes}
      />
    </>
  );
};

export default RegisterPage;
