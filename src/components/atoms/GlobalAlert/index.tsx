'use client';

import cn from 'classnames';
import { useTranslations } from 'next-intl';
import { useState, useEffect, type JSX } from 'react';
import { slugify } from '@/lib/helpers/slugify';
import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography';
import { GlobalAlert as GlobalAlertProps } from './types';
import './GlobalAlert.css';


const GlobalAlert = ({ label, variant = 'info' }: GlobalAlertProps): JSX.Element => {
  const t = useTranslations('common');

  const [alertVisible, setAlertVisible] = useState<boolean>(false);

  useEffect(() => {
    const storedValue = localStorage.getItem(slugify(label));
    if (storedValue === null) setAlertVisible(true);
    if (storedValue !== null) setAlertVisible(JSON.parse(storedValue));
  }, [variant, label]);

  const handleClose = () => {
    setAlertVisible(false);
    localStorage.setItem(slugify(label), 'false');
  };

  const globalAlertClassNames = cn('global-alert', `global-alert--${variant}`);

  return (
    <>
      {alertVisible && (
        <div className={globalAlertClassNames}>
          <div className="global-alert__inner sl-layout">
            <Typography data={label} />
            <Button variant="light" label={t('close')} onClick={handleClose} modSmall />
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalAlert;
