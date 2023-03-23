import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Navigation, Scrollbar, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import React from "react";

type CarouselProps = {
  links: string[];
};

const SwiperImage = styled("img")`
  width: 50vw;
  height: 50vh;
  object-fit: cover;
`;

const Carousel = ({ links }: CarouselProps) => {
  return (
    <Swiper
      modules={[Navigation, Scrollbar, Autoplay]}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      autoHeight
      autoplay={{ delay: 5000 }}
    >
      {links.map((itemLink, key) => (
        <SwiperSlide key={key}>
          <SwiperImage src={itemLink} alt="temporary" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
