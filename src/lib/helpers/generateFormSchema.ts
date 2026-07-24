import { useTranslations } from 'next-intl';
import * as Yup from 'yup';
import { phoneRegExValidation, urlRegExValidation } from '@/lib/constants/regexValidation';
import { FormField } from '@/components/organisms/Forms/FormBuilder/FormField/types';

type Props = { fields: FormField[]; t: ReturnType<typeof useTranslations<'forms'>> };

const SUPPORTED_FILE_FORMATS = [
  'application/pdf',
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/gif',
];

const MAX_FILE_SIZE = 1024 * 1024 * 5; // = 5MB

/**
 * Generates a Yup validation schema based on the provided fields and translation function.
 *
 * @param {Object} params - The parameters for generating the form schema.
 * @param {Array} params.fields - An array of field objects that define the form structure.
 * @param {Function} params.t - A translation function for localizing error messages.
 * @returns {Yup.ObjectSchema} A Yup object schema representing the form validation rules.
 */
const generateFormSchema = ({ fields, t }: Props) => {
  let schemaObj: { [key: string]: Yup.AnySchema } = {};

  fields.forEach((field) => {
    if (field.type === 'row') {
      field.fieldChildren?.forEach((child) => {
        let schema = getFieldSchema(child, t);
        schemaObj[child.name!] = child.required
          ? schema.required(t('errorMessage.required'))
          : schema.optional();
      });
      return;
    }

    let schema = getFieldSchema(field, t);
    schemaObj[field.name!] = field.required
      ? schema.required(t('errorMessage.required'))
      : schema.optional();
  });

  return Yup.object().shape(schemaObj);
};

/**
 * Generates a Yup validation schema for a given form field.
 *
 * @param field - The form field object containing the field type and other properties.
 * @param t - The translation function for retrieving localized error messages.
 * @returns A Yup schema for the specified form field.
 *
 * The function handles different field types as follows:
 * - 'input', 'textarea', 'date': Returns a Yup string schema.
 * - 'tel': Returns a Yup string schema with a phone number validation.
 * - 'email': Returns a Yup string schema with an email validation.
 * - 'url': Returns a Yup string schema with a URL validation.
 * - 'select': Returns a Yup mixed schema with a oneOf validation for select options.
 * - 'radioGroup': Returns a Yup string schema with a oneOf validation for radio button values.
 * - 'checkbox': Returns a Yup boolean schema, with a required validation if the field is required.
 * - 'file': Returns a Yup mixed schema with file size and format validations, and a required validation if the field is required.
 * - default: Returns a Yup mixed schema.
 */
const getFieldSchema = (
  field: FormField,
  t: ReturnType<typeof useTranslations<'forms'>>,
): Yup.AnySchema => {
  switch (field.type) {
    case 'input':
    case 'textarea':
    case 'date': {
      return Yup.string();
    }

    case 'tel': {
      return Yup.string().matches(phoneRegExValidation, t('errorMessage.phone'));
    }

    case 'email': {
      return Yup.string().email(t('errorMessage.email'));
    }

    case 'url': {
      return Yup.string().matches(urlRegExValidation, t('errorMessage.url'));
    }

    case 'select': {
      const selectValues = field.options?.map((option) => option.value) || ['default'];
      return Yup.mixed().oneOf(selectValues, t('errorMessage.invalidOption'));
    }

    case 'radioGroup': {
      const radioValues = field.radioButtons?.map((field) => field.value) || ['default'];
      return Yup.string().oneOf(radioValues);
    }

    case 'checkbox': {
      return field.required
        ? Yup.boolean().oneOf([true], t('errorMessage.required'))
        : Yup.boolean();
    }

    case 'file': {
      const fileTest = Yup.mixed()
        .test('fileSize', t('errorMessage.fileSize'), (value: unknown) => {
          const files = value as FileList;
          if (files.length < 1) return true;
          return files[0].size <= MAX_FILE_SIZE;
        })
        .test('fileFormat', t('errorMessage.fileFormat'), (value: unknown) => {
          const files = value as FileList;
          if (files.length < 1) return true;
          return SUPPORTED_FILE_FORMATS.includes(files[0].type);
        });
      return field.required
        ? fileTest.test('containsFiles', t('errorMessage.required'), (value: unknown) => {
            const files = value as FileList;
            return files.length > 0;
          })
        : fileTest;
    }

    default: {
      return Yup.mixed();
    }
  }
};

export { generateFormSchema };
