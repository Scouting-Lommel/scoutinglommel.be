import type { JSX } from 'react';
import { RingtailLogo } from '@/components/atoms/RingtailLogo';
import { FooterDisclosure as FooterDisclosureProps } from './types';
import './FooterDisclosure.css';

const FooterDisclosure = ({ siteName }: FooterDisclosureProps): JSX.Element => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer-disclosure">
      <div className="footer-disclosure__copyright">
        &copy; {siteName} 2023-{currentYear}
      </div>
      <a href="https://ringtail.dev" target="_blank" className="footer-disclosure__author">
        Website door
        <RingtailLogo className="footer-disclosure__author__logo" />
        ringtail.dev
      </a>
    </div>
  );
};

export default FooterDisclosure;
