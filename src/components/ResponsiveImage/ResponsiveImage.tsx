import { useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

type ResponsiveImageProps = {
  src?: string;
  alt: string;
  style?: React.CSSProperties;
};

export const ResponsiveImage = ({ src, alt, style }: ResponsiveImageProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));
  const path = isMobile ? 'assets\\images\\mobile\\' + src : 'assets\\images\\desktop\\' + src;
  return <img src={path} alt={alt} style={style} />;
};
