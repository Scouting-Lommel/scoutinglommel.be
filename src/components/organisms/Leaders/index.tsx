import Link from 'next/link';
import type { JSX } from 'react';
import Leader from '@/components/molecules/Leader';
import { Leaders as LeadersProps } from './types';
import './Leaders.css';

const slugifyLeader = (firstName: string, lastName: string): string =>
  `${firstName}-${lastName}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const Leaders = ({ leaders }: LeadersProps): JSX.Element => {
  return (
    <div className="leaders__container">
      <div className="leaders">
        {leaders.map((leader, i) => {
          const href = `/wie-is-wie?leider=${slugifyLeader(leader.firstName, leader.lastName)}`;

          return (
            <Link
              key={i}
              href={href}
              className="leaders__leader-link"
            >
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
