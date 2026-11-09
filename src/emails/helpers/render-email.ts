import { render } from '@react-email/components';

export const renderEmail = async (email: React.ReactNode) => {
  return render(email);
};

export const renderEmailText = async (email: React.ReactNode) => {
  return render(email, { plainText: true });
};
