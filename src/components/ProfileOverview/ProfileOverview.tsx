import { Avatar, Box, Grid, Typography } from '@mui/material';
import React from 'react';

export type UserProps = {
  avatar?: string;
  name: string;
  membership: string;
  planType: string;
};

export const ProfileOverview = ({ avatar, name, membership, planType }: UserProps) => {
  return (
    <Grid item sx={{ pl: 10, py: 5, maxWidth: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        {avatar ? (
          <Avatar src={avatar} sx={{ width: '10vw', height: '10vw' }}></Avatar>
        ) : (
          <Avatar></Avatar>
        )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'space-evenly',
          px: 5,
        }}
      >
        <Typography variant="h4">{name}</Typography>
        <Typography variant="h5">Member since: {membership}</Typography>
        <Typography variant="h5">Plan: {planType}</Typography>
      </Box>
      </Box>
    </Grid>
  );
};
