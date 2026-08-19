'use client';

import Image from 'next/image';
import { useState, type JSX } from 'react';
import ProfilePicture from '@/assets/img/default-avatar.png';
import SLImage from '@/components/atoms/Image';
import Modal from '@/components/atoms/Modal';
import Typography from '@/components/atoms/Typography';
import Leader from '@/components/molecules/Leader';
import { StylesheetLink } from '@/types/StyleSheetLink';
import { WieIsWie as WieIsWieProps, LeaderDetail, GroupWithLeaders } from './types';
import styles from './WieIsWie.css';

export const links = (): StylesheetLink[] => {
  return [{ rel: 'stylesheet', href: styles }];
};

type SelectedLeader = LeaderDetail & { groupName: string };

const WieIsWie = ({ groups }: WieIsWieProps): JSX.Element => {
  const [selectedLeader, setSelectedLeader] = useState<SelectedLeader | null>(null);

  const activeGroups = groups.filter(
    (group: GroupWithLeaders) => group.attributes.leaders.data.length > 0,
  );

  return (
    <div className="wie-is-wie">
      {activeGroups.map((group: GroupWithLeaders) => (
        <section key={group.attributes.slug} className="wie-is-wie__tak">
          <div className="sl-layout">
            <h2 className="t-headline-2 wie-is-wie__tak-title">{group.attributes.name}</h2>
            <div className="wie-is-wie__leaders">
              {[...group.attributes.leaders.data]
                .sort((a, b) => {
                  if (a.attributes.isGroupLeader !== b.attributes.isGroupLeader) {
                    return a.attributes.isGroupLeader ? -1 : 1;
                  }
                  return a.attributes.lastName.localeCompare(b.attributes.lastName);
                })
                .map((leader, i) => (
                <button
                  key={i}
                  className="wie-is-wie__leader-btn"
                  type="button"
                  onClick={() =>
                    setSelectedLeader({
                      ...leader.attributes,
                      groupName: group.attributes.name,
                    })
                  }
                >
                  <Leader
                    firstName={leader.attributes.firstName}
                    lastName={leader.attributes.lastName}
                    image={leader.attributes.image}
                  />
                </button>
              ))}
            </div>
          </div>
        </section>
      ))}

      {selectedLeader && (
        <Modal
          id="wie-is-wie-modal"
          title={`${selectedLeader.firstName} ${selectedLeader.lastName}`}
          open={!!selectedLeader}
          handleCloseModal={() => setSelectedLeader(null)}
        >
          <div className="wie-is-wie__modal-content">
            {selectedLeader.image?.data?.attributes ? (
              <SLImage
                data={selectedLeader.image.data.attributes}
                loadingStrategy="lazy"
                className="wie-is-wie__modal-image"
              />
            ) : (
              <Image
                src={ProfilePicture}
                width="530"
                height="530"
                alt="Default profile picture"
                className="wie-is-wie__modal-image"
              />
            )}
            <div className="wie-is-wie__modal-info">
              <p className="wie-is-wie__modal-group">{selectedLeader.groupName}</p>
              {selectedLeader.groupFunction?.data?.attributes?.title && (
                <p className="t-headline-3 wie-is-wie__modal-function">
                  {selectedLeader.groupFunction.data.attributes.title}
                </p>
              )}
              {selectedLeader.groupFunction?.data?.attributes?.description && (
                <Typography data={selectedLeader.groupFunction.data.attributes.description} />
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default WieIsWie;
