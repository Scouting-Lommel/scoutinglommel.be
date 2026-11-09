import { useTranslations } from 'next-intl';
import { useContext, type JSX } from 'react';
import type { FormEmailPayload, FormEmailRecipient } from '@/lib/api/forms/form-email';
import { FormStatus } from '@/lib/constants/enums/formStatus';
import { Groups } from '@/lib/constants/enums/groups';
import { Recipients } from '@/lib/constants/enums/recipients';
import { FormContext } from '@/lib/contexts/FormContext';
import { generateFormDataWithLabel } from '@/lib/helpers/generateFormDataWithLabel';
import { sendEmail } from '@/lib/helpers/sendEmail';
import Banner from '@/components/atoms/Banner';
import { FormField } from '@/components/organisms/Forms/FormBuilder/FormField/types';
import ContactConfirmation from './Confirmation';
import ContactForm from './ContactForm';

type ContactProps = {
  recipient?: string;
  group?: string;
};

const Contact = (props: ContactProps): JSX.Element => {
  const t = useTranslations('forms.contactForm');

  const { formStatus, setFormStatus } = useContext(FormContext);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    recipient: props.recipient || Recipients.GENERAL,
    group: props.group || Groups.KAPOENEN,
    body: '',
  };

  const submitForm = async (data: Record<string, unknown>, formFields: FormField[]) => {
    const captchaToken = data['captcha-token'] as string;

    const recipient: FormEmailRecipient =
      data.recipient === Recipients.RENTALS
        ? 'rentals'
        : data.recipient === Recipients.GROUP
          ? 'group'
          : 'general';
    const group = recipient === 'group' ? (data.group as Groups) : undefined;
    const replyTo = data.email as string;

    delete data['recipient'];
    delete data['group'];
    delete data['terms-and-conditions'];
    delete data['captcha-token'];

    const payload: FormEmailPayload = {
      recipient,
      ...(group ? { group } : {}),
      formTitle: t('email.title'),
      formData: generateFormDataWithLabel(data, formFields).map(({ label, data: value }) => ({
        label,
        data: String(value ?? ''),
      })),
      replyTo,
    };

    const callback = (resp: { status: number }) => {
      if (resp.status === 200) {
        setFormStatus(FormStatus.STATUS_SUCCESS);
        return;
      }

      setFormStatus(FormStatus.STATUS_ERROR);
    };

    sendEmail({ payload, callback, captchaToken });
  };

  return (
    <>
      {formStatus === FormStatus.STATUS_LOADING && (
        <Banner variant="info">{t('formStatus.loading')}</Banner>
      )}
      {formStatus === FormStatus.STATUS_ERROR && (
        <Banner variant="error">{t('formStatus.error')}</Banner>
      )}
      {(formStatus === FormStatus.STATUS_CAPTCHA_NOT_VERIFIED ||
        formStatus === FormStatus.STATUS_CAPTCHA_ERROR) && (
        <Banner variant="error">{t('formStatus.captchaError')}</Banner>
      )}
      {formStatus === FormStatus.STATUS_SUCCESS && (
        <>
          <Banner variant="success">{t('formStatus.success')}</Banner>
          <ContactConfirmation />
        </>
      )}

      {formStatus !== FormStatus.STATUS_SUCCESS && (
        <ContactForm initialValues={initialValues} submitForm={submitForm} />
      )}
    </>
  );
};

export default Contact;
