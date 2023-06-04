import React, { useContext } from 'react';
import { AppBar as MUIAppBar, Box, Button, Toolbar, Link, IconButton } from '@mui/material';
import { Container } from '@mui/system';
import { Adb, Login, Logout } from '@mui/icons-material';
import { navigationActionData } from '../BottomNavigation/BottomNavigation.constants';
import { AppContext } from '../../App';
import { setCookie } from 'typescript-cookie';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../constants/roles';

type AppBarProps = {};

export const AppBar = (props: AppBarProps) => {
  const { role, isAuthenticated, onAuthenticatedChange } = useContext(AppContext);
  const navigate = useNavigate();

  const isUserLoggedIn = role === ROLES.USER;
  const isCoachLoggedIn = role === ROLES.COACH;
  const isAdminLoggedIn = role === ROLES.ADMIN;
  const isNotLoggedIn = role === ROLES.NOT_LOGGED;

  const handleLogout = () => {
    setCookie('userToken', undefined);
    onAuthenticatedChange(false, ROLES.NOT_LOGGED);
    navigate('/');
  };

  const handleLoginRedirect = () => {
    navigate('/sign-in');
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
              <Link
                variant="h6"
                noWrap
                component="a"
                href="/#"
                sx={{
                  color: 'inherit',
                  display: { mobile: 'none', desktop: 'flex' },
                  textDecoration: 'none',
                  mr: 2,
                  cursor: 'pointer',
                }}
              >
                LiftLife
              </Link>
              <Box display="flex" sx={{ gap: 1 }}>
                {isNotLoggedIn &&
                  navigationActionData.notLoggedIn.map(item => (
                    <Button
                      key={item.label}
                      variant="contained"
                      disableElevation
                      onClick={() => navigate(item.href)}
                      href={item.href.includes('#') ? item.href : undefined}
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
                      onClick={() => navigate(item.href)}
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
                      onClick={() => navigate(item.href)}
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
                      onClick={() => navigate(item.href)}
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
          </Box>
        </Toolbar>
      </Container>
    </MUIAppBar>
  );
};
