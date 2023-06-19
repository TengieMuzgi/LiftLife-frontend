import React from 'react';
import { TokenGenerator } from './GenerateToken/TokenGenerator';
import { useSnackbar } from '../../hooks/useSnackbar';
import { Snackbar } from '../../components/Snackbar/Snackbar';

export const CoachProfile = () => {
  const [snackbarState, showSnackbar, hideSnackbar] = useSnackbar();

  return (
    <>
      {snackbarState && (
        <Snackbar
          isOpen={true}
          message={snackbarState.message}
          severity={snackbarState.severity}
          onClose={hideSnackbar}
        />
      )}
      <TokenGenerator showSnackbar={showSnackbar} />
    </>
  );
};
