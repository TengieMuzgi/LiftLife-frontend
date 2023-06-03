import React, { useContext } from 'react';
import { AppBar as MUIAppBar, Box, Button, Toolbar, Typography, IconButton } from '@mui/material';
import { Container } from '@mui/system';
import { Adb, Login, Logout } from '@mui/icons-material';
import { navigationActionData } from '../BottomNavigation/BottomNavigation.constants';
import { AppContext } from '../../App';
import { setCookie } from 'typescript-cookie';
import { useNavigate } from 'react-router-dom';

type AppBarProps = {};

export const AppBar = (props: AppBarProps) => {
  const isUserLoggedIn = true;
  const isCoachLoggedIn = false;
  const isAdminLoggedIn = false;
  const isNotLoggedIn = false;
  const { isAuthenticated, onAuthenticatedChange } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCookie('userToken', undefined);
    onAuthenticatedChange(false);
    navigate('/');
  };

  const handleLoginRedirect = () => {
    navigate('/signin');
  };

  return (
    <MUIAppBar>
      <Container>
        <Toolbar>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            sx={{ py: 1 }}
          >
            <Box display="flex" alignItems="center">
              <Adb sx={{ display: { mobile: 'none', desktop: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  color: 'inherit',
                  display: { mobile: 'none', desktop: 'flex' },
                  textDecoration: 'none',
                  mr: 2,
                }}
              >
                LiftLife
              </Typography>
              <Box display="flex" sx={{ gap: 1 }}>
                {isNotLoggedIn &&
                  navigationActionData.notLoggedIn.map(item => (
                    <Button
                      key={item.label}
                      variant="contained"
                      disableElevation
                      onClick={() => navigate('/' + item.label.toLowerCase())}
                    >
                      {item.label}
                    </Button>
                  ))}
                {isUserLoggedIn &&
                  navigationActionData.userLoggedIn.map(item => (
                    <Button
                      key={item.label}
                      variant="contained"
                      disableElevation
                      onClick={() => navigate('/' + item.label.toLowerCase())}
                    >
                      {item.label}
                    </Button>
                  ))}
                {isCoachLoggedIn &&
                  navigationActionData.coachLoggedIn.map(item => (
                    <Button
                      key={item.label}
                      variant="contained"
                      disableElevation
                      onClick={() => navigate('/' + item.label.toLowerCase())}
                    >
                      {item.label}
                    </Button>
                  ))}
                {isAdminLoggedIn &&
                  navigationActionData.adminLoggedIn.map(item => (
                    <Button
                      key={item.label}
                      variant="contained"
                      disableElevation
                      onClick={() => navigate('/' + item.label.toLowerCase())}
                    >
                      {item.label}
                    </Button>
                  ))}
              </Box>
            </Box>
            {/*TODO: fix logout button behavior: after signin it doesn't appear on appbar until page is refreshed, same after logout*/}
            {isAuthenticated ? (
              <Box>
                <IconButton onClick={handleLogout}>
                  <Logout sx={{ color: 'white' }} />
                </IconButton>
              </Box>
            ) : (
              <Box>
                <IconButton onClick={handleLoginRedirect}>
                  <Login sx={{ color: 'white' }} />
                </IconButton>
              </Box>
            )}
            {!isAuthenticated && (
              <Box>
                <IconButton onClick={() => navigate('/signin')}>
                  <Login sx={{ color: 'white' }} />
                </IconButton>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </MUIAppBar>
  );
};
