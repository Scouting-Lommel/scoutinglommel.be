'use client';

import React, { useState, type JSX } from 'react';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import Typography from '@/components/atoms/Typography';
import { Calendar as CalendarProps } from './types';
import './Calendar.css';


const daysOfWeek = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];

const Calendar = ({ events }: CalendarProps): JSX.Element => {
  if (!events) events = [];

  const [currentDate, setCurrentDate] = useState(new Date());

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const daysInMonth = lastDayOfMonth.getDate() - firstDayOfMonth.getDate() + 1;
  const startDayOfWeek = firstDayOfMonth.getDay(); // Get the day of the week (0-6) of the first day

  const monthDays: Date[] = [];
  for (let i = 0; i < daysInMonth; i++) {
    const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1);
    monthDays.push(day);
  }

  const isDayAvailable = (date: Date) => {
    for (let i = 0; i < events.length; i++) {
      const e = events[i];
      const startDate = new Date(`${e.start}T02:00:00`);
      const endDate = new Date(`${e.end}T02:00:00`);
      date.setHours(2);
      if (startDate <= date && endDate >= date) return false;
    }
    return true;
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="calendar">
      <div className="calendar__header">
        <Typography>
          <Button onClick={prevMonth}>
            <Icon name="chevron-left" size="md" /> Vorige
          </Button>
        </Typography>
        <Typography>
          <h2 className="calender__header__month-year">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
        </Typography>
        <Typography>
          <Button onClick={nextMonth}>
            Volgende <Icon name="chevron-right" size="md" />
          </Button>
        </Typography>
      </div>
      <div className="calendar__week">
        {daysOfWeek.map((day) => (
          <div key={day} className="calendar__week__day">
            <Typography>{day}</Typography>
          </div>
        ))}
      </div>
      <div className="calendar__days">
        {/* Empty cells for the days before the first day of the month */}
        {Array.from({ length: startDayOfWeek }, (_, index) => (
          <div key={`empty-${index}`} className="calendar__days--empty-day"></div>
        ))}
        {monthDays.map((day) => (
          <div
            key={day.toISOString()}
            className={`calendar__days__day  ${
              isDayAvailable(day)
                ? 'calendar__days__day--available'
                : 'calendar__days__day--unavailable'
            }`}
          >
            <Typography>{day.getDate()}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
