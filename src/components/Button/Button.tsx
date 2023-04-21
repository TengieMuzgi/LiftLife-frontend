import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { ButtonStyles } from './Button.styles';

type ButtonType = {
  children: string;
  disabled?: boolean;
  wide?: boolean;
};

export const Button = (props: ButtonType) => {
  const ButtonSx = props.wide ? { ...ButtonStyles, pl: 4, pr: 4 } : ButtonStyles;
  return (
    <MuiButton variant="contained" size="small" disabled={props.disabled} sx={ButtonSx}>
      {props.children}
    </MuiButton>
  );
};
