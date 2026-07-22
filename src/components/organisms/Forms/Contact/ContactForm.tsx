import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState, type JSX } from 'react';
import { Groups } from '@/lib/constants/enums/groups';
import { Recipients } from '@/lib/constants/enums/recipients';
import { generateFormSchema } from '@/lib/helpers/generateFormSchema';
import FormBuilder from '@/components/organisms/Forms/FormBuilder';
import {
  FormField,
  BaseField,
  RowField,
} from '@/components/organisms/Forms/FormBuilder/FormField/types';
import { ContactForm as ContactFormProps } from './types';

const ContactForm = ({ initialValues, submitForm }: ContactFormProps): JSX.Element => {
  const t = useTranslations('forms');

  const isRowField = (field: FormField): field is RowField & BaseField => field.type === 'row';
  const isRecipientRow = (field: FormField): boolean => field.id === 'recipientRow';
  const isGroupField = (field: FormField): boolean => field.id === 'group';

  const onRecipientChange = (event: any) => {
    updateFields(event.target.value);
  };

  const groupSelect = useMemo<FormField>(
    () => ({
      id: 'group',
      type: 'select',
      name: 'group',
      label: t('contactForm.fields.group.label'),
      options: Object.values(Groups).map((group) => ({ label: group, value: group })),
      required: false,
    }),
    [t],
  );

  const updateFields = useCallback(
    (recipient: Recipients) => {
      setFields((prevFields) => {
        const rowIndex = prevFields.findIndex(isRecipientRow);
        if (rowIndex === -1) return prevFields;

        const newFields = [...prevFields];
        const field = newFields[rowIndex];

        if (isRowField(field)) {
          const fieldChildren = field.fieldChildren;

          if (fieldChildren) {
            if (recipient === Recipients.GROUP) {
              const groupExists = fieldChildren.some(isGroupField);
              if (!groupExists) {
                fieldChildren.push(groupSelect);
              }
            }
            if (recipient !== Recipients.GROUP) {
              const groupIndex = fieldChildren.findIndex(isGroupField);
              if (groupIndex !== -1) {
                fieldChildren.splice(groupIndex, 1);
              }
            }
          }
        }

        return newFields;
      });
    },
    [groupSelect],
  );

  const formFields: FormField[] = [
    {
      type: 'row',
      id: 'nameRow',
      name: 'nameRow',
      fieldChildren: [
        {
          type: 'input',
          id: 'firstName',
          name: 'firstName',
          label: t('contactForm.fields.firstName.label'),
          required: true,
          autoComplete: 'given-name',
        },
        {
          type: 'input',
          id: 'lastName',
          name: 'lastName',
          label: t('contactForm.fields.lastName.label'),
          required: true,
          autoComplete: 'family-name',
        },
      ],
    },
    {
      type: 'email',
      id: 'email',
      name: 'email',
      label: t('contactForm.fields.email.label'),
      placeholder: 'email@example.com',
      required: true,
      autoComplete: 'email',
    },
    {
      type: 'row',
      id: 'recipientRow',
      name: 'recipientRow',
      fieldChildren: [
        {
          type: 'select',
          id: 'recipient',
          name: 'recipient',
          label: t('contactForm.fields.recipient.label'),
          options: Object.values(Recipients).map((recipient) => ({
            label: recipient,
            value: recipient,
          })),
          required: true,
          customChangeBehaviour: onRecipientChange,
        },
      ],
    },
    {
      type: 'textarea',
      id: 'body',
      name: 'body',
      label: t('contactForm.fields.body.label'),
      rows: 8,
      required: true,
    },
    {
      type: 'captcha',
      id: 'captcha',
      name: 'captcha',
    },
    {
      type: 'checkbox',
      id: 'terms-and-conditions',
      name: 'terms-and-conditions',
      label: t('contactForm.fields.termsAndConditions.label'),
      required: true,
    },
  ];

  const [fields, setFields] = useState<FormField[]>(formFields);
  const formSchema = generateFormSchema({ fields: formFields, t });

  const handleSubmit = (data: any) => {
    submitForm(data, fields);
  };

  useEffect(() => {
    updateFields(initialValues.recipient);
  }, [initialValues.recipient, updateFields]);

  return (
    <FormBuilder
      formId="contact-form"
      fields={fields}
      initialValues={initialValues}
      formSchema={formSchema}
      submitForm={handleSubmit}
      submitButtonLabel={t('contactForm.buttons.submit.label')}
    />
  );
};

export default ContactForm;
