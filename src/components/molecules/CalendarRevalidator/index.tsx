'use client';

import { useEffect, useState, type JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import Loader from '@/components/atoms/Loader';
import './CalendarRevalidator.css';


const CalendarRevalidator = (): JSX.Element => {
  const [currState, setCurrState] = useState(
    <div className="revalidator">
      <Loader />
    </div>,
  );
  const [isHandling, setIsHandling] = useState(false);

  const handleRevalidate = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    };

    const response = await fetch(`/api/revalidate-calendar`, options);

    const result = await response.json();

    if (response.status == 200)
      setCurrState(<h2 className="revalidator">success: {result.data}</h2>);
    else setCurrState(<h2 className="revalidator">an error occured: {result.data}</h2>);
  };

  useEffect(() => {
    if (!isHandling) {
      setIsHandling(true);
      handleRevalidate();
    }
  }, [isHandling]);

  return (
    <div className="sl-layout">
      <BlockContainer variant="dark" orientation="default" slug="calendar-revalidator">
        {currState}
        <h2 className="revalidator">{currState}</h2>
      </BlockContainer>
    </div>
  );
};

export default CalendarRevalidator;
