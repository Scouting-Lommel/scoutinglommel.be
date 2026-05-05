import Image from 'next/image';
import type { JSX } from 'react';
import ProfilePicture from '@/assets/img/default-avatar.png';
import SLImage from '@/components/atoms/Image';
import Typography from '@/components/atoms/Typography';
import { Leader as LeaderProps } from './types';
import './Leader.css';


const Leader = ({ firstName, lastName, image }: LeaderProps): JSX.Element => {
  return (
    <div className="leader__container">
      {image?.data?.attributes ? (
        <SLImage
          data={image.data?.attributes}
          loadingStrategy="lazy"
          className="leader__image"
          modMaximisable
        />
      ) : (
        <Image
          src={ProfilePicture}
          width="530"
          height="530"
          alt="Default profile picture"
          className="leader__image"
        />
      )}
      <Typography className="leader__name">
        <span>{firstName}</span>
        <span>{lastName}</span>
      </Typography>
    </div>
  );
};

export default Leader;
