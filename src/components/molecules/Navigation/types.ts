import { Button } from '@/components/atoms/Button/types';
import { DropdownNavItem, DropdownItem, DropdownCta } from '@/components/molecules/Dropdown/types';

export type NavItem = {
  label: string;
  link: string | null;
  page: string;
  dropdownItems: DropdownItem[];
  dropdownCta: DropdownCta | null;
  dropdownTitle: string | null;
  dropdownButton?: Button;
};

export type Navigation = {
  navItems?: NavItem[];
  groups: DropdownNavItem[];
  rentalLocations: DropdownNavItem[];
} & React.HTMLAttributes<HTMLElement>;
