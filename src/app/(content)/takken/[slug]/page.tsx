import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { generateMetadataForPage } from '@/lib/helpers/generateMetadata';
import Blocks from '@/content-blocks';
import type { GetGroupPageQuery } from '@/types/generated/Graphql';
import { getGroupPage } from './api';
import { getGeneralData } from '../../../api';

type Props = { params: Promise<{ slug: string }> };

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { slug } = await props.params;

  const { generalData } = await getGeneralData();
  const { groups } = await getGroupPage(slug);
  const group = groups?.[0];

  if (!group || !generalData) return {};

  const metadata = await generateMetadataForPage(group.pageMeta, generalData, `takken/${slug}`);

  return { ...metadata };
};

const GroupPage = async (props: Props): Promise<JSX.Element> => {
  const { slug } = await props.params;

  const { groups } = await getGroupPage(slug);
  const group = groups?.[0];

  if (!group) notFound();

  type Group = NonNullable<GetGroupPageQuery['groups'][number]>;

  type MutableBlock = {
    __typename: string;
    groupSlug?: string;
    leaders?: Group['leaders'];
  } & Record<string, unknown>;

  (group.blocks as MutableBlock[] | undefined)?.forEach((block) => {
    switch (block.__typename) {
      case 'ComponentContentBlocksFilesBlock':
      case 'ComponentContentBlocksActivitiesBlock':
        block.groupSlug = group.slug ?? '';
        break;
      case 'ComponentContentBlocksLeadersBlock':
        block.leaders = group.leaders;
        break;
    }
  });

  return (
    <>
      <Blocks content={group.blocks as MutableBlock[] | null | undefined} />
    </>
  );
};

export default GroupPage;
