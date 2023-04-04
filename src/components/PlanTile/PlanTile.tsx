import { Paper, Box, Typography, Button } from "@mui/material";
import { PlanProps } from "./PlanTile.constants";
import { planTileStyles } from "./PlanTile.styles";
import React from "react";

export const PlanTile = (props: PlanProps) => {
  const planSx = props.small
    ? { ...planTileStyles, transform: "scale(0.9)" }
    : planTileStyles;
  return (
    <Box>
      <Paper elevation={3} sx={planSx} className="hoverScale">
        <Typography>{props.planName}</Typography>
        <Typography>Cost: {props.planCost} $</Typography>
        <Typography>{props.planDescription}</Typography>
        <Button
          variant="contained"
          size="small"
          sx={{ borderRadius: "1.5rem", padding: 1.5 }}
        >
          Test button
        </Button>
      </Paper>
    </Box>
  );
};
