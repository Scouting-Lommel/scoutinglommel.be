import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import GoogleMap from '@/components/atoms/Map';
import { MapBlock as MapBlockProps } from './types';

const MapsBlock = ({ title, query, location, blockProperties }: MapBlockProps): JSX.Element => {
  return (
    <BlockContainer
      variant={blockProperties?.variant}
      orientation={blockProperties?.orientation}
      slug={blockProperties?.slug}
    >
      <h2 className="t-headline-2 t-align-center">{title}</h2>
      <GoogleMap
        lng={location?.coordinates?.lng}
        lat={location?.coordinates?.lat}
        query={query}
        address={location?.address}
        className="sl-layout"
      />
    </BlockContainer>
  );
};

export default MapsBlock;
