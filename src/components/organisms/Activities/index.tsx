'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef, useState, type JSX } from 'react';
import { getActivities } from '@/lib/api/activities/api';
import { getEvents } from '@/lib/api/events/api';
import { getActivityAnchors } from '@/lib/helpers/getActivityAnchor';
import Activity from '@/components/atoms/Activity';
import type { Activity as ActivityItem } from '@/components/atoms/Activity/types';
import Button from '@/components/atoms/Button';
import Link from '@/components/atoms/Link';
import Loader from '@/components/atoms/Loader';
import { ActivitySection as ActivityProps } from './types';
import './Activities.css';

const getTodayString = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

// A malformed fragment such as "#%" throws inside decodeURIComponent; treat it
// as no hash instead of letting it escape the effect.
const readHash = (): string => {
  try {
    return decodeURIComponent(window.location.hash.replace(/^#/, ''));
  } catch {
    return '';
  }
};

const Activities = ({ variant, groupSlug, initialItems, date }: ActivityProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [groupActivities, setActivities] = useState<ActivityItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const hasHandledHash = useRef(false);
  const anchors = useMemo(() => getActivityAnchors(groupActivities ?? []), [groupActivities]);

  const t = useTranslations('common');

  const fetchActivities = useCallback(async () => {
    setActivities(null);
    setError(false);
    setLoading(true);

    const dateString = date ?? getTodayString();

    if (!groupSlug) {
      setLoading(false);
      setError(true);
      return;
    }

    try {
      const { activities } = await getActivities(groupSlug, dateString);

      if (!activities) {
        setError(true);
        setLoading(false);
        return;
      }

      setActivities(
        activities
          .filter((activity): activity is NonNullable<typeof activity> => !!activity)
          .map((activity) => ({ ...activity })),
      );
      setLoading(false);
    } catch (e) {
      setError(true);
      setLoading(false);
      return;
    }
  }, [groupSlug, date]);

  const fetchEvents = useCallback(async () => {
    setActivities(null);
    setError(false);
    setLoading(true);

    const dateString = date ?? getTodayString();

    try {
      const { events } = await getEvents(dateString);

      if (!events) {
        setError(true);
        setLoading(false);
        return;
      }

      setActivities(
        events
          .filter((event): event is NonNullable<typeof event> => !!event)
          .map((event) => ({
            title: event.title,
            startDate: event.startDate,
            startTime: event.startTime ?? '',
            endDate: event.endDate ?? '',
            endTime: event.endTime ?? '',
            description: event.description,
          })),
      );
      setLoading(false);
    } catch (e) {
      setError(true);
      setLoading(false);
      return;
    }
  }, [date]);

  const fetchData = useCallback(async () => {
    switch (variant) {
      case 'activities':
        fetchActivities();
        break;
      case 'events':
        fetchEvents();
        break;
      default:
        break;
    }
  }, [fetchActivities, fetchEvents, variant]);

  useEffect(() => {
    fetchData();
  }, [variant, fetchData]);

  useEffect(() => {
    if (hasHandledHash.current || anchors.length === 0) return;

    const hash = readHash();
    if (!hash || !anchors.includes(hash)) return;

    const target = document.getElementById(hash);
    if (target) {
      target.scrollIntoView({ block: 'start' });
      hasHandledHash.current = true;
      return;
    }

    // The entry may sit behind the "show more" toggle: render the full list and
    // let the next pass scroll to it.
    if (!isOpen) setIsOpen(true);
  }, [anchors, isOpen]);

  return (
    <div className="activities">
      {groupActivities && groupActivities.length > 0 && (
        <>
          {groupActivities.map((act, i) => {
            if (isOpen || i < initialItems) {
              return (
                <Activity
                  key={anchors[i]}
                  id={anchors[i]}
                  title={act.title}
                  startDate={act.startDate}
                  startTime={act.startTime}
                  endDate={act.endDate}
                  endTime={act.endTime}
                  description={act.description}
                />
              );
            }
          })}
          {!isOpen && initialItems < groupActivities.length && (
            <div className="activities__button">
              <Button
                label={variant === 'activities' ? t('showMoreActivities') : t('showMoreEvents')}
                variant="primary"
                onClick={() => setIsOpen(true)}
              />
            </div>
          )}
          {isOpen && (
            <div className="activities__button">
              <Button
                label={variant === 'activities' ? t('showLessActivities') : t('showLessEvents')}
                variant="primary"
                onClick={() => setIsOpen(false)}
              />
            </div>
          )}
        </>
      )}

      {groupActivities && groupActivities.length === 0 && (
        <p className="t-align-center">
          {variant === 'activities' ? t('noActivitiesFound') : t('noEventsFound')}
        </p>
      )}

      {!groupActivities && loading && (
        <Loader className="activities__loader" size="sm" modLabelVisible />
      )}

      {!groupActivities && error && (
        <>
          <p className="t-align-center">
            {variant === 'activities' ? t('fetchActivitiesError') : t('fetchEventsError')}
          </p>
          <div className="activities__try-again">
            <Link className="activities__try-again__btn" variant="link3" onClick={fetchData}>
              {t('tryAgain')}
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Activities;
