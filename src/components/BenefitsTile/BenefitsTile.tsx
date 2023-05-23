import { Grid, Typography } from '@mui/material';
import React, { useContext } from 'react';
import type { BenefitsTileProps } from './BenefitsTile.types';
import { ResponsiveImage } from '../ResponsiveImage/ResponsiveImage';
import { MobileContext } from '../../App';

export const BenefitsTile = (props: BenefitsTileProps) => {
  const isReversed = props.reverse ? 'row-reverse' : 'row';
  const isMobile = useContext(MobileContext);
  const textWidth = isMobile ? '100vw' : '20vw';
  return (
    <Grid
      container
      columns={2}
      sx={{ justifyContent: 'center', alignItems: 'center' }}
      columnGap={10}
      direction={isReversed}
    >
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
            style={{ borderRadius: '45px', maxWidth: '50vw' }}
          />
        )}
      </Grid>
      <Grid item gap={2}>
        <Typography
          sx={{ color: 'text.primary', textAlign: 'center', fontSize: '2rem', width: '100%' }}
        >
          {props.title}
        </Typography>
        <Typography
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            maxWidth: textWidth,
            fontSize: '1.25rem',
          }}
        >
          {props.description}
        </Typography>
      </Grid>
    </Grid>
  );
};
