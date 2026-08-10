import type { JSX } from 'react';
import FooterDisclosure from '@/components/molecules/FooterDisclosure';
import FooterDoormat from '@/components/molecules/FooterDoormat';
import FooterHead from '@/components/molecules/FooterHead';
import { Footer as FooterProps } from './types';
import './Footer.css';

const Footer = ({
  siteName,
  vatNumber,
  groupNumber,
  address,
  contactItems,
  footerNavigation,
}: FooterProps): JSX.Element => {
  return (
    <footer className="footer">
      <div className="sl-layout">
        <FooterHead siteName={siteName} vatNumber={vatNumber} groupNumber={groupNumber} />
        <FooterDoormat
          address={address}
          contactItems={contactItems}
          footerNavigation={footerNavigation}
        />
        <FooterDisclosure siteName={siteName} />
      </div>
    </footer>
  );
};

export default Footer;
