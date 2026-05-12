import { BlockContainer } from '@/components/atoms/BlockContainer/types';
import { CallToAction } from '@/components/molecules/CallToAction/types';
import { YearTheme } from '@/components/molecules/YearTheme/types';

export type YearThemeBlock = {
  title: string;
  blockProperties: BlockContainer;
  yearTheme: YearTheme;
  cta: CallToAction;
} & React.HTMLAttributes<HTMLElement>;
