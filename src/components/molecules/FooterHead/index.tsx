import type { JSX } from 'react';
import { FooterHead as FooterHeadProps } from './types';
import './FooterHead.css';

const FooterHead = ({ siteName, vatNumber, groupNumber }: FooterHeadProps): JSX.Element => {
  return (
    <div className="footer-head">
      <h2 className="footer-head__title">{siteName}</h2>
      <p className="footer-head__info">
        {vatNumber && vatNumber}
        {vatNumber && groupNumber && ' • '}
        {groupNumber && groupNumber}
      </p>
    </div>
  );
};

export default FooterHead;
