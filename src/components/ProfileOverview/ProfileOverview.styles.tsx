import { SxProps } from '@mui/material';

export const profileInfoStyles: SxProps = {
  justifyContent: 'space-evenly',
  px: 2,
  my: '24px',
};

export const mobileAvatarStyles: SxProps = {
  width: '15vh',
  height: '15vh',
  bgcolor: 'primary.main',
};
export const desktopAvatarStyles: SxProps = {
  width: '7vw',
  height: '7vw',
  bgcolor: 'primary.main',
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
