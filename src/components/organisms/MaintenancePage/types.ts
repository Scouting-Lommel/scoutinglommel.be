import { CloudinaryImage } from '@/components/atoms/Image/types';

export type MaintenancePageProps = {
  logo?: CloudinaryImage | null;
  socials?: Array<{
    documentId?: string;
    title?: string;
    link?: string;
    icon?: string;
  } | null> | null;
  className?: string;
};
