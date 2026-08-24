import Link from 'next/link';
import type { JSX } from 'react';
import Leader from '@/components/molecules/Leader';
import { Leaders as LeadersProps } from './types';
import './Leaders.css';

const Leaders = ({ leaders }: LeadersProps): JSX.Element => {
  return (
    <div className="leaders__container">
      <div className="leaders">
        {leaders.map((leader) => {
          const href = `/wie-is-wie?leider=${leader.documentId}`;

          return (
            <Link key={leader.documentId} href={href} className="leaders__leader-link">
              <Leader
                firstName={leader.firstName}
                lastName={leader.lastName}
                image={leader.image}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Leaders;
