'use client';

import { useCallback, useEffect, useMemo, useState, type JSX } from 'react';
import { slugify } from '@/lib/helpers/slugify';
import type { WieIsWie as WieIsWieProps, GroupWithLeaders, LeaderDetail } from './types';
import LeaderCard from './LeaderCard';
import LeaderModal from './LeaderModal';
import './WieIsWie.css';

type SelectedLeader = LeaderDetail & { groupName: string };

const getLeiderSlugFromUrl = (): string | null => {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get('leider');
};

const getLeaderSlug = (leader: LeaderDetail): string =>
  slugify(`${leader.firstName}-${leader.lastName}`);

const updateLeiderUrl = (slug: string | null, method: 'push' | 'replace' = 'replace') => {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  if (slug) {
    url.searchParams.set('leider', slug);
  } else {
    url.searchParams.delete('leider');
  }

  if (method === 'push') {
    window.history.pushState({}, '', url);
  } else {
    window.history.replaceState({}, '', url);
  }
};

const GROUP_ORDER = ['Kapoenen', 'Welpen', 'Akabe', 'Jonggivers', 'Givers', 'Jin'] as const;

const getGroupSortIndex = (name: string): number => {
  const idx = GROUP_ORDER.indexOf(name as (typeof GROUP_ORDER)[number]);
  return idx >= 0 ? idx : GROUP_ORDER.length;
};

const sortByLastName = (a: LeaderDetail, b: LeaderDetail) => a.lastName.localeCompare(b.lastName);

const WieIsWie = ({ groups }: WieIsWieProps): JSX.Element => {
  const [selectedLeader, setSelectedLeader] = useState<SelectedLeader | null>(null);

  const activeGroups = useMemo(
    () =>
      groups
        .filter(
          (group): group is GroupWithLeaders =>
            !!group &&
            (group.leaders?.filter((leader): leader is LeaderDetail => !!leader).length ?? 0) > 0,
        )
        .sort((a, b) => {
          const diff = getGroupSortIndex(a.name) - getGroupSortIndex(b.name);
          return diff !== 0 ? diff : a.name.localeCompare(b.name);
        }),
    [groups],
  );

  const groepsleiders = useMemo(() => {
    const leaders: (LeaderDetail & { groupName: string })[] = [];
    for (const group of activeGroups) {
      for (const leader of group.leaders ?? []) {
        if (leader && leader.isGroupLeader) {
          leaders.push({ ...leader, groupName: group.name });
        }
      }
    }
    return leaders.sort(sortByLastName);
  }, [activeGroups]);

  const findLeaderBySlug = useCallback(
    (slug: string): SelectedLeader | null => {
      for (const group of activeGroups) {
        for (const leader of group.leaders ?? []) {
          if (!leader) continue;
          if (getLeaderSlug(leader) === slug) {
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
    updateLeiderUrl(getLeaderSlug(leader), 'push');
  };

  const closeLeaderModal = () => {
    setSelectedLeader(null);
    updateLeiderUrl(null);
  };

  return (
    <div className="wie-is-wie">
      {groepsleiders.length > 0 && (
        <section className="wie-is-wie__tak">
          <div className="sl-layout">
            <h2 className="t-headline-2 wie-is-wie__tak-title">Groepsleiding</h2>
            <div className="wie-is-wie__leaders">
              {groepsleiders.map((leader) => (
                <LeaderCard
                  key={leader.documentId}
                  leader={leader}
                  groupName={leader.groupName}
                  onClick={openLeaderModal}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {activeGroups.map((group) => (
        <section key={group.slug ?? group.documentId} className="wie-is-wie__tak">
          <div className="sl-layout">
            <h2 className="t-headline-2 wie-is-wie__tak-title">{group.name}</h2>
            <div className="wie-is-wie__leaders">
              {[...(group.leaders ?? [])]
                .filter((leader): leader is LeaderDetail => !!leader)
                .sort((a, b) => {
                  const aTitle = a.groupFunction?.title ?? '';
                  const bTitle = b.groupFunction?.title ?? '';
                  const aIsTakverantwoordelijke = aTitle === 'Takverantwoordelijke';
                  const bIsTakverantwoordelijke = bTitle === 'Takverantwoordelijke';

                  if (aIsTakverantwoordelijke !== bIsTakverantwoordelijke) {
                    return aIsTakverantwoordelijke ? -1 : 1;
                  }

                  if (aTitle !== bTitle) {
                    if (!aTitle) return 1;
                    if (!bTitle) return -1;
                    return aTitle.localeCompare(bTitle);
                  }

                  return a.lastName.localeCompare(b.lastName);
                })
                .map((leader) => (
                  <LeaderCard
                    key={leader.documentId}
                    leader={leader}
                    groupName={group.name}
                    onClick={openLeaderModal}
                  />
                ))}
            </div>
          </div>
        </section>
      ))}

      {selectedLeader && <LeaderModal leader={selectedLeader} onClose={closeLeaderModal} />}
    </div>
  );
};

export default WieIsWie;
