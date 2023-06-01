import { Avatar, Box, Stack, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { TrainerPreviewProps } from './TrainerPreview.types';
import { descriptionStyles, stackSx } from './TrainerPreview.styles';
import { AppContext } from '../../App';

export const TrainerPreview = ({
  avatar,
  name,
  specialization,
  description,
}: TrainerPreviewProps) => {
  const { isMobile } = useContext(AppContext);
  const avatarSx = isMobile ? { width: '10vh', height: '10vh' } : { width: '10vw', height: '10vw' };
  const descriptionSx = isMobile ? { ...descriptionStyles, maxWidth: '80%' } : descriptionStyles;
  return (
    <Box sx={{ pt: 3 }}>
      <Stack sx={stackSx} spacing={1}>
        <Avatar alt={name} src={avatar} sx={avatarSx} />
        <Typography color="primary.main" sx={{ fontSize: '2rem' }}>
          {name}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontSize: '1.5rem' }}>
          {specialization}
        </Typography>
        <Typography sx={descriptionSx}>{description}</Typography>
      </Stack>
    </Box>
  );
};
