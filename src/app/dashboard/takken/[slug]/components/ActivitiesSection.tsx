'use client';

import { useTranslations } from 'next-intl';
import { Fragment, useCallback, useEffect, useState, type JSX } from 'react';
// import Banner from '@/components/atoms/Banner';
import BlockContainer from '@/components/atoms/BlockContainer';
import Loader from '@/components/atoms/Loader';
import Form from '@/components/organisms/Forms';
import SectionTitle from './SectionTitle';
import type { GetDashboardActivitiesQuery, GetDashboardGroupPageQuery } from '@/types/generated/Graphql';
import { getActivities } from '../api';

type Group = NonNullable<GetDashboardGroupPageQuery['groups'][number]>;
type Activity = NonNullable<GetDashboardActivitiesQuery['activities'][number]>;

type Props = {
  group: Group;
};

const ActivitiesSection = ({ group }: Props): JSX.Element => {
  const [groupActivities, setActivities] = useState<Activity[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const t = useTranslations('dashboard.groupsDetail.sections.activitiesSection');
  // const tAlert = useTranslations('dashboard.groupsDetail');

  const fetchActivities = useCallback(async () => {
    setError(false);
    setLoading(true);

    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;

    const { activities } = await getActivities(group.slug ?? '', dateString);

    if (!activities) {
      setError(true);
      setLoading(false);
      return;
    }

    setActivities(activities.filter((activity): activity is Activity => !!activity));
    setLoading(false);
  }, [group]);

  useEffect(() => {
    if (group) {
      fetchActivities();
    }
  }, [group, fetchActivities]);

  const addActivityCallback = () => {
    fetchActivities();
  };

  return (
    <BlockContainer slug="group-activities-section">
      <SectionTitle
        title={t('title')}
        groupId={group.documentId}
        type="activity"
        callback={addActivityCallback}
      />

      {/* <Banner variant="neutral">{tAlert('alert')}</Banner> */}

      {error && !loading && (
        <BlockContainer slug="group-activities-error" modNoPadding>
          <p>{t('error')}</p>
        </BlockContainer>
      )}
      {!error && loading && (
        <BlockContainer slug="group-activities-loading" modNoPadding>
          <Loader size="sm" modLabelVisible />
        </BlockContainer>
      )}
      {!error && !loading && groupActivities?.length === 0 && (
        <BlockContainer slug="group-activities-empty-state" modNoPadding>
          <p>{t('noActivitiesFound')}</p>
        </BlockContainer>
      )}

      {!error && !loading && groupActivities && groupActivities.length > 0 && (
        <>
          <hr />
          {groupActivities.map((activity, key) => (
            <Fragment key={`activity-${key}`}>
              <Form
                variant="activity"
                props={{
                  activity: { ...activity, id: activity.documentId },
                  callback: fetchActivities,
                }}
                blockProperties={{ slug: `activity-${activity.documentId}`, modSmallPadding: true }}
              />
              {key + 1 < groupActivities.length && <hr />}
            </Fragment>
          ))}
        </>
      )}
    </BlockContainer>
  );
};

export default ActivitiesSection;
