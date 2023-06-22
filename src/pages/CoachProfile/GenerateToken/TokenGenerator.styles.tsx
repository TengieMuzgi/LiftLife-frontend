import { SxProps } from '@mui/material';

export const ContainerStyles: SxProps = {
  pt: { mobile: 0, desktop: 8 },
  display: 'flex',
  flexDirection: { mobile: 'column', desktop: 'row' },
  alignItems: 'center',
  gap: 3,
  pl: { mobile: 0, desktop: 3 },
};
