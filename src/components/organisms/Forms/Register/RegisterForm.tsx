import { useTranslations } from 'next-intl';
import { useState, type JSX } from 'react';
import { Groups } from '@/lib/constants/enums/groups';
import { generateFormSchema } from '@/lib/helpers/generateFormSchema';
import { getCurrentWorkingYear } from '@/lib/helpers/getCurrentWorkingYear';
import FormBuilder from '@/components/organisms/Forms/FormBuilder';
import {
  FormField,
  HiddenField,
  InputField,
  RowField,
} from '@/components/organisms/Forms/FormBuilder/FormField/types';
import { RegisterForm as RegisterFormProps } from './types';

const RegisterForm = ({ initialValues, submitForm }: RegisterFormProps): JSX.Element => {
  const t = useTranslations('forms');

  let currentBirthday: string = '';
  let isAkabe: boolean = false;

  const isRowField = (field: FormField): field is RowField => field.type === 'row';
  const isInputField = (field: FormField): field is InputField => field.type === 'input';
  const isHiddenField = (field: FormField): field is HiddenField => field.type === 'hidden';
  const isBirthdayRow = (field: FormField): boolean => field.id === 'birthdayRow';
  const isMemberGroup = (field: FormField): boolean => field.id === 'memberGroup';
  const isMemberGroup_vis = (field: FormField): boolean => field.id === 'memberGroup_vis';

  const getGroupByBirthday = (birthday: string) => {
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(birthday).getFullYear();
    const age = currentYear - birthYear;

    if (age >= 6 && age <= 7) return Groups.KAPOENEN;
    if (age >= 8 && age <= 10) return Groups.WELPEN;
    if (age >= 11 && age <= 13) return Groups.JONGGIVERS;
    if (age >= 14 && age <= 16) return Groups.GIVERS;
    if (age === 17) return Groups.JIN;
    if (age >= 18) return 'Leiding';
    return '/';
  };

  const onBirthdayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    currentBirthday = event.target.value;

    const rowIndex = fields.findIndex(isBirthdayRow);
    const field = fields[rowIndex];

    if (rowIndex > -1) {
      if (isRowField(field)) {
        const fieldChildIndex_vis = field.fieldChildren?.findIndex(isMemberGroup_vis);
        const fieldChildIndex = field.fieldChildren?.findIndex(isMemberGroup);

        if (fieldChildIndex && fieldChildIndex_vis) {
          if (!isAkabe) {
            setFields((prevFields) => {
              const newFields = [...prevFields];
              const newField = newFields[rowIndex];

              if (isRowField(newField)) {
                const fieldChildren = newField.fieldChildren;

                if (fieldChildren) {
                  const groupField_vis = fieldChildren[fieldChildIndex_vis];
                  const groupField = fieldChildren[fieldChildIndex];

                  if (isInputField(groupField_vis) && isHiddenField(groupField)) {
                    groupField_vis.value = getGroupByBirthday(currentBirthday);
                    groupField.value = getGroupByBirthday(currentBirthday);
                  }
                }
              }

              return newFields;
            });
          }
        }
      }
    }
  };

  const onIsAkabeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    isAkabe = event.target.checked;

    const rowIndex = fields.findIndex(isBirthdayRow);
    const field = fields[rowIndex];

    if (rowIndex > -1) {
      if (isRowField(field)) {
        const fieldChildIndex_vis = field.fieldChildren?.findIndex(isMemberGroup_vis);
        const fieldChildIndex = field.fieldChildren?.findIndex(isMemberGroup);

        if (fieldChildIndex && fieldChildIndex_vis) {
          setFields((prevFields) => {
            const newFields = [...prevFields];
            const newField = newFields[rowIndex];

            if (isRowField(newField)) {
              const fieldChildren = newField.fieldChildren;

              if (fieldChildren) {
                const groupField_vis = fieldChildren[fieldChildIndex_vis];
                const groupField = fieldChildren[fieldChildIndex];

                if (isInputField(groupField_vis) && isHiddenField(groupField)) {
                  if (isAkabe) {
                    groupField_vis.value = Groups.AKABE;
                    groupField.value = Groups.AKABE;
                  }

                  if (!isAkabe) {
                    groupField_vis.value = getGroupByBirthday(currentBirthday);
                    groupField.value = getGroupByBirthday(currentBirthday);
                  }
                }
              }
            }

            return newFields;
          });
        }
      }
    }
  };

  const formFields: FormField[] = [
    {
      type: 'text',
      id: 'registerIntro',
      name: 'registerIntro',
      text: t('registerForm.fields.registerIntro.label', { year: getCurrentWorkingYear() }),
    },
    {
      type: 'divider',
      id: 'divider-0',
      name: 'divider-0',
    },
    {
      type: 'text',
      id: 'memberToRegister',
      name: 'memberToRegister',
      text: t('registerForm.fields.memberToRegister.label'),
      className: 't-headline-3',
    },
    {
      type: 'row',
      id: 'nameRow',
      name: 'nameRow',
      fieldChildren: [
        {
          type: 'input',
          id: 'firstName',
          name: 'firstName',
          label: t('registerForm.fields.firstName.label'),
          required: true,
          autoComplete: 'given-name',
        },
        {
          type: 'input',
          id: 'lastName',
          name: 'lastName',
          label: t('registerForm.fields.lastName.label'),
          required: true,
          autoComplete: 'family-name',
        },
      ],
    },
    {
      type: 'row',
      id: 'birthdayRow',
      name: 'birthdayRow',
      fieldChildren: [
        {
          id: 'birthday',
          type: 'date',
          name: 'birthday',
          label: t('registerForm.fields.birthday.label'),
          required: true,
          customChangeBehaviour: onBirthdayChange,
        },
        {
          id: 'memberGroup_vis',
          type: 'input',
          name: 'memberGroup',
          label: t('registerForm.fields.group.label'),
          value: '',
          disabled: true,
        },
        {
          id: 'memberGroup',
          type: 'hidden',
          name: 'memberGroup',
          value: '',
        },
      ],
    },
    {
      id: 'isAkabe',
      name: 'isAkabe',
      type: 'checkbox',
      label: t('registerForm.fields.isAkabe.label'),
      customChangeBehaviour: onIsAkabeChange,
    },
    {
      id: 'genderRow',
      name: 'gender',
      type: 'radioGroup',
      label: t('registerForm.fields.gender.label'),
      direction: 'row',
      required: true,
      radioButtons: [
        {
          id: 'm',
          name: 'm',
          label: t('registerForm.fields.gender.options.male'),
          value: 'm',
        },
        {
          id: 'v',
          name: 'v',
          label: t('registerForm.fields.gender.options.female'),
          value: 'v',
        },
        {
          id: 'x',
          name: 'x',
          label: t('registerForm.fields.gender.options.other'),
          value: 'x',
        },
      ],
    },
    {
      type: 'divider',
      id: 'divider-1',
      name: 'divider-1',
    },
    {
      type: 'text',
      id: 'contactAndAddress',
      name: 'contactAndAddress',
      text: t('registerForm.fields.contactAndAddress.label'),
      className: 't-headline-3',
    },
    {
      type: 'row',
      id: 'contactRow',
      name: 'contactRow',
      fieldChildren: [
        {
          type: 'email',
          id: 'email',
          name: 'email',
          label: t('registerForm.fields.email.label'),
          placeholder: 'email@example.com',
          required: true,
          autoComplete: 'email',
        },
        {
          type: 'tel',
          id: 'telephoneNumber',
          name: 'telephoneNumber',
          label: t('registerForm.fields.telephoneNumber.label'),
          required: true,
          autoComplete: 'tel',
        },
      ],
    },
    {
      type: 'input',
      id: 'address',
      name: 'address',
      label: t('registerForm.fields.address.label'),
      placeholder: t('registerForm.fields.address.placeholder'),
      required: true,
      autoComplete: 'street-address',
    },
    {
      type: 'row',
      id: 'addressRow',
      name: 'addressRow',
      fieldChildren: [
        {
          type: 'input',
          id: 'postalCode',
          name: 'postalCode',
          label: t('registerForm.fields.postalCode.label'),
          required: true,
          autoComplete: 'postal-code',
        },
        {
          type: 'input',
          id: 'city',
          name: 'city',
          label: t('registerForm.fields.city.label'),
          required: true,
          autoComplete: 'address-level-2',
        },
      ],
    },
    {
      type: 'divider',
      id: 'divider-2',
      name: 'divider-2',
    },
    {
      type: 'text',
      id: 'extraInfo',
      name: 'extraInfo',
      text: t('registerForm.fields.extraInfo.label'),
      className: 't-headline-3',
    },
    {
      id: 'workingYear',
      type: 'hidden',
      name: 'workingYear',
      label: t('registerForm.fields.workingYear.label'),
      value: getCurrentWorkingYear(),
    },
    {
      type: 'textarea',
      id: 'comments',
      name: 'comments',
      label: t('registerForm.fields.comments.label'),
      rows: 8,
    },
    {
      type: 'divider',
      id: 'divider-3',
      name: 'divider-3',
    },
    {
      id: 'captcha',
      type: 'captcha',
      name: 'captcha',
    },
    {
      id: 'terms-and-conditions',
      name: 'terms-and-conditions',
      type: 'checkbox',
      label: t('registerForm.fields.termsAndConditions.label'),
      required: true,
    },
  ];

  const [fields, setFields] = useState<FormField[]>(formFields);
  const formSchema = generateFormSchema({ fields: formFields, t });

  const handleSubmit = (data: Record<string, unknown>) => {
    submitForm(data, fields);
  };

  return (
    <FormBuilder
      formId="contact-form"
      fields={fields}
      initialValues={initialValues}
      formSchema={formSchema}
      submitForm={handleSubmit}
      submitButtonLabel={t('registerForm.buttons.submit.label')}
    />
  );
};

export default RegisterForm;
