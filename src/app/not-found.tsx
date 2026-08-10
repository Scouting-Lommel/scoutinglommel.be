import { Metadata } from 'next';
import type { JSX } from 'react';
import NotFoundBlock from '@/components/organisms/NotFound';

export const metadata: Metadata = {
  title: 'Pagina niet gevonden',
  description: 'Scouting Sint-Pieter Lommel',
  robots: {
    index: false,
    follow: false,
  },
};

const NotFoundPage = (): JSX.Element => {
  return <NotFoundBlock />;
};

export default NotFoundPage;
