export type Breadcrumb = {
  label: string;
  href?: string;
};

export type Breadcrumbs = {
  items: Breadcrumb[];
} & React.HTMLAttributes<HTMLElement>;

export type AutoBreadcrumbs = {
  is404?: boolean;
  modStandalone?: boolean;
} & React.HTMLAttributes<HTMLElement>;
