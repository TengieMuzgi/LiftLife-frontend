import { Face } from '@mui/icons-material';
import { Box, TextField, Typography } from '@mui/material';
import React from 'react';
import { stepFormStyles, stepIconStyles } from './Stepper.styles';

type userPhysiqueProps = {
  value: { age: string; weight: string; height: string };
  onChange: (param: 'age' | 'weight' | 'height', value: string) => void;
};

export const UserInfoPanel = ({ value, onChange }: userPhysiqueProps) => {
  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange('age', value);
  };

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange('weight', value);
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange('height', value);
  };

  return (
    <Box sx={stepFormStyles}>
      <Face sx={stepIconStyles} />
      <Typography variant="h5">Enter Your Information</Typography>
      <Typography variant="body1">
        This will help the coach choose the right plan for you
      </Typography>
      <TextField
        helperText="Age"
        label="Age"
        variant="outlined"
        value={value.age}
        onChange={handleAgeChange}
        inputProps={{
          maxLength: 2,
          inputMode: 'numeric',
          min: 12,
          max: 99,
        }}
        aria-labelledby="age"
      />
      <TextField
        helperText="Body mass (kg)"
        label="Body mass (kg)"
        variant="outlined"
        value={value.weight}
        onChange={handleWeightChange}
        inputProps={{
          maxLength: 3,
          inputMode: 'numeric',
          min: 0,
        }}
        aria-labelledby="body mass in kilograms"
      />
      <TextField
        helperText="Height"
        label="Height"
        variant="outlined"
        value={value.height}
        onChange={handleHeightChange}
        inputProps={{
          maxLength: 3,
          inputMode: 'numeric',
          min: 100,
          max: 300,
        }}
        aria-labelledby="height"
      />
    </Box>
  );
};
