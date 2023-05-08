import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import { Facebook, FitnessCenter, Google, Twitter } from '@mui/icons-material';
import { Button } from '../../components/Button';
import { ResponsiveImage } from '../../components/ResponsiveImage';
import {
  DesktopSignInImageStyles,
  MobileSignInImageStyles,
  containerStyles,
} from './SignIn.constants';

export const SignIn = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));
  const imageStyles = isMobile ? MobileSignInImageStyles : DesktopSignInImageStyles;
  const containerSx = isMobile
    ? { ...containerStyles, mt: 5, mb: 10 }
    : { ...containerStyles, pt: 8 };
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
