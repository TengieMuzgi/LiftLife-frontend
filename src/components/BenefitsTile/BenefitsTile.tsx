import { Grid, Typography } from '@mui/material';
import React from 'react';
import { BenefitsImage } from './BenefitsTile.constants';
import type { BenefitsTileProps } from './BenefitsTile.types';

export const BenefitsTile = (props: BenefitsTileProps) => {
  const isReversed = props.reverse ? 'row-reverse' : 'row';
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
        <BenefitsImage src={props.imgSrc} alt={props.alt} />
      </Grid>
    </Grid>
  );
};
