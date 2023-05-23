import { ErrorOutline } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import { ErrorIconStyles } from './ErrorPages.styles';

type ErrorPageProps = {
  errorCode?: '403' | '404';
  message?: string;
};

export const ErrorPage = ({ message, errorCode }: ErrorPageProps) => {
  const errorInfo =
    errorCode && errorCode === '403'
      ? 'You are not authorized to view this page.'
      : 'Page you are trying to view was not found.';
  return (
    <Grid container columns={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
      <Grid item sx={{ mt: 10, textAlign: 'center' }}>
        <ErrorOutline sx={{ ...ErrorIconStyles }} />
        {errorCode ? (
          <>
            <Typography variant="h3" color="error">
              {errorCode}
            </Typography>
            <Typography variant="h5" sx={{ opacity: '0.5' }}>
              {errorInfo}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h3" color="error">
              Error!
            </Typography>
            <Typography variant="h5" sx={{ opacity: '0.5' }}>
              Something unexpected happened!
            </Typography>
          </>
        )}

        {message && <Typography variant="body1">{message}</Typography>}
      </Grid>
    </Grid>
  );
};
