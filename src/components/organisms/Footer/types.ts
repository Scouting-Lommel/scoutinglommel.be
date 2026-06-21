import { FooterNavigation } from '@/components/molecules/FooterDoormat/types';

type Link = {
  label: string;
  link: string;
};

export type Footer = {
  siteName: string;
  vatNumber: string;
  groupNumber: string;
  address: string;
  contactItems: Link[];
  footerNavigation?: FooterNavigation[];
} & React.HTMLAttributes<HTMLElement>;
