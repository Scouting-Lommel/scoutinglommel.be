'use client';

import cn from 'classnames';
import { useTranslations } from 'next-intl';
import { useState, useContext, useEffect, type JSX } from 'react';
import { Lightbox } from 'react-modal-image';
import { FormStatus } from '@/lib/constants/enums/formStatus';
import { FormContext } from '@/lib/contexts/FormContext';
import { formatFileSize } from '@/lib/helpers/formatFileSize';
import Icon from '@/components/atoms/Icon';
import Loader from '@/components/atoms/Loader';
import Typography from '@/components/atoms/Typography';
import '../Attachment.css';
import { File as FileProps, Extensions } from '../types';

const extMap: Extensions = {
  pdf: 'document',
  doc: 'document',
  docx: 'document',
  ppt: 'presentation',
  pptx: 'presentation',
  jpg: 'image',
  jpeg: 'image',
  png: 'image',
  gif: 'image',
};

const File = ({
  id,
  ext,
  url,
  name,
  size,
  modDeleteable,
  deleteCallback,
  groupId,
  allFiles,
}: FileProps): JSX.Element => {
  const t = useTranslations('common.attachment.file');

  const [loading, setLoading] = useState<boolean>(false);
  const [lightboxActive, setLightboxActive] = useState<boolean>(false);
  const { setFormStatus, setRemoveStatusAfterTimeout } = useContext(FormContext);

  const imageExt = ['.png', '.jpg', '.jpeg', '.gif'];
  const isImage = imageExt.includes(ext);

  useEffect(() => {
    setRemoveStatusAfterTimeout(true);
  }, [setRemoveStatusAfterTimeout]);

  const handleDeleteFile = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!groupId || !allFiles || allFiles.length < 1 || !deleteCallback) return;

    if (confirm(t('confirmation', { attachmentTitle: name }))) {
      try {
        setLoading(true);
        setFormStatus(FormStatus.STATUS_LOADING);
        await callApi({
          id: groupId,
          files: allFiles.filter((file) => file.id !== id).map((file) => file.id),
        });
        deleteCallback();
        setFormStatus(FormStatus.STATUS_DELETE_SUCCESS);
      } catch (err) {
        console.error(err);
        setFormStatus(FormStatus.STATUS_DELETE_ERROR);
      }
    }

    setLoading(false);
  };

  const callApi = async (data: { id: string; files: string[] }) => {
    const response = await fetch('/api/file-attachment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'delete', data }),
    });

    if (!response.ok) {
      throw new Error('Failed to perform action');
    }

    return response.json();
  };

  const icon = extMap[ext.slice(1)] ? extMap[ext.slice(1)] : 'file';

  return (
    <>
      <li
        className={cn('attachment attachment__container', isImage && 'attachment--clickable')}
        role="button"
        onClick={() => setLightboxActive(!lightboxActive)}
      >
        <Icon name={icon} aria-label={ext.slice(1)} size="xl" className="attachment__icon" />
        <div className="attachment__info">
          <Typography className="attachment__info__name">{name.replaceAll(ext, '')}</Typography>
          <Typography className="attachment__info__filesize">{formatFileSize(size)}</Typography>
        </div>
        <a
          className="attachment__download-button"
          aria-label={t('downloadFile')}
          type="button"
          href={url}
          target="_blank"
          onClick={(e) => e.stopPropagation()}
        >
          <Icon name="download" size="sm" />
        </a>
        {modDeleteable && !loading && (
          <button
            className="attachment__delete-button"
            aria-label={t('deleteFile')}
            type="button"
            onClick={handleDeleteFile}
          >
            <Icon name="trash" size="sm" />
          </button>
        )}
        {modDeleteable && loading && (
          <div className="attachment__loader">
            <Loader size="xs" />
          </div>
        )}
      </li>

      {isImage && lightboxActive && (
        <Lightbox
          small={url}
          medium={url}
          large={url}
          alt={name}
          onClose={() => setLightboxActive(false)}
        />
      )}
    </>
  );
};

export default File;
