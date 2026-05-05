import { useTranslations } from 'next-intl';
import type { JSX } from 'react';
import { formatDate, formatStrapiTime } from '@/lib/helpers/dateTime';
import Typography from '@/components/atoms/Typography';
import { Activity as ActivityProps } from './types';
import './Activity.css';


const Activity = ({
  title,
  startDate,
  startTime,
  endDate,
  endTime,
  description,
}: ActivityProps): JSX.Element => {
  const t = useTranslations('common.days');

  const timeString = (() => {
    if (!startDate) return '';

    const start = formatDate(startDate, 'DD/MM/YYYY');
    const startTimeFormatted = formatStrapiTime(startTime);
    const startDay = String(new Date(startDate).getDay());

    // If no end date/time, just show start date (and time if available)
    if (!endDate) {
      return startTimeFormatted
        ? `${t(startDay)} ${start}, ${startTimeFormatted}`
        : `${t(startDay)} ${start}`;
    }

    // If same date, show single line
    if (startDate === endDate) {
      return startTime && endTime
        ? `${t(startDay)} ${start}, ${formatStrapiTime(startTime)} tot ${formatStrapiTime(endTime)}`
        : start;
    }

    // Different dates
    const end = formatDate(endDate, 'DD/MM/YYYY');
    const endDay = String(new Date(endDate).getDay());

    // If we have both start and end times
    if (startTime && endTime) {
      return `${t(startDay)} ${start}, ${startTimeFormatted} tot ${t(endDay).toLowerCase()} ${end}, ${formatStrapiTime(endTime)}`;
    }

    // If we only have dates
    return `${t(startDay)} ${start} tot ${t(endDay).toLowerCase()} ${end}`;
  })();

  return (
    <article className="activity">
      <div className="activity__header">
        <h3 className="activity__header__title t-headline-3 t-uppercase">{title}</h3>
        <time
          dateTime={startTime ? `${startDate}T${startTime}` : startDate}
          className="activity__header__time"
        >
          {timeString}
        </time>
      </div>
      <Typography
        className="activity__description"
        data={description}
        numberOfLines={2}
        modNoStyle
      />
    </article>
  );
};

export default Activity;
