import { PropsWithChildren } from 'react';
import { CarouselItem } from '@/components/molecules/CarouselItem/types';

export type Carousel = {
  carouselItems: CarouselItem[];
} & React.HTMLAttributes<HTMLElement>;

export type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export type PropType = PropsWithChildren<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>;
