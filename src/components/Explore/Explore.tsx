import React, { useContext } from 'react';
import { TrainerPreviewProps } from '../TrainerPreview';
import { Carousel } from '../Carousel';
import { AppContext } from '../../App';

type ExploreProps = {
  trainers: TrainerPreviewProps[];
};

export const Explore = ({ trainers }: ExploreProps) => {
  const { isMobile } = useContext(AppContext);
  return <Carousel trainers={trainers} slidesPerView={isMobile ? 1 : 3} />;
};
