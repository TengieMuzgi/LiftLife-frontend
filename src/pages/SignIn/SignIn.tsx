import React from 'react';
import { UserCredentials } from './SignIn.types';
import { auth, signInWithEmailAndPassword } from './firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { SignInPanel } from './SignInPanel';
import { setCookie } from 'typescript-cookie';
import { Snackbar } from '../../components/Snackbar/Snackbar';
import { useSnackbar } from '../../hooks/useSnackbar';

const googleProvider = new GoogleAuthProvider();
const authentication = getAuth();
authentication.languageCode = 'en';

export const SignIn = () => {
  const [snackbarState, showSnackbar, hideSnackbar] = useSnackbar();

  /**
   * Method to authenticate user that is singing in using email and password inputs. Sets user's access token as cookie
   * @param email - value from email input
   * @param passowrd - value from password input
   */
  const onLogin = async ({ email, password }: UserCredentials) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userToken = await user.getIdToken();
      setCookie('userToken', userToken, { expires: 2 });
    } catch (error: unknown) {
      handleLoginFail((error as Error).message);
    }
  };

  /**
   * Alternative method allowing users to sign in via Google.
   */
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(authentication, googleProvider);
      const credentials = GoogleAuthProvider.credentialFromResult(result);
      const token = credentials?.accessToken;
      setCookie('userToken', token, { expires: 2 });
    } catch (error: unknown) {
      handleLoginFail((error as Error).message);
    }
  };

  const handleLoginFail = (errorMessage: string) => {
    showSnackbar(errorMessage, 'error');
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
