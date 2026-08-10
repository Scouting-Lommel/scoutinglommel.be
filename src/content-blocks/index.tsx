import dynamic from 'next/dynamic';
import { ComponentType, type JSX } from 'react';
import AutoBreadcrumbs from '@/components/molecules/Breadcrumbs';

type BlockContent = {
  __typename: string;
  [key: string]: unknown;
};

type BlockList = {
  [key: string]: ComponentType<BlockContent>;
};

const blockList: BlockList = {
  ComponentContentBlocksHeroBlock: dynamic(
    () => import('./HeroBlock') as unknown as Promise<{ default: ComponentType<BlockContent> }>,
  ),
  ComponentContentBlocksTextImageBlock: dynamic(
    () =>
      import('./TextImageBlock') as unknown as Promise<{ default: ComponentType<BlockContent> }>,
  ),
  ComponentContentBlocksGroupsBlock: dynamic(
    () => import('./GroupsBlock') as unknown as Promise<{ default: ComponentType<BlockContent> }>,
  ),
  ComponentContentBlocksEventsBlock: dynamic(
    () => import('./EventsBlock') as unknown as Promise<{ default: ComponentType<BlockContent> }>,
  ),
  ComponentContentBlocksGalleryBlock: dynamic(
    () => import('./GalleryBlock') as unknown as Promise<{ default: ComponentType<BlockContent> }>,
  ),
  ComponentContentBlocksPolicyBlock: dynamic(
    () => import('./PolicyBlock') as unknown as Promise<{ default: ComponentType<BlockContent> }>,
  ),
  ComponentContentBlocksLeadersBlock: dynamic(
    () => import('./LeadersBlock') as unknown as Promise<{ default: ComponentType<BlockContent> }>,
  ),
  ComponentContentBlocksTarifsBlock: dynamic(
    () => import('./TarifsBlock') as unknown as Promise<{ default: ComponentType<BlockContent> }>,
  ),
  ComponentContentBlocksFilesBlock: dynamic(
    () => import('./FilesBlock') as unknown as Promise<{ default: ComponentType<BlockContent> }>,
  ),
  ComponentContentBlocksFaqBlock: dynamic(
    () => import('./FaqBlock') as unknown as Promise<{ default: ComponentType<BlockContent> }>,
  ),
  ComponentContentBlocksMapBlock: dynamic(
    () => import('./MapsBlock') as unknown as Promise<{ default: ComponentType<BlockContent> }>,
  ),
  ComponentContentBlocksActivitiesBlock: dynamic(
    () =>
      import('./ActivitiesBlock') as unknown as Promise<{ default: ComponentType<BlockContent> }>,
  ),
  ComponentContentBlocksCalendarBlock: dynamic(
    () => import('./CalendarBlock') as unknown as Promise<{ default: ComponentType<BlockContent> }>,
  ),
  ComponentContentBlocksYearThemeBlock: dynamic(
    () =>
      import('./YearThemeBlock') as unknown as Promise<{ default: ComponentType<BlockContent> }>,
  ),
  ComponentContentBlocksDivider: dynamic(
    () => import('./Divider') as unknown as Promise<{ default: ComponentType<BlockContent> }>,
  ),
};

const Blocks = ({
  content,
}: {
  content: Array<BlockContent | null> | null | undefined;
}): JSX.Element => {
  if (!content || !content.length) return <></>;

  const validBlocks = content.filter((block): block is BlockContent => block !== null);

  const hasHeroBlock = validBlocks.some(
    (block) => block.__typename === 'ComponentContentBlocksHeroBlock',
  );

  const contentBlocks = validBlocks.map((block) => {
    const key = block.__typename;

    if (!(key in blockList)) {
      console.warn(`Missing component for: '${key}', you should create one first.`);
      return false;
    }

    return blockList[key];
  });

  return (
    <>
      {!hasHeroBlock && <AutoBreadcrumbs modStandalone />}

      {contentBlocks.map((Component, i) => {
        return Component ? <Component key={i} {...validBlocks[i]} /> : false;
      })}
    </>
  );
};

export default Blocks;
