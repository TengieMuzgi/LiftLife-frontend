import { Avatar, Box, Grid, SxProps, Typography } from '@mui/material';
import React, { useContext } from 'react';
import type { UserProps } from './ProfileOverview.types';
import { AppContext } from '../../App';
import {
  desktopAvatarStyles,
  desktopBoxStyles,
  mobileAvatarStyles,
  mobileBoxStyles,
  profileInfoStyles,
} from './ProfileOverview.styles';

export const ProfileOverview = ({ avatar, name, membership, planType, accountType }: UserProps) => {
  const { isMobile } = useContext(AppContext);

  const avatarSx: SxProps = isMobile ? mobileAvatarStyles : desktopAvatarStyles;

  const containerSx: SxProps = isMobile ? mobileBoxStyles : desktopBoxStyles;

  return (
    <Grid item sx={{ width: '100%' }}>
      <Box sx={containerSx}>
        {avatar ? <Avatar src={avatar} sx={avatarSx}></Avatar> : <Avatar sx={avatarSx}></Avatar>}
        <Box sx={profileInfoStyles}>
          <Typography variant="h4">{name}</Typography>
          <Typography variant="body1">Member since: {membership}</Typography>
          {accountType === 'user' ? (
            <Typography variant="body1">Plan: {planType}</Typography>
          ) : (
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Personal Coach
            </Typography>
          )}
        </Box>
      </Box>
    </Grid>
  );
};
export { UserProps };
