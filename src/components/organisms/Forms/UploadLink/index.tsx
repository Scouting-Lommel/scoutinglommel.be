import { useTranslations } from 'next-intl';
import { useContext, type JSX } from 'react';
import { FormStatus } from '@/lib/constants/enums/formStatus';
import { FormContext } from '@/lib/contexts/FormContext';
import Banner from '@/components/atoms/Banner';
import UploadLinkForm from './UploadLinkForm';

type Link = {
  label: string;
  link: string;
};

type UploadLinkProps = {
  groupId: string;
  callback: () => void;
  closeClickHandler: () => void;
  allLinks?: Link[];
};

const UploadLink = (props: UploadLinkProps): JSX.Element => {
  const t = useTranslations('forms.uploadLinkForm');

  const { formStatus, setFormStatus } = useContext(FormContext);

  const initialValues = {
    groupId: props.groupId,
  };

  const handleSubmitForm = async (data: Record<string, unknown>) => {
    try {
      await addLink(data);
      setFormStatus(FormStatus.STATUS_SUCCESS);
      props.callback();
      props.closeClickHandler();
      setFormStatus(FormStatus.STATUS_READY);
    } catch (err) {
      console.error(err);
      setFormStatus(FormStatus.STATUS_ERROR);
    }
  };

  const addLink = async (data: Record<string, unknown>) => {
    const groupLinks: Link[] = (props.allLinks ?? []).map((link) => ({
      label: link.label,
      link: link.link,
    }));
    groupLinks.push({ label: data.linkLabel as string, link: data.linkUrl as string });

    await callApi({ id: props.groupId, links: groupLinks });
  };

  const callApi = async (data: { id: string; links: Link[] }) => {
    const response = await fetch('/api/link-attachment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
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
        <UploadLinkForm
          initialValues={initialValues}
          submitForm={handleSubmitForm}
          groupId={props.groupId}
        />
      )}
    </>
  );
};

export default UploadLink;
