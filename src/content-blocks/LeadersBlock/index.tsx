import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import Leaders from '@/components/organisms/Leaders';
import { LeadersBLock as LeadersBlockProps } from './types';

const LeadersBlock = ({ title, leaders, cta, blockProperties }: LeadersBlockProps): JSX.Element => {
  return (
    <BlockContainer
      variant={blockProperties?.variant}
      orientation={blockProperties?.orientation}
      slug={blockProperties?.slug}
      cta={cta}
    >
      <div className="sl-layout">
        <h2 className="t-headline-2 t-align-center">{title}</h2>
        <Leaders leaders={leaders} />
      </div>
    </BlockContainer>
  );
};

export default LeadersBlock;
