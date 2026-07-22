import { NavigationItemType } from '@/types/generated/Graphql';
import type { NavigationItem } from '@/types/generated/Graphql';
import type { FooterNavigation } from '@/components/molecules/FooterDoormat/types';
import type { NavItem } from '@/components/molecules/Navigation/types';

function derivePageFromPath(path: string | null | undefined): string {
  if (!path || path === '/') return 'home';
  return path.replace(/^\//, '').replace(/-/g, '_');
}

function getDescriptionFromRelated(related: NavigationItem['related']): string | undefined {
  if (!related || !('description' in related)) return undefined;
  return related.description ?? undefined;
}

export function transformMainNavigation(
  items: Array<NavigationItem | null> | null | undefined,
): NavItem[] {
  if (!items) return [];

  return items
    .filter((item): item is NavigationItem => item !== null)
    .map((item) => {
      const children = item.items?.filter((child): child is NavigationItem => child !== null);
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
              description: getDescriptionFromRelated(child.related),
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
  items: Array<NavigationItem | null> | null | undefined,
): FooterNavigation[] {
  if (!items) return [];

  return items
    .filter((item): item is NavigationItem => item !== null)
    .map((item) => ({
      title: item.title,
      navItems:
        item.items
          ?.filter((child): child is NavigationItem => child !== null)
          .map((child) => ({
            label: child.title,
            link: child.path || child.externalPath || '#',
          })) || [],
    }));
}
