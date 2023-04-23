import React from 'react';
import {
  FitnessCenterOutlined,
  LunchDiningOutlined,
  SupervisedUserCircleOutlined,
  PersonOutline,
  SearchOutlined,
  PeopleAltOutlined,
  FeedOutlined,
} from '@mui/icons-material';

export const navigationActionData = {
  userLoggedIn: [
    { label: 'Workouts', icon: <FitnessCenterOutlined /> },
    { label: 'Diet', icon: <LunchDiningOutlined /> },
    { label: 'Coach', icon: <SupervisedUserCircleOutlined /> },
    { label: 'Profile', icon: <PersonOutline /> },
  ],
  notLoggedIn: [{ label: 'Explore', icon: <SearchOutlined /> }],
  coachLoggedIn: [
    { label: 'Workouts', icon: <FitnessCenterOutlined /> },
    { label: 'Diets', icon: <LunchDiningOutlined /> },
    { label: 'Clients', icon: <PeopleAltOutlined /> },
  ],
  adminLoggedIn: [
    { label: 'Logs', icon: <FeedOutlined /> },
    { label: 'Profiles', icon: <PersonOutline /> },
  ],
} as const;
