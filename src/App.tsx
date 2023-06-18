import React, { createContext, useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import LandingPage from './pages/LandingPage/LandingPage';
import { Snackbar } from './components/Snackbar/Snackbar';
import { AppBar } from './components/AppBar';
import { BottomNavigation } from './components/BottomNavigation';
import { getCookie } from 'typescript-cookie';
import { Routes, Route } from 'react-router-dom';
import { SignIn } from './pages/SignIn';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { ProtectedRoute, ProtectedRouteProps } from './components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSnackbar } from './hooks/useSnackbar';
import { Workouts } from './pages/Workouts/Workouts';
import { Diet } from './pages/Diet/Diet';
import { Explore } from './pages/Explore/Explore';
import { SignUp } from './pages/SignUp/SignUp';
import { MyCoach } from './pages/MyCoach/MyCoach';
import { Stepper } from './pages/Stepper/Stepper';
import { ProfileInformation } from './pages/ProfileInformation/ProfileInformation';
import { RoleType } from './constants/user';

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

type AppContextType = {
  isMobile: boolean;
  role: RoleType | null;
  isAuthenticated: boolean;
  onAuthenticatedChange: (nextAuthenticatedState: boolean, role: RoleType | null) => void;
};

export const AppContext = createContext<AppContextType>({
  isMobile: false,
  isAuthenticated: false,
  role: null,
  onAuthenticatedChange: () => {},
});

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
  const [isAuthenticated, setIsAuthenticated] = useState(getCookie('userToken') !== 'undefined');
  // TODO: set role based on info from API, when userToken cookie is set
  const getRole = localStorage.getItem('userRole') === undefined ? null : localStorage.getItem('userRole') as RoleType | null;
  const [role, setRole] = useState<RoleType | null>(getRole);
  const [snackbarState, showSnackbar, hideSnackbar] = useSnackbar();

  const onAuthenticatedChange = (nextAuthenticatedState: boolean, role: RoleType | null) => {
    setIsAuthenticated(nextAuthenticatedState);
    setRole(role);

    if (nextAuthenticatedState) showSnackbar('You have been successfully logged in!', 'success');
    else showSnackbar('You have been logged off!', 'info');
  };

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated: isAuthenticated,
    navigationPath: '/',
  };

  // TODO: add navigation back to landingpage, login and logout on mobile
  return (
    <AppContext.Provider value={{ isMobile, isAuthenticated, onAuthenticatedChange, role }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          {!isMobile && <AppBar />}
          {snackbarState !== null && (
            <Snackbar
              isOpen={true}
              message={snackbarState.message}
              severity={snackbarState.severity}
              onClose={hideSnackbar}
            />
          )}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/steps" element={<Stepper />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
              element={
                <ProtectedRoute
                  {...defaultProtectedRouteProps}
                  outlet={
                    <ProfilePage>
                      <Workouts />
                    </ProfilePage>
                  }
                />
              }
              path="/my-workouts"
            />
            <Route
              element={
                <ProtectedRoute
                  {...defaultProtectedRouteProps}
                  outlet={
                    <ProfilePage>
                      <Diet />
                    </ProfilePage>
                  }
                />
              }
              path="/my-diet"
            />
            <Route
              element={
                <ProtectedRoute
                  {...defaultProtectedRouteProps}
                  outlet={
                    <ProfilePage>
                      <MyCoach />
                    </ProfilePage>
                  }
                />
              }
              path="/my-coach"
            />
            <Route
              element={
                <ProtectedRoute
                  {...defaultProtectedRouteProps}
                  outlet={<ProfilePage><ProfileInformation/></ProfilePage>}
                />
              }
              path="/profile"
            />
            <Route
              element={
                <ProtectedRoute
                  {...defaultProtectedRouteProps}
                  outlet={
                    <ProfilePage>
                      <Explore />
                    </ProfilePage>
                  }
                />
              }
              path="/explore-trainers"
            />
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
