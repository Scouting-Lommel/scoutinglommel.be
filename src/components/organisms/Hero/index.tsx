import cn from 'classnames';
import type { JSX } from 'react';
import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography';
import AutoBreadcrumbs from '@/components/molecules/Breadcrumbs';
import YearTheme from '@/components/molecules/YearTheme';
import { Hero as HeroProps } from './types';
import './Hero.css';


const Hero = ({
  title,
  subtitle,
  variant,
  callToAction,
  yearTheme,
  className,
}: HeroProps): JSX.Element => {
  const heroClassname = cn('hero', `hero--${variant}`, className);

  return (
    <div className={heroClassname}>
      <AutoBreadcrumbs is404={title === '404'} />

      <h1
        className={cn(
          variant === 'simple'
            ? 't-headline-1-alt hero__title hero__title--alt'
            : 't-headline-1 hero__title hero__title',
        )}
      >
        <Typography data={title} modNoStyle modPreWrap />
      </h1>

      {subtitle && variant === 'simple' && (
        <Typography>
          <p className="hero__subtitle hero__subtitle--alt">{subtitle}</p>
        </Typography>
      )}
      {subtitle && variant !== 'simple' && (
        <p className="t-headline-3 hero__subtitle">{subtitle}</p>
      )}

      {callToAction && callToAction?.length > 0 && (
        <div className="hero__buttons">
          {callToAction.map((cta, key) => {
            return <Button key={key} label={cta.label} href={cta.link} variant={cta.variant} />;
          })}
        </div>
      )}

      {yearTheme && (
        <YearTheme
          image={yearTheme.image.data.attributes}
          href="/algemene-informatie#jaarthema"
          className="hero__year-theme"
        />
      )}
    </div>
  );
};

export default Hero;
