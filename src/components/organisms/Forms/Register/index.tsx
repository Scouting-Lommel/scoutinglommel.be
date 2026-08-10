import { useTranslations } from 'next-intl';
import { useContext, useState, type JSX } from 'react';
import { registerEmailAddress } from '@/lib/constants/emailAddress';
import { FormStatus } from '@/lib/constants/enums/formStatus';
import { FormContext } from '@/lib/contexts/FormContext';
import { generateFormDataWithLabel } from '@/lib/helpers/generateFormDataWithLabel';
import { registerMember } from '@/lib/helpers/registerMember';
import { Email, generateEmail } from '@/lib/helpers/sendEmail';
import Banner from '@/components/atoms/Banner';
import { FormField } from '@/components/organisms/Forms/FormBuilder/FormField/types';
import RegisterConfirmation from './Confirmation';
import RegisterForm from './RegisterForm';

type RegisterProps = {
  leaderPrice: number;
  memberPrice: number;
  bankAccountNumber: string;
};

const Register = (props: RegisterProps): JSX.Element => {
  const t = useTranslations('forms.registerForm');

  const { formStatus, setFormStatus } = useContext(FormContext);
  const [registerPrice, setRegisterPrice] = useState<number>(props.memberPrice);
  const [member, setMember] = useState<Record<string, unknown>>({});

  const initialValues = {};

  const submitForm = async (data: Record<string, unknown>, formFields: FormField[]) => {
    const captchaToken = data['captcha-token'] as string;
    const member = { ...data };

    member.isAkabe = member.isAkabe ? true : false;

    delete data['terms-and-conditions'];
    delete data['captcha-token'];
    delete data['isAkabe'];

    if (data.memberGroup === 'Leiding') {
      setRegisterPrice(props.leaderPrice);
    }

    const email: Email = await generateEmail({
      formTitle: t('email.title'),
      formData: generateFormDataWithLabel(data, formFields),
      to: registerEmailAddress,
    });

    const callback = (resp: { status: number }) => {
      if (resp.status === 200) {
        setFormStatus(FormStatus.STATUS_SUCCESS);
        setMember(member);
        return;
      }

      setFormStatus(FormStatus.STATUS_ERROR);
    };

    registerMember({ email, member, callback, captchaToken });
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
          <RegisterConfirmation
            firstName={member.firstName as string}
            lastName={member.lastName as string}
            price={registerPrice}
            bankAccountNumber={props.bankAccountNumber}
          />
        </>
      )}

      {formStatus !== FormStatus.STATUS_SUCCESS && (
        <RegisterForm initialValues={initialValues} submitForm={submitForm} />
      )}
    </>
  );
};

export default Register;
