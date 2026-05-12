import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import Calendar from '@/components/atoms/Calendar';
import { CalendarBlock as CalendarBlockProps } from './types';

const CalendarBlock = ({
  calendarTitle,
  calendarEvents,
  cta,
  calendarBlockProperties,
}: CalendarBlockProps): JSX.Element => {
  return (
    <BlockContainer
      variant={calendarBlockProperties.variant}
      orientation={calendarBlockProperties.orientation}
      slug={calendarBlockProperties.slug}
      cta={cta}
    >
      <section className="sl-layout">
        <h2 className="t-headline-2 t-align-center">{calendarTitle}</h2>
        <Calendar events={calendarEvents} />
      </section>
    </BlockContainer>
  );
};

export default CalendarBlock;
