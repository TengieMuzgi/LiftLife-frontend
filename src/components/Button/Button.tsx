import React, { MouseEventHandler } from 'react';
import { Button as MuiButton } from '@mui/material';

type ButtonType = {
  children: string;
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  wide?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  href?: string;
};

export const Button = (props: ButtonType) => {
  return (
    <MuiButton
      variant="contained"
      size="small"
      disabled={props.disabled}
      type={props.type}
      onClick={props.onClick}
      sx={{ ...(props.wide && { px: 4 }) }}
      href={props.href}
    >
      {props.children}
    </MuiButton>
  );
};
