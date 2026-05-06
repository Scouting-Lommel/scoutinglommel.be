'use client';

import { useTranslations } from 'next-intl';
import { Fragment, useCallback, useEffect, useState, type JSX } from 'react';
import { getFiles } from '@/lib/api/files/api';
import { FormProvider } from '@/lib/contexts/FormContext';
import BlockContainer from '@/components/atoms/BlockContainer';
import Loader from '@/components/atoms/Loader';
import Attachment from '@/components/molecules/Attachment';
import FileStatus from './FileStatus';
import SectionTitle from './SectionTitle';

type Props = {
  group: any;
};

const FilesSection = ({ group }: Props): JSX.Element => {
  const [groupFiles, setFiles] = useState<any>(null);
  const [groupLinks, setLinks] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const t = useTranslations('dashboard.groupsDetail.sections.filesSection');

  const fetchFiles = useCallback(async () => {
    setError(false);
    setLoading(true);
    try {
      const data = await getFiles(group.slug);
      if (!data) {
        setError(true);
        return;
      }
      setFiles(data?.groups?.[0]?.files);
      setLinks(data?.groups?.[0]?.links);
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

  return (
    <BlockContainer slug="group-files-section">
      <FormProvider>
        <SectionTitle
          title={t('title')}
          groupId={group.documentId}
          type="file"
          allFiles={groupFiles}
          allLinks={groupLinks}
          callback={addFileCallback}
        />

        <BlockContainer slug="group-files" modNoPadding>
          <FileStatus />
          {error && !loading && <p>{t('error')}</p>}
          {!error && loading && <Loader size="sm" modLabelVisible />}
          {!error &&
            !loading &&
            (!Boolean(groupFiles) || groupFiles?.length === 0) &&
            (!Boolean(groupLinks) || groupLinks?.length === 0) && <p>{t('noFilesFound')}</p>}
          {!error && !loading && (groupFiles?.length > 0 || groupLinks?.length > 0) && (
            <ul style={{ paddingLeft: 0 }}>
              {groupFiles?.length > 0 &&
                groupFiles?.map((file: any, key: any) => (
                  <Fragment key={`activity-${key}`}>
                    <Attachment
                      variant="file"
                      file={file}
                      deleteCallback={() => fetchFiles()}
                      modDeleteable
                    />
                  </Fragment>
                ))}
              {groupLinks?.length > 0 &&
                groupLinks?.map((link: any, key: any) => (
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
