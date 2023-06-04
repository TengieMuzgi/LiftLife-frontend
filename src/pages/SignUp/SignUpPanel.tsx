import { Box, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { FitnessCenter } from '@mui/icons-material';
import { Button } from '../../components/Button';
import { ResponsiveImage } from '../../components/ResponsiveImage';
import {
  DesktopSignInImageStyles,
  MobileSignInImageStyles,
  containerStyles,
} from '../SignIn/SignIn.constants';
import { AppContext } from '../../App';
import { Formik, Field, Form } from 'formik';
import { object, string, ref } from 'yup';
import { formValues } from './SignUp.types';

type SignUpPanelProps = {
  onRegister: (values: formValues) => Promise<void>;
};

export const SignUpPanel = ({ onRegister }: SignUpPanelProps) => {
  const { isMobile } = useContext(AppContext);
  const imageStyles = isMobile ? MobileSignInImageStyles : DesktopSignInImageStyles;
  const containerSx = isMobile
    ? { ...containerStyles, mb: 10, height: 'auto' }
    : { ...containerStyles, pt: 8 };

  const formInitialValues: formValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordRepeated: '',
  };

  const userSchema = object({
    firstName: string().required('This field is required'),
    lastName: string().required('This field is required'),
    email: string().email('Must be a valid email').required('This field is required'),
    password: string()
      .required('This field is required')
      .min(8, 'Password too short')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Password is too weak'
      ),
    passwordRepeated: string()
      .required('This field is required')
      .oneOf([ref('password'), ''], 'Passwords do not match'),
  });

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
            <Box>
              <Stack
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 6 }}
                rowGap={2}
              >
                <FitnessCenter sx={{ minWidth: '5vh', height: 'auto', color: 'primary.main' }} />
                <Typography sx={{ color: 'primary.main', textAlign: 'center' }} variant="h4">
                  Sign Up
                </Typography>
                <Formik
                  initialValues={formInitialValues}
                  onSubmit={values => {
                    onRegister(values);
                  }}
                  validationSchema={userSchema}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <Stack rowGap={2}>
                        <Field
                          as={TextField}
                          name="firstName"
                          type="text"
                          variant="outlined"
                          placeholder="First name"
                          helperText={
                            errors.firstName && touched.firstName ? errors.firstName : 'First name'
                          }
                          error={errors.firstName && touched.firstName}
                        />
                        <Field
                          as={TextField}
                          name="lastName"
                          type="text"
                          variant="outlined"
                          placeholder="Last name"
                          helperText={
                            errors.lastName && touched.lastName ? errors.lastName : 'Last name'
                          }
                          error={errors.lastName && touched.lastName}
                        />
                        <Field
                          as={TextField}
                          name="email"
                          type="email"
                          variant="outlined"
                          placeholder="Email"
                          helperText={errors.email && touched.email ? errors.email : 'Email'}
                          error={errors.email && touched.email}
                        />
                        <Field
                          as={TextField}
                          name="password"
                          type="password"
                          variant="outlined"
                          placeholder="Password"
                          error={errors.password && touched.password}
                          helperText={
                            errors.password && touched.password ? errors.password : 'Password'
                          }
                        />
                        <Field
                          as={TextField}
                          name="passwordRepeated"
                          type="password"
                          variant="outlined"
                          placeholder="Confirm password"
                          helperText={
                            errors.passwordRepeated && touched.passwordRepeated
                              ? errors.passwordRepeated
                              : 'Confirm password'
                          }
                          error={errors.passwordRepeated && touched.passwordRepeated}
                        />
                        <Button type="submit">Sign up</Button>
                      </Stack>
                    </Form>
                  )}
                </Formik>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
