import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import Typography from '@/components/atoms/Typography';
import Hero from '@/components/organisms/Hero';
import { ErrorBlock as ErrorBlockProps } from './types';
import './ErrorBlock.css';

const ErrorBlock = ({
  code,
  heading,
  description,
  buttonLabel,
  buttonHref = '/',
}: ErrorBlockProps): JSX.Element => {
  return (
    <BlockContainer variant="light" orientation="default" slug="page-error">
      <section className="sl-layout">
        <Hero subtitle={heading} title={code} variant="simple" className="sl-layout" />
        <Typography className="error-block__content">
          <p>{description}</p>
          <p>
            <a href={buttonHref}>{buttonLabel}</a>
          </p>
        </Typography>
      </section>
    </BlockContainer>
  );
};

export default ErrorBlock;
