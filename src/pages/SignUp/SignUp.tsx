import React from 'react';
import { SignUpPanel } from './SignUpPanel';
import { formValues } from './SignUp.types';
import axios from 'axios';
import { useSnackbar } from '../../hooks/useSnackbar';
import { Snackbar } from '../../components/Snackbar/Snackbar';
import { useNavigate } from 'react-router';

export const SignUp = () => {
  const [snackbarState, showSnackbar, hideSnackbar] = useSnackbar();
  const navigate = useNavigate();

  const registerUser = async (userData: formValues) => {
    try {
      const response = await axios.post('http://localhost:8081/api/auth/register', userData);
      if (response.status === 201) {
        handleRegisterSuccess();
      } else {
        handleRegisterFail('Register failed. Try again.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) handleRegisterFail(error.response?.data);
    }
  };

  const handleRegisterSuccess = () => {
    navigate('/sign-in', { state: { from: '/sign-up' } });
  };

  const handleRegisterFail = (errorMessage: string) => {
    showSnackbar(errorMessage, 'error');
  };

  return (
    <>
      <SignUpPanel onRegister={registerUser} />
      {snackbarState && (
        <Snackbar
          isOpen={true}
          message={snackbarState.message}
          severity={snackbarState.severity}
          onClose={hideSnackbar}
        />
      )}
    </>
  );
};
