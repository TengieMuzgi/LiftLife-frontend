import { Box, Grid, IconButton, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { Facebook, FitnessCenter, Google, Twitter } from '@mui/icons-material';
import { Button } from '../../components/Button';
import { ResponsiveImage } from '../../components/ResponsiveImage';
import {
  DesktopSignInImageStyles,
  MobileSignInImageStyles,
  containerStyles,
} from './SignIn.constants';
import { AppContext } from '../../App';
import { UserCredentials } from './SignIn.types';

type SignInPanelProps = {
  onLogin: (credentials: UserCredentials) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
};

export const SignInPanel: React.FC<SignInPanelProps> = ({ onLogin, signInWithGoogle }) => {
  const { isMobile } = useContext(AppContext);
  const imageStyles = isMobile ? MobileSignInImageStyles : DesktopSignInImageStyles;
  const containerSx = isMobile
    ? { ...containerStyles, mb: 10, height: 'auto' }
    : { ...containerStyles, pt: 8 };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userCredentials: UserCredentials = {
      email: data.get('email') as string,
      password: data.get('password') as string,
    };
    onLogin(userCredentials);
  };

  return (
    <Grid container wrap="nowrap" sx={containerSx}>
      <Paper sx={{ borderRadius: '45px' }} elevation={3}>
        <Grid
          item
          container
          direction={{ mobile: 'column', desktop: 'row' }}
          columns={2}
          columnGap={2}
          sx={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Grid item>
            <ResponsiveImage src="\pexels-signin.jpg" alt="sign-in-image" style={imageStyles} />
          </Grid>
          <Grid item>
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Stack
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 6 }}
                rowGap={2}
              >
                {/*TODO: change FitnessCenter to logo */}
                <FitnessCenter sx={{ minWidth: '5vh', height: 'auto', color: 'primary.main' }} />
                <Typography sx={{ color: 'primary.main', textAlign: 'center' }} variant="h4">
                  Sign In
                </Typography>
                <TextField id="email" name="email" placeholder="Email" required />
                <TextField
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                  type="password"
                />
                <Button wide type="submit">
                  Sign in
                </Button>
                <Typography>Or sign in using</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconButton color="primary" onClick={signInWithGoogle}>
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
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
