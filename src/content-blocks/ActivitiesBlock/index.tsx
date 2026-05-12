import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import Activities from '@/components/organisms/Activities';
import { ActivityBlock as ActivityBlockProps } from './types';

const ActivitiesBlock = ({
  activitiesTitle,
  activitiesInitialItems,
  callToAction,
  activitiesBlockProperties,
  groupSlug,
}: ActivityBlockProps): JSX.Element => {
  return (
    <>
      <BlockContainer
        variant={activitiesBlockProperties.variant}
        orientation={activitiesBlockProperties.orientation}
        slug={activitiesBlockProperties.slug}
        cta={callToAction}
      >
        <section className="sl-layout">
          <h2 className="t-headline-2 t-align-center">{activitiesTitle}</h2>
          <Activities variant="activities" groupSlug={groupSlug} initialItems={activitiesInitialItems} />
        </section>
      </BlockContainer>
    </>
  );
};

export default ActivitiesBlock;
