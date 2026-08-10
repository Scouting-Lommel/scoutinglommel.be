import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import Policy from '@/components/organisms/Policy';
import { PolicyBlock as PolicyBlockProps } from './types';

const PolicyBlock = ({ title, policySections }: PolicyBlockProps): JSX.Element => {
  return (
    <>
      <BlockContainer variant="light" orientation="default" slug={title + 'Policy'}>
        <div className="sl-layout">
          <Policy sections={policySections} title={title} />
        </div>
      </BlockContainer>
    </>
  );
};

export default PolicyBlock;
