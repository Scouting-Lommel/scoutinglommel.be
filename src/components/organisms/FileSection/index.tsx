'use client';

import { useTranslations } from 'next-intl';
import { Fragment, useCallback, useEffect, useState, type JSX } from 'react';
import { getFiles } from '@/lib/api/files/api';
import Link from '@/components/atoms/Link';
import Loader from '@/components/atoms/Loader';
import Typography from '@/components/atoms/Typography';
import Attachment from '@/components/molecules/Attachment';
import { FileSection as FileBlockProps } from './types';
import './FileSection.css';

const FileSection = ({ title, groupSlug, className }: FileBlockProps): JSX.Element => {
  const [groupFiles, setFiles] = useState<any>(null);
  const [groupLinks, setLinks] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const t = useTranslations('common');

  const fetchAssets = useCallback(async () => {
    setError(false);
    setLoading(true);

    if (!groupSlug) {
      setLoading(false);
      setError(true);
      return;
    }

    try {
      const data = await getFiles(groupSlug);

      if (!data) {
        setError(true);
        setLoading(false);
        return;
      }

      setFiles(data?.groups?.[0]?.files);
      setLinks(data?.groups?.[0]?.links);

      setLoading(false);
    } catch (e) {
      setError(true);
      setLoading(false);
      return;
    }
  }, [groupSlug]);

  useEffect(() => {
    if (groupSlug) {
      fetchAssets();
    }
  }, [groupSlug, fetchAssets]);

  return (
    <div className={className}>
      <h2 className="file-section t-headline-2 t-align-center">{title}</h2>
      {error && !loading && (
        <>
          <p className="t-align-center">{t('fetchFilesError')}</p>
          <div className="activities__try-again">
            <Link className="activities__try-again__btn" variant="link3" onClick={fetchAssets}>
              {t('tryAgain')}
            </Link>
          </div>
        </>
      )}
      {!error && loading && <Loader className="file-section__loader" size="sm" modLabelVisible />}
      {!error &&
        !loading &&
        (!Boolean(groupFiles) || groupFiles?.length === 0) &&
        (!Boolean(groupLinks) || groupLinks?.length === 0) && (
          <p className="t-align-center">{t('noFilesFound')}</p>
        )}
      {!error && !loading && (groupFiles?.length > 0 || groupLinks?.length > 0) && (
        <ul style={{ paddingLeft: 0 }}>
          {groupFiles?.length > 0 &&
            groupFiles?.map((file: any, key: any) => (
              <Fragment key={`activity-${key}`}>
                <Attachment variant="file" file={file} />
              </Fragment>
            ))}
          {groupLinks?.length > 0 &&
            groupLinks?.map((link: any, key: any) => (
              <Fragment key={`activity-${key}`}>
                <Attachment variant="link" link={link} groupId={groupSlug} allLinks={groupLinks} />
              </Fragment>
            ))}
        </ul>
      )}
    </div>
  );
};

export default FileSection;
