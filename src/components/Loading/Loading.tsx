import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

type LoadingProps = {
  message?: string;
  offset?: string;
};

export const Loading = ({ message, offset }: LoadingProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        mt: offset,
        alignItems: 'center',
        gap: 1,
      }}
    >
      <CircularProgress size="4rem" />
      <Typography>{message}</Typography>
    </Box>
  );
};
