import type { JSX } from 'react';
import Typography from '@/components/atoms/Typography';
import { TableOfContents as TableOfContentsProps } from './types';
import './TableOfContents.css';

const TableOfContents = ({ sections }: TableOfContentsProps): JSX.Element => {
  return (
    <ul className="table-of-contents">
      {sections.map((section, i) => {
        return (
          <li key={i} className="table-of-contents__item">
            <a href={'#' + section.title.toLowerCase().replaceAll(' ', '-')}>
              <Typography modNoStyle>
                <span className="table-of-contents__item__prefix">#</span> {section.title}
              </Typography>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default TableOfContents;
