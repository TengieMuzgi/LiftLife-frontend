import { Box, Select, MenuItem, SelectChangeEvent, InputLabel, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Calendar } from '../../components/Calendar';
import { HOURS, calendarConfig } from '../../components/Calendar/Calendar.constants';
import { ROLES } from '../../constants/roles';
import { UserProps } from '../../constants/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { getCookie } from 'typescript-cookie';
import { AppContext } from '../../App';
import { CalendarConfigType } from '../../components/Calendar/Calendar.types';
import dayjs from 'dayjs';
import { getWeek } from '../Diet/Diet';
import {
  SessionMutationData,
  TrainingDay,
  TrainingPlanShort,
  TrainingSession,
} from './Workouts.types';
import { faker } from '@faker-js/faker';
import { getMyProfile } from '../Profile/ProfilePage';
import { generateReservedTilesFromTrainings } from './Workouts.helpers';
import { NO_PLANS } from './Workouts.constants';
import { Loading } from '../../components/Loading/Loading';

export const Workouts = () => {
  const today = dayjs();

  const [config, setConfig] = useState<CalendarConfigType>({
    ...calendarConfig,
    rowDescriptors: HOURS,
    columnDescriptors: getWeek(today).map(weekday => `${weekday.dayname} ${weekday.date.date()}`),
  });
  const [selectedClientId, setSelectedClientId] = useState<string>('');
  const { isMobile, role, showSnackbar } = useContext(AppContext);
  const queryClient = useQueryClient();

  const { data: profileData } = useQuery(['my-profile'], async () =>
    getMyProfile(role as string, showSnackbar)
  );

  const sessionMutation = useMutation(
    async (data: SessionMutationData) => {
      if (trainingPlanShort && trainingPlanShort !== NO_PLANS) {
        if (data.type === 'add') {
          return axios.post(
            `http://localhost:8081/api/trainings/sessions/insertSession?planId=${trainingPlanShort.documentId}&dayId=${data.dayId}`,
            data.newSession,
            {
              headers: { Authorization: `Bearer ${getCookie('userToken')}` },
            }
          );
        } else if (data.type === 'remove') {
          return axios.delete(
            `http://localhost:8081/api/trainings/sessions/deleteSession?sessionId=${data.sessionId}&planId=${trainingPlanShort.documentId}&dayId=${data.dayId}`,
            {
              headers: { Authorization: `Bearer ${getCookie('userToken')}` },
            }
          );
        }
      } else throw new Error();
    },
    {
      onSuccess: () => {
        showSnackbar('Change has been made!', 'success');
      },
      onError: error => {
        if (error instanceof AxiosError) {
          showSnackbar(error.message, 'error');
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['client-sessions']);
      },
    }
  );

  const planMutation = useMutation(
    (data: { coachId: string; name: string; clientId: string }) => {
      return axios.post('http://localhost:8081/api/trainings/plans/insert', data, {
        headers: { Authorization: `Bearer ${getCookie('userToken')}` },
      });
    },
    {
      onSuccess: () => {
        showSnackbar('The plan has been created!', 'success');
        queryClient.invalidateQueries(['client-sessions']);
      },
      onError: error => {
        if (error instanceof AxiosError) {
          showSnackbar(error.message, 'error');
        }
        queryClient.invalidateQueries(['client-sessions']);
      },
    }
  );

  function onReserve(itemId: string, tileId: string) {
    const selectedSessionHour = config.tileConfig?.find(hour =>
      hour.find(session => session.key === tileId)
    );
    const selectedSessionHourId = config.tileConfig?.findIndex(hour =>
      hour.find(session => session.key === tileId)
    );

    let selectedDayId;
    for (const sessionHour of config.tileConfig!) {
      const matching = sessionHour.findIndex(session => session.key === tileId);
      if (matching !== -1) selectedDayId = matching.toString();
    }

    const selectedSession = selectedSessionHour?.find(session => session.key === tileId);
    const selectedTemplate = templateSessions
      ? templateSessions.find(template => template.documentId === itemId)
      : undefined;

    if (selectedSession?.isReserved) {
      showSnackbar('This hour is already reserved!', 'error');
    } else if (selectedSessionHourId !== undefined && selectedTemplate) {
      const newSession = {
        startHour: selectedSessionHourId,
        finishHour: selectedSessionHourId < 23 ? selectedSessionHourId + 1 : 23,
        name: selectedTemplate.name,
        exercises: selectedTemplate.exercises,
        template: selectedTemplate.template,
        coachId: profileData?.id,
      };
      sessionMutation.mutate({ type: 'add', newSession, dayId: selectedDayId ?? '0' });
    }
  }

  function onRemove(tileId: string) {
    let selectedDayId;
    for (const sessionHour of config.tileConfig!) {
      const matching = sessionHour.findIndex(session => session.key === tileId);
      if (matching !== -1) selectedDayId = matching.toString();
    }
    sessionMutation.mutate({ type: 'remove', sessionId: tileId, dayId: selectedDayId });
  }

  async function handleCreateTrainingPlanClick() {
    if (profileData) {
      planMutation.mutate({
        coachId: profileData?.id,
        name: faker.company.bs(),
        clientId: selectedClientId,
      });
    } else showSnackbar('Your profile data is not loaded', 'error');
  }

  const { data: coachClients, isLoading: isCoachClientsLoading } = useQuery(
    ['coach-clients'],
    async () => {
      const { data } = await axios.get<Array<UserProps>>(
        'http://localhost:8081/api/user/coach/clients',
        {
          headers: { Authorization: `Bearer ${getCookie('userToken')}` },
        }
      );
      return data;
    },
    { enabled: role === ROLES.COACH }
  );

  const { data: templateSessions, isLoading: isTemplateSessionsLoading } = useQuery(
    ['template-sessions'],
    async () => {
      const { data } = await axios.get<Array<TrainingSession>>(
        `http://localhost:8081/api/trainings/sessions/findTemplates?coachId=${getCookie(
          'userToken'
        )}`,
        {
          headers: { Authorization: `Bearer ${getCookie('userToken')}` },
        }
      );

      return data;
    },
    { enabled: role === ROLES.COACH }
  );

  // TODO: fix stale `selectedClientId` value
  const { data: trainingPlanShort } = useQuery(
    ['client-sessions'],
    async () => {
      console.log('in query', selectedClientId);
      const { data: trainingPlansShort } = await axios.get<Array<TrainingPlanShort> | undefined>(
        `http://localhost:8081/api/trainings/plans/findByClient?clientId=${selectedClientId}`,
        {
          headers: { Authorization: `Bearer ${getCookie('userToken')}` },
        }
      );
      // If we do not get planIds, we cannot fetch any plans
      if (trainingPlansShort === undefined || trainingPlansShort.length === 0) {
        setConfig({ ...calendarConfig, rowDescriptors: HOURS });
        return NO_PLANS;
      }

      const { data } = await axios.get<Array<TrainingDay>>(
        // We assume here that we have only one plan for each client
        `http://localhost:8081/api/trainings/days/findForPlan?planId=${trainingPlansShort[0].documentId}`,
        {
          headers: { Authorization: `Bearer ${getCookie('userToken')}` },
        }
      );

      setConfig(prevConfig => ({
        ...prevConfig,
        tileConfig: data ? generateReservedTilesFromTrainings(data) : undefined,
      }));

      return trainingPlansShort[0];
    },
    { enabled: selectedClientId.length > 0 }
  );

  useEffect(() => {
    console.log('in useEffect', selectedClientId);
    queryClient.invalidateQueries(['client-sessions']);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClientId]);

  useEffect(() => {
    if (role === ROLES.CLIENT && profileData) setSelectedClientId(profileData?.id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData]);

  return (
    <Box>
      {role === ROLES.COACH && (
        <Box display="flex" alignItems="center">
          <Box sx={{ margin: 2, width: 256 }}>
            <FormControl fullWidth>
              {isCoachClientsLoading && <Loading message="loading clients..." />}
              {!isCoachClientsLoading && (
                <Fragment>
                  <InputLabel id="client-name-label">Client</InputLabel>
                  <Select
                    variant="outlined"
                    labelId="client-name-label"
                    label={'Client'}
                    value={selectedClientId}
                    onChange={(event: SelectChangeEvent) => setSelectedClientId(event.target.value)}
                    fullWidth
                    disabled={isCoachClientsLoading}
                  >
                    {coachClients?.map(client => {
                      return (
                        <MenuItem
                          value={client.id}
                          id={client.id}
                          key={client.id}
                        >{`${client.firstName} ${client.lastName}`}</MenuItem>
                      );
                    })}
                  </Select>
                </Fragment>
              )}
            </FormControl>
          </Box>
          <LoadingButton
            disabled={selectedClientId.length === 0 || trainingPlanShort !== NO_PLANS}
            variant="contained"
            onClick={handleCreateTrainingPlanClick}
          >
            Create training plan
          </LoadingButton>
        </Box>
      )}

      <Calendar
        onDrop={role === ROLES.COACH ? onReserve : undefined}
        onRemove={role === ROLES.COACH ? onRemove : undefined}
        calendarConfig={config}
        options={
          role === ROLES.COACH && !isTemplateSessionsLoading
            ? templateSessions?.map(session => {
                return { children: session.name, id: session.documentId };
              })
            : undefined
        }
        optionPickerTitle="Template days"
        sx={{ width: '100%', height: '100%', maxHeight: isMobile ? 512 : 700 }}
      />
    </Box>
  );
};
