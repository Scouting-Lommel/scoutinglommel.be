import type { JSX } from 'react';
import Typography from '@/components/atoms/Typography';
import { Paragraph as ParagraphProps } from './types';
import './Paragraph.css';

const Paragraph = ({ title, content }: ParagraphProps): JSX.Element => {
  return (
    <section id={title.toLowerCase().replaceAll(' ', '-')} className="paragraph">
      <div className="paragraph__title">
        <a
          href={`#${title.toLowerCase().replaceAll(' ', '-')}`}
          className="paragraph__title__anchor t-headline-3"
        >
          #
        </a>
        <h3 className="paragraph__title__copy">{title.toUpperCase()}</h3>
      </div>

      <Typography data={content} />
    </section>
  );
};

export default Paragraph;
