import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { UserProps } from '../../constants/user';
import { getCookie } from 'typescript-cookie';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { ClientCard } from '../../components/ClientCard/ClientCard';
import { getDownloadURL, ref } from '@firebase/storage';
import { AppContext } from '../../App';
import { storage } from '../../constants/firebase';
import { Loading } from '../../components/Loading/Loading';

export const ClientList = () => {
  const { showSnackbar } = useContext(AppContext);
  const { isFetched, data, isLoading, isError, error } = useQuery<UserProps[], Error>(
    ['client-data'],
    async () => {
      const { data } = await axios.get<UserProps[]>(
        'http://localhost:8081/api/user/coach/clients',
        {
          headers: { Authorization: `Bearer ${getCookie('userToken')}` },
        }
      );

      const promises = data.map(async element => {
        if (element.hasPhoto) {
          try {
            const storageRef = ref(storage, `${element.id}`);
            const avatarURL = await getDownloadURL(storageRef);
            return { ...element, avatar: avatarURL };
          } catch (error) {
            if (error instanceof Error) showSnackbar(error.message, 'error');
          }
        } else {
          return { ...element, avatar: '' };
        }
        return { ...element, avatar: '' };
      });

      const updatedData = await Promise.all(promises);
      return updatedData;
    }
  );

  if (isError && error instanceof Error) {
    return <ErrorPage message={error.message} />;
  }

  if (isLoading) {
    return <Loading message="Loading client list" offset="100px" />;
  }

  return (
    <Box sx={{ mt: '10vh' }}>
      <Typography variant="h4" textAlign="center">
        Your clients:
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {isFetched && data && data.map(user => <ClientCard key={user.id} {...user} />)}
      </Box>
    </Box>
  );
};
