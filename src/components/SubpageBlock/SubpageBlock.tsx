import { Box, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { TabPanel } from './TabPanel/TabPanel';

export type BlockProps = {};
type TabProps = {
  label: string;
  id: string;
  'aria-controls': string;
};

export const SubpageBlock = () => {
  const [activeTab, setActiveTab] = useState(0);
  const handleActiveTabChange = (event: React.SyntheticEvent, value: number) => {
    setActiveTab(value);
  };
  const handleChangeIndex = (index: number) => {
    setActiveTab(index);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));
  const tabsLabels: TabProps[] = [
    {
      label: 'My Workouts',
      id: 'workouts-tab',
      'aria-controls': 'workouts-tabpanel',
    },
    {
      label: 'My Diet',
      id: 'diet-tab',
      'aria-controls': 'diet-tabpanel',
    },
    {
      label: 'My Coach',
      id: 'coach-tab',
      'aria-controls': 'coach-tabpanel',
    },
    {
      label: 'Explore trainers',
      id: 'explore-tab',
      'aria-controls': 'explore-tabpanel',
    },
  ];
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={activeTab}
        onChange={handleActiveTabChange}
        aria-label="profile tabs"
        variant={isMobile ? 'scrollable' : 'fullWidth'}
        centered={isMobile ? false : true}
      >
        {tabsLabels.map(item => (
          <Tab {...item} key={item.id} disableRipple />
        ))}
      </Tabs>
      <SwipeableViews axis={'x'} index={activeTab} onChangeIndex={handleChangeIndex}>
        <TabPanel value={activeTab} index={0}>
          Test
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          Test2
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
};
