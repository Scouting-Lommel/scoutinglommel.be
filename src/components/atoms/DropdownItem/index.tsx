import Link from 'next/link';
import type { JSX } from 'react';
import Typography from '@/components/atoms/Typography';
import { DropdownItem as DropdownItemProps } from './types';
import Icon from '../Icon';
import './DropdownItem.css';


const DropdownItem = ({
  title,
  description,
  href,
  modTargetBlank,
}: DropdownItemProps): JSX.Element => {
  if (modTargetBlank) {
    return (
      <li>
        <a href={href} className="dropdown-item" target="_blank">
          <div className="dropdown-item__title">
            {title} <Icon name="arrow-up-right" size="xs" className="dropdown-item__title__icon" />
          </div>
          <Typography data={description} className="dropdown-item__description" modNoStyle />
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link href={href} className="dropdown-item">
        <div className="dropdown-item__title">{title}</div>
        <Typography data={description} className="dropdown-item__description" modNoStyle />
      </Link>
    </li>
  );
};

export default DropdownItem;
