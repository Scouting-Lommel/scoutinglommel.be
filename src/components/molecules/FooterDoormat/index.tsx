import type { JSX } from 'react';
import SLLink from '@/components/atoms/Link';
import Typography from '@/components/atoms/Typography';
import { FooterDoormat as FooterDoormatProps, DoormatCol as DoormatColProps } from './types';
import './FooterDoormat.css';


const DoormatCol = ({ title, address, links }: DoormatColProps): JSX.Element => {
  return (
    <div className="doormat-col">
      <h3 className="doormat-col__title">{title}</h3>

      {address ? (
        <div className="doormat-col__content">
          <Typography data={address} modNoStyle />
        </div>
      ) : (
        links?.map((item, i) => {
          return (
            <SLLink
              key={i}
              href={item.link || '#'}
              variant="link1"
              className="doormat-col__content doormat-col__content--link"
            >
              {item.label}
            </SLLink>
          );
        })
      )}
    </div>
  );
};

const FooterDoormat = ({
  address,
  contactItems,
  footerNavigation,
}: FooterDoormatProps): JSX.Element => {
  return (
    <div className="footer-doormat">
      <div className="footer-doormat__section">
        <DoormatCol title="Adres" address={address} />
        <DoormatCol title="Contact" links={contactItems} />
      </div>
      <div className="footer-doormat__section">
        {footerNavigation.map((el, i) => {
          return <DoormatCol key={i} title={el.title} links={el.navItems} />;
        })}
      </div>
    </div>
  );
};

export default FooterDoormat;
