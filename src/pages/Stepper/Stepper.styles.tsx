import { SxProps } from '@mui/material';

export const containerStyles: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const desktopPaperStyles: SxProps = {
  borderRadius: '45px',
  width: '50%',
  p: 8,
};
export const mobilePaperStyles: SxProps = {
  borderRadius: '45px',
  width: '100vw',
  p: 2,
};
export const errorTextStyles: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mt: 2,
  textAlign: 'center',
};

export const lastStepStyles: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: 3,
  pt: 3,
};

export const buttonsPositionStyles: SxProps = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '30px',
  pt: 2,
};

export const stepFormStyles: SxProps = {
  p: 3,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: 2,
};

export const stepIconStyles: SxProps = {
  fontSize: '4rem',
  color: 'primary.main',
};
