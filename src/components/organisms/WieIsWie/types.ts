import { CloudinaryImage } from '@/components/atoms/Image/types';

export type GroupFunction = {
  data: {
    attributes: {
      title: string;
      description: string;
    };
  } | null;
};

export type LeaderDetail = {
  firstName: string;
  lastName: string;
  isGroupLeader: boolean;
  image?: { data: { attributes: CloudinaryImage } };
  groupFunction?: GroupFunction;
};

export type GroupWithLeaders = {
  attributes: {
    name: string;
    slug: string;
    leaders: {
      data: { attributes: LeaderDetail }[];
    };
  };
};

export type WieIsWie = {
  groups: GroupWithLeaders[];
};
