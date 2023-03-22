import { Box, Card, Typography } from '@mui/material';
import React from 'react';
import { HOURS } from '../Calendar.constants';

type Props = {
	day: string;
};

export const CalendarDay = (props: Props) => {
	const { day } = props;

	return (
		<Card
			sx={{
				width: '100%',
			}}
		>
			<Box sx={{ height: '40px' }}>
				<Typography>{day}</Typography>
			</Box>
			<Box>
				{HOURS.map((timeslot) => {
					return <Box sx={{ height: '40px', padding: 1 }}>slot</Box>;
				})}
			</Box>
		</Card>
	);
};
