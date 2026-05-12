import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import Calendar from '@/components/atoms/Calendar';
import { CalendarBlock as CalendarBlockProps } from './types';

const CalendarBlock = ({
  title,
  calendarEvents,
  cta,
  blockProperties,
}: CalendarBlockProps): JSX.Element => {
  return (
    <BlockContainer
      variant={blockProperties.variant}
      orientation={blockProperties.orientation}
      slug={blockProperties.slug}
      cta={cta}
    >
      <section className="sl-layout">
        <h2 className="t-headline-2 t-align-center">{title}</h2>
        <Calendar events={calendarEvents} />
      </section>
    </BlockContainer>
  );
};

export default CalendarBlock;
