import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import React from 'react';
import { Navigate } from 'react-router-dom';

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  navigationPath: string;
  outlet: ReactJSXElement;
};

export const ProtectedRoute = ({
  isAuthenticated,
  navigationPath,
  outlet,
}: ProtectedRouteProps) => {
  if (isAuthenticated) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: navigationPath }} />;
  }
};
