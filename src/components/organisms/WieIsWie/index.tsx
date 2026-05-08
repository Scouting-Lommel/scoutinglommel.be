'use client';

import Image from 'next/image';
import { useState, type JSX } from 'react';
import type { UploadFile } from '@/types/generated/Graphql';
import ProfilePicture from '@/assets/img/default-avatar.png';
import SLImage from '@/components/atoms/Image';
import type { CloudinaryImage } from '@/components/atoms/Image/types';
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

type SelectedLeader = LeaderDetail & { groupName: string };

const WieIsWie = ({ groups }: WieIsWieProps): JSX.Element => {
  const [selectedLeader, setSelectedLeader] = useState<SelectedLeader | null>(null);

  const activeGroups = groups.filter(
    (group): group is GroupWithLeaders =>
      !!group &&
      (group.leaders?.filter((leader): leader is LeaderDetail => !!leader).length ?? 0) > 0,
  );

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
                    onClick={() =>
                      setSelectedLeader({
                        ...leader,
                        groupName: group.name,
                      })
                    }
                  >
                    <Leader
                      firstName={leader.firstName}
                      lastName={leader.lastName}
                      image={leader.image ? toCloudinaryImage(leader.image) : undefined}
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
                alt="Default profile picture"
                className="wie-is-wie__modal-image"
              />
            )}
            <div className="wie-is-wie__modal-info">
              <p className="wie-is-wie__modal-group">{selectedLeader.groupName}</p>
              {selectedLeader.groupFunction?.title && (
                <p className="t-headline-3 wie-is-wie__modal-function">
                  {selectedLeader.groupFunction.title}
                </p>
              )}
              {selectedLeader.groupFunction?.description && (
                <Typography data={selectedLeader.groupFunction.description} />
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default WieIsWie;
