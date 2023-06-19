import React, { useContext, useEffect } from 'react';
import { UserCredentials } from './SignIn.types';
import { auth, signInWithEmailAndPassword } from '../../constants/firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { SignInPanel } from './SignInPanel';
import { setCookie } from 'typescript-cookie';
import { Snackbar } from '../../components/Snackbar/Snackbar';
import { useSnackbar } from '../../hooks/useSnackbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { RoleType } from '../../constants/user';

const googleProvider = new GoogleAuthProvider();
const authentication = getAuth();
authentication.languageCode = 'en';

export const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {role} = useContext(AppContext);

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

      const userToken = await user.getIdTokenResult();
      const role = userToken.claims.role as RoleType;

      setCookie('userToken', userToken.token, { expires: 2 });
      handleLoginSuccess(role);
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

      const userToken = await user.getIdTokenResult();
      const role = userToken.claims.role;

      setCookie('userToken', userToken.token, { expires: 2 });
      handleLoginSuccess(role);
    } catch (error: unknown) {
      handleLoginFail((error as Error).message);
    }
  };

  const handleLoginFail = (errorMessage: string) => {
    showSnackbar(errorMessage, 'error');
  };

  const handleLoginSuccess = (userRole: RoleType) => {
    onAuthenticatedChange(true, userRole);
    localStorage.setItem('userRole', userRole);
    role === null ? navigate('/steps') : navigate('/');
  };

  const signInPanelFunctions = {
    onLogin: onLogin,
    signInWithGoogle: signInWithGoogle,
  };

  useEffect(() => {
    if (location.state?.from === '/sign-up') {
      showSnackbar('You have been registered. You can sign in now.', 'success');
    }
  }, []);

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
