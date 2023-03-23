import styled from "styled-components";

export type CarouselProps = {
  links: string[];
};

export const SwiperImage = styled("img")`
  width: 100vw;
  height: 50vh;
  object-fit: contain;
`;
