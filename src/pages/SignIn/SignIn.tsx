import React from 'react';
import { UserCredentials } from './SignIn.types';
import { auth, signInWithEmailAndPassword } from './firebase';
import axios from 'axios';
import { SignInPanel } from './SignInPanel';

export const SignIn = () => {
  const onLogin = async ({ email, password }: UserCredentials) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      console.log(idToken);
      sessionStorage.setItem('userToken', idToken);
      sendRequest();
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };
  const sendRequest = async () => {
    try {
      const userToken = sessionStorage.getItem('userToken');
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const response = await axios.get('http://localhost:8081/private', config);
      console.log(response.data); // Process the response data here
    } catch (error) {
      console.error(error);
    }
  };

  return <SignInPanel onLogin={onLogin} />;
};
