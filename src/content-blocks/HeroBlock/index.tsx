import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import { SocialsCta } from '@/components/molecules/SocialsCta/types';
import Hero from '@/components/organisms/Hero';
import { HeroBlock as HeroBlockProps } from './types';

const HeroBlock = ({
  title,
  subtitle,
  variant,
  callToAction,
  socialsCta,
  yearTheme,
  bgImage,
}: HeroBlockProps): JSX.Element => {
  const socialsCallToAction: SocialsCta = {
    title: socialsCta?.title || '',
    socialItems: socialsCta?.socialItems.data.map((item: any) => {
      return item.attributes;
    }),
  };

  return (
    <BlockContainer
      bgImage={bgImage?.data?.attributes}
      bgImagePriority
      socialsCta={socialsCta && socialsCallToAction}
      variant={variant === 'simple' ? 'light' : 'dark'}
      orientation="default"
      slug="hero"
      modSmallPadding={variant === 'simple'}
    >
      <Hero
        title={title}
        subtitle={subtitle}
        variant={variant}
        callToAction={callToAction}
        yearTheme={yearTheme?.data?.attributes}
        className="sl-layout"
      />
    </BlockContainer>
  );
};

export default HeroBlock;
