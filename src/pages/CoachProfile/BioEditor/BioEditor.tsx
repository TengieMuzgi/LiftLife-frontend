import { Box, Card, CardContent, TextField, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { ErrorPage } from '../../ErrorPage/ErrorPage';
import axios, { AxiosError } from 'axios';
import { getCookie } from 'typescript-cookie';
import { Button } from '../../../components/Button';
import { Cancel, Check, Settings } from '@mui/icons-material';
import { ButtonBoxStyles, CardStyles } from './BioEditor.styles';
import { AppContext } from '../../../App';
import { Loading } from '../../../components/Loading/Loading';

export const BioEditor = () => {
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState('');
  const queryClient = useQueryClient();
  const { showSnackbar } = useContext(AppContext);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleUpdate = (description: string) => {
    mutation.mutate(description);
    toggleEditMode();
  };

  const { data, isLoading, isFetched, isError, error } = useQuery(
    ['coach-description'],
    async () => {
      const { data } = await axios.get('http://localhost:8081/api/user/coach/description', {
        headers: { Authorization: `Bearer ${getCookie('userToken')}` },
      });
      return data;
    }
  );

  useEffect(() => {
    if (isFetched && data) {
      setDescription(data);
    }
  }, [data, isFetched]);

  /**
   * sends update to backend and refetches updated data
   */
  const mutation = useMutation(
    (description: string) => {
      return axios.post(
        'http://localhost:8081/api/user/coach/change/description',
        { description: description },
        {
          headers: { Authorization: `Bearer ${getCookie('userToken')}` },
        }
      );
    },
    {
      onSuccess: () => {
        showSnackbar('Your description has been updated!', 'success');
      },
      onError: error => {
        if (error instanceof AxiosError) {
          showSnackbar(error.message, 'error');
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['coach-description']);
      },
    }
  );

  if (isError && error instanceof Error) {
    return <ErrorPage message={error.message} />;
  }

  if (isLoading) {
    return <Loading message="Loading profile" />;
  }
  return (
    <Card sx={CardStyles} elevation={3}>
      <CardContent>
        <Typography variant="h5" color="primary.main">
          Your description:
        </Typography>
        <Typography variant="body2" sx={{ pb: 3 }}>
          This is the message all users will see upon loading your profile
        </Typography>
        {isFetched && data && !editMode && <Typography>{data}</Typography>}
        {isFetched && data && editMode && (
          <TextField
            sx={{ width: '100%' }}
            multiline
            rows={4}
            value={description}
            onChange={e => setDescription(e.target.value)}
            helperText={'Remember to apply your changes'}
          />
        )}
        <Box sx={{ pt: 5 }}>
          {!editMode ? (
            <Button type="button" onClick={toggleEditMode} icon={<Settings />}>
              Edit description
            </Button>
          ) : (
            <Box sx={ButtonBoxStyles}>
              <Button type="button" onClick={toggleEditMode} icon={<Cancel />}>
                Cancel
              </Button>
              <Button type="button" onClick={() => handleUpdate(description)} icon={<Check />}>
                Update description
              </Button>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
