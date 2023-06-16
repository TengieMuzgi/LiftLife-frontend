import dayjs, { Dayjs } from 'dayjs';
import React, { useContext, useEffect, useState } from 'react';
import {
  calendarConfig,
  DUMMY_OPTIONLIST,
  DUMMY_WEEKDAYS,
} from '../../components/Calendar/Calendar.constants';
import { faker } from '@faker-js/faker';
import type { CalendarTileConfigType } from '../../components/Calendar/CalendarTile/CalendarTile.types';
import { Calendar } from '../../components/Calendar';
import type { CalendarConfigType } from '../../components/Calendar/Calendar.types';
import { AppContext } from '../../App';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { AppBarMarginTopAdjustment } from '../../components/AppBar/AppBar.constants';

type Props = {};

const generateRandomReservedTilesConfig = (conf: typeof calendarConfig) => {
  const temp: Array<Array<CalendarTileConfigType>> = [];
  let isReserved = false;

  for (let i = 0; i < conf.rowDescriptors.length; i++) {
    temp[i] = [];
    for (let j = 0; j < conf.columnDescriptors.length; j++) {
      isReserved = Math.random() < 0.5;
      temp[i].push({
        isReserved,
        children: isReserved ? faker.company.bs() : undefined,
        key: crypto.randomUUID(),
      });
    }
  }

  return temp;
};

const getWeek = (day: Dayjs): Array<{ date: Dayjs; dayname: string }> => {
  const monday = day.local().startOf('week');

  const week = [
    { date: monday, dayname: DUMMY_WEEKDAYS[0] },
    { date: monday.add(1, 'day'), dayname: DUMMY_WEEKDAYS[1] },
    { date: monday.add(2, 'day'), dayname: DUMMY_WEEKDAYS[2] },
    { date: monday.add(3, 'day'), dayname: DUMMY_WEEKDAYS[3] },
    { date: monday.add(4, 'day'), dayname: DUMMY_WEEKDAYS[4] },
    { date: monday.add(5, 'day'), dayname: DUMMY_WEEKDAYS[5] },
    { date: monday.add(6, 'day'), dayname: DUMMY_WEEKDAYS[6] },
  ];

  return week;
};

export const Diet = (props: Props) => {
  const [config, setConfig] = useState<CalendarConfigType>(calendarConfig);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isMobile } = useContext(AppContext);

  function onReserve(itemId: string, tileId: string) {
    console.log(itemId, tileId);
  }

  function onRemove(tileId: string) {
    console.log(tileId);
  }

  function onClick(tileId: string) {
    console.log(tileId);
  }

  useEffect(() => {
    const temp = config;
    const today = dayjs();

    temp.tileConfig = generateRandomReservedTilesConfig(config);
    temp.columnDescriptors = getWeek(today).map(
      weekday => `${weekday.dayname} ${weekday.date.date()}`
    );
    setConfig(temp);
    setIsLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoaded ? (
    <Box mt={isMobile ? 0 : AppBarMarginTopAdjustment}>
      <Calendar
        onDrop={onReserve}
        onRemoveTile={onRemove}
        onClickTile={onClick}
        calendarConfig={config}
        options={DUMMY_OPTIONLIST}
        showOptionPicker
        optionPickerTitle="placeholder"
        sx={{ width: '100%', height: 600 }}
      />
    </Box>
  ) : (
    <></>
  );
};
