import React from 'react';
import { Box, Card, Paper, Typography } from '@mui/material';
import { DUMMY_WEEKDAYS, HOURS } from './Calendar.constants';
import { CalendarDay } from './CalendarDay/CalendarDay';

type Props = {};

export const Calendar = (props: Props) => {
	return (
		<Paper
			sx={{
				margin: 4,
				display: 'flex',
				overflowY: 'scroll',
				height: '80vh',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-around',
					flexGrow: 1,
					paddingTop: '40px',
				}}
			>
				{HOURS.map((hour) => {
					return (
						<Card sx={{ height: '40px ', display: 'flex', alignItems: 'center' }}>
							<Typography sx={{ height: '100%' }}>{hour}</Typography>
						</Card>
					);
				})}
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-around',
					flexGrow: 18,
				}}
			>
				{DUMMY_WEEKDAYS.map((weekday) => {
					return <CalendarDay day={weekday.name} />;
				})}
			</Box>
		</Paper>
	);
};
