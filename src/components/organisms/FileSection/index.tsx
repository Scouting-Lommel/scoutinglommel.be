'use client';

import { useTranslations } from 'next-intl';
import { Fragment, useCallback, useEffect, useState, type JSX } from 'react';
import { getFiles } from '@/lib/api/files/api';
import type { GetGroupWithFilesQuery } from '@/types/generated/Graphql';
import Link from '@/components/atoms/Link';
import Loader from '@/components/atoms/Loader';
import Typography from '@/components/atoms/Typography';
import Attachment from '@/components/molecules/Attachment';
import type {
  File as AttachmentFile,
  Link as AttachmentLink,
} from '@/components/molecules/Attachment/types';
import { FileSection as FileBlockProps } from './types';
import './FileSection.css';

type GraphQLFile = NonNullable<
  NonNullable<GetGroupWithFilesQuery['groups'][number]>['files'][number]
>;
type GraphQLLink = NonNullable<
  NonNullable<NonNullable<GetGroupWithFilesQuery['groups'][number]>['links']>[number]
>;

const FileSection = ({ title, groupSlug, className }: FileBlockProps): JSX.Element => {
  const [groupFiles, setFiles] = useState<AttachmentFile[] | null>(null);
  const [groupLinks, setLinks] = useState<AttachmentLink[] | null>(null);
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

      const files =
        data?.groups?.[0]?.files
          ?.filter((file): file is GraphQLFile => !!file)
          .map((file) => ({
            id: file.documentId,
            ext: file.ext ?? '',
            url: file.url,
            name: file.name,
            size: file.size,
          })) ?? null;

      const links =
        data?.groups?.[0]?.links
          ?.filter((link): link is GraphQLLink => !!link)
          .map((link) => ({
            id: link.id,
            label: link.label,
            link: link.link,
          })) ?? null;

      setFiles(files);
      setLinks(links);

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

  const hasFiles = groupFiles && groupFiles.length > 0;
  const hasLinks = groupLinks && groupLinks.length > 0;
  const isEmpty = !hasFiles && !hasLinks;

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
      {!error && !loading && isEmpty && <p className="t-align-center">{t('noFilesFound')}</p>}
      {!error && !loading && (hasFiles || hasLinks) && (
        <ul style={{ paddingLeft: 0 }}>
          {hasFiles &&
            groupFiles.map((file, key) => (
              <Fragment key={`activity-${key}`}>
                <Attachment variant="file" file={file} />
              </Fragment>
            ))}
          {hasLinks &&
            groupLinks.map((link, key) => (
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
