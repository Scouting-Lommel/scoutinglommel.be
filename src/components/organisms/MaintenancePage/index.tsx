import cn from 'classnames';
import type { JSX } from 'react';
import Icon from '@/components/atoms/Icon';
import { IconNames } from '@/components/atoms/Icon/IconMap';
import SLImage from '@/components/atoms/Image';
import SLLink from '@/components/atoms/Link';
import Typography from '@/components/atoms/Typography';
import { MaintenancePageProps } from './types';
import './MaintenancePage.css';

const iconMap: Record<string, IconNames> = {
  facebook: 'facebook',
  instagram: 'instagram',
  tiktok: 'tiktok',
};

const MaintenancePage = ({ logo, socials, className }: MaintenancePageProps): JSX.Element => {
  return (
    <section className={cn('maintenance-page', className)}>
      <div className="maintenance-page__inner">
        {logo && (
          <div className="maintenance-page__logo-wrapper">
            <SLImage data={logo} className="maintenance-page__logo" loadingStrategy="eager" />
          </div>
        )}

        <Typography tagName="h1" className="maintenance-page__title">
          Tijdelijke onderbreking
        </Typography>

        <div className="maintenance-page__accent-bar" />

        <Typography className="maintenance-page__description">
          <p>We werken momenteel aan de website. Probeer het later opnieuw.</p>
        </Typography>

        {socials && socials.length > 0 && (
          <div className="maintenance-page__socials">
            {socials.map((social) => {
              if (!social?.icon) return null;
              const iconName = iconMap[social.icon];
              if (!iconName) return null;
              return (
                <SLLink
                  key={social.documentId}
                  href={social.link ?? '#'}
                  className="maintenance-page__social-link"
                  variant="link1"
                >
                  <Icon name={iconName} size="lg" strokeWidth={2.5} />
                  <span className="u-visually-hidden">{social.title}</span>
                </SLLink>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default MaintenancePage;
