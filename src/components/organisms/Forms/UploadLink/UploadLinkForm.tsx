import { useTranslations } from 'next-intl';
import type { JSX } from 'react';
import { urlRegExValidation } from '@/lib/constants/regexValidation';
import { generateFormSchema } from '@/lib/helpers/generateFormSchema';
import FormBuilder from '@/components/organisms/Forms/FormBuilder';
import { FormField } from '@/components/organisms/Forms/FormBuilder/FormField/types';
import { UploadLinkForm as UploadLinkFormProps } from './types';

const UploadLinkForm = ({
  initialValues,
  submitForm,
  groupId,
}: UploadLinkFormProps): JSX.Element => {
  const t = useTranslations('forms');

  const formFields: FormField[] = [
    {
      type: 'hidden',
      id: 'groupId',
      name: 'groupId',
      value: groupId,
    },
    {
      type: 'row',
      id: 'linkRow',
      name: 'linkRow',
      fieldChildren: [
        {
          type: 'input',
          id: 'linkLabel',
          name: 'linkLabel',
          label: t('uploadLinkForm.fields.linkLabel.label'),
          placeholder: t('uploadLinkForm.fields.linkLabel.placeholder'),
          required: true,
        },
        {
          type: 'url',
          pattern: urlRegExValidation,
          id: 'linkUrl',
          name: 'linkUrl',
          label: t('uploadLinkForm.fields.linkUrl.label'),
          placeholder: t('uploadLinkForm.fields.linkUrl.placeholder'),
          required: true,
        },
      ],
    },
  ];

  const formSchema = generateFormSchema({ fields: formFields, t });

  const handleSubmit = (data: Record<string, unknown>) => {
    submitForm(data, formFields);
  };

  return (
    <FormBuilder
      formId="upload-link-form"
      fields={formFields}
      initialValues={initialValues}
      formSchema={formSchema}
      submitForm={handleSubmit}
      submitButtonLabel={t('uploadLinkForm.buttons.submit.label')}
    />
  );
};

export default UploadLinkForm;
