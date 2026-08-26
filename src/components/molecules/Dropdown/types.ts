import { MouseEventHandler } from 'react';
import { Button } from '@/components/atoms/Button/types';

export type DropdownNavItem = {
  name: string;
  description: string;
  slug: string;
};

export type DropdownItem = {
  label: string;
  page: string;
  link: string | null;
  description?: string;
  modTargetBlank?: boolean;
};

export type DropdownCta =
  | {
      title: string;
      intro: string;
      ctaLabel: string;
      ctaLink?: string;
      ctaOnClick?: MouseEventHandler<HTMLElement>;
    }
  | null
  | undefined;

export type Dropdown = {
  itemKey: number;
  path?: string;
  dropdownTitle?: string | null;
  dropdownButton?: Button;
  dropdownCta?: DropdownCta | null;
  dropdownItems?: DropdownItem[];
  groups?: DropdownNavItem[];
  rentalLocations?: DropdownNavItem[];
  toggleDropdown: Function;
} & React.HTMLAttributes<HTMLElement>;
