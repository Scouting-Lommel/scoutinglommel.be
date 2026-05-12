import { Paragraph } from '@/components/molecules/Paragraph/types';

export type PolicyBlock = {
  policyTitle: string;
  policySections: Paragraph[];
} & React.HTMLAttributes<HTMLElement>;
