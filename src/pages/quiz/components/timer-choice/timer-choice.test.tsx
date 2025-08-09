import { render, screen } from '@testing-library/react';
import TimerChoice from './timer-choice';
import userEvent from '@testing-library/user-event';

describe('TimerChoice', () => {
  const mockSetWithTimer = vi.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    mockSetWithTimer.mockClear();
  });

  it('вызывает setWithTimer(true) при клике на "С таймером"', async () => {
    render(<TimerChoice setWithTimer={mockSetWithTimer} />);
    await user.click(screen.getByRole('button', { name: /С таймером/i }));
    expect(mockSetWithTimer).toHaveBeenCalledWith(true);
  });

  it('вызывает setWithTimer(false) при клике на "С таймером"', async () => {
    render(<TimerChoice setWithTimer={mockSetWithTimer} />);
    await user.click(screen.getByRole('button', { name: /Без таймера/i }));
    expect(mockSetWithTimer).toHaveBeenCalledWith(false);
  });
});
