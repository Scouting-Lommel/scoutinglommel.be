import { Button } from '@/components/atoms/Button/types';
import { CloudinaryImage } from '@/components/atoms/Image/types';
import { YearTheme } from '@/components/molecules/YearTheme/types';

export type HeroBlock = {
  title: string;
  subtitle: string;
  variant: 'default' | 'simple' | 'large';
  callToAction?: Button[];
  socialsCta?: { title: string; socialItems: any[] };
  yearTheme?: YearTheme;
  bgImage?: CloudinaryImage;
} & React.HTMLAttributes<HTMLElement>;
