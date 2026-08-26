import { Metadata } from 'next';
import type { JSX } from 'react';

type Props = {
  children: React.ReactNode;
};

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'Inloggen',
    robots: {
      index: false,
      follow: false,
    },
  };
};

const SignInLayout = ({ children }: Props): JSX.Element => {
  return <>{children}</>;
};

export default SignInLayout;
