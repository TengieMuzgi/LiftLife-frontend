import { Edit, Insights } from '@mui/icons-material';
import { Box, IconButton, Paper, TextField, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { UserProps } from '../../constants/user';
import { getCookie } from 'typescript-cookie';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { Button } from '../../components/Button';
import { Snackbar } from '../../components/Snackbar/Snackbar';
import { useSnackbar } from '../../hooks/useSnackbar';
import { Spinner } from '../../components/Spinner/Spinner';

type fieldsType = {
  label: string;
  value: 'age' | 'weight' | 'height';
  postfix: string;
};

export const ProfileInformation = () => {
  const [editMode, setEditMode] = useState({ age: false, weight: false, height: false });
  const [newFieldValue, setNewFieldValue] = useState({ age: 0, weight: 0, height: 0 });
  const [snackbarState, showSnackbar, hideSnackbar] = useSnackbar();
  const [valueError, setError] = useState(false);
  const queryClient = useQueryClient();

  const toggleEditMode = (param: 'age' | 'weight' | 'height') => {
    setEditMode(prevEditMode => ({
      ...prevEditMode,
      [param]: !prevEditMode[param],
    }));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    param: 'age' | 'weight' | 'height'
  ) => {
    const inputValue = event.target.value;

    if (isNaN(Number(inputValue))) {
      setError(true);
    } else {
      valueError && setError(false);

      setNewFieldValue(prevState => ({
        ...prevState,
        [param]: inputValue,
      }));
    }
  };

  
  const sendUpdate = (param: 'age' | 'weight' | 'height', value: number) => {
    mutation.mutate({ [param]: value });
    toggleEditMode(param);
  };

  const {
    isLoading,
    isFetched,
    isError,
    data: queryResult,
    error,
  } = useQuery(['my-data'], async () => {
    const response = await axios.get<UserProps>('http://localhost:8081/api/user/client/info', {
      headers: { Authorization: `Bearer ${getCookie('userToken')}` },
    });
    return response;
  });
  
  /**
   * sends update to backend and refetches updated data
   */
  const mutation = useMutation(
    (data: { [param: string]: number }) => {
      const paramKey = Object.keys(data)[0];
      const paramValue = data[paramKey];
      return axios.put(`http://localhost:8081/api/user/client/update/${paramKey}`, { [paramKey]: paramValue }, {
        headers: { Authorization: `Bearer ${getCookie('userToken')}` },
      });
    },
    {
      onSuccess: () => {
        showSnackbar('Your information has been updated!', 'success');
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          showSnackbar(error.message, 'error');
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['my-data']);
      },
    }
  );

  if (isError && error instanceof Error) {
    return <ErrorPage message={error.message} />;
  }

  if (isLoading) {
    return <Spinner message="Loading user info" />;
  }

  const fields: Array<fieldsType> = [
    { label: 'Your age:', value: 'age', postfix: 'years old' },
    { label: 'Your weight:', value: 'weight', postfix: 'kg' },
    { label: 'Your height:', value: 'height', postfix: 'cm' },
  ];

  return (
    <>
      {snackbarState && (
        <Snackbar
          isOpen={true}
          message={snackbarState.message}
          severity={snackbarState.severity}
          onClose={hideSnackbar}
        />
      )}
      <Paper
        elevation={0}
        sx={{
          borderRadius: '45px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          p: {mobile: 0, desktop: 8},
          textAlign: {mobile: 'center'},
        }}
      >
        <Insights sx={{ fontSize: '4rem', color: 'primary.main' }} />
        <Typography variant="h4">Your information</Typography>
        {isFetched &&
          queryResult &&
          fields.map(field => (
            <Box
              key={field.value}
              sx={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <Typography sx={{ py: 2 }}>{field.label}</Typography>
              {editMode[field.value] ? (
                <Box sx={{ display: 'flex' }}>
                  <TextField
                    error={valueError}
                    helperText={valueError && 'Please set valid number'}
                    inputProps={{ inputMode: 'numeric' }}
                    defaultValue={queryResult.data[field.value]}
                    sx={{ px: 2, width: {mobile: '200px'} }}
                    onChange={e => handleChange(e, field.value)}
                  />
                  <Button
                    wide
                    type="button"
                    onClick={() => sendUpdate(field.value, newFieldValue[field.value])}
                    disabled={valueError}
                  >
                    Apply
                  </Button>
                </Box>
              ) : (
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="h5" sx={{ px: 2 }}>
                    {queryResult.data[field.value]} {field.postfix}
                  </Typography>
                  <IconButton onClick={() => toggleEditMode(field.value)} sx={{ p: 0 }}>
                    <Edit sx={{ color: 'primary.main' }} />
                  </IconButton>
                </Box>
              )}
            </Box>
          ))}
      </Paper>
    </>
  );
};
