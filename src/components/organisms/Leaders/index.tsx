import type { JSX } from 'react';
import Leader from '@/components/molecules/Leader';
import { Leaders as LeadersProps } from './types';
import './Leaders.css';


const Leaders = ({ leaders }: LeadersProps): JSX.Element => {
  return (
    <div className="leaders__container">
      <div className="leaders">
        {leaders.map((leader, i) => {
          return (
            <Leader
              firstName={leader.firstName}
              lastName={leader.lastName}
              image={leader.image}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Leaders;
