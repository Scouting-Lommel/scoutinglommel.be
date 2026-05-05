import cn from 'classnames';
import * as icons from 'lucide-react';
import type { JSX } from 'react';
import { Icon as IconProps } from './types';
import { iconMap } from './IconMap';
import './Icon.css';


const Icon = ({ name, size, className, ...props }: IconProps): JSX.Element => {
  const mappedName = iconMap[name];
  const LucideIcon = icons[mappedName];
  const classNames = cn('icon', `icon--${size}`, className);

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in lucide-react icons.`);
    return <></>;
  }

  return <LucideIcon aria-hidden="true" className={classNames} {...props} />;
};

export default Icon;
