import { useTranslations } from 'next-intl';
import type { JSX } from 'react';
import { generateFormSchema } from '@/lib/helpers/generateFormSchema';
import FormBuilder from '@/components/organisms/Forms/FormBuilder';
import { FormField } from '@/components/organisms/Forms/FormBuilder/FormField/types';
import { ActivityForm as ActivityFormProps } from './types';

const ActivityForm = ({
  initialValues,
  activityId,
  submitForm,
  deleteActivity,
}: ActivityFormProps): JSX.Element => {
  const t = useTranslations('forms');

  const formFields: FormField[] = [
    {
      type: 'hidden',
      id: 'activity-id',
      name: 'activity-id',
      value: activityId,
    },
    {
      type: 'input',
      id: 'title',
      name: 'title',
      label: t('activityForm.fields.title.label'),
      required: true,
    },
    {
      type: 'row',
      id: 'date-row',
      name: 'date-row',
      fieldChildren: [
        {
          type: 'datetime',
          id: 'start',
          name: 'start',
          label: t('activityForm.fields.start.label'),
          required: true,
        },
        {
          type: 'datetime',
          id: 'end',
          name: 'end',
          label: t('activityForm.fields.end.label'),
          required: true,
        },
      ],
    },
    {
      type: 'textarea',
      id: 'description',
      name: 'description',
      label: t('activityForm.fields.description.label'),
      rows: 6,
      required: true,
    },
  ];

  const formSchema = generateFormSchema({
    fields: formFields,
    t,
  });

  const handleSubmit = (data: Record<string, unknown>) => {
    submitForm(data, formFields);
  };

  return (
    <FormBuilder
      formId="activity-form"
      fields={formFields}
      initialValues={initialValues}
      formSchema={formSchema}
      submitForm={handleSubmit}
      submitButtonLabel={t('activityForm.buttons.submit.label')}
      secondaryButton={
        activityId
          ? {
              label: t('activityForm.buttons.secondary.label'),
              variant: 'danger',
              onClick: deleteActivity,
            }
          : undefined
      }
    />
  );
};

export default ActivityForm;
