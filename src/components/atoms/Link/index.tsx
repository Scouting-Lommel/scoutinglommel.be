import cn from 'classnames';
import NextLink from 'next/link';
import type { JSX } from 'react';
import { Link as LinkProps } from './types';
import './Link.css';


const SLLink = ({
  href,
  variant = 'link1',
  onClick,
  children,
  className,
}: LinkProps): JSX.Element => {
  const linkClassnames = cn('link', `link--${variant}`, className);

  let LinkComponent: typeof NextLink | 'a' = NextLink;
  if (typeof href === 'string' && (href.startsWith('#') || href.startsWith('https://'))) {
    LinkComponent = 'a';
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={linkClassnames}>
        {children}
      </button>
    );
  }

  return (
    <LinkComponent href={href as string} className={linkClassnames}>
      {children}
    </LinkComponent>
  );
};

export default SLLink;
