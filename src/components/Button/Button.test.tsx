import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import userEvent from '@testing-library/user-event';

describe('Component: Button', () => {
  it('should correctly render Button', () => {
    render(<Button type="button">Test button</Button>);

    const element = screen.getByText('Test button');

    expect(element).toBeInTheDocument();
  });

  it('should call function onClick', () => {
    const clickFn = jest.fn();

    render(
      <Button type="button" onClick={clickFn}>
        Test function button
      </Button>
    );

    const element = screen.getByText('Test function button');
    userEvent.click(element);

    expect(clickFn).toBeCalled();
  });

  it('should render disabled button', () => {
    render(
      <Button type="button" disabled>
        Test button
      </Button>
    );

    const element = screen.getByText('Test button');
    expect(element).toHaveAttribute('disabled');
  });

  it.each<'button' | 'submit' | 'reset'>(['button', 'submit', 'reset'])(
    'should render correct type of button',
    type => {
      render(<Button type={type}>Test button</Button>);

      const buttonElement = screen.getByText('Test button');
      expect(buttonElement).toHaveAttribute('type', type);
    }
  );
});
