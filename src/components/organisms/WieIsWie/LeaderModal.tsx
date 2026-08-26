'use client';

import cn from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useMemo, type JSX } from 'react';
import calculateAge from '@/lib/helpers/calculateAge';
import deriveEmail from '@/lib/helpers/deriveEmail';
import toCloudinaryImage from '@/lib/helpers/toCloudinaryImage';
import ProfilePicture from '@/assets/img/default-avatar.png';
import SLImage from '@/components/atoms/Image';
import SLLink from '@/components/atoms/Link';
import Modal from '@/components/atoms/Modal';
import Typography from '@/components/atoms/Typography';
import type { LeaderDetail } from './types';

type DetailItem = {
  label: string;
  value: string;
};

type SelectedLeader = LeaderDetail & { groupName: string };

type LeaderModalProps = {
  leader: SelectedLeader;
  onClose: () => void;
};

const LeaderModal = ({ leader, onClose }: LeaderModalProps): JSX.Element => {
  const t = useTranslations('common.whoIsWho');

  const leaderDetails = useMemo((): DetailItem[] => {
    const items: DetailItem[] = [];

    items.push({ label: 'group', value: leader.groupName });

    if (leader.groupFunction?.title) {
      items.push({ label: 'groupFunction', value: leader.groupFunction.title });
    }

    if (leader.groupFunction?.description) {
      items.push({
        label: 'groupFunctionDescription',
        value: leader.groupFunction.description,
      });
    }

    const age = calculateAge(leader.dateOfBirth);
    if (age !== null) {
      items.push({ label: 'age', value: t('values.age', { age }) });
    }

    if (leader.isStudent && leader.fieldOfStudy) {
      items.push({
        label: 'study',
        value: t('values.study', { study: leader.fieldOfStudy }),
      });
    } else if (leader.occupation) {
      items.push({ label: 'occupation', value: leader.occupation });
    }

    if (leader.memberSince !== null && leader.memberSince !== undefined) {
      items.push({
        label: 'memberSince',
        value: t('values.years', { years: leader.memberSince }),
      });
    }

    if (leader.leaderSince !== null && leader.leaderSince !== undefined) {
      items.push({
        label: 'leaderSince',
        value: t('values.years', { years: leader.leaderSince }),
      });
    }

    items.push({
      label: 'email',
      value: deriveEmail(leader.firstName, leader.lastName),
    });

    return items;
  }, [leader, t]);

  return (
    <Modal id="wie-is-wie-modal" open handleCloseModal={onClose}>
      <div className="wie-is-wie__modal-content">
        {leader.image ? (
          <SLImage
            data={toCloudinaryImage(leader.image)}
            loadingStrategy="lazy"
            className="wie-is-wie__modal-image"
          />
        ) : (
          <Image
            src={ProfilePicture}
            width={530}
            height={530}
            alt={t('defaultProfilePictureAlt')}
            className="wie-is-wie__modal-image"
          />
        )}
        <div className="wie-is-wie__modal-info">
          <h2 className="t-headline-2 wie-is-wie__modal-name">
            {leader.firstName} {leader.lastName}
          </h2>
          {leader.totem && <p className="wie-is-wie__modal-totem">{leader.totem}</p>}
          {leaderDetails.length > 0 && (
            <dl className="wie-is-wie__modal-details">
              {leaderDetails.map(({ label, value }) => (
                <div
                  key={label}
                  className={cn('wie-is-wie__modal-detail', {
                    'wie-is-wie__modal-detail--span-2':
                      label === 'email' || (label === 'group' && !leader.groupFunction?.title),
                  })}
                >
                  <dt className="wie-is-wie__modal-detail-label">{t(`labels.${label}`)}</dt>
                  <dd className="wie-is-wie__modal-detail-value">
                    {label === 'email' ? <SLLink href={`mailto:${value}`}>{value}</SLLink> : value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
          {leader.bio && (
            <div className="wie-is-wie__modal-bio">
              <p className="wie-is-wie__modal-detail-label">
                {t('bioTitle', { firstName: leader.firstName })}
              </p>
              <Typography data={leader.bio} />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default LeaderModal;
