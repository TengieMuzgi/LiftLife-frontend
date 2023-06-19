import React, { useContext } from 'react';
import { Grid, Paper, Box } from '@mui/material';
import { ProfileOverview } from '../../components/ProfileOverview';
import { profileBoxStyles, tabsContainerStyles } from './ProfilePage.styles';
import { AppContext } from '../../App';
import { getCookie } from 'typescript-cookie';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getDownloadURL, ref } from '@firebase/storage';
import { storage } from '../../constants/firebase';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { UserProps } from '../../constants/user';
import { Loading } from '../../components/Loading/Loading';

type ProfilePageProps = {
  children?: React.ReactNode;
};

type UserDataProps = Omit<UserProps, 'accountType'>;

export const ProfilePage = ({ children }: ProfilePageProps) => {
  const { isMobile, showSnackbar, role } = useContext(AppContext);

  const { isLoading, isFetched, isError, data, error } = useQuery(['my-profile'], async () => {
    const { data } = await axios.get<UserDataProps>(
      `http://localhost:8081/api/user/${role?.toLowerCase()}/info`,
      {
        headers: { Authorization: `Bearer ${getCookie('userToken')}` },
      }
    );
    if (data.hasPhoto) {
      try {
        const storageRef = ref(storage, `${data.id}`);
        const avatarURL = await getDownloadURL(storageRef);
        return { ...data, avatar: avatarURL };
      } catch (error) {
        if (error instanceof Error) showSnackbar(error.message, 'error');
      }
    } else {
      return { ...data, avatar: '' };
    }
  });

  if (isError && error instanceof Error) {
    return <ErrorPage message={error.message} />;
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <Loading message="Loading user info" offset="100px" />
      </Box>
    );
  }

  const profilePaperStyles = isMobile
    ? profileBoxStyles
    : { ...profileBoxStyles, marginTop: '10vh', marginLeft: '32px' };
  return (
    <>
      <Paper elevation={0} sx={profilePaperStyles}>
        <Grid container>
          {isFetched && data && <ProfileOverview {...data} accountType={role} />}
        </Grid>
      </Paper>
      <Paper elevation={0} sx={tabsContainerStyles}>
        <Grid sx={{ width: '100%' }}>{children}</Grid>
      </Paper>
    </>
  );
};
