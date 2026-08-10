import { FormField } from '@/components/organisms/Forms/FormBuilder/FormField/types';

/**
 * Finds a field by its name within a given array of form fields.
 *
 * This function iterates through the provided form fields and returns the field
 * that matches the specified name. If the field is of type 'row', it will also
 * search within its children fields.
 *
 * @param formFields - An array of form fields to search through. Each field can be of any type.
 * @param name - The name of the field to find.
 * @returns The field object that matches the specified name, or undefined if no match is found.
 */
const findFieldByName = (formFields: FormField[], name: string): FormField | undefined => {
  for (let i = 0; i < formFields.length; i++) {
    const field = formFields[i];

    if (field.name === name) {
      return field;
    }

    if (field.type === 'row' && field.fieldChildren) {
      for (let j = 0; j < field.fieldChildren.length; j++) {
        if (field.fieldChildren[j].name === name) {
          return field.fieldChildren[j];
        }
      }
    }
  }
};

/**
 * Finds the label of a form field by its name.
 *
 * @param formFields - The collection of form fields to search within.
 * @param name - The name of the form field to find the label for.
 * @returns The label of the form field if found, otherwise returns the name.
 */
const findFieldLabel = (formFields: FormField[], name: string): string => {
  const field = findFieldByName(formFields, name);

  if (field && 'label' in field && field.label) {
    return field.label;
  }

  return name;
};

/**
 * Checks if a given field name corresponds to a form field that is not of type 'row', 'divider', 'text', or 'captcha'.
 *
 * @param formFields - The collection of form fields to search within.
 * @param name - The name of the field to check.
 * @returns A boolean indicating whether the field is a form field and not of the excluded types.
 */
const isFormField = (formFields: FormField[], name: string): boolean => {
  const field = findFieldByName(formFields, name);

  if (!field) return false;

  return !['row', 'divider', 'text', 'captcha'].includes(field.type);
};

/**
 * Generates an array of objects containing labels and corresponding form data.
 *
 * @param formData - The form data object where keys are field identifiers and values are field values.
 * @param formFields - An array of form field definitions.
 * @returns An array of objects, each containing a `label` and `data` property.
 */
const generateFormDataWithLabel = (
  formData: Record<string, unknown>,
  formFields: FormField[],
): Array<{ label: string; data: unknown }> => {
  return Object.keys(formData || {})
    .map((dataKey) => {
      if (!isFormField(formFields, dataKey)) return;
      return { label: findFieldLabel(formFields, dataKey), data: formData[dataKey] };
    })
    .filter((el): el is { label: string; data: unknown } => !!el);
};

export { generateFormDataWithLabel };
