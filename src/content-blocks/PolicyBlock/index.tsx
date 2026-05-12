import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import Policy from '@/components/organisms/Policy';
import { PolicyBlock as PolicyBlockProps } from './types';

const PolicyBlock = ({ policyTitle, policySections }: PolicyBlockProps): JSX.Element => {
  return (
    <>
      <BlockContainer variant="light" orientation="default" slug={policyTitle + 'Policy'}>
        <div className="sl-layout">
          <Policy sections={policySections} title={policyTitle} />
        </div>
      </BlockContainer>
    </>
  );
};

export default PolicyBlock;
