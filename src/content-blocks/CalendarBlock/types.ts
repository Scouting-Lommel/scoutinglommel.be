import { BlockContainer } from '@/components/atoms/BlockContainer/types';
import { CalendarEvent } from '@/components/atoms/Calendar/types';
import { CallToAction } from '@/components/molecules/CallToAction/types';

export type CalendarBlock = {
  title: string;
  calendarEvents: CalendarEvent[];
  cta: CallToAction;
  blockProperties: BlockContainer;
} & React.HTMLAttributes<HTMLElement>;
