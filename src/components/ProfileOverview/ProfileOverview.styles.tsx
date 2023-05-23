import { SxProps } from '@mui/material';
import React from 'react';

export const profileInfoStyles: SxProps = {
  justifyContent: 'space-evenly',
  px: 2,
  my: '24px',
};

export const mobileAvatarStyles: React.CSSProperties = {
  width: '15vh',
  height: '15vh',
};
export const desktopAvatarStyles: React.CSSProperties = {
  width: '7vw',
  height: '7vw',
};

export const mobileBoxStyles: SxProps = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};
export const desktopBoxStyles: SxProps = {
  display: 'flex',
  flexDirection: 'row',
};
