import React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Carousel from "../components/Carousel";

const LandingPage = () => {
  const placeGridCenter = {
    justifyContent: "center",
    alignItems: "center",
  };
  const smallPacket = {
    transform: "scale(0.9)",
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
          <img src="assets\images\banner_placeholder.png" />
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
          <img src="assets\images\cbreaker_placeholder.png" />
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
          <img src="assets\images\cbreaker_placeholder.png" />
        </Grid>
      </Grid>

      {/* Packs */}

      <Grid container item direction="row" {...placeGridCenter} columnGap={3}>
        <Grid item>
          <img
            src="assets\images\plan_placeholder.png"
            style={{ ...smallPacket }}
          />
        </Grid>
        <Grid item>
          <img src="assets\images\plan_placeholder.png" />
        </Grid>
        <Grid item>
          <img
            src="assets\images\plan_placeholder.png"
            style={{ ...smallPacket }}
          />
        </Grid>
      </Grid>

      {/* Nasi trenerzy (może jakiś swiper z preview 3-5 osób?)*/}
      <Grid container item>
        <Grid item {...placeGridCenter}>
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
      {/* Break do podziału contentu wymyśl se coś */}

      {/* Basic footer - bez nawigacji? */}
    </Grid>
  );
};

export default LandingPage;
