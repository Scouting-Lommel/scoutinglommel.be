import { Fragment, type JSX } from 'react';
import { useWindowSizes } from '@/lib/helpers/useWindowSizes';
import Icon from '@/components/atoms/Icon';
import SLLink from '@/components/atoms/Link';
import { Breadcrumbs as BreadcrumbsProps } from './types';
import './Breadcrumbs.css';


const Breadcrumbs = ({ items }: BreadcrumbsProps): JSX.Element => {
  const { isMobile } = useWindowSizes();

  if (isMobile) {
    const item = items[items.length - 1];

    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumbs">
          <li className="breadcrumbs__item">
            <SLLink
              variant="breadcrumb"
              href={items[items.length - 2].href || ''}
              className="breadcrumbs__link"
            >
              <span className="u-visually-hidden">{items[items.length - 2].label}</span>
              <Icon name="chevron-left" size="sm" />
            </SLLink>
          </li>
          <li className="breadcrumbs__item">
            {item.href ? (
              <SLLink variant="breadcrumb" href={item.href} className="breadcrumbs__link">
                {item.href === '/' ? (
                  <Icon name="house" size="sm" className="breadcrumbs__home" />
                ) : (
                  item.label
                )}
              </SLLink>
            ) : (
              <span className="breadcrumbs__link">{item.label}</span>
            )}
          </li>
        </ol>
      </nav>
    );
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumbs">
        {items.map((item, index) => (
          <Fragment key={index}>
            {index !== 0 && <Icon name="chevron-right" size="sm" className="breadcrumbs__item" />}
            <li key={index} className="breadcrumbs__item">
              {item.href ? (
                <SLLink variant="breadcrumb" href={item.href} className="breadcrumbs__link">
                  {item.href === '/' ? (
                    <Icon name="house" size="sm" className="breadcrumbs__home" />
                  ) : (
                    item.label
                  )}
                </SLLink>
              ) : (
                <span className="breadcrumbs__link">{item.label}</span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
