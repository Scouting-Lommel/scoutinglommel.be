'use client';

import { useTranslations } from 'next-intl';
import { Fragment, useCallback, useEffect, useState, type JSX } from 'react';
import { getFiles } from '@/lib/api/files/api';
import { FormProvider } from '@/lib/contexts/FormContext';
import type { GetDashboardGroupPageQuery, GetGroupWithFilesQuery } from '@/types/generated/Graphql';
import BlockContainer from '@/components/atoms/BlockContainer';
import Loader from '@/components/atoms/Loader';
import Attachment from '@/components/molecules/Attachment';
import type {
  File as AttachmentFile,
  Link as AttachmentLink,
} from '@/components/molecules/Attachment/types';
import FileStatus from './FileStatus';
import SectionTitle from './SectionTitle';

type Group = NonNullable<GetDashboardGroupPageQuery['groups'][number]>;
type GraphQLFile = NonNullable<
  NonNullable<GetGroupWithFilesQuery['groups'][number]>['files'][number]
>;
type GraphQLLink = NonNullable<
  NonNullable<NonNullable<GetGroupWithFilesQuery['groups'][number]>['links']>[number]
>;

type Props = {
  group: Group;
};

const FilesSection = ({ group }: Props): JSX.Element => {
  const [groupFiles, setFiles] = useState<AttachmentFile[] | null>(null);
  const [groupLinks, setLinks] = useState<AttachmentLink[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const t = useTranslations('dashboard.groupsDetail.sections.filesSection');

  const fetchFiles = useCallback(async () => {
    setError(false);
    setLoading(true);
    try {
      const data = await getFiles(group.slug ?? '');
      if (!data) {
        setError(true);
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
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [group]);

  useEffect(() => {
    if (group) {
      fetchFiles();
    }
  }, [group, fetchFiles]);

  const addFileCallback = () => {
    fetchFiles();
  };

  const hasFiles = groupFiles && groupFiles.length > 0;
  const hasLinks = groupLinks && groupLinks.length > 0;
  const isEmpty = !hasFiles && !hasLinks;

  return (
    <BlockContainer slug="group-files-section">
      <FormProvider>
        <SectionTitle
          title={t('title')}
          groupId={group.documentId}
          type="file"
          allFiles={groupFiles ?? []}
          allLinks={groupLinks ?? []}
          callback={addFileCallback}
        />

        <BlockContainer slug="group-files" modNoPadding>
          <FileStatus />
          {error && !loading && <p>{t('error')}</p>}
          {!error && loading && <Loader size="sm" modLabelVisible />}
          {!error && !loading && isEmpty && <p>{t('noFilesFound')}</p>}
          {!error && !loading && (hasFiles || hasLinks) && (
            <ul style={{ paddingLeft: 0 }}>
              {hasFiles &&
                groupFiles.map((file, key) => (
                  <Fragment key={`activity-${key}`}>
                    <Attachment
                      variant="file"
                      file={file}
                      deleteCallback={() => fetchFiles()}
                      modDeleteable
                    />
                  </Fragment>
                ))}
              {hasLinks &&
                groupLinks.map((link, key) => (
                  <Fragment key={`activity-${key}`}>
                    <Attachment
                      variant="link"
                      link={link}
                      groupId={group.documentId}
                      allLinks={groupLinks}
                      deleteCallback={() => fetchFiles()}
                      modDeleteable
                    />
                  </Fragment>
                ))}
            </ul>
          )}
        </BlockContainer>
      </FormProvider>
    </BlockContainer>
  );
};

export default FilesSection;
