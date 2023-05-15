import { Paper, Box, Typography, List, ListItem } from '@mui/material';
import { PlanProps } from './PlanTile.types';
import { planTileStyles } from './PlanTile.styles';
import React from 'react';

//TODO: styling plan box after we fetch data from backend
export const PlanTile = ({ header, small, planName, planCost, planDescription }: PlanProps) => {
  const planSx = small ? { ...planTileStyles, transform: 'scale(0.85)' } : planTileStyles;
  return (
    <Box>
      <Paper elevation={small ? 3 : 6} sx={planSx}>
        {header && (
          <Typography variant="h3" pb={3}>
            {header}
          </Typography>
        )}
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          {planName}
        </Typography>
        <Typography variant="h5">Cost: {planCost} $</Typography>
        <List>
          {planDescription.map((item, key) => (
            <ListItem key={key} sx={{ display: 'list-item' }}>
              <Typography sx={{ textAlign: 'left' }}> {item} </Typography>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};
