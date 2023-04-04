import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { FitnessCenter, LooksOne } from "@mui/icons-material";
import { StepTileProps } from "./StepTile.constants";

export const StepTile = (props: StepTileProps) => {
  return (
    <Box>
      <Paper
        elevation={6}
        sx={{
          minWidth: "15vw",
          minHeight: "10vw",
          maxWidth: "50vw",
          maxHeight: "25vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* step counter icon? step counter number? */}
        <FitnessCenter sx={{ width: "5vw", height: "auto", opacity: "0.4" }} />
        {/* Title - Contact -> Register -> Choose Plan -> Enjoy */}
        <Typography sx={{ fontWeight: "bold" }}>{props.title}</Typography>
        {/* i.e. First fill the contact form and wait until one of our trainers contacts you 
        One of our trainers will send you link to register
        Then you will have to select plan that fits your needs best
        Enjoy full support of our team*/}
        <Typography>{props.description}</Typography>
      </Paper>
    </Box>
  );
};
