import cn from 'classnames';
import type { JSX } from 'react';
import { Banner as BannerProps } from './types';
import './Banner.css';


const Banner = ({ variant, children }: BannerProps): JSX.Element => {
  const bannerClassName = cn('banner', `banner--${variant}`);

  return <div className={bannerClassName}>{children}</div>;
};

export default Banner;
