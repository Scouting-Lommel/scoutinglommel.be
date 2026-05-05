import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, type JSX } from 'react';
import { useForm } from 'react-hook-form';
import { FormStatus } from '@/lib/constants/enums/formStatus';
import { FormContext } from '@/lib/contexts/FormContext';
import Button from '@/components/atoms/Button';
import { FormBuilder as FormBuilderProps } from './types';
import FormField from './FormField';
import { FormField as FormFieldType } from './FormField/types';
import './Form.css';


const FormBuilder = ({
  formId,
  fields,
  initialValues,
  formSchema,
  submitForm,
  submitButtonLabel,
  secondaryButton,
}: FormBuilderProps): JSX.Element => {
  const { formStatus, setFormStatus } = useContext(FormContext);

  const onSubmit = async (_: any, event: any) => {
    setFormStatus(FormStatus.STATUS_LOADING);

    const body = new FormData(event.target as HTMLFormElement);
    const token = body.get('cf-turnstile-response');
    const formValues = getFormValues(body);
    formValues['captcha-token'] = token;

    submitForm(formValues);
  };

  const getFormValues = (formData: any) => {
    const formValues: Record<string, any> = {};

    const mapFields = (formFields: FormFieldType[]) => {
      formFields.forEach((field: FormFieldType) => {
        if (field.type === 'captcha') return;

        if (field.type === 'row' && field.fieldChildren) {
          mapFields(field.fieldChildren);
          return;
        }

        if (field.name) {
          formValues[field.name] = formData.get(field.name);
        }
      });
    };

    mapFields(fields);

    return formValues;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: initialValues,
  });

  return (
    <form noValidate id={formId} name={formId} className="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Form Fields */}
      {fields?.map((field) => (
        <FormField key={field.id} register={register} errors={errors} {...field} />
      ))}

      {/* Form footer */}
      <div className="form__footer">
        {/* Buttons */}
        <div className="form__footer__buttons">
          <Button
            label={submitButtonLabel}
            loading={formStatus === FormStatus.STATUS_LOADING}
            type="submit"
          />
          {secondaryButton && <Button {...secondaryButton} type="button" />}
        </div>

        {/* Required fields footnote */}
        <div className="form__footer__footnote">
          <span className="form__footer__footnote__asterisk">*</span>
          <span>Verplicht veld</span>
        </div>
      </div>
    </form>
  );
};

export default FormBuilder;
