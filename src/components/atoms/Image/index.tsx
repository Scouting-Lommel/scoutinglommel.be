'use client';

import cn from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRef, useState, type JSX } from 'react';
import { Lightbox } from 'react-modal-image';
import { generateImageUrl } from '@/lib/helpers/image';
import { Image as ImageProps } from './types';
import './Image.css';


const SLImage = ({
  data,
  loadingStrategy = 'lazy',
  priority = false,
  sizes,
  modMaximisable,
  modWithShadow,
  modRounded,
  modWithCaption,
  className,
}: ImageProps): JSX.Element => {
  const t = useTranslations('common');
  const imageRef = useRef<HTMLImageElement>(null);
  const [imgModalActive, setImgModalActive] = useState<boolean>(false);

  const imageWrapperClassNames = cn('image__wrapper', className);

  const imageClassNames = cn(
    'image',
    modMaximisable && 'image--maximisable',
    modWithShadow && 'image--with-shadow',
    modRounded && 'image--rounded',
  );

  if (!data?.url) {
    return <>{t('imageNotFound')}</>;
  }

  if (data.ext === '.svg') {
    return (
      <figure className={imageWrapperClassNames}>
        <div className={imageClassNames}>
          <img
            ref={imageRef}
            className="image__img"
            alt={data?.alternativeText || undefined}
            src={data?.url}
            loading={loadingStrategy}
          />
        </div>
        {modWithCaption && data.caption && (
          <figcaption className="image__caption">{data.caption}</figcaption>
        )}
      </figure>
    );
  }

  const { width, height } = data;
  const hasDimensions = width && height;

  return (
    <>
      <figure className={imageWrapperClassNames}>
        <div
          className={imageClassNames}
          style={hasDimensions ? { aspectRatio: `${width}/${height}` } : undefined}
          onClick={() => {
            if (modMaximisable) setImgModalActive(true);
          }}
        >
          <Image
            ref={imageRef}
            className={cn(
              'image__img',
              hasDimensions && width > height ? 'image__img--landscape' : 'image__img--portrait',
            )}
            style={hasDimensions ? { aspectRatio: `${width}/${height}` } : undefined}
            alt={data?.alternativeText || ''}
            width={width ?? 800}
            height={height ?? 600}
            src={generateImageUrl(data?.hash)}
            {...(hasDimensions
              ? {
                placeholder: 'blur',
                blurDataURL: `data:image/svg+xml;base64,${btoa(
                  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#f2f2f2"/></svg>`,
                )}`,
              }
              : {})}
            sizes={sizes}
            {...(priority ? { priority: true } : { loading: loadingStrategy })}
          />
        </div>

        {modWithCaption && data.caption && (
          <figcaption className="image__caption">{data.caption}</figcaption>
        )}
      </figure>

      {modMaximisable && imgModalActive && (
        <Lightbox
          large={generateImageUrl(data?.hash)}
          alt={data?.alternativeText || undefined}
          onClose={() => setImgModalActive(false)}
        />
      )}
    </>
  );
};

export default SLImage;
