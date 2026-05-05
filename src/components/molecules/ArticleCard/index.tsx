'use client';

import cn from 'classnames';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useState, type JSX } from 'react';
import { formatDateTime } from '@/lib/helpers/dateTime';
import { formatCallbackUrl } from '@/lib/helpers/formatCallbackUrl';
import Icon from '@/components/atoms/Icon';
import Typography from '@/components/atoms/Typography';
import { ArticleCard as ArticleCardProps } from './types';
import './ArticleCard.css';


const ArticleCard = ({
  title,
  description,
  updatedAt,
  locked,
  slug,
  loginCallbackUrl,
}: ArticleCardProps): JSX.Element => {
  const t = useTranslations('common');

  const [isShaking, setIsShaking] = useState(false);
  const [lockedMessageVisible, setLockedMessageVisible] = useState(false);

  const { status } = useSession();

  const handleLockedClick = () => {
    setLockedMessageVisible(true);
    setTimeout(() => {
      setLockedMessageVisible(false);
    }, 10000);

    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 400);
  };

  if (locked && status !== 'authenticated') {
    return (
      <article className="article-card">
        <div className="article-card__link" onClick={handleLockedClick}>
          <h2 className="article-card__title">{title}</h2>
          <p className="article-card__last-changed">
            {t('lastChanged')}: {formatDateTime(updatedAt)}
          </p>

          <Typography tagName="p" data={description} />

          <div
            className={cn(
              'article-card__lock',
              isShaking && 'article-card__lock--shaking',
              lockedMessageVisible && 'article-card__lock--message-visible',
              !lockedMessageVisible && 'article-card__lock--message-invisible',
            )}
          >
            <div className="article-card__lock__message">
              {t.rich('needToBeLoggedIn', {
                link: (children) => (
                  <a href={`inloggen?callbackUrl=${formatCallbackUrl(loginCallbackUrl)}`}>
                    {children}
                  </a>
                ),
              })}
            </div>
            <Icon name="lock" size="sm" className="article-card__lock__icon" />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="article-card">
      <a className="article-card__link" href={`/handleidingen/${slug}`}>
        <h2 className="article-card__title">{title}</h2>
        <p className="article-card__last-changed">
          {t('lastChanged')}: {formatDateTime(updatedAt)}
        </p>

        <Typography tagName="p">{description}</Typography>
      </a>
    </article>
  );
};

export default ArticleCard;
