import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { Carousel } from '../components/Carousel';
import { PlanTile } from '../components/PlanTile';
import { Footer } from '../components/Footer';
import { BenefitsTile } from '../components/BenefitsTile';
import { ContentBreaker } from '../components/ContentBreaker';
import { StepTile } from '../components/StepTile';
import { Banner } from '../components/Banner';
import { StepsItems, benefits, mockCoaches, placeGridCenter, plans } from './LandingPage.constants';

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));

  return (
    <Grid container>
      {/* Logo + banner */}
      <Grid container item direction="row" mt={isMobile ? '0' : '2vh'}>
        <Grid container item sx={{ width: '100%' }}>
          <Banner />
        </Grid>
      </Grid>

      {/* Cooperation steps */}

      <Grid container item {...placeGridCenter}>
        <ContentBreaker bgColor="primary.main">
          <Typography fontSize={'2rem'} textAlign={'center'}>
            Check out how easy it is to start!
          </Typography>
        </ContentBreaker>
      </Grid>
      <Grid
        container
        item
        direction={{ mobile: 'column', desktop: 'row' }}
        {...placeGridCenter}
        gap={3}
        wrap="nowrap"
        my={3}
      >
        {StepsItems.map((item, key) => (
          <StepTile {...item} key={key} />
        ))}
      </Grid>

      {/* Content breaker */}

      <Grid container item columns={2} {...placeGridCenter}>
        <ContentBreaker bgColor="secondary.main">
          <Typography fontSize={'2rem'} textAlign={'center'}>
            Why should you choose us?
          </Typography>
        </ContentBreaker>
      </Grid>

      {/* Pexels tiles with benefits */}

      <Grid container item rowGap={3} my={3}>
        {benefits.map((item, key) => (
          <BenefitsTile {...item} key={key} />
        ))}
      </Grid>

      {/* Content breaker */}

      <Grid container item {...placeGridCenter} my={3}>
        <ContentBreaker bgColor="secondary.main">
          <Typography fontSize={'2rem'} textAlign={'center'}>
            Explore our coaches and select one that fits your needs!
          </Typography>
        </ContentBreaker>
      </Grid>

      {/* Explore trainers - swiper */}

      <Grid container item direction="row" my={3}>
        <Grid item {...placeGridCenter} className="swiper-container"></Grid>
        <Carousel trainers={mockCoaches} />
      </Grid>

      {/* Content breaker */}

      <Grid container item {...placeGridCenter}>
        <ContentBreaker bgColor="primary.main">
          <Typography fontSize={'2rem'} textAlign={'center'}>
            Check out our plans and choose which one suits you best!
          </Typography>
        </ContentBreaker>
      </Grid>

      {/* Plans */}

      <Grid
        container
        item
        direction={isMobile ? 'column' : 'row'}
        {...placeGridCenter}
        columnGap={3}
        my={3}
        wrap="nowrap"
      >
        {plans.map((item, key) => (
          <Grid item key={key}>
            <PlanTile {...item} />
          </Grid>
        ))}
      </Grid>

      {/* Footer */}
      <Grid container item direction="row" {...placeGridCenter} my={3}>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
