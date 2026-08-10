import cn from 'classnames';
import type { JSX } from 'react';
import Typography from '@/components/atoms/Typography';
import FAQItem from '@/components/molecules/FaqItem';
import { FAQ as FAQProps } from './types';
import './FAQ.css';

const FAQ = ({ title, bottomText, faqItems, className }: FAQProps): JSX.Element => {
  const faqClassNames = cn('faq', className);

  return (
    <div className={faqClassNames}>
      <h2 className="faq__title t-headline-2 t-align-center">{title}</h2>
      <div className="faq__container">
        {faqItems.map((item, i) => {
          return (
            <FAQItem
              question={item.question}
              answer={item.answer}
              image={item.image}
              callToAction={item.callToAction}
              key={i}
            />
          );
        })}
      </div>
      <Typography data={bottomText} className="faq__bottom-text" />
    </div>
  );
};

export default FAQ;
