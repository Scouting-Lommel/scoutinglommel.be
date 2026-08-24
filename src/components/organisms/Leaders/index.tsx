import Link from 'next/link';
import type { JSX } from 'react';
import { slugify } from '@/lib/helpers/slugify';
import Leader from '@/components/molecules/Leader';
import { Leaders as LeadersProps } from './types';
import './Leaders.css';

const Leaders = ({ leaders }: LeadersProps): JSX.Element => {
  return (
    <div className="leaders__container">
      <div className="leaders">
        {leaders.map((leader, i) => {
          const href = `/wie-is-wie?leider=${slugify(`${leader.firstName}-${leader.lastName}`)}`;

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
