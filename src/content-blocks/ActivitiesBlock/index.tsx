import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import Activities from '@/components/organisms/Activities';
import { ActivityBlock as ActivityBlockProps } from './types';

const ActivitiesBlock = ({
  title,
  initialItems,
  callToAction,
  blockProperties,
  groupSlug,
}: ActivityBlockProps): JSX.Element => {
  return (
    <>
      <BlockContainer
        variant={blockProperties.variant}
        orientation={blockProperties.orientation}
        slug={blockProperties.slug}
        cta={callToAction}
      >
        <section className="sl-layout">
          <h2 className="t-headline-2 t-align-center">{title}</h2>
          <Activities variant="activities" groupSlug={groupSlug} initialItems={initialItems} />
        </section>
      </BlockContainer>
    </>
  );
};

export default ActivitiesBlock;
