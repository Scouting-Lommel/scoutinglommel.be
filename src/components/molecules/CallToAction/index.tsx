import cn from 'classnames';
import type { JSX } from 'react';
import Button from '@/components/atoms/Button';
import { CallToAction as CallToActionProps } from './types';
import './CallToAction.css';


const CallToAction = ({
  title,
  intro,
  ctaLabel,
  ctaLink,
  className,
}: CallToActionProps): JSX.Element => {
  return (
    <div className={cn('cta', className)}>
      <div className="cta__copy">
        {title && <div className="cta__copy__title">{title}</div>}
        {intro && <div className="cta__copy__intro">{intro}</div>}
      </div>
      {ctaLabel && ctaLink && (
        <Button label={ctaLabel} href={ctaLink || ''} variant="primary" modSmall />
      )}
    </div>
  );
};

export default CallToAction;
