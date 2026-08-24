'use client';

import { useCallback, useEffect, useMemo, useState, type JSX } from 'react';
import type { WieIsWie as WieIsWieProps, GroupWithLeaders, LeaderDetail } from './types';
import LeaderCard from './LeaderCard';
import LeaderModal from './LeaderModal';
import './WieIsWie.css';

type SelectedLeader = LeaderDetail & { groupName: string };

const getLeiderIdFromUrl = (): string | null => {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get('leider');
};

const updateLeiderUrl = (id: string | null) => {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  if (id) {
    url.searchParams.set('leider', id);
  } else {
    url.searchParams.delete('leider');
  }
  window.history.replaceState({}, '', url);
};

const WieIsWie = ({ groups }: WieIsWieProps): JSX.Element => {
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

  const findLeaderById = useCallback(
    (id: string): SelectedLeader | null => {
      for (const group of activeGroups) {
        for (const leader of group.leaders ?? []) {
          if (!leader) continue;
          if (leader.documentId === id) {
            return { ...leader, groupName: group.name };
          }
        }
      }
      return null;
    },
    [activeGroups],
  );

  useEffect(() => {
    const leiderId = getLeiderIdFromUrl();
    if (!leiderId) return;

    const leader = findLeaderById(leiderId);
    if (leader) {
      setSelectedLeader(leader);
    }
  }, [findLeaderById]);

  useEffect(() => {
    const handlePopState = () => {
      const leiderId = getLeiderIdFromUrl();
      if (!leiderId) {
        setSelectedLeader(null);
        return;
      }

      const leader = findLeaderById(leiderId);
      setSelectedLeader(leader);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [findLeaderById]);

  const openLeaderModal = (leader: LeaderDetail, groupName: string) => {
    setSelectedLeader({ ...leader, groupName });
    updateLeiderUrl(leader.documentId);
  };

  const closeLeaderModal = () => {
    setSelectedLeader(null);
    updateLeiderUrl(null);
  };

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
