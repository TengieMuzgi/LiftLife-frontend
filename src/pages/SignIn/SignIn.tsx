import { Box, Grid, IconButton, Paper, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { Facebook, FitnessCenter, Google, Twitter } from '@mui/icons-material';
import { Button } from '../../components/Button/Button';
import styled from 'styled-components';

const SignInImage = styled('img')`
  @media (max-width: 425px) {
    max-width: 100vw;
  }
  @media (min-width: 1024px) {
    max-width: 55vw;
    object-fit: cover;
    min-height: auto;
    border-radius: 45px 0 0 45px;
    padding: 4px 0 0 4px;
    clip-path: polygon(43% 0, 100% 100%, 0% 100%, 0 51%, 0% 0%);
  }
`;

export const SignIn = () => {
  return (
    <Grid
      container
      wrap="nowrap"
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        pt: 1,
        width: '100vw',
        height: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: '45px',
        }}
      >
        <Grid
          item
          container
          direction={{ mobile: 'column', desktop: 'row' }}
          columns={2}
          columnGap={2}
          sx={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Grid item>
            <SignInImage src="assets\images\pexels\pexels-signin.jpg" alt="sign-in-image" />
          </Grid>
          <Grid item>
            <Stack
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 6 }}
              rowGap={2}
            >
              {/*TODO: change FitnessCenter to logo */}
              <FitnessCenter sx={{ minWidth: '5vh', height: 'auto', color: 'primary.main' }} />
              <Typography sx={{ color: 'primary.main', textAlign: 'center' }} variant="h4">
                Sign In
              </Typography>
              <TextField helperText="Username" placeholder="Username" required />
              <TextField helperText="Password" placeholder="Password" required />
              <Button wide>Sign in</Button>
              <Typography>Or sign in using</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton color="primary">
                  <Google />
                </IconButton>
                <IconButton color="primary">
                  <Twitter />
                </IconButton>
                <IconButton color="primary">
                  <Facebook />
                </IconButton>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
