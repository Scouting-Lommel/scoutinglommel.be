'use client';

import cn from 'classnames';
import { useState, type JSX } from 'react';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import SLImage from '@/components/atoms/Image';
import Typography from '@/components/atoms/Typography';
import { FaqItem as FAQProps } from './types';
import './FaqItem.css';

const FAQItem = ({ question, answer, image, callToAction }: FAQProps): JSX.Element => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    setOpen((e.target as HTMLDetailsElement).open);
  };

  const faqClasses = cn('faq-item', {
    'faq-item--open': isOpen,
  });

  return (
    <details className={faqClasses} onToggle={handleToggle}>
      <summary className="faq-item__title">
        <Typography>{question}</Typography>
        <Icon name="chevron-down" size="lg" className="faq-item__title__chevron" />
      </summary>
      <div
        className={cn('faq-item__answer', {
          'faq-item__answer--with-image': image,
        })}
      >
        <div className="faq-item__answer__content">
          <Typography data={answer} />
          {callToAction && (
            <div className="faq-item__answer__content__button-container">
              <Button
                label={callToAction.label}
                href={callToAction.link}
                variant={callToAction.variant}
                className="faq-item__answer__content__button"
              />
            </div>
          )}
        </div>
        {image && (
          <div className="faq-item__answer_image-container">
            <SLImage
              data={image}
              loadingStrategy="lazy"
              className="faq-item__answer__image"
              modMaximisable
            />
          </div>
        )}
      </div>
    </details>
  );
};

export default FAQItem;
