import cn from 'classnames';
import type { JSX } from 'react';
import { EmbeddedMapProps as MapProps } from './types';
import './Map.css';

const fallbackQuery = 'Scouting Lommel';

const GoogleMap = ({ lat, lng, query, zoom = 17, address, className }: MapProps): JSX.Element => {
  const url = query
    ? `https://www.google.com/maps/embed/v1/place?q=${query}&zoom=${zoom}&key=${process.env.MAPS_API_KEY}`
    : lat && lng
      ? `https://www.google.com/maps/embed/v1/place?q=${lat},${lng}&zoom=${zoom}&key=${process.env.MAPS_API_KEY}`
      : `https://www.google.com/maps/embed/v1/place?q=${fallbackQuery}&zoom=${zoom}&key=${process.env.MAPS_API_KEY}`;

  return (
    <div className={cn('map__container', className)}>
      <div className="map__inner">
        <iframe className="map" id="gmap_canvas" loading="lazy" scrolling="no" src={url}></iframe>
        {address && <div className="map__address">{address}</div>}
      </div>
    </div>
  );
};

export default GoogleMap;
