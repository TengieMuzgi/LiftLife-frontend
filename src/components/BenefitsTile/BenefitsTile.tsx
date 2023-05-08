import { Grid, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import type { BenefitsTileProps } from './BenefitsTile.types';
import { ResponsiveImage } from '../ResponsiveImage/ResponsiveImage';
import { useTheme } from '@mui/material';

export const BenefitsTile = (props: BenefitsTileProps) => {
  const isReversed = props.reverse ? 'row-reverse' : 'row';
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));
  return (
    <Grid
      container
      columns={2}
      sx={{ justifyContent: 'center', alignItems: 'center' }}
      columnGap={30}
      direction={isReversed}
    >
      <Grid item>
        <Typography sx={{ color: 'text.primary', textAlign: 'center' }}>{props.title}</Typography>
        <Typography sx={{ color: 'text.secondary', textAlign: 'center' }}>
          {props.description}
        </Typography>
      </Grid>
      <Grid item>
        {isMobile ? (
          <ResponsiveImage
            src={props.imgSrc}
            alt={props.alt}
            style={{ borderRadius: '45px', maxWidth: '100vw' }}
          />
        ) : (
          <ResponsiveImage
            src={props.imgSrc}
            alt={props.alt}
            style={{ borderRadius: '45px', maxWidth: '25vw' }}
          />
        )}
      </Grid>
    </Grid>
  );
};
