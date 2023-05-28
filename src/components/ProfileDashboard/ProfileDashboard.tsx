import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { TabPanel } from './TabPanel/TabPanel';
import { TrainerPreview } from '../TrainerPreview/TrainerPreview';
import { Diet } from '../../pages/Diet/Diet';
import { AppContext } from '../../App';
import { coachTabsLabels, mockTrainer, userTabsLabels } from './ProfileDashboard.constants';

type ProfileDashboardProps = {
  accountType: 'user' | 'coach' | 'admin';
  tabOpen?: number;
};

export const ProfileDashboard = ({ accountType, tabOpen }: ProfileDashboardProps) => {
  const initialTabState = tabOpen ? tabOpen : 0;
  const [activeTab, setActiveTab] = useState(initialTabState);
  const handleActiveTabChange = (event: React.SyntheticEvent, value: number) => {
    setActiveTab(value);
  };
  const handleChangeIndex = (index: number) => {
    setActiveTab(index);
  };

  const {isMobile} = useContext(AppContext);
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Tabs
        value={activeTab}
        onChange={handleActiveTabChange}
        aria-label="profile tabs"
        variant={isMobile ? 'scrollable' : 'fullWidth'}
        centered={isMobile ? false : true}
      >
        {accountType === 'coach'
          ? coachTabsLabels.map(item => <Tab {...item} key={item.id} disableRipple />)
          : userTabsLabels.map(item => <Tab {...item} key={item.id} disableRipple />)}
      </Tabs>

      {accountType === 'coach' ? (
        <SwipeableViews axis={'x'} index={activeTab} onChangeIndex={handleChangeIndex}>
          <TabPanel value={activeTab} index={0}>
            <Typography>WorkoutBuilder</Typography>
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <Typography>DietBuilder</Typography>
          </TabPanel>
          <TabPanel value={activeTab} index={2}>
            <Typography>BioEditor</Typography>
          </TabPanel>
          <TabPanel value={activeTab} index={3}>
            <Typography>My Clients List</Typography>
          </TabPanel>
        </SwipeableViews>
      ) : (
        <SwipeableViews axis={'x'} index={activeTab} onChangeIndex={handleChangeIndex}>
          <TabPanel value={activeTab} index={0}>
            <Diet />
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <Diet />
          </TabPanel>
          <TabPanel value={activeTab} index={2}>
            <TrainerPreview {...mockTrainer} />
          </TabPanel>
          <TabPanel value={activeTab} index={3}>
            <Typography>Explore other trainers</Typography>
          </TabPanel>
        </SwipeableViews>
      )}
    </Box>
  );
};
