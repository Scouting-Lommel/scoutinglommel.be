import {
  FooterNavigationQuery,
  MainNavigationQuery,
  NavigationItemType,
} from '@/types/generated/Graphql';
import type { FooterNavigation } from '@/components/molecules/FooterDoormat/types';
import type { NavItem } from '@/components/molecules/Navigation/types';

type MainNavigationItem = MainNavigationQuery['renderNavigation'][number];
type FooterNavigationItem = FooterNavigationQuery['renderNavigation'][number];

type DescribableEntity = {
  slug: string;
  description: string;
};

function derivePageFromPath(path: string | null | undefined): string {
  if (!path || path === '/') return 'home';
  return path.replace(/^\//, '').replace(/-/g, '_');
}

function deriveSlugFromPath(path: string | null | undefined): string | undefined {
  if (!path || path === '/') return undefined;
  const segments = path.replace(/^\//, '').split('/');
  return segments[segments.length - 1];
}

function getDescriptionFromPath(
  path: string | null | undefined,
  groups: DescribableEntity[],
  rentalLocations: DescribableEntity[],
): string | undefined {
  const slug = deriveSlugFromPath(path);
  if (!slug) return undefined;

  const entity = [...groups, ...rentalLocations].find((item) => item.slug === slug);

  return entity?.description ?? undefined;
}

export function transformMainNavigation(
  items: MainNavigationQuery['renderNavigation'] | null | undefined,
  groups: DescribableEntity[] = [],
  rentalLocations: DescribableEntity[] = [],
): NavItem[] {
  if (!items) return [];

  return items
    .filter((item): item is NonNullable<MainNavigationItem> => item !== null)
    .map((item) => {
      const children = item.items?.filter(
        (child): child is NonNullable<MainNavigationItem> => child !== null,
      );
      const hasChildren = children && children.length > 0;

      return {
        label: item.title,
        page: derivePageFromPath(item.path),
        link:
          item.type === NavigationItemType.External
            ? (item.externalPath ?? null)
            : (item.path ?? null),
        dropdownItems: hasChildren
          ? children.map((child) => ({
              label: child.title,
              page: derivePageFromPath(child.path),
              link:
                child.type === NavigationItemType.External
                  ? (child.externalPath ?? null)
                  : (child.path ?? null),
              description: getDescriptionFromPath(child.path, groups, rentalLocations),
              modTargetBlank: child.type === NavigationItemType.External,
            }))
          : [],
        dropdownTitle: hasChildren ? item.title : null,
        dropdownCta: null,
        dropdownButton: hasChildren
          ? {
              label: `Bekijk alle ${item.title.toLowerCase()}`,
              link: item.path ?? '',
              variant: 'primary',
            }
          : undefined,
      };
    });
}

export function transformFooterNavigation(
  items: FooterNavigationQuery['renderNavigation'] | null | undefined,
): FooterNavigation[] {
  if (!items) return [];

  return items
    .filter((item): item is NonNullable<FooterNavigationItem> => item !== null)
    .map((item) => ({
      title: item.title,
      navItems:
        item.items
          ?.filter((child): child is NonNullable<FooterNavigationItem> => child !== null)
          .map((child) => ({
            label: child.title,
            link: child.path || child.externalPath || '#',
          })) || [],
    }));
}
