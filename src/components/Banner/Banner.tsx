import { Box, Grid, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { Button } from '../Button';
import { filterBoxStyles, subtitleStyles, titleStyles, videoStyles } from './Banner.styles';
import { AppContext } from '../../App';

export const Banner = () => {
  const { isMobile } = useContext(AppContext);

  const handleScroll = () => {
    const element = document.getElementById('explore-coaches');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const responsiveTitleStyles = isMobile
    ? { ...titleStyles, mt: '50vh', fontSize: '8vh' }
    : titleStyles;
  const responsiveSubtitleStyles = isMobile
    ? { ...subtitleStyles, fontSize: '4vh', maxWidth: '100%' }
    : subtitleStyles;
  const responsiveVideoStyles = isMobile
    ? { ...videoStyles, height: '100%' }
    : { ...videoStyles, top: '5%' };
  const responsiveFilterBoxStyles = isMobile
    ? { ...filterBoxStyles, top: '0', height: '100%' }
    : filterBoxStyles;
  return (
    <>
      <Grid item sx={{ position: 'relative', width: '100%', height: '100vh' }}>
        <video
          src="assets\\videos\\banner_video.mp4"
          autoPlay
          loop
          muted
          style={responsiveVideoStyles}
        />
        <Box sx={responsiveFilterBoxStyles}>
          <Typography sx={responsiveTitleStyles}>LiftLife</Typography>
          <Typography sx={responsiveSubtitleStyles}>
            With us you can hit your goals faster!
          </Typography>
          <Button type="button" onClick={handleScroll}>
            Explore our coaches!
          </Button>
        </Box>
      </Grid>
    </>
  );
};
