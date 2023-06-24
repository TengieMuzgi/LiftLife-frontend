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
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'typescript-cookie';
import axios from 'axios';
import { ROLES } from '../../constants/roles';
import { Box, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { UserProps } from '../../constants/user';

// TODO: Export to different file
export const generateRandomReservedTilesConfig = (conf: typeof calendarConfig) => {
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

// TODO: Export to different file
export const getWeek = (day: Dayjs): Array<{ date: Dayjs; dayname: string }> => {
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

export const Diet = () => {
  const [config, setConfig] = useState<CalendarConfigType>(calendarConfig);
  const [selectedClientId, setSelectedClientId] = useState<string>('');
  const { isMobile } = useContext(AppContext);
  const { role } = useContext(AppContext);

  function onReserve(itemId: string, tileId: string) {
    console.log(itemId, tileId);
  }

  function onColumnReserve(itemId: string, columnId: string) {
    console.log(itemId, columnId);
  }

  async function onClientChange(event: SelectChangeEvent) {
    console.log(event.target.value);
    setSelectedClientId(event.target.value);
  }

  const { data: dietDayTemplates } = useQuery(
    ['diet-day-templates'],
    async () => {
      const { data } = await axios.get<Array<{ name: string; id: string }>>(
        'http://localhost:8081/api/dietDay/template/truncated',
        {
          headers: { Authorization: `Bearer ${getCookie('userToken')}` },
        }
      );
      return data;
    },
    { enabled: false }
  );
  console.log('dietDayTemplates: ', dietDayTemplates);

  const { data: coachClients } = useQuery(['coach-clients'], async () => {
    const { data } = await axios.get<Array<UserProps>>(
      'http://localhost:8081/api/user/coach/clients',
      {
        headers: { Authorization: `Bearer ${getCookie('userToken')}` },
      }
    );
    return data;
  });

  const { data: userDiet } = useQuery(
    ['user-diet'],
    async () => {
      const { data } = await axios.get<Array<UserProps>>(
        `http://localhost:8081/api/dietDay/fullByUser/${selectedClientId}`,
        {
          headers: { Authorization: `Bearer ${getCookie('userToken')}` },
        }
      );
      return data;
    },
    { enabled: selectedClientId !== '' && coachClients !== undefined }
  );

  console.log('userDiet: ', userDiet);

  useEffect(() => {
    const temp = config;
    const today = dayjs();

    temp.tileConfig = generateRandomReservedTilesConfig(config);
    temp.columnDescriptors = getWeek(today).map(
      weekday => `${weekday.dayname} ${weekday.date.date()}`
    );
    setConfig(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      {role === ROLES.COACH && (
        <Box sx={{ margin: 2, maxWidth: 256 }}>
          <InputLabel id="client-name-label">Client</InputLabel>
          <Select
            labelId="client-name-label"
            id="client-name"
            value={selectedClientId}
            onChange={onClientChange}
            fullWidth
          >
            {coachClients?.map(client => {
              return (
                <MenuItem
                  value={client.id}
                  id={client.id}
                >{`${client.firstName} ${client.lastName}`}</MenuItem>
              );
            })}
          </Select>
        </Box>
      )}

      <Calendar
        onDrop={onReserve}
        onColumnDrop={onColumnReserve}
        calendarConfig={config}
        options={role === ROLES.COACH ? DUMMY_OPTIONLIST : undefined}
        optionPickerTitle="Template days"
        sx={{ width: '100%', height: '100%', maxHeight: isMobile ? 512 : 700 }}
      />
    </Box>
  );
};
