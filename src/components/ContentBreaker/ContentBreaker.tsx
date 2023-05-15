import React from 'react';
import { Box, Grid } from '@mui/material';
import { ContentBreakerProps } from './ContentBreaker.types';

export const ContentBreaker = (props: ContentBreakerProps) => {
  //TODO: discuss what kind of font will be used in content breakers or use other type of content breaker
  const textColor = props.bgColor === 'primary.main' ? 'white' : 'black';
  return (
    <Grid item sx={{ width: '100%' }}>
      <Box
        sx={{
          backgroundColor: props.bgColor,
          width: '100%',
          p: 8,
          color: textColor,
        }}
      >
        {props.children}
      </Box>
    </Grid>
  );
};
