'use client';

import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState, type JSX } from 'react';
import Icon from '@/components/atoms/Icon';
import SLImage from '@/components/atoms/Image';
import Navigation from '@/components/molecules/Navigation';
import { Header as HeaderProps } from './types';
import './Header.css';

const Header = ({ logo, mainNavigation, groups, rentalLocations }: HeaderProps): JSX.Element => {
  const t = useTranslations('common.header');

  const [navVisible, setNavVisible] = useState(false);
  const pathname = usePathname();
  const navClassnames = cn(
    'header__nav',
    navVisible ? 'header__nav--visible' : 'header__nav--invisible',
  );

  const triggerNav = () => {
    setNavVisible(!navVisible);

    if (!navVisible) {
      document.body.setAttribute('style', 'overflow-y: hidden');
    }
    if (navVisible) {
      document.body.removeAttribute('style');
    }
  };

  useEffect(() => {
    setNavVisible(false);
    document.body.removeAttribute('style');
  }, [pathname]);

  return (
    <div className="header__wrapper">
      <div className="header">
        <header className="sl-layout">
          <div className="header__content">
            <Link href="/" className="header__link">
              <SLImage data={logo} loadingStrategy="eager" />
            </Link>
            <div className={navClassnames}>
              <Navigation
                navItems={mainNavigation}
                groups={groups}
                rentalLocations={rentalLocations}
              />
            </div>
            <button className="header__trigger" onClick={() => triggerNav()}>
              {navVisible ? (
                <Icon name="close" aria-label="Close menu" size="lg" />
              ) : (
                <Icon name="menu" aria-label="Menu" size="lg" />
              )}
              <span className="u-visually-hidden">{navVisible ? t('closeMenu') : t('menu')}</span>
            </button>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
