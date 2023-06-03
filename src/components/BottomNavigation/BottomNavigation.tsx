import React, { useState } from 'react';
import {
  BottomNavigation as MUIBottomNavigation,
  BottomNavigationAction,
  Paper,
  useTheme,
} from '@mui/material';
import { navigationActionData } from './BottomNavigation.constants';
import { useNavigate } from 'react-router-dom';

type BottomNavigationProps = {};

export const BottomNavigation = (props: BottomNavigationProps) => {
  const [selectedTab, setSelectedTab] = useState<string>('');
  const theme = useTheme();
  const navigate = useNavigate();

  const isUserLoggedIn = true;
  const isCoachLoggedIn = false;
  const isAdminLoggedIn = false;
  const isNotLoggedIn = false;

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: theme.zIndex.appBar }}
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
              onClick={() => navigate('/' + item.label.toLowerCase())}
            />
          ))}
        {isUserLoggedIn &&
          navigationActionData.userLoggedIn.map(item => (
            <BottomNavigationAction
              key={item.label}
              label={item.label}
              icon={item.icon}
              onClick={() => navigate('/' + item.label.toLowerCase())}
            />
          ))}
        {isCoachLoggedIn &&
          navigationActionData.coachLoggedIn.map(item => (
            <BottomNavigationAction
              key={item.label}
              label={item.label}
              icon={item.icon}
              onClick={() => navigate('/' + item.label.toLowerCase())}
            />
          ))}
        {isAdminLoggedIn &&
          navigationActionData.adminLoggedIn.map(item => (
            <BottomNavigationAction
              key={item.label}
              label={item.label}
              icon={item.icon}
              onClick={() => navigate('/' + item.label.toLowerCase())}
            />
          ))}
      </MUIBottomNavigation>
    </Paper>
  );
};
