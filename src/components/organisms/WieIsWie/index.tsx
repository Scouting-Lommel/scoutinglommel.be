'use client';

import cn from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState, type JSX } from 'react';
import { slugify } from '@/lib/helpers/slugify';
import type { UploadFile } from '@/types/generated/Graphql';
import ProfilePicture from '@/assets/img/default-avatar.png';
import SLImage from '@/components/atoms/Image';
import type { CloudinaryImage } from '@/components/atoms/Image/types';
import SLLink from '@/components/atoms/Link';
import Modal from '@/components/atoms/Modal';
import Typography from '@/components/atoms/Typography';
import Leader from '@/components/molecules/Leader';
import type { WieIsWie as WieIsWieProps, GroupWithLeaders, LeaderDetail } from './types';
import './WieIsWie.css';

const toCloudinaryImage = (image: UploadFile): CloudinaryImage => ({
  ...image,
  width: image.width ?? null,
  height: image.height ?? null,
  ext: image.ext ?? undefined,
});

const deriveEmail = (firstName: string, lastName: string): string => {
  const localPart = `${firstName}.${lastName}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9.]/g, '');
  return `${localPart}@scoutinglommel.be`;
};

const calculateAge = (dateOfBirth?: string | null): number | null => {
  if (!dateOfBirth) return null;

  const birthDate = new Date(dateOfBirth);
  if (Number.isNaN(birthDate.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age;
};

type SelectedLeader = LeaderDetail & { groupName: string };

type DetailItem = {
  label: string;
  value: string;
};

const getLeiderSlugFromUrl = (): string | null => {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get('leider');
};

const updateLeiderUrl = (slug: string | null) => {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  if (slug) {
    url.searchParams.set('leider', slug);
  } else {
    url.searchParams.delete('leider');
  }
  window.history.replaceState({}, '', url);
};

const WieIsWie = ({ groups }: WieIsWieProps): JSX.Element => {
  const t = useTranslations('common.whoIsWho');
  const [selectedLeader, setSelectedLeader] = useState<SelectedLeader | null>(null);

  const activeGroups = useMemo(
    () =>
      groups.filter(
        (group): group is GroupWithLeaders =>
          !!group &&
          (group.leaders?.filter((leader): leader is LeaderDetail => !!leader).length ?? 0) > 0,
      ),
    [groups],
  );

  const findLeaderBySlug = useCallback(
    (slug: string): SelectedLeader | null => {
      for (const group of activeGroups) {
        for (const leader of group.leaders ?? []) {
          if (!leader) continue;
          if (slugify(`${leader.firstName}-${leader.lastName}`) === slug) {
            return { ...leader, groupName: group.name };
          }
        }
      }
      return null;
    },
    [activeGroups],
  );

  useEffect(() => {
    const leiderSlug = getLeiderSlugFromUrl();
    if (!leiderSlug) return;

    const leader = findLeaderBySlug(leiderSlug);
    if (leader) {
      setSelectedLeader(leader);
    }
  }, [findLeaderBySlug]);

  useEffect(() => {
    const handlePopState = () => {
      const leiderSlug = getLeiderSlugFromUrl();
      if (!leiderSlug) {
        setSelectedLeader(null);
        return;
      }

      const leader = findLeaderBySlug(leiderSlug);
      setSelectedLeader(leader);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [findLeaderBySlug]);

  const openLeaderModal = (leader: LeaderDetail, groupName: string) => {
    setSelectedLeader({ ...leader, groupName });
    updateLeiderUrl(slugify(`${leader.firstName}-${leader.lastName}`));
  };

  const closeLeaderModal = () => {
    setSelectedLeader(null);
    updateLeiderUrl(null);
  };

  const leaderDetails = useMemo((): DetailItem[] => {
    if (!selectedLeader) return [];

    const items: DetailItem[] = [];

    items.push({ label: 'group', value: selectedLeader.groupName });

    if (selectedLeader.groupFunction?.title) {
      items.push({ label: 'groupFunction', value: selectedLeader.groupFunction.title });
    }

    const age = calculateAge(selectedLeader.dateOfBirth);
    if (age !== null) {
      items.push({ label: 'age', value: t('labels.ageYears', { age }) });
    }

    if (selectedLeader.isStudent && selectedLeader.fieldOfStudy) {
      items.push({
        label: 'study',
        value: t('labels.study', { fieldOfStudy: selectedLeader.fieldOfStudy }),
      });
    } else if (selectedLeader.occupation) {
      items.push({ label: 'occupation', value: selectedLeader.occupation });
    }

    if (selectedLeader.memberSince !== null && selectedLeader.memberSince !== undefined) {
      items.push({
        label: 'memberSince',
        value: t('labels.years', { years: selectedLeader.memberSince }),
      });
    }

    if (selectedLeader.leaderSince !== null && selectedLeader.leaderSince !== undefined) {
      items.push({
        label: 'leaderSince',
        value: t('labels.years', { years: selectedLeader.leaderSince }),
      });
    }

    items.push({
      label: 'email',
      value: deriveEmail(selectedLeader.firstName, selectedLeader.lastName),
    });

    return items;
  }, [selectedLeader, t]);

  return (
    <div className="wie-is-wie">
      {activeGroups.map((group) => (
        <section key={group.slug ?? group.documentId} className="wie-is-wie__tak">
          <div className="sl-layout">
            <h2 className="t-headline-2 wie-is-wie__tak-title">{group.name}</h2>
            <div className="wie-is-wie__leaders">
              {[...(group.leaders ?? [])]
                .filter((leader): leader is LeaderDetail => !!leader)
                .sort((a, b) => {
                  if (a.isGroupLeader !== b.isGroupLeader) {
                    return a.isGroupLeader ? -1 : 1;
                  }
                  return a.lastName.localeCompare(b.lastName);
                })
                .map((leader) => (
                  <button
                    key={leader.documentId}
                    className="wie-is-wie__leader-btn"
                    type="button"
                    onClick={() => openLeaderModal(leader, group.name)}
                  >
                    <Leader
                      firstName={leader.firstName}
                      lastName={leader.lastName}
                      image={leader.image ? toCloudinaryImage(leader.image) : undefined}
                    />
                    {leader.totem && (
                      <span className="wie-is-wie__leader-totem">{leader.totem}</span>
                    )}
                  </button>
                ))}
            </div>
          </div>
        </section>
      ))}

      {selectedLeader && (
        <Modal id="wie-is-wie-modal" open={!!selectedLeader} handleCloseModal={closeLeaderModal}>
          <div className="wie-is-wie__modal-content">
            {selectedLeader.image ? (
              <SLImage
                data={toCloudinaryImage(selectedLeader.image)}
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
                {selectedLeader.firstName} {selectedLeader.lastName}
              </h2>
              {selectedLeader.totem && (
                <p className="wie-is-wie__modal-totem">{selectedLeader.totem}</p>
              )}
              {leaderDetails.length > 0 && (
                <dl className="wie-is-wie__modal-details">
                  {leaderDetails.map(({ label, value }) => (
                    <div
                      key={label}
                      className={cn('wie-is-wie__modal-detail', {
                        'wie-is-wie__modal-detail--span-2':
                          label === 'email' ||
                          (label === 'group' && !selectedLeader.groupFunction?.title),
                      })}
                    >
                      <dt className="wie-is-wie__modal-detail-label">{t(`labels.${label}`)}</dt>
                      <dd className="wie-is-wie__modal-detail-value">
                        {label === 'email' ? (
                          <SLLink href={`mailto:${value}`}>{value}</SLLink>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
              {selectedLeader.bio && (
                <div className="wie-is-wie__modal-bio">
                  <p className="wie-is-wie__modal-detail-label">
                    {t('bioTitle', { firstName: selectedLeader.firstName })}
                  </p>
                  <Typography data={selectedLeader.bio} />
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default WieIsWie;
