import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { Carousel } from '../components/Carousel';
import { PlanTile } from '../components/PlanTile';
import { PlanProps } from '../components/PlanTile';
import { Footer } from '../components/Footer';

const LandingPage = () => {
  const placeGridCenter = {
    justifyContent: 'center',
    alignItems: 'center',
  };

  const testPlanProps: PlanProps = {
    planName: 'Test plan',
    planCost: 10,
    planDescription: 'Test description',
  };

  //temporary
  const antiHorizontalScroll = {
    minWidth: '99vw',
    maxWidth: '50vw',
  };

  return (
    <Grid container spacing={3}>
      {/* Logo + banner */}
      {/* TODO: Delete mt property from grid below after AppBar is created */}
      <Grid container item direction="row" {...placeGridCenter} mt={'10vh'}>
        {/* TODO: Zebra wave from animatedbackgrounds or react-wavify ? https://www.npmjs.com/package/react-wavify */}
        <Grid item>
          <img src="assets\images\banner_placeholder.png" style={{ ...antiHorizontalScroll }} />
        </Grid>
      </Grid>

      {/* Cooperation steps */}

      <Grid container item {...placeGridCenter}>
        <Grid item>
          <Typography fontSize={'24px'}>How working with us looks like?</Typography>
        </Grid>
      </Grid>
      <Grid container item direction="row" {...placeGridCenter} columns={4} columnGap={3}>
        <Grid item>
          <img src="assets\images\tile_placeholder.png" />
        </Grid>
        <Grid item>
          <img src="assets\images\tile_placeholder.png" />
        </Grid>
        <Grid item>
          <img src="assets\images\tile_placeholder.png" />
        </Grid>
        <Grid item>
          <img src="assets\images\tile_placeholder.png" />
        </Grid>
      </Grid>

      {/* Content breaker */}

      <Grid container item {...placeGridCenter}>
        <Grid item>
          <img src="assets\images\cbreaker_placeholder.png" style={{ ...antiHorizontalScroll }} />
        </Grid>
      </Grid>

      {/* Pexels tiles with benefits */}

      <Grid container item rowGap={3}>
        <Grid container item columns={2} {...placeGridCenter}>
          <Grid item>
            <Typography fontSize={'24px'}>What are the benefits of working with us?</Typography>
          </Grid>
        </Grid>
        <Grid container columns={2} {...placeGridCenter} columnGap={30}>
          <Grid item>
            <Typography>Pexels tile description</Typography>
          </Grid>
          <Grid item>
            <img src="assets\images\pexels_placeholder.png" />
          </Grid>
        </Grid>
        <Grid container columns={2} {...placeGridCenter} columnGap={30} direction="row-reverse">
          <Grid item>
            <Typography>Pexels tile description</Typography>
          </Grid>
          <Grid item>
            <img src="assets\images\pexels_placeholder.png" />
          </Grid>
        </Grid>
        <Grid container columns={2} {...placeGridCenter} columnGap={30}>
          <Grid item>
            <Typography>Pexels tile description</Typography>
          </Grid>
          <Grid item>
            <img src="assets\images\pexels_placeholder.png" />
          </Grid>
        </Grid>
        <Grid container columns={2} {...placeGridCenter} columnGap={30} direction="row-reverse">
          <Grid item>
            <Typography>Pexels tile description</Typography>
          </Grid>
          <Grid item>
            <img src="assets\images\pexels_placeholder.png" />
          </Grid>
        </Grid>
      </Grid>

      {/* Content breaker */}

      <Grid container item {...placeGridCenter}>
        <Grid item>
          <img src="assets\images\cbreaker_placeholder.png" style={{ ...antiHorizontalScroll }} />
        </Grid>
      </Grid>

      {/* Packs */}

      <Grid container item direction="row" {...placeGridCenter} columnGap={3}>
        <Grid item xs={12} md={3}>
          <PlanTile {...testPlanProps} small />
        </Grid>
        <Grid item xs={12} md={3}>
          <PlanTile {...testPlanProps} />
        </Grid>
        <Grid item xs={12} md={3}>
          <PlanTile {...testPlanProps} small />
        </Grid>
      </Grid>

      {/* Explore trainers - swiper */}

      <Grid container item direction="row">
        <Grid item {...placeGridCenter} className="swiper-container"></Grid>
        <Carousel
          links={[
            'assets\\images\\trainer_placeholder.png',
            'assets\\images\\trainer_placeholder.png',
            'assets\\images\\trainer_placeholder.png',
            'assets\\images\\trainer_placeholder.png',
            'assets\\images\\trainer_placeholder.png',
          ]}
        />
      </Grid>

      {/* Footer */}
      <Grid container item direction="row">
        <Grid item xs={12} md={12}>
          <Footer />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
