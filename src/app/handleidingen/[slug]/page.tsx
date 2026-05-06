import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { getTranslations } from 'next-intl/server';
import type { JSX } from 'react';
import { formatDateTime } from '@/lib/helpers/dateTime';
import { generateMetadataForPage } from '@/lib/helpers/generateMetadata';
import BlockContainer from '@/components/atoms/BlockContainer';
import Typography from '@/components/atoms/Typography';
import Hero from '@/components/organisms/Hero';
import { getManualPage } from './api';
import { getGeneralData } from '../../api';

type Props = { params: Promise<{ slug: string }> };

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { slug } = await props.params;

  const { generalData } = await getGeneralData();
  const { manuals } = await getManualPage(slug);
  const manual = manuals[0];

  if (!manual || !generalData) return {};

  const metadata = await generateMetadataForPage(
    manual.pageMeta,
    generalData,
    'handleidingen',
  );

  return { ...metadata };
};

const ManualPage = async (props: Props): Promise<JSX.Element> => {
  const { slug } = await props.params;

  const session = await getServerSession();

  const { manuals } = await getManualPage(slug);
  const manual = manuals[0];

  const t = await getTranslations('common');

  if (!manual) notFound();

  if (!(session && session.user) && manual.locked) {
    const callbackUrl = `/handleidingen/${manual.slug}`;
    redirect(`/inloggen?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  return (
    <article className="sl-layout--narrow">
      <BlockContainer slug={`${manual?.slug}-hero`}>
        <Hero
          variant="simple"
          title={manual?.title}
          subtitle={manual?.description}
        />
      </BlockContainer>

      <BlockContainer slug={`${manual?.slug}-body`} modSmallPadding>
        <Typography data={manual?.body} />
      </BlockContainer>

      <BlockContainer slug={`${manual?.slug}-footer`} modSmallPadding>
        <Typography
          variant="muted"
          data={`${t('lastChanged')}: ${formatDateTime(manual?.updatedAt)}`}
        />
      </BlockContainer>
    </article>
  );
};

export default ManualPage;
