import type { Group, Leader } from '@/types/generated/Graphql';

export type GroupWithLeaders = Group;

export type LeaderDetail = Leader;

export type WieIsWie = {
  groups: Array<GroupWithLeaders | null>;
};
