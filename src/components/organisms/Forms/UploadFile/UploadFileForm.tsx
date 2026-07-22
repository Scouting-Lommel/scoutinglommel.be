import { useTranslations } from 'next-intl';
import type { JSX } from 'react';
import { generateFormSchema } from '@/lib/helpers/generateFormSchema';
import FormBuilder from '@/components/organisms/Forms/FormBuilder';
import { FormField } from '@/components/organisms/Forms/FormBuilder/FormField/types';
import { UploadFileForm as UploadFileFormProps } from './types';

const UploadFileForm = ({
  initialValues,
  submitForm,
  groupId,
}: UploadFileFormProps): JSX.Element => {
  const t = useTranslations('forms');

  const formFields: FormField[] = [
    {
      type: 'hidden',
      id: 'group-id',
      name: 'group-id',
      value: groupId,
    },
    {
      type: 'file',
      id: 'file',
      name: 'file',
      label: t('uploadFileForm.fields.file.label'),
      required: true,
    },
  ];

  const formSchema = generateFormSchema({ fields: formFields, t });

  const handleSubmit = (data: Record<string, unknown>) => {
    submitForm(data, formFields);
  };

  return (
    <FormBuilder
      formId="upload-file-form"
      fields={formFields}
      initialValues={initialValues}
      formSchema={formSchema}
      submitForm={handleSubmit}
      submitButtonLabel={t('uploadFileForm.buttons.submit.label')}
    />
  );
};

export default UploadFileForm;
