import React from 'react';
//import LandingPage from './pages/LandingPage';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import { createTheme, ThemeProvider } from '@mui/material';
import { SignIn } from './pages/SignIn/SignIn';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    desktop: true;
  }
  interface Theme {
    radius: {
      sm: number;
      md: number;
      lg: number;
      circle: string;
    };
  }
  interface ThemeOptions {
    radius?: {
      sm: number;
      md: number;
      lg: number;
      circle: string;
    };
  }
}

function App() {
  dayjs.extend(updateLocale);
  dayjs.extend(utc);
  dayjs.locale('pl');

  const theme = createTheme({
    breakpoints: {
      values: {
        mobile: 0,
        desktop: 1024,
      },
    },
    radius: {
      sm: 4,
      md: 8,
      lg: 16,
      circle: '50%',
    },
    palette: {
      primary: {
        main: '#311b92',
      },
      secondary: {
        main: '#ffc107',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <SignIn />
    </ThemeProvider>
  );
}

export default App;
