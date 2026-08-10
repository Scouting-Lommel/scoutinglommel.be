import { FaqItem } from '@/components/molecules/FaqItem/types';

export type FAQ = {
  title: String;
  bottomText?: string;
  faqItems: FaqItem[];
} & React.HTMLAttributes<HTMLElement>;
