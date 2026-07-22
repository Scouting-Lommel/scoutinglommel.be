import { useTranslations } from 'next-intl';
import { useContext, type JSX } from 'react';
import { generalEmailAddress, rentalsEmailAddress } from '@/lib/constants/emailAddress';
import { FormStatus } from '@/lib/constants/enums/formStatus';
import { Groups } from '@/lib/constants/enums/groups';
import { Recipients } from '@/lib/constants/enums/recipients';
import { FormContext } from '@/lib/contexts/FormContext';
import { generateFormDataWithLabel } from '@/lib/helpers/generateFormDataWithLabel';
import { Email, generateEmail, sendEmail } from '@/lib/helpers/sendEmail';
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
    let recipient: string;
    const captchaToken = data['captcha-token'] as string;

    switch (data.recipient) {
      case Recipients.RENTALS: {
        recipient = rentalsEmailAddress;
        break;
      }
      case Recipients.GROUP: {
        recipient = `${data.group}@scoutinglommel.be`;
        break;
      }
      default: {
        recipient = generalEmailAddress;
      }
    }

    delete data['recipient'];
    delete data['group'];
    delete data['terms-and-conditions'];
    delete data['captcha-token'];

    const email: Email = await generateEmail({
      formTitle: t('email.title'),
      formData: generateFormDataWithLabel(data, formFields),
      to: recipient,
      replyTo: data.email as string,
    });

    const callback = (resp: Response) => {
      if (resp.status === 200) {
        setFormStatus(FormStatus.STATUS_SUCCESS);
        return;
      }

      setFormStatus(FormStatus.STATUS_ERROR);
    };

    sendEmail({ email, callback, captchaToken });
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
