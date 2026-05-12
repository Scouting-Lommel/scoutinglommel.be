import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import Leaders from '@/components/organisms/Leaders';
import { LeadersBLock as LeadersBlockProps } from './types';

const LeadersBlock = ({ leadersTitle, leaders, cta, leadersBlockProperties }: LeadersBlockProps): JSX.Element => {
  return (
    <BlockContainer
      variant={leadersBlockProperties.variant}
      orientation={leadersBlockProperties.orientation}
      slug={leadersBlockProperties.slug}
      cta={cta}
    >
      <div className="sl-layout">
        <h2 className="t-headline-2 t-align-center">{leadersTitle}</h2>
        <Leaders leaders={leaders} />
      </div>
    </BlockContainer>
  );
};

export default LeadersBlock;
