import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import { SocialsCta } from '@/components/molecules/SocialsCta/types';
import Hero from '@/components/organisms/Hero';
import { HeroBlock as HeroBlockProps } from './types';

const HeroBlock = ({
  heroTitle,
  heroSubtitle,
  heroVariant,
  heroCta,
  heroSocialsCta,
  heroYearTheme,
  heroBgImage,
}: HeroBlockProps): JSX.Element => {
  const socialsCallToAction: SocialsCta = {
    title: heroSocialsCta?.title || '',
    socialItems: heroSocialsCta?.socialItems || [],
  };

  return (
    <BlockContainer
      bgImage={heroBgImage}
      bgImagePriority
      bgImageSizes="100vw"
      socialsCta={heroSocialsCta && socialsCallToAction}
      variant={heroVariant === 'simple' ? 'light' : 'dark'}
      orientation="default"
      slug="hero"
      modSmallPadding={heroVariant === 'simple'}
    >
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        variant={heroVariant}
        callToAction={heroCta}
        yearTheme={heroYearTheme}
        className="sl-layout"
      />
    </BlockContainer>
  );
};

export default HeroBlock;
