import { Button } from '@/components/atoms/Button/types';
import { CloudinaryImage } from '@/components/atoms/Image/types';
import { YearTheme } from '@/components/molecules/YearTheme/types';

export type HeroBlock = {
  heroTitle: string;
  heroSubtitle: string;
  heroVariant: 'default' | 'simple' | 'large';
  heroCta?: Button[];
  heroSocialsCta?: { title: string; socialItems: any[] };
  heroYearTheme?: YearTheme;
  heroBgImage?: CloudinaryImage;
} & React.HTMLAttributes<HTMLElement>;
