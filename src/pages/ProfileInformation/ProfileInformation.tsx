import { Edit } from '@mui/icons-material';
import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { UserProps } from '../../constants/user';
import { getCookie } from 'typescript-cookie';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { Loading } from '../../components/Loading/Loading';
import { Button } from '../../components/Button';
import { Snackbar } from '../../components/Snackbar/Snackbar';
import { useSnackbar } from '../../hooks/useSnackbar';

type fieldsType = {
  label: string;
  value: 'age' | 'weight' | 'height';
  postfix: string;
};

export const ProfileInformation = () => {
  const [editMode, setEditMode] = useState({ age: false, weight: false, height: false });
  const [newFieldValue, setNewFieldValue] = useState({age: 0, weight: 0, height: 0});
  const [snackbarState, showSnackbar, hideSnackbar] = useSnackbar();

  const toggleEditMode = (param: 'age' | 'weight' | 'height') => {
    setEditMode(prevEditMode => ({
      ...prevEditMode,
      [param]: !prevEditMode[param],
    }));
  };


  const sendUpdate = async (param: 'age' | 'weight' | 'height', value: number) => {
    try {
      const updateResult = await axios.put(
        `http://localhost:8081/api/user/client/update/${param}`, value,
        {
          headers: { Authorization: `Bearer ${getCookie('userToken')}` },
        }
      );
      if(updateResult.status === 200) {
        showSnackbar('Your information has been updated!', 'success');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        showSnackbar(error.message, 'error');
      }
    }
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

  if (isError && error instanceof Error) {
    return <ErrorPage message={error.message} />;
  }

  if (isLoading) {
    return <Loading message="Loading user info" />;
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
      <Box>
        <Typography variant="h4">Your information</Typography>
        <Typography variant="h5">
          You can edit individual information by clicking on <Edit sx={{ color: 'primary.main' }} />{' '}
          icon next to it
        </Typography>
        {isFetched &&
          queryResult &&
          fields.map(field => (
            <Grid key={field.value} container alignItems="center">
              <Grid item>
                <Typography>{field.label}</Typography>
              </Grid>
              {editMode[field.value] ? (
                <Grid container spacing={2}>
                  <Grid item>
                    <TextField defaultValue={queryResult.data[field.value]} onChange={(e) => setNewFieldValue(prevState => ({ ...prevState, age: parseInt(e.target.value) }))}/>
                  </Grid>
                  <Grid item>
                    <Button type="button" onClick={() => sendUpdate(field.value, newFieldValue[field.value])}>Apply</Button>
                  </Grid>
                </Grid>
              ) : (
                <Grid container spacing={2}>
                  <Grid item>
                    <Typography variant="h5">
                      {queryResult.data[field.value]} {field.postfix}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={() => toggleEditMode(field.value)}>
                      <Edit sx={{ color: 'primary.main' }} />
                    </IconButton>
                  </Grid>
                </Grid>
              )}
            </Grid>
          ))}
      </Box>
    </>
  );
};
