import React from "react";
import { BenefitsTileProps } from "./BenefitsTile.constants";
import { Grid, Typography } from "@mui/material";
import { BenefitsImage, titleStyles } from "./BenefitsTile.styles";

export const BenefitsTile = (props: BenefitsTileProps) => {
  const isReverse = props.reverse ? "row-reverse" : "row";
  return (
    <Grid
      container
      columns={2}
      sx={{ justifyContent: "center", alignItems: "center" }}
      columnGap={30}
      direction={isReverse}
    >
      <Grid item>
        <Typography sx={titleStyles}>{props.title}</Typography>
        <Typography sx={{ textAlign: "center" }}>
          {props.description}
        </Typography>
      </Grid>
      <Grid item>
        <BenefitsImage src={props.imgSrc} />
      </Grid>
    </Grid>
  );
};
