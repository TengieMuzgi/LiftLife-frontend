import React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Carousel } from "../components/Carousel";
import { PlanTile } from "../components/PlanTile";
import { PlanProps } from "../components/PlanTile";

const LandingPage = () => {
  const placeGridCenter = {
    justifyContent: "center",
    alignItems: "center",
  };

  const testPlanProps: PlanProps = {
    planName: "Test plan",
    planCost: 10,
    planDescription: "Test description",
  };

  return (
    <Grid container spacing={3}>
      {/* Logo + banner */}
      {/* mt do wyrzucenia po dodaniu appbara - kwestia wizualizacji */}
      <Grid
        container
        item
        direction="row"
        columns={2}
        columnGap={2}
        {...placeGridCenter}
        mt={"10vh"}
      >
        <Grid item>
          <img src="assets\images\logo_placeholder.png" />
        </Grid>
        <Grid item>
          <img
            src="assets\images\banner_placeholder.png"
            style={{ maxWidth: "100vw" }}
          />
        </Grid>
      </Grid>

      {/* Opis współpracy (?) tile/img */}

      <Grid container item {...placeGridCenter}>
        <Grid item>
          <Typography fontSize={"24px"}>
            How working with us looks like?
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        item
        direction="row"
        {...placeGridCenter}
        columns={4}
        columnGap={3}
      >
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
          <img
            src="assets\images\cbreaker_placeholder.png"
            style={{ maxWidth: "80vw" }}
          />
        </Grid>
      </Grid>

      {/* Co z nami zyskujesz - Pexels */}

      <Grid container item rowGap={3}>
        <Grid container item columns={2} {...placeGridCenter}>
          <Grid item>
            <Typography fontSize={"24px"}>
              What are the benefits of working with us?
            </Typography>
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
        <Grid
          container
          columns={2}
          {...placeGridCenter}
          columnGap={30}
          direction="row-reverse"
        >
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
        <Grid
          container
          columns={2}
          {...placeGridCenter}
          columnGap={30}
          direction="row-reverse"
        >
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
          <img
            src="assets\images\cbreaker_placeholder.png"
            style={{ maxWidth: "80vw" }}
          />
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

      {/* Nasi trenerzy (może jakiś swiper z preview 3-5 osób?)*/}

      <Grid container item direction="row">
        <Grid item {...placeGridCenter} className="swiper-container">
          <Carousel
            links={[
              "assets\\images\\trainer_placeholder.png",
              "assets\\images\\trainer_placeholder.png",
              "assets\\images\\trainer_placeholder.png",
              "assets\\images\\trainer_placeholder.png",
              "assets\\images\\trainer_placeholder.png",
            ]}
          />
        </Grid>
      </Grid>

      {/* Basic footer - bez nawigacji? */}
    </Grid>
  );
};

export default LandingPage;
