import { Metadata } from 'next';
import type { JSX } from 'react';
import UnauthorizedBlock from '@/components/organisms/Unauthorized';

export const metadata: Metadata = {
  title: 'Geen toegang tot deze pagina',
  description: 'Scouting Sint-Pieter Lommel',
  robots: {
    index: false,
    follow: false,
  },
};

const UnauthorizedPage = (): JSX.Element => {
  return <UnauthorizedBlock />;
};

export default UnauthorizedPage;
