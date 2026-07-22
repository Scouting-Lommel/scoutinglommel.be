'use client';

import { useTranslations } from 'next-intl';
import { useState, type JSX } from 'react';
import Button from '@/components/atoms/Button';
import SLImage from '@/components/atoms/Image';
import { Gallery as GalleryProps } from './types';
import './Gallery.css';

const Gallery = ({ title, initialItems, images }: GalleryProps): JSX.Element => {
  const [isOpen, setOpen] = useState(false);
  const t = useTranslations('common.gallery');

  return (
    <div>
      <h2 className="t-headline-2 t-align-center">{title}</h2>
      <div className="gallery__imagecontainer">
        {[...Array(isOpen ? images.length : initialItems)].map((_, i) => {
          if (images.length > i) {
            return (
              <div key={i}>
                <SLImage
                  data={images[i]}
                  loadingStrategy="lazy"
                  className="gallery__image"
                  modMaximisable
                />
              </div>
            );
          }
          return <div key={i}></div>;
        })}
      </div>
      <div className="gallery__button">
        <Button
          label={isOpen ? t('viewLess') : t('viewAll')}
          onClick={() => {
            setOpen(!isOpen);
          }}
        />
      </div>
    </div>
  );
};

export default Gallery;
