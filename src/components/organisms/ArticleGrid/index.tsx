'use client';

import { useTranslations } from 'next-intl';
import { Fragment, useState, type JSX } from 'react';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Forms/Input';
import IconButton from '@/components/atoms/IconButton';
import ArticleCard from '@/components/molecules/ArticleCard';
import { ArticleGrid as ArticleGridProps } from './types';
import './ArticleGrid.css';

const MAX_ARTICLES = 5;

const ArticleGrid = ({
  articles,
  modWithToolbar,
  showMoreHref,
  loginCallbackUrl,
}: ArticleGridProps): JSX.Element => {
  const [searchString, setSearchString] = useState('');
  const [showMore, setShowMore] = useState(false);

  const t = useTranslations('common');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const filteredArticles = articles
    ?.filter(
      (article) =>
        article.title.toLowerCase().includes(searchString.toLowerCase()) ||
        article.description.toLowerCase().includes(searchString.toLowerCase()),
    )
    .sort((a, b) => {
      if (a.locked === b.locked) {
        return a.title.localeCompare(b.title);
      }
      return a.locked ? 1 : -1;
    })
    .slice(0, showMore ? articles.length : MAX_ARTICLES);

  const handleClearSearch = () => {
    setSearchString('');
  };

  return (
    <div className="article-grid sl-layout">
      {modWithToolbar && (
        <>
          <div className="article-grid__toolbar">
            <search className="article-grid__search">
              <Input
                label={t('search.label')}
                id="article-search"
                name="article-search"
                value={searchString}
                placeholder={t('search.placeholder')}
                customChangeBehaviour={handleSearch}
                modShowLabel={false}
              />
              <IconButton icon="x" label={t('search.remove')} onClick={handleClearSearch} />
            </search>

            <div>
              {t('search.countItemsVisible', {
                count: filteredArticles.length,
                total: articles.length,
              })}
            </div>
          </div>

          <hr />
        </>
      )}

      {filteredArticles &&
        Boolean(filteredArticles.length) &&
        filteredArticles.map((article, i) => (
          <Fragment key={article.id}>
            <ArticleCard {...article} loginCallbackUrl={loginCallbackUrl} />
            <hr />
          </Fragment>
        ))}

      {(!filteredArticles || !Boolean(filteredArticles.length)) && <p>{t('search.noResults')}</p>}

      {!showMoreHref && filteredArticles && articles.length > MAX_ARTICLES && (
        <Button
          label={showMore ? t('showLess') : t('showMore')}
          onClick={toggleShowMore}
          className="article-grid__button"
        />
      )}

      {showMoreHref && (
        <Button
          label={t('showMore')}
          href={showMoreHref}
          className="article-grid__button"
          modSmall
        />
      )}
    </div>
  );
};

export default ArticleGrid;
