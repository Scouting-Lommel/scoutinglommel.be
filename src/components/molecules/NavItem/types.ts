import { Button } from '@/components/atoms/Button/types';
import { DropdownCta, DropdownItem, DropdownNavItem } from '@/components/molecules/Dropdown/types';

export type NavItem = {
  itemKey: number;
  label: string;
  href?: string;
  dropdownItems?: DropdownItem[];
  dropdownCta?: DropdownCta | null;
  dropdownTitle?: string | null;
  dropdownButton?: Button;
  groups?: DropdownNavItem[];
  rentalLocations?: DropdownNavItem[];
  modButton?: boolean;
  modDropdown?: boolean;
} & React.HTMLAttributes<HTMLElement>;
