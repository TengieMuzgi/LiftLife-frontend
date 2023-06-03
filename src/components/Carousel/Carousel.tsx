import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Navigation, Scrollbar, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useContext } from 'react';
import { CarouselProps } from './Carousel.types';
import { TrainerPreview } from '../TrainerPreview';
import { AppContext } from '../../App';

export const Carousel = ({ trainers, slidesPerView }: CarouselProps) => {
  const { isMobile } = useContext(AppContext);
  return (
    <Swiper
      effect="flip"
      modules={[Navigation, Scrollbar, Autoplay]}
      slidesPerView={slidesPerView ?? 1}
      navigation={isMobile ? false : true}
      autoplay={{ delay: 10000 }}
      allowTouchMove={!isMobile}
      cssMode
      loop
    >
      {trainers.map((item, key) => (
        <SwiperSlide key={key}>
          <TrainerPreview {...item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
