import type { JSX } from 'react';
import toCloudinaryImage from '@/lib/helpers/toCloudinaryImage';
import SLImage from '@/components/atoms/Image';
import Leader from '@/components/molecules/Leader';
import type { LeaderDetail } from './types';

type LeaderCardProps = {
  leader: LeaderDetail;
  groupName: string;
  onClick: (leader: LeaderDetail, groupName: string) => void;
};

const LeaderCard = ({ leader, groupName, onClick }: LeaderCardProps): JSX.Element => {
  return (
    <button
      key={leader.documentId}
      className="wie-is-wie__leader-btn"
      type="button"
      onClick={() => onClick(leader, groupName)}
    >
      <Leader
        firstName={leader.firstName}
        lastName={leader.lastName}
        image={leader.image ? toCloudinaryImage(leader.image) : undefined}
      />
    </button>
  );
};

export default LeaderCard;
