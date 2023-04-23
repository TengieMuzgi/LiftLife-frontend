import React, { useState } from 'react';
import {
  AppBar as MUIAppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { Adb } from '@mui/icons-material';
import { LoggedInProfileSettings, NotLoggedInProfileSettings } from './AppBar.constants';
import { navigationActionData } from '../BottomNavigation/BottomNavigation.constants';

type AppBarProps = {};

export const AppBar = (props: AppBarProps) => {
  const isUserLoggedIn = true;
  const isCoachLoggedIn = false;
  const isAdminLoggedIn = false;
  const isNotLoggedIn = false;

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <MUIAppBar>
      <Container>
        <Toolbar>
          <Box display="flex" justifyContent="space-between" width="100%">
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
                LOGO
              </Typography>
              <Box display="flex" sx={{ gap: 1 }}>
                {isNotLoggedIn &&
                  navigationActionData.notLoggedIn.map(item => (
                    <Button key={item.label} variant="contained">
                      {item.label}
                    </Button>
                  ))}
                {isUserLoggedIn &&
                  navigationActionData.userLoggedIn.map(item => (
                    <Button key={item.label} variant="contained">
                      {item.label}
                    </Button>
                  ))}
                {isCoachLoggedIn &&
                  navigationActionData.coachLoggedIn.map(item => (
                    <Button key={item.label} variant="contained">
                      {item.label}
                    </Button>
                  ))}
                {isAdminLoggedIn &&
                  navigationActionData.adminLoggedIn.map(item => (
                    <Button key={item.label} variant="contained">
                      {item.label}
                    </Button>
                  ))}
              </Box>
            </Box>

            <Box>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Profile avatar">P</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {isNotLoggedIn
                  ? NotLoggedInProfileSettings.map(setting => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))
                  : LoggedInProfileSettings.map(setting => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </MUIAppBar>
  );
};
