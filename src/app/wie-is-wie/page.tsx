import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import WieIsWie from '@/components/organisms/WieIsWie';
import { getWieIsWie } from './api';

const WieIsWiePage = async (): Promise<JSX.Element> => {
  const { groups } = await getWieIsWie();

  if (!groups) notFound();

  return (
    <>
      <BlockContainer variant="light" modSmallPadding>
        <div className="sl-layout">
          <h1 className="t-headline-1">Wie is wie?</h1>
        </div>
      </BlockContainer>
      <WieIsWie groups={groups.data} />
    </>
  );
};

export default WieIsWiePage;
