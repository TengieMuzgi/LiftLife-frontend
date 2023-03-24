import { Box, Typography } from "@mui/material"
import React from "react"
import { footerStyles, textStyles } from "./Footer.styles";

export const Footer = () => {
    let year = new Date().getFullYear();
    return(<Box sx={footerStyles} flexDirection="column">
        <Typography sx={textStyles}>&copy; {year} LiftLife </Typography>
        <Typography sx={textStyles}>All rights reserved.</Typography>
    </Box>)
}