import { Groups } from '@/lib/constants/enums/groups';

const generalEmailAddress = 'info@scoutinglommel.be';
const rentalsEmailAddress = 'verhuur@scoutinglommel.be';
const registerEmailAddress = 'inschrijvingen@scoutinglommel.be';

const groupEmailAddress = (group: Groups): string => `${group}@scoutinglommel.be`;

export { generalEmailAddress, groupEmailAddress, registerEmailAddress, rentalsEmailAddress };
