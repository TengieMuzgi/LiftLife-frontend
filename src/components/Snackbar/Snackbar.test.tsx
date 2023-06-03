import React from 'react';

import { Snackbar } from './Snackbar';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AlertColor } from '@mui/material';

const defaultSnackbarProps = {
  message: 'abc',
  severity: undefined,
  isOpen: true,
  onClose: () => {},
};

const severityData = [
  { iconName: 'SuccessOutlinedIcon', severity: 'success' },
  { iconName: 'InfoOutlinedIcon', severity: 'info' },
  { iconName: 'ReportProblemOutlinedIcon', severity: 'warning' },
  { iconName: 'ErrorOutlineIcon', severity: 'error' },
];

describe('Component: Snackbar', () => {
  it('should render component', () => {
    render(<Snackbar {...defaultSnackbarProps} />);

    const element = screen.getByText('abc');

    expect(element).toBeInTheDocument();
  });

  it('should call onClose when close icon is clicked', () => {
    const onCloseMock = jest.fn();

    render(<Snackbar {...defaultSnackbarProps} onClose={onCloseMock} />);

    const closeIconElement = screen.getByRole('button');
    userEvent.click(closeIconElement);

    expect(onCloseMock).toHaveBeenCalled();
  });

  for (const { severity, iconName } of severityData) {
    it(`should render ${iconName} when severity prop is '${severity}'`, () => {
      render(<Snackbar {...defaultSnackbarProps} severity={severity as AlertColor} />);

      const iconElement = screen.getByTestId(iconName);

      expect(iconElement).toBeInTheDocument();
    });
  }
});
