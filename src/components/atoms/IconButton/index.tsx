import cn from 'classnames';
import NextLink from 'next/link';
import type { JSX } from 'react';
import Icon from '@/components/atoms/Icon';
import { IconButton as IconButtonProps } from './types';
import './IconButton.css';

const IconButton = ({
  label,
  variant = 'primary',
  icon,
  href,
  modSmall,
  loading,
  className,
  ...props
}: IconButtonProps): JSX.Element => {
  const iconButtonClassNames = cn(
    'icon-button',
    `icon-button--${variant}`,
    modSmall && 'icon-button--small',
    className,
  );

  if (href) {
    return (
      <NextLink className={iconButtonClassNames} href={href} {...props}>
        <span className="icon-button__label">
          <span className="u-visually-hidden">{label}</span>
          <Icon name={icon} size="xs" />
        </span>
      </NextLink>
    );
  }

  return (
    <button className={iconButtonClassNames} {...props}>
      <span className="icon-button__label">
        <span className="u-visually-hidden">{label}</span>
        <Icon name={icon} size="xs" />
      </span>
    </button>
  );
};

export default IconButton;
