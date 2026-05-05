import cn from 'classnames';
import type { JSX } from 'react';
import Icon from '@/components/atoms/Icon';
import { IconNames } from '@/components/atoms/Icon/IconMap';
import SLLink from '@/components/atoms/Link';
import { SocialsCta as SocialsCtaProps } from './types';
import './SocialsCta.css';


const SocialsCta = ({ title, socialItems, className }: SocialsCtaProps): JSX.Element => {
  interface icons {
    [key: string]: IconNames;
  }
  const icons: icons = {
    facebook: 'facebook',
    instagram: 'instagram',
    tiktok: 'tiktok',
  };

  return (
    <div className={cn('socials-cta', className)}>
      <div className="socials-cta__copy">
        <div className="socials-cta__copy__title">{title}</div>
      </div>
      <div className="socials-cta__socials">
        {socialItems?.map((item, i) => {
          return (
            <SLLink
              key={i}
              href={item.link}
              className="socials-cta__socials__item"
              variant={'link1'}
            >
              <Icon
                name={icons[item.icon]}
                size="lg"
                strokeWidth={2.5}
                className="socials-cta__socials__item__icon"
              />
              <span className="u-visually-hidden">{item.title}</span>
            </SLLink>
          );
        })}
      </div>
    </div>
  );
};

export default SocialsCta;
