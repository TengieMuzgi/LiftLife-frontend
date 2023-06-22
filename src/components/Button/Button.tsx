import React, { MouseEventHandler } from 'react';
import { ButtonProps, Button as MuiButton } from '@mui/material';

type ButtonType = {
  children: string | React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  wide?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  href?: string;
  icon?: React.ReactElement<ButtonProps>;
};

export const Button = (props: ButtonType) => {
  return (
    <MuiButton
      variant="contained"
      size="small"
      disabled={props.disabled}
      type={props.type}
      onClick={props.onClick}
      sx={{ ...(props.wide && { px: 4 }), height: '50px' }}
      href={props.href}
      startIcon={props.icon}
    >
      {props.children}
    </MuiButton>
  );
};
