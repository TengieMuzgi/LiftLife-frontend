import React from 'react';

export const videoStyles: React.CSSProperties = {
  width: '100%',
  height: '95%',
  position: 'absolute',
  left: '0',
  objectFit: 'cover',
  paddingLeft: '0',
  mixBlendMode: 'normal',
};
export const titleStyles = {
  color: 'white',
  fontWeight: '800',
  fontSize: '6vw',
  textAlign: 'justify',
  mt: '30vh',
  fontStyle: 'italic',
};

export const filterBoxStyles = {
  bgcolor: 'black',
  width: '100%',
  height: '95%',
  position: 'absolute',
  alignItems: 'start',
  top: '5%',
  display: 'flex',
  flexDirection: 'column',
  gap: '2%',
  background: 'linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 65%)',
  pl: 5,
};

export const subtitleStyles = {
  color: 'white',
  fontWeight: '800',
  fontSize: '2vw',
  textAlign: 'left',
  maxWidth: '25vw',
};
