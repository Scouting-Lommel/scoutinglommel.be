import cn from 'classnames';
import type { JSX } from 'react';
import SLImage from '@/components/atoms/Image';
import CallToAction from '@/components/molecules/CallToAction';
import SocialsCta from '@/components/molecules/SocialsCta';
import { BlockContainer as BlockContainerProps } from './types';
import './BlockContainer.css';


const BlockContainer = ({
  variant = 'light',
  orientation = 'default',
  slug,
  cta,
  socialsCta,
  bgImage,
  bgImagePriority,
  bgImageSizes,
  modSmallPadding,
  modNoPadding,
  modMargin,
  children,
  ...props
}: BlockContainerProps): JSX.Element => {
  const blockContainerClassNames = cn(
    'block-container',
    `block-container--${variant}`,
    `block-container--${orientation}`,
    modSmallPadding && 'block-container--small-padding',
    modNoPadding && 'block-container--no-padding',
    modMargin && 'block-container--has-margin',
  );

  const bgClassnames = cn(
    'block-container__bg-image',
    bgImage && `block-container__bg-image--opaque`,
  );

  const ctaClassnames = cn(
    'block-container__cta',
    socialsCta && 'block-container__cta--bottom',
    !socialsCta && 'block-container__cta--top',
  );

  return (
    <section {...props} id={slug} className={blockContainerClassNames}>
      <div className={bgClassnames}>
        {bgImage && (
          <div className="block-container__bg-image__img">
            <SLImage data={bgImage} priority={bgImagePriority} sizes={bgImageSizes} />
          </div>
        )}
      </div>
      <div className="block-container__content">{children}</div>
      {cta && (
        <CallToAction
          title={cta.title}
          intro={cta.intro}
          ctaLabel={cta.ctaLabel}
          ctaLink={cta.ctaLink}
          className={ctaClassnames}
        />
      )}
      {socialsCta && (
        <SocialsCta
          title={socialsCta.title}
          socialItems={socialsCta.socialItems}
          className={ctaClassnames}
        />
      )}
    </section>
  );
};

export default BlockContainer;
