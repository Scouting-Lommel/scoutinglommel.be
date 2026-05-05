import type { JSX } from 'react';
import Paragraph from '@/components/molecules/Paragraph';
import TableOfContents from '@/components/molecules/TableOfContents';
import { Policy as PolicyProps } from './types';
import './Policy.css';


const Policy = ({ sections }: PolicyProps): JSX.Element => {
  return (
    <>
      <TableOfContents sections={sections} />

      <div className="policy">
        {sections.map((section, i) => {
          return <Paragraph title={section.title} content={section.content} key={i} />;
        })}
      </div>
    </>
  );
};

export default Policy;
