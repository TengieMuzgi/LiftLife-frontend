import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import {
  calendarConfig,
  DUMMY_OPTIONLIST,
  DUMMY_WEEKDAYS,
} from '../../components/Calendar/Calendar.constants';
import { faker } from '@faker-js/faker';
import type { CalendarTileConfigType } from '../../components/Calendar/CalendarTile/CalendarTile.types';
import { Calendar } from '../../components/Calendar';
import type { CalendarConfigType } from '../../components/Calendar/Calendar.types';

type Props = {};

const generateRandomReservedTilesConfig = (conf: typeof calendarConfig) => {
  const temp: Array<Array<CalendarTileConfigType>> = [];
  let isReserved = false;

  for (let i = 0; i < conf.verticalDescriptors.length; i++) {
    temp[i] = [];
    for (let j = 0; j < conf.horizontalDescriptors.length; j++) {
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

  function onReserve(itemId: string, tileId: string) {
    console.log(id);
  }

  useEffect(() => {
    const temp = config;
    const today = dayjs();

    temp.tileConfig = generateRandomReservedTilesConfig(config);
    temp.horizontalDescriptors = getWeek(today).map(
      weekday => `${weekday.dayname} ${weekday.date.date()}`
    );
    setConfig(temp);
    setIsLoaded(true);
  }, []);

  return isLoaded ? (
    <Calendar
      onDrop={onReserve}
      calendarConfig={config}
      options={DUMMY_OPTIONLIST}
      showOptionPicker
      optionPickerTitle="placeholder"
      sx={{ width: 1024, height: 600 }}
    />
  ) : (
    <></>
  );
};
