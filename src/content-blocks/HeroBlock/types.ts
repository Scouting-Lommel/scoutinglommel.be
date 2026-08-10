import { Button } from '@/components/atoms/Button/types';
import { CloudinaryImage } from '@/components/atoms/Image/types';
import { SocialsCta } from '@/components/molecules/SocialsCta/types';
import { YearTheme } from '@/components/molecules/YearTheme/types';

export type HeroBlock = {
  title: string;
  subtitle: string;
  variant: 'default' | 'simple' | 'large';
  callToAction?: Button[];
  socialsCta?: SocialsCta;
  yearTheme?: YearTheme;
  bgImage?: CloudinaryImage;
} & React.HTMLAttributes<HTMLElement>;
