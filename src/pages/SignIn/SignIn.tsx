import React, { useContext } from 'react';
import { UserCredentials } from './SignIn.types';
import { auth, signInWithEmailAndPassword } from './firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { SignInPanel } from './SignInPanel';
import { setCookie } from 'typescript-cookie';
import { Snackbar } from '../../components/Snackbar/Snackbar';
import { useSnackbar } from '../../hooks/useSnackbar';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';

const googleProvider = new GoogleAuthProvider();
const authentication = getAuth();
authentication.languageCode = 'en';

export const SignIn = () => {
  const navigate = useNavigate();
  const { onAuthenticatedChange } = useContext(AppContext);
  const [snackbarState, showSnackbar, hideSnackbar] = useSnackbar();

  /**
   * Method to authenticate user that is singing in using email and password inputs. Sets user's access token as cookie
   * @param email - value from email input
   * @param password - value from password input
   */
  const onLogin = async ({ email, password }: UserCredentials) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userToken = await user.getIdToken();

      setCookie('userToken', userToken, { expires: 2 });
      handleLoginSuccess();
    } catch (error) {
      if (error instanceof Error) handleLoginFail(error.message ?? 'Unknown error occured');
    }
  };

  /**
   * Alternative method allowing users to sign in via Google.
   */
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(authentication, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();

      setCookie('userToken', token, { expires: 2 });
      handleLoginSuccess();
    } catch (error: unknown) {
      handleLoginFail((error as Error).message);
    }
  };

  const handleLoginFail = (errorMessage: string) => {
    showSnackbar(errorMessage, 'error');
  };

  const handleLoginSuccess = () => {
    onAuthenticatedChange(true);
    navigate('/');
  };

  const signInPanelFunctions = {
    onLogin: onLogin,
    signInWithGoogle: signInWithGoogle,
  };
  return (
    <>
      <SignInPanel {...signInPanelFunctions} />
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
