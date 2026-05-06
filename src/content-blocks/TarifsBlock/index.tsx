import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import Tarifs from '@/components/organisms/Tarifs';
import { TarifsBlock as TarifsBlockProps } from './types';

const TarifsBlock = ({ title, tarifs, cta, blockProperties }: TarifsBlockProps): JSX.Element => {
  return (
    <BlockContainer
      variant={blockProperties.variant}
      orientation={blockProperties.orientation}
      slug={blockProperties.slug}
    >
      <div className="sl-layout">
        <h2 className="t-headline-2 t-align-center">{title}</h2>
        <Tarifs tarifs={tarifs} cta={cta} />
      </div>
    </BlockContainer>
  );
};

export default TarifsBlock;
