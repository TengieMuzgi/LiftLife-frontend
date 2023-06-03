import React, { useContext } from 'react';
import { mockUser } from './ProfilePage.constants';
import { Grid, Paper } from '@mui/material';
import { ProfileOverview } from '../../components/ProfileOverview';
import { profileBoxStyles, tabsContainerStyles } from './ProfilePage.styles';
import { AppContext } from '../../App';

type ProfilePageProps = {
  children?: React.ReactNode;
};

export const ProfilePage = ({ children }: ProfilePageProps) => {
  const { isMobile } = useContext(AppContext);
  const profilePaperStyles = isMobile
    ? profileBoxStyles
    : { ...profileBoxStyles, marginTop: '10vh', marginLeft: '32px' };
  return (
    <>
      <Paper elevation={0} sx={profilePaperStyles}>
        <Grid container>
          <ProfileOverview {...mockUser} />
        </Grid>
      </Paper>
      <Paper elevation={0} sx={tabsContainerStyles}>
        <Grid sx={{ width: '100%' }}>{children}</Grid>
      </Paper>
    </>
  );
};
