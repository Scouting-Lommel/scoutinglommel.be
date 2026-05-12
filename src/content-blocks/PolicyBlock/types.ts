import { Paragraph } from '@/components/molecules/Paragraph/types';

export type PolicyBlock = {
  title: string;
  sections: Paragraph[];
} & React.HTMLAttributes<HTMLElement>;
