import cn from 'classnames';
import type { JSX } from 'react';
import SLImage from '@/components/atoms/Image';
import { YearTheme as YearThemeProps } from './types';
import './YearTheme.css';


const YearTheme = ({ href, image, className }: YearThemeProps): JSX.Element => {
  const yearThemeClassnames = cn('year-theme', className);

  return (
    <div className={yearThemeClassnames}>
      {href ? (
        <a href={href}>
          <SLImage data={image} className="year-theme__image" loadingStrategy="lazy" />
        </a>
      ) : (
        <SLImage data={image} className="year-theme__image" loadingStrategy="lazy" />
      )}
    </div>
  );
};

export default YearTheme;
