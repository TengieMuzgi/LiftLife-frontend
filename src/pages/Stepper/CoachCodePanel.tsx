import { SportsGymnastics } from '@mui/icons-material';
import { Box, TextField, Typography } from '@mui/material';
import React from 'react';
import { stepFormStyles, stepIconStyles } from './Stepper.styles';

type CoachCodePanelProps = {
  value: string;
  onChange: (value: string) => void;
};

export const CoachCodePanel = ({ value, onChange }: CoachCodePanelProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange(value);
  };

  return (
    <Box sx={stepFormStyles}>
      <SportsGymnastics sx={stepIconStyles} />
      <Typography variant="h5">Enter Invitation Code</Typography>
      <Typography variant="body1">Hint: you should receive it from coach or admin on your email</Typography>
      <TextField
        helperText="Coach Code"
        label="Coach Code"
        value={value}
        variant="outlined"
        onChange={handleChange}
        inputProps={{
          maxLength: 36,
        }}
        aria-labelledby="coach code"
      />
    </Box>
  );
};
