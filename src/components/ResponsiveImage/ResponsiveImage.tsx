import React, { useContext } from 'react';
import { MobileContext } from '../../App';

type ResponsiveImageProps = {
  src?: string;
  alt: string;
  style?: React.CSSProperties;
};

export const ResponsiveImage = ({ src, alt, style }: ResponsiveImageProps) => {
  const isMobile = useContext(MobileContext);
  const path = isMobile ? 'assets\\images\\mobile\\' + src : 'assets\\images\\desktop\\' + src;
  return <img src={path} alt={alt} style={style} />;
};
