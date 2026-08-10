import { useTranslations } from 'next-intl';
import { useContext, type JSX } from 'react';
import { FormStatus } from '@/lib/constants/enums/formStatus';
import { FormContext } from '@/lib/contexts/FormContext';
import Banner from '@/components/atoms/Banner';
import UploadFileForm from './UploadFileForm';

type UploadFileProps = {
  groupId: string;
  callback: () => void;
  closeClickHandler: () => void;
  allFiles?: Array<{ id: string | number }>;
};

const UploadFile = (props: UploadFileProps): JSX.Element => {
  const t = useTranslations('forms.uploadFileForm');

  const { formStatus, setFormStatus } = useContext(FormContext);

  const initialValues = {
    groupId: props.groupId,
  };

  const handleSubmitForm = async (data: Record<string, unknown>) => {
    try {
      await uploadFile(data.file as File);
      setFormStatus(FormStatus.STATUS_SUCCESS);
      props.callback();
      props.closeClickHandler();
      setFormStatus(FormStatus.STATUS_READY);
    } catch (err) {
      console.error(err);
      setFormStatus(FormStatus.STATUS_ERROR);
    }
  };

  const uploadFile = async (data: File) => {
    const formData = new FormData();
    formData.append('files', data);

    const allFiles = props.allFiles?.map((file) => String(file.id)) || [];

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result[0].id) {
        allFiles.push(String(result[0].id));
      }

      await callApi({ id: props.groupId, files: allFiles });

      setFormStatus(FormStatus.STATUS_SUCCESS);
      props.callback();
      props.closeClickHandler();
      setFormStatus(FormStatus.STATUS_READY);
    } catch (err) {
      throw new Error('Failed to perform action', { cause: err });
    }
  };

  const callApi = async (data: { id: string; files: string[] }) => {
    const response = await fetch('/api/file-attachment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'create', data }),
    });

    if (!response.ok) {
      throw new Error('Failed to perform action');
    }

    return response.json();
  };

  return (
    <>
      {formStatus === FormStatus.STATUS_LOADING && (
        <Banner variant="info">{t('formStatus.loading')}</Banner>
      )}
      {formStatus === FormStatus.STATUS_ERROR && (
        <Banner variant="error">{t('formStatus.error')}</Banner>
      )}
      {formStatus === FormStatus.STATUS_SUCCESS && (
        <>
          <Banner variant="success">{t('formStatus.success')}</Banner>
        </>
      )}

      {formStatus !== FormStatus.STATUS_SUCCESS && (
        <UploadFileForm
          initialValues={initialValues}
          submitForm={handleSubmitForm}
          groupId={props.groupId}
        />
      )}
    </>
  );
};

export default UploadFile;
