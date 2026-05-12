import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import Tarifs from '@/components/organisms/Tarifs';
import { TarifsBlock as TarifsBlockProps } from './types';

const TarifsBlock = ({ tarifsTitle, tarifsItems, cta, tarifsBlockProperties }: TarifsBlockProps): JSX.Element => {
  return (
    <BlockContainer
      variant={tarifsBlockProperties.variant}
      orientation={tarifsBlockProperties.orientation}
      slug={tarifsBlockProperties.slug}
    >
      <div className="sl-layout">
        <h2 className="t-headline-2 t-align-center">{tarifsTitle}</h2>
        <Tarifs tarifs={tarifsItems} cta={cta} />
      </div>
    </BlockContainer>
  );
};

export default TarifsBlock;
