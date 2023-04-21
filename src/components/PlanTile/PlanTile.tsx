import { Paper, Box, Typography } from '@mui/material';
import { PlanProps } from './PlanTile.types';
import { planTileStyles } from './PlanTile.styles';
import { Button } from '../Button/Button';
import React from 'react';

//TODO: styling plan box after we fetch data from backend
export const PlanTile = (props: PlanProps) => {
  const planSx = props.small ? { ...planTileStyles, transform: 'scale(0.9)' } : planTileStyles;
  return (
    <Box>
      <Paper elevation={props.small ? 3 : 6} sx={planSx}>
        <Typography>{props.planName}</Typography>
        <Typography>Cost: {props.planCost} $</Typography>
        <Typography>{props.planDescription}</Typography>
        <Button>Test button </Button>
      </Paper>
    </Box>
  );
};
