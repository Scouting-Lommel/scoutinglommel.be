import type { JSX } from 'react';
import Button from '@/components/atoms/Button';
import DropdownItem from '@/components/atoms/DropdownItem';
import Icon from '@/components/atoms/Icon';
import Typography from '@/components/atoms/Typography';
import { Dropdown as DropdownProps, DropdownNavItem, DropdownCta } from './types';
import './Dropdown.css';
import { useTranslations } from 'next-intl';

const Dropdown = ({
  itemKey,
  path,
  dropdownTitle,
  dropdownButton,
  dropdownCta,
  dropdownItems,
  groups,
  rentalLocations,
  toggleDropdown,
}: DropdownProps): JSX.Element => {
  const tWhoIsWho = useTranslations('common.whoIsWho.navCta');

  let navItem: DropdownNavItem[] = [];
  let cta: DropdownCta = dropdownCta;

  if (path === '/takken') {
    navItem = groups!;
    cta = {
      title: tWhoIsWho('title'),
      intro: tWhoIsWho('intro'),
      ctaLabel: tWhoIsWho('ctaLabel'),
      ctaLink: '/wie-is-wie',
    };
  }
  if (path === '/verhuur') {
    navItem = rentalLocations!;
  }

  return (
    <span className="dropdown__wrapper" id={`sub-navigation-inner-${itemKey}`}>
      <div className="dropdown">
        <div className="dropdown__content sl-layout">
          <Button
            variant="link1"
            onClick={() => toggleDropdown()}
            className="dropdown__content__back-button"
          >
            <Icon
              name="chevron-down"
              aria-label="Collapse"
              size="xs"
              className="dropdown__content__back-button__chevron"
            />
            Terug
          </Button>
          <div className="dropdown__nav">
            {dropdownTitle && <p className="dropdown__nav__title t-headline-2">{dropdownTitle}</p>}
            <ul className="dropdown__nav__list">
              {dropdownItems!.map((item, i) => {
                const description =
                  item.description ||
                  navItem.find((el) => el.slug === item.page.replace(new RegExp('_', 'g'), '-'))
                    ?.description;

                if (item.link) {
                  return (
                    <DropdownItem
                      key={`dropdown-${path}-${i}`}
                      title={item.label}
                      description={description}
                      href={item.link.replace(new RegExp('_', 'g'), '-')}
                      modTargetBlank={item.modTargetBlank}
                    />
                  );
                }
              })}
            </ul>
            {dropdownButton && (
              <Button
                label={dropdownButton.label}
                href={dropdownButton.href}
                modSmall
                className="dropdown__nav__button"
              />
            )}
          </div>
          {cta && (
            <div className="dropdown__cta">
              <p className="dropdown__cta__title t-headline-2">{cta.title}</p>
              <Typography data={cta.intro} className="dropdown__cta__intro" modNoStyle />
              <Button
                label={cta.ctaLabel}
                href={cta.ctaLink}
                onClick={cta.ctaOnClick}
                modSmall
                className="dropdown__cta__button"
              />
            </div>
          )}
        </div>
      </div>
    </span>
  );
};

export default Dropdown;
