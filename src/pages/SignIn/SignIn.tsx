import { Box, Grid, IconButton, Paper, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { Facebook, FitnessCenter, Google, Twitter } from '@mui/icons-material';
import { Button } from '../../components/Button';
import { SignInImage } from './SignIn.constants';

export const SignIn = () => {
  return (
    <Grid
      container
      wrap="nowrap"
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Paper
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
