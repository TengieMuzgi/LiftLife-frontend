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
    { href: '/my-workouts', label: 'Workouts', icon: <FitnessCenterOutlined /> },
    { href: '/my-diet', label: 'Diet', icon: <LunchDiningOutlined /> },
    { href: '/my-coach', label: 'Coach', icon: <SupervisedUserCircleOutlined /> },
    { href: '/profile', label: 'Profile', icon: <PersonOutline /> },
    { href: '/explore-trainers', label: 'Explore trainers', icon: <PersonOutline /> },
  ],
  notLoggedIn: [{ href: '/#explore-coaches', label: 'Explore', icon: <SearchOutlined /> }],
  coachLoggedIn: [
    { href: '/workouts', label: 'Workouts', icon: <FitnessCenterOutlined /> },
    { href: '/diets', label: 'Diets', icon: <LunchDiningOutlined /> },
    { href: '/clients', label: 'Clients', icon: <PeopleAltOutlined /> },
  ],
  adminLoggedIn: [
    { href: '/logs', label: 'Logs', icon: <FeedOutlined /> },
    { href: '/profiles', label: 'Profiles', icon: <PersonOutline /> },
  ],
} as const;
