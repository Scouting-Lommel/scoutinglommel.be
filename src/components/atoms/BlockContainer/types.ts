import { CloudinaryImage } from '@/components/atoms/Image/types';
import { CallToAction } from '@/components/molecules/CallToAction/types';
import { SocialsCta } from '@/components/molecules/SocialsCta/types';

export type BlockContainer = {
  variant?: 'light' | 'dark';
  orientation?: 'default' | 'reversed';
  slug: string;
  cta?: CallToAction;
  socialsCta?: SocialsCta;
  bgImage?: CloudinaryImage;
  bgImagePriority?: boolean;
  bgImageSizes?: string;
  modSmallPadding?: boolean;
  modNoPadding?: boolean;
  modMargin?: boolean;
} & React.HTMLAttributes<HTMLElement>;
