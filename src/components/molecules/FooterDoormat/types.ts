type Link = {
  label: string;
  link: string;
};

export type FooterNavigation = {
  title: string;
  navItems: Link[];
};

export type DoormatCol = {
  title: string;
  address?: string;
  links?: Link[];
} & React.HTMLAttributes<HTMLElement>;

export type FooterDoormat = {
  address: string;
  contactItems: Link[];
  footerNavigation?: FooterNavigation[];
} & React.HTMLAttributes<HTMLElement>;
