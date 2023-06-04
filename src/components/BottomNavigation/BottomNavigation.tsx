import React, { useContext, useState } from 'react';
import {
  BottomNavigation as MUIBottomNavigation,
  BottomNavigationAction,
  Paper,
  useTheme,
} from '@mui/material';
import { navigationActionData } from './BottomNavigation.constants';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { ROLES } from '../../constants/roles';

type BottomNavigationProps = {};

export const BottomNavigation = (props: BottomNavigationProps) => {
  const [selectedTab, setSelectedTab] = useState<string>('');
  const theme = useTheme();
  const { role } = useContext(AppContext);
  const navigate = useNavigate();

  const isUserLoggedIn = role === ROLES.USER;
  const isCoachLoggedIn = role === ROLES.COACH;
  const isAdminLoggedIn = role === ROLES.ADMIN;
  const isNotLoggedIn = role === ROLES.NOT_LOGGED;

  return (
    <Paper
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: theme.zIndex.appBar,
        width: '100vw',
      }}
      elevation={3}
    >
      <MUIBottomNavigation
        showLabels
        value={selectedTab}
        onChange={(event: React.SyntheticEvent, newValue: string) => {
          setSelectedTab(newValue);
        }}
      >
        {isNotLoggedIn &&
          navigationActionData.notLoggedIn.map(item => (
            <BottomNavigationAction
              key={item.label}
              label={item.label}
              icon={item.icon}
              onClick={() => navigate(item.href)}
            />
          ))}
        {isUserLoggedIn &&
          navigationActionData.userLoggedIn.map(item => (
            <BottomNavigationAction
              key={item.label}
              label={item.label}
              icon={item.icon}
              onClick={() => navigate(item.href)}
            />
          ))}
        {isCoachLoggedIn &&
          navigationActionData.coachLoggedIn.map(item => (
            <BottomNavigationAction
              key={item.label}
              label={item.label}
              icon={item.icon}
              onClick={() => navigate(item.href)}
            />
          ))}
        {isAdminLoggedIn &&
          navigationActionData.adminLoggedIn.map(item => (
            <BottomNavigationAction
              key={item.label}
              label={item.label}
              icon={item.icon}
              onClick={() => navigate(item.href)}
            />
          ))}
      </MUIBottomNavigation>
    </Paper>
  );
};
