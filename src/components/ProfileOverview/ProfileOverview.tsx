import { Avatar, Box, Grid, SxProps, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { Person } from '@mui/icons-material';
import {
  desktopAvatarStyles,
  desktopBoxStyles,
  mobileAvatarStyles,
  mobileBoxStyles,
  profileInfoStyles,
} from './ProfileOverview.styles';
import type { UserProps } from '../../constants/user';

export const ProfileOverview = ({
  avatar,
  firstName,
  lastName,
  planType,
  accountType,
  registerDate,
}: UserProps) => {
  const { isMobile } = useContext(AppContext);

  const avatarSx: SxProps = isMobile ? mobileAvatarStyles : desktopAvatarStyles;

  const containerSx: SxProps = isMobile ? mobileBoxStyles : desktopBoxStyles;

  return (
    <Grid item sx={{ width: '100%' }}>
      <Box sx={containerSx}>
        {avatar ? (
          <Avatar src={avatar} sx={avatarSx}></Avatar>
        ) : (
          <Avatar sx={avatarSx}>
            <Person sx={{ fontSize: { desktop: '5rem', mobile: '6rem' } }} />
          </Avatar>
        )}
        <Box sx={profileInfoStyles}>
          <Typography variant="h4">{firstName + ' ' + lastName}</Typography>
          <Typography variant="body1">Member since: {registerDate}</Typography>
          {accountType === 'CLIENT' ? (
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
