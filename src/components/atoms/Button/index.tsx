import cn from 'classnames';
import NextLink from 'next/link';
import type { JSX } from 'react';
import Icon from '@/components/atoms/Icon';
import { Button as ButtonProps } from './types';
import './Button.css';


const Button = ({
  label,
  variant = 'primary',
  href,
  modSmall,
  loading,
  className,
  children,
  ...props
}: ButtonProps): JSX.Element => {
  const buttonClassNames = cn(
    'button',
    `button--${variant}`,
    modSmall && 'button--small',
    className,
  );

  if (href) {
    return (
      <NextLink className={buttonClassNames} href={href} {...props}>
        <span className="button__label">
          {children || label}
          {props.target === '_blank' && (
            <Icon name="arrow-up-right" size="xs" className="button__label__icon" />
          )}
          {loading && (
            <Icon
              name="loader-spinner"
              aria-label="Laden..."
              size="xs"
              className="button__label__spinner"
            />
          )}
        </span>
      </NextLink>
    );
  }
  return (
    <button className={buttonClassNames} {...props}>
      <span className="button__label">
        {children || label}{' '}
        {loading && (
          <Icon
            name="loader-spinner"
            aria-label="Laden..."
            size="xs"
            className="button__label__spinner"
          />
        )}
      </span>
    </button>
  );
};

export default Button;
