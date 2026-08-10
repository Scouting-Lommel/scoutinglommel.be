import { Breadcrumb } from '@/components/molecules/Breadcrumbs/types';
import { capitalize } from './capitalize';
import { desluggify } from './slugify';

const GATED_ROUTES = new Set(['inloggen', 'geen-toegang', 'dashboard', 'playground']);

/**
 * Generates an array of breadcrumb objects based on the provided pathname.
 *
 * @param {string | null} [pathname] - The pathname to generate breadcrumbs from. If not provided or null, an empty array is returned.
 * @returns {Breadcrumb[]} An array of breadcrumb objects, each containing a label and href.
 */
export const getBreadcrumbs = (pathname?: string | null): Breadcrumb[] => {
  if (!pathname) return [];

  const breadcrumbs = pathname.split('/').filter((item) => item !== '');

  if (breadcrumbs.length === 0 || GATED_ROUTES.has(breadcrumbs[0])) return [];

  return [
    { label: 'Homepagina', href: '/' },

    ...breadcrumbs.map((item, index) => {
      const href = `/${breadcrumbs.slice(0, index + 1).join('/')}`;

      return {
        label: capitalize(desluggify(item)),
        href,
      };
    }),
  ];
};
