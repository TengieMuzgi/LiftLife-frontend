import React, { useState } from 'react';
import {
  BottomNavigation as MUIBottomNavigation,
  BottomNavigationAction,
  Paper,
  useTheme,
} from '@mui/material';
import { navigationActionData } from './BottomNavigation.constants';

type BottomNavigationProps = {};

export const BottomNavigation = (props: BottomNavigationProps) => {
  const [selectedTab, setSelectedTab] = useState<string>('');
  const theme = useTheme();

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
            <BottomNavigationAction key={item.label} label={item.label} icon={item.icon} />
          ))}
        {isUserLoggedIn &&
          navigationActionData.userLoggedIn.map(item => (
            <BottomNavigationAction key={item.label} label={item.label} icon={item.icon} />
          ))}
        {isCoachLoggedIn &&
          navigationActionData.coachLoggedIn.map(item => (
            <BottomNavigationAction key={item.label} label={item.label} icon={item.icon} />
          ))}
        {isAdminLoggedIn &&
          navigationActionData.adminLoggedIn.map(item => (
            <BottomNavigationAction key={item.label} label={item.label} icon={item.icon} />
          ))}
      </MUIBottomNavigation>
    </Paper>
  );
};
