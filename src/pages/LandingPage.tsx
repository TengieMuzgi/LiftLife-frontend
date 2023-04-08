import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { Carousel } from '../components/Carousel';
import { PlanTile, PlanProps } from '../components/PlanTile';
import { Footer } from '../components/Footer';
import { BenefitsTile, BenefitsTileProps } from '../components/BenefitsTile';
import { ContentBreaker } from '../components/ContentBreaker';
import { StepTile } from '../components/StepTile';

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));

  const placeGridCenter = {
    justifyContent: 'center',
    alignItems: 'center',
  };

  const testPlanProps: PlanProps = {
    planName: 'Test plan',
    planCost: 10,
    planDescription: 'Description for the testing purposes of plan tile',
  };

  const testBenefitsProps: BenefitsTileProps = {
    title: 'Test title',
    description: 'Test description',
  };

  //TODO: discuss if we will use contained or outlined icons - if outlined we need to find valid link
  // from Google Fonts since 'Material+Icons+Outlined' doesn't seem to work
  const StepsItems = [
    {
      title: 'Test Step',
      description:
        'test description',
      icon: 'description',
    },
    {
      title: 'Test Step 2',
      description:
        'test description 2',
      icon: 'forum',
    },
    {
      title: 'Test Step 3',
      description:
        'test description 3',
      icon: 'local_mall',
    },
    {
      title: 'Test Step 4',
      description:
        'test description 4',
      icon: 'fitness_center',
      last: true,
    },
  ];

  return (
    <Grid container spacing={3}>
      {/* Logo + banner */}
      {/* TODO: Delete mt property from grid below after AppBar is created */}
      <Grid container item direction="row" {...placeGridCenter} mt={'10vh'}>
        {/* TODO: Zebra wave from animatedbackgrounds or react-wavify ? https://www.npmjs.com/package/react-wavify */}
        <Grid item sx={{ width: '100%' }}>
          <img alt="" src="assets\images\banner_placeholder.png" style={{ width: '100%' }} />
        </Grid>
      </Grid>

      {/* Cooperation steps */}

      <Grid container item {...placeGridCenter}>
        <ContentBreaker bgColor="primary.main">
          <Typography fontSize={'24px'} textAlign={'center'}>
            How working with us looks like?
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
      >
        {StepsItems.map((item, key) => (
          <StepTile {...item} key={key} />
        ))}
      </Grid>

      {/* Content breaker */}

      <Grid container item columns={2} {...placeGridCenter}>
        <ContentBreaker bgColor="secondary.main">
          <Typography fontSize={'24px'} textAlign={'center'}>
            What are the benefits of working with us?
          </Typography>
        </ContentBreaker>
      </Grid>

      {/* Pexels tiles with benefits */}

      <Grid container item rowGap={3}>
        <BenefitsTile {...testBenefitsProps} imgSrc="assets\images\pexels\pexels_1.jpg" />
        <BenefitsTile {...testBenefitsProps} imgSrc="assets\images\pexels\pexels_2.jpg" reverse />
        <BenefitsTile {...testBenefitsProps} imgSrc="assets\images\pexels\pexels_3.jpg" />
        <BenefitsTile {...testBenefitsProps} imgSrc="assets\images\pexels\pexels_4.jpg" reverse />
      </Grid>

      {/* Content breaker */}

      <Grid container item {...placeGridCenter}>
        <ContentBreaker bgColor="primary.main">
          <Typography fontSize={'24px'} textAlign={'center'}>
            Check out our plans and choose which one suits you best!
          </Typography>
        </ContentBreaker>
      </Grid>

      {/* Packs */}

      <Grid
        container
        item
        direction={isMobile ? 'column' : 'row'}
        {...placeGridCenter}
        columnGap={3}
      >
        <Grid item>
          <PlanTile {...testPlanProps} small />
        </Grid>
        <Grid item>
          <PlanTile {...testPlanProps} />
        </Grid>
        <Grid item>
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
      <Grid container item direction="row" {...placeGridCenter}>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
