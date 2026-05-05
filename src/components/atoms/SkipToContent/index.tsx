import cn from 'classnames';
import { useTranslations } from 'next-intl';
import type { JSX } from 'react';
import { SkipToContent as SkipToContentProps } from './types';
import './SkipToContent.css';


const SkipToContent = ({ className }: SkipToContentProps): JSX.Element => {
  const t = useTranslations('common');

  const classes = cn('skip-to-content', className);

  return (
    <a href="#main" className={classes}>
      {t('skipToContent')}
    </a>
  );
};

export default SkipToContent;
