import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import GoogleMap from '@/components/atoms/Map';
import { MapBlock as MapBlockProps } from './types';

const MapsBlock = ({ mapTitle, query, mapLocation, mapBlockProperties }: MapBlockProps): JSX.Element => {
  return (
    <BlockContainer
      variant={mapBlockProperties?.variant}
      orientation={mapBlockProperties?.orientation}
      slug={mapBlockProperties?.slug}
    >
      <h2 className="t-headline-2 t-align-center">{mapTitle}</h2>
      <GoogleMap
        lng={mapLocation?.coordinates?.lng}
        lat={mapLocation?.coordinates?.lat}
        query={query}
        address={mapLocation?.address}
        className="sl-layout"
      />
    </BlockContainer>
  );
};

export default MapsBlock;
