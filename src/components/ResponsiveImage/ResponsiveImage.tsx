import React, { useContext } from 'react';
import { AppContext } from '../../App';

type ResponsiveImageProps = {
  src?: string;
  alt: string;
  style?: React.CSSProperties;
};

export const ResponsiveImage = ({ src, alt, style }: ResponsiveImageProps) => {
  const { isMobile } = useContext(AppContext);
  const path = isMobile ? 'assets\\images\\mobile\\' + src : 'assets\\images\\desktop\\' + src;
  return <img src={path} alt={alt} style={style} />;
};
