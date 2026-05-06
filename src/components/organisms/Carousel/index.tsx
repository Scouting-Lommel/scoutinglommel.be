'use client';

import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState, type JSX } from 'react';
import Icon from '@/components/atoms/Icon';
import CarouselItem from '@/components/molecules/CarouselItem';
import { Carousel as CarouselProps, PropType, UsePrevNextButtonsType } from './types';
import './Carousel.css';


const usePrevNextButtons = (emblaApi: EmblaCarouselType | undefined): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

export const PrevButton = (props: PropType): JSX.Element => {
  const t = useTranslations('common.carousel');

  const { children, ...restProps } = props;

  return (
    <button className="embla__button embla__button--prev" type="button" {...restProps}>
      <Icon name="arrow-left" aria-label="arrow left" size="xl" />
      <span className="u-visually-hidden">{t('previous')}</span>
    </button>
  );
};

export const NextButton = (props: PropType): JSX.Element => {
  const t = useTranslations('common.carousel');

  const { children, ...restProps } = props;

  return (
    <button className="embla__button embla__button--next" type="button" {...restProps}>
      <Icon name="arrow-right" aria-label="arrow right" size="xl" />
      <span className="u-visually-hidden">{t('next')}</span>
    </button>
  );
};

const Carousel = ({ carouselItems }: CarouselProps): JSX.Element => {
  const options: EmblaOptionsType = {
    align: 'start',
    loop: false,
    dragFree: true,
    containScroll: 'trimSnaps',
    watchDrag: true,
    skipSnaps: true,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [WheelGesturesPlugin()]);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  return (
    <div className="carousel__container">
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {carouselItems.map((item: any, i: number) => {
              return (
                <CarouselItem
                  logo={item.logo}
                  name={item.name}
                  slug={item.slug}
                  key={i}
                />
              );
            })}
          </div>
        </div>

        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
