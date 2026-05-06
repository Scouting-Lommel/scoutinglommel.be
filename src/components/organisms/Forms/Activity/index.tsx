import { useTranslations } from 'next-intl';
import { useContext, type JSX } from 'react';
import { FormStatus } from '@/lib/constants/enums/formStatus';
import { FormContext } from '@/lib/contexts/FormContext';
import Banner from '@/components/atoms/Banner';
import ActivityForm from './ActivityForm';

const Activity = (props: any): JSX.Element => {
  const t = useTranslations('forms.activityForm');

  const { formStatus, setFormStatus } = useContext(FormContext);
  let initialValues = {};

  if (props.activity) {
    initialValues = {
      title: props.activity.title,
      start: `${props.activity.startDate}T${props.activity.startTime}`,
      end: `${props.activity.endDate}T${props.activity.endTime}`,
      description: props.activity.description,
    };
  }

  if (props.groupId) {
    const start = new Date();
    const end = new Date();
    start.setHours(14, 0);
    end.setHours(16, 30);

    initialValues = {
      title: '',
      start: `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-${String(
        start.getDate(),
      ).padStart(2, '0')}T${String(start.getHours()).padStart(2, '0')}:${String(
        start.getMinutes(),
      ).padStart(2, '0')}`,
      end: `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, '0')}-${String(
        end.getDate(),
      ).padStart(2, '0')}T${String(end.getHours()).padStart(2, '0')}:${String(
        end.getMinutes(),
      ).padStart(2, '0')}`,
      description: '',
    };
  }

  const handleSubmitForm = async (data: any) => {
    if (props.activity) {
      let activity = {
        documentId: data['activity-id'],
        title: data.title,
        description: data.description,
        startDate: data.start.split('T')[0],
        startTime: `${data.start.split('T')[1]}:00.000`,
        endDate: data.end.split('T')[0],
        endTime: `${data.end.split('T')[1]}:00.000`,
      };

      try {
        await callApi('update', activity);
        setFormStatus(FormStatus.STATUS_SUCCESS);
        props.callback();
      } catch (err: any) {
        console.error(err);
        setFormStatus(FormStatus.STATUS_ERROR);
      }
    }

    if (props.groupId) {
      let activity = {
        title: data.title,
        description: data.description,
        startDate: data.start.split('T')[0],
        startTime: `${data.start.split('T')[1]}:00.000`,
        endDate: data.end.split('T')[0],
        endTime: `${data.end.split('T')[1]}:00.000`,
        groupDocumentId: props.groupId,
      };

      try {
        await callApi('create', activity);
        setFormStatus(FormStatus.STATUS_SUCCESS);
        props.callback();
        props.closeClickHandler();
        setFormStatus(FormStatus.STATUS_READY);
      } catch (err: any) {
        console.error(err);
        setFormStatus(FormStatus.STATUS_ERROR);
      }
    }
  };

  const handleDeleteActivity = async () => {
    if (confirm(t('deleteConfirmation', { activityTitle: props.activity.title }))) {
      try {
        await callApi('delete', props.activity.id);
        setFormStatus(FormStatus.STATUS_DELETE_SUCCESS);
        props.callback();
      } catch (err: any) {
        console.error(err);
        setFormStatus(FormStatus.STATUS_DELETE_ERROR);
      }
    }
  };

  const callApi = async (action: 'update' | 'create' | 'delete', data: any) => {
    try {
      const response = await fetch('/api/activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action, data }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error(`API Error (${action}):`, result);
        throw new Error(result.error || `Failed to ${action} activity`);
      }

      if (!result.success) {
        console.error(`API Warning (${action}):`, result);
        throw new Error(`Activity ${action} did not succeed`);
      }

      return result;
    } catch (error) {
      console.error(`Network/API Error (${action}):`, error);
      throw error;
    }
  };

  return (
    <>
      {formStatus === FormStatus.STATUS_LOADING && (
        <Banner variant="info">{t('formStatus.loading')}</Banner>
      )}
      {formStatus === FormStatus.STATUS_ERROR && (
        <Banner variant="error">{t('formStatus.error')}</Banner>
      )}
      {formStatus === FormStatus.STATUS_DELETE_ERROR && (
        <Banner variant="error">{t('formStatus.deleteError')}</Banner>
      )}
      {formStatus === FormStatus.STATUS_SUCCESS && (
        <>
          <Banner variant="success">{t('formStatus.success')}</Banner>
        </>
      )}
      {formStatus === FormStatus.STATUS_DELETE_SUCCESS && (
        <>
          <Banner variant="success">{t('formStatus.deleteSuccess')}</Banner>
        </>
      )}

      {formStatus !== FormStatus.STATUS_SUCCESS && (
        <ActivityForm
          activityId={props.activity?.id}
          initialValues={initialValues}
          submitForm={handleSubmitForm}
          deleteActivity={handleDeleteActivity}
        />
      )}
    </>
  );
};

export default Activity;
