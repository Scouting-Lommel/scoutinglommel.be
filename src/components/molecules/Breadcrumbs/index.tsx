'use client';
import { usePathname } from 'next/navigation';
import type { JSX } from 'react';
import { getBreadcrumbs } from '@/lib/helpers/getBreadcrumbs';
import { AutoBreadcrumbs as AutoBreadcrumbsProps } from './types';
import Breadcrumbs from './Breadcrumbs';

const AutoBreadcrumbs = ({ is404, modStandalone }: AutoBreadcrumbsProps): JSX.Element => {
  const path = usePathname();

  const items = is404 ? getBreadcrumbs('/404') : getBreadcrumbs(path);

  if (items.length <= 1) return <></>;

  const breadcrumbs = <Breadcrumbs items={items} />;

  if (!modStandalone) return breadcrumbs;

  return <div className="sl-layout breadcrumbs-layout">{breadcrumbs}</div>;
};

export default AutoBreadcrumbs;
