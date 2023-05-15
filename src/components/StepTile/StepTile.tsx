import { Grid, Paper, Typography, Icon, Box, useTheme, useMediaQuery } from '@mui/material';
import React from 'react';
import { South, East } from '@mui/icons-material';
import { StepTileProps } from './StepTile.types';
import { StepTilePaperStyles, StepIconStyles } from './StepTile.styles';

export const StepTile = (props: StepTileProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));
  const boxStyles = !isMobile ? { maxWidth: '20vw' } : {};
  return (
    <>
      <Grid item>
        <Box sx={boxStyles}>
          <Paper sx={StepTilePaperStyles} elevation={3}>
            <Icon sx={StepIconStyles} className="material-icons-outlined">
              {props.icon}
            </Icon>
            <Typography variant="h5" align="center">
              {props.title}
            </Typography>
            <Typography variant="body1" align="center">
              {props.description}
            </Typography>
          </Paper>
        </Box>
      </Grid>
      {!props.last && (
        <Grid item>
          {isMobile ? (
            <South sx={{ fontSize: '5vh', color: 'primary.main' }} />
          ) : (
            <East sx={{ fontSize: '3vw', color: 'primary.main' }} />
          )}
        </Grid>
      )}
    </>
  );
};
