import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Navigation, Scrollbar, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react';
import { CarouselProps } from './Carousel.types';
import { TrainerPreview } from '../TrainerPreview/TrainerPreview';

export const Carousel = ({ trainers }: CarouselProps) => {
  return (
    <Swiper
      effect="flip"
      modules={[Navigation, Scrollbar, Autoplay]}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 10000 }}
      centeredSlides
      centeredSlidesBounds
      cssMode
      loop
      rewind
    >
      {trainers.map((item, key) => (
        <SwiperSlide key={key}>
          <TrainerPreview {...item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
