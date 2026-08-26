import { OrganisationRoles } from '@/lib/helpers/getOrganisationRole';

export const stagingAllowedOrgUnitPaths: readonly OrganisationRoles[] = ['/', '/Leiding'];

export function isStagingOrgUnitAllowed(path: unknown): path is OrganisationRoles {
  return typeof path === 'string' && stagingAllowedOrgUnitPaths.includes(path as OrganisationRoles);
}
