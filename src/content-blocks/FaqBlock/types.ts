import { BlockContainer } from '@/components/atoms/BlockContainer/types';
import { FaqItem } from '@/components/molecules/FaqItem/types';

export type FaqBlock = {
  faqTitle: string;
  faqBottomText?: string;
  faqItems: FaqItem[];
  faqBlockProperties: BlockContainer;
} & React.HTMLAttributes<HTMLElement>;
