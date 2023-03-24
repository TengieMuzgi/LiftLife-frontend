import { Navigation, Scrollbar, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import { CarouselProps } from "./Carousel.constants";
import { SwiperImage } from "./Carousel.styles";

export const Carousel = ({ links }: CarouselProps) => {
  return (
    <Swiper
      effect="fade"
      modules={[Navigation, Scrollbar, Autoplay]}
      slidesPerView={1}
      navigation
      autoplay={{ delay: 10000 }}
      centeredSlides
      centeredSlidesBounds
      cssMode
      allowSlideNext
      allowSlidePrev
    >
      {links.map((itemLink, key) => (
        <SwiperSlide key={key}>
          <SwiperImage src={itemLink} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
