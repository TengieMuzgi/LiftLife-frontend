import React, { createContext } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import LandingPage from './pages/LandingPage';
import { AppBar } from './components/AppBar';
import { BottomNavigation } from './components/BottomNavigation';
import { getCookie } from 'typescript-cookie';
import { Routes, Route } from 'react-router-dom';
import { SignIn } from './pages/SignIn';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { ProtectedRoute, ProtectedRouteProps } from './components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

export const AppContext = createContext({ isMobile: false, isAuthenticated: false });

export function App() {
  dayjs.extend(updateLocale);
  dayjs.extend(utc);
  dayjs.locale('pl');

  const queryClient = new QueryClient();
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
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '3rem',
            padding: '16px',
          },
        },
      },
    },
    typography: {
      button: {
        textTransform: 'none',
      },
    },
  });

  const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));
  const isAuthenticated = getCookie('userToken') !== 'undefined';

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated: isAuthenticated,
    navigationPath: '/',
  };

  return (
    <AppContext.Provider value={{ isMobile, isAuthenticated }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          {!isMobile && <AppBar />}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              element={
                <ProtectedRoute
                  {...defaultProtectedRouteProps}
                  outlet={<ProfilePage defaultTabOpened={0} />}
                />
              }
              path="/workouts"
            />
            <Route
              element={
                <ProtectedRoute
                  {...defaultProtectedRouteProps}
                  outlet={<ProfilePage defaultTabOpened={1} />}
                />
              }
              path="/diet"
            />
            <Route
              element={
                <ProtectedRoute
                  {...defaultProtectedRouteProps}
                  outlet={<ProfilePage defaultTabOpened={2} />}
                />
              }
              path="/coach"
            />
            <Route
              element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<ProfilePage />} />}
              path="/profile"
            />
            {/*TODO: explore coaches */}
            <Route
              element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<LandingPage />} />}
              path="/explore"
            />
          </Routes>
          {isMobile && <BottomNavigation />}
        </ThemeProvider>
      </QueryClientProvider>
    </AppContext.Provider>
  );
}
