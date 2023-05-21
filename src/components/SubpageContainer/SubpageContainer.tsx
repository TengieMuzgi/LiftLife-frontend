import { Grid, Paper } from '@mui/material';
import React from 'react';
import { ProfileOverview, UserProps } from '../ProfileOverview/ProfileOverview';

type ContainerProps = {
  children?: React.ReactNode;
};

const mockUser: UserProps = {
  avatar:
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  name: 'Test User',
  membership: '20.03.2023',
  planType: 'Combo',
};

export const SubpageContainer = ({ children }: ContainerProps) => {
  return (
    <>
      <Paper elevation={3} sx={{ mx: 5, mt: '10vh', borderRadius: '45px', height: 'auto' }}>
        <Grid container spacing={2}>
          <Grid container item>
            <ProfileOverview {...mockUser} />
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} sx={{ mx: 5, mt: '1vh', borderRadius: '45px', height: '30vh' }}>
        <Grid container>{children}</Grid>
      </Paper>
    </>
  );
};
