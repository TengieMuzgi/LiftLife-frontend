import React, { useContext } from 'react';
import { Grid, Paper } from '@mui/material';
import { ProfileOverview } from '../../components/ProfileOverview';
import { profileBoxStyles, tabsContainerStyles } from './ProfilePage.styles';
import { AppContext } from '../../App';
import { getCookie } from 'typescript-cookie';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getDownloadURL, ref } from '@firebase/storage';
import { storage } from '../../constants/firebase';
import { useSnackbar } from '../../hooks/useSnackbar';
import { Snackbar } from '../../components/Snackbar/Snackbar';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { Loading } from '../../components/Loading/Loading';
import { UserProps } from '../../constants/user';

type ProfilePageProps = {
  children?: React.ReactNode;
};

export const ProfilePage = ({ children }: ProfilePageProps) => {
  const { isMobile } = useContext(AppContext);
  const [snackbarState, showSnackbar, hideSnackbar] = useSnackbar();

  const { isLoading, isFetched, isError, data, error } = useQuery(['my-profile'], async () => {
    const { data } = await axios.get<UserProps>('http://localhost:8081/api/user/client/info', {
      headers: { Authorization: `Bearer ${getCookie('userToken')}` },
    });
    if (data.hasAvatar) {
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
    return <Loading message="Loading user info" offset="100px" />;
  }

  const profilePaperStyles = isMobile
    ? profileBoxStyles
    : { ...profileBoxStyles, marginTop: '10vh', marginLeft: '32px' };
  return (
    <>
      <Paper elevation={0} sx={profilePaperStyles}>
        <Grid container>{isFetched && data && <ProfileOverview {...data} />}</Grid>
      </Paper>
      <Paper elevation={0} sx={tabsContainerStyles}>
        <Grid sx={{ width: '100%' }}>{children}</Grid>
      </Paper>
      {snackbarState && (
        <Snackbar
          isOpen={true}
          message={snackbarState.message}
          severity={snackbarState.severity}
          onClose={hideSnackbar}
        />
      )}
    </>
  );
};
