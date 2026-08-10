import cn from 'classnames';
import type { JSX } from 'react';
import { Divider as DividerProps } from './types';
import './Divider.css';

const Divider = ({ variant = 'default' }: DividerProps): JSX.Element => {
  const classNames = cn('sl-layout', 'divider', `divider--${variant}`);

  return <hr className={classNames} />;
};

export default Divider;
