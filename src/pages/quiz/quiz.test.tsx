import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Quiz from './quiz';

describe('Quiz', () => {
  it('increments on button click', async () => {
    render(<Quiz />);
    const startButton = screen.getByRole('button');
    await userEvent.click(startButton);


    expect(screen.queryByText('Привет! начнем ?')).not.toBeInTheDocument();
    expect(startButton).not.toBeInTheDocument();

    screen.debug();
    expect(screen.getByText('Играть с таймером или без?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /с таймером/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /без таймера/i })).toBeInTheDocument();
  });
});

