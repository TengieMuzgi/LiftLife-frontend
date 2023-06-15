import {
  Box,
  CircularProgress,
  Paper,
  Step,
  StepButton,
  Stepper as MUIStepper,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { EmojiEvents } from '@mui/icons-material';
import { CoachCodePanel } from './CoachCodePanel';
import { UserInfoPanel } from './UserInfoPanel';
import axios, { AxiosError } from 'axios';
import { getCookie } from 'typescript-cookie';
import { useSnackbar } from '../../hooks/useSnackbar';
import { Snackbar } from '../../components/Snackbar/Snackbar';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import {
  buttonsPositionStyles,
  containerStyles,
  desktopPaperStyles,
  errorTextStyles,
  lastStepStyles,
  mobilePaperStyles,
} from './Stepper.styles';

const steps = ['Enter coach code', 'Provide basic information', 'All set!'];

export const Stepper = () => {
  const { isMobile } = useContext(AppContext);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const [coachCodeValue, setCoachCodeValue] = useState('');
  const [userPhysique, setUserPhysique] = useState({ age: '18', weight: '50', height: '170' });
  const [disabledNextButton, setDisabledNextButton] = useState(true);
  const [snackbarState, showSnackbar, hideSnackbar] = useSnackbar();
  const [redirectButtonDisabled, setRedirectDisabled] = useState(true);
  const [isError, setError] = useState(false);

  const navigate = useNavigate();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps() - 1;
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleNext = () => {
    if (activeStep === 1) {
      handleSendData();
    }
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleCoachCodeChange = (value: string) => {
    setCoachCodeValue(value);
    value.length < 36 ? setDisabledNextButton(true) : setDisabledNextButton(false);
  };

  const handleUserPhysiqueChange = (param: 'age' | 'weight' | 'height', value: string) => {
    setUserPhysique(prevUserPhysique => ({
      ...prevUserPhysique,
      [param]: value,
    }));
  };

  const handleSendData = async () => {
    try {
      const coachAssign = await axios.post(
        'http://localhost:8081/api/user/token/verify',
        { token: coachCodeValue },
        {
          headers: { Authorization: `Bearer ${getCookie('userToken')}` },
        }
      );
      const response = await axios.put(
        'http://localhost:8081/api/user/client/update/physique',
        userPhysique,
        { headers: { Authorization: `Bearer ${getCookie('userToken')}` } }
      );
      if (response.status === 200 && coachAssign.status === 200) {
        setRedirectDisabled(false);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        showSnackbar(error.message, 'error');
        setError(true);
        setActiveStep(0);
      }
    }
  };

  const handleNavigate = () => {
    navigate('/profile');
  };

  useEffect(() => {
    if (activeStep === 1) {
      userPhysique.age === '' || userPhysique.weight === '' || userPhysique.height === ''
        ? setDisabledNextButton(true)
        : setDisabledNextButton(false);
    }
  }, [userPhysique]);

  return (
    <>
      {snackbarState && (
        <Snackbar
          isOpen={true}
          message={snackbarState.message}
          severity={snackbarState.severity}
          onClose={hideSnackbar}
        />
      )}
      <Box sx={isMobile ? { ...containerStyles, mt: '5vw' } : { ...containerStyles, mt: '10vh' }}>
        <Paper sx={isMobile ? mobilePaperStyles : desktopPaperStyles}>
          <MUIStepper
            nonLinear
            activeStep={activeStep}
            sx={isMobile ? { flexDirection: 'column', gap: 2 } : { flexDirection: 'row' }}
          >
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton disableRipple color="inherit">
                  {label}
                </StepButton>
              </Step>
            ))}
          </MUIStepper>
          {isError && (
            <Typography color="error" sx={errorTextStyles}>
              There were issues while processing your information! Please try again
            </Typography>
          )}
          <Box>
            {isLastStep() ? (
              <>
                <Box sx={lastStepStyles}>
                  <EmojiEvents sx={{ fontSize: '4rem', color: 'secondary.main' }} />
                  <Typography variant="h5" sx={{ textAlign: 'center' }}>
                    You are all set!
                  </Typography>
                  <Typography sx={isMobile ? { textAlign: 'center' } : undefined}>
                    Once your data is processed click on button below to view your profile.
                  </Typography>
                  {redirectButtonDisabled ? (
                    <Button wide type="button" disabled>
                      <CircularProgress sx={{ fontSize: '0.5rem', mr: 2 }} /> Processing data...
                    </Button>
                  ) : (
                    <Button wide type="button" onClick={handleNavigate}>
                      View profile
                    </Button>
                  )}
                </Box>
              </>
            ) : (
              <>
                {activeStep === 0 && (
                  <CoachCodePanel onChange={handleCoachCodeChange} value={coachCodeValue} />
                )}
                {activeStep === 1 && (
                  <UserInfoPanel onChange={handleUserPhysiqueChange} value={userPhysique} />
                )}
                <Box sx={buttonsPositionStyles}>
                  <Button wide type="button" disabled={activeStep === 0} onClick={handleBack}>
                    Back
                  </Button>
                  <Box />
                  <Button wide type="button" onClick={handleComplete} disabled={disabledNextButton}>
                    Next
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Paper>
      </Box>
    </>
  );
};
