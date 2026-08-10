import { Paragraph } from '@/components/molecules/Paragraph/types';

export type PolicyBlock = {
  title: string;
  policySections: Paragraph[];
} & React.HTMLAttributes<HTMLElement>;
