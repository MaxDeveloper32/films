import { render, screen } from '@testing-library/react';
import Result from './result';
import userEvent from '@testing-library/user-event';

describe('Result Component', () => {
  const defaultProps = {
    result: 85,
    onRetry: vi.fn(),
  };

  it('должен отображать результат', () => {
    render(<Result {...defaultProps} />);
    expect(screen.getByText('85')).toBeInTheDocument();
  });

  it('при клике на "начать сначала" вызывается функция onRetry', async () => {
    const user = userEvent.setup();
    render(<Result {...defaultProps} />);
    await user.click(screen.getByRole('button', { name: /Попробовать еще раз/i }));

    expect(defaultProps.onRetry).toHaveBeenCalledOnce();
  });

})
