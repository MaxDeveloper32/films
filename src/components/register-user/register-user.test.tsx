import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import FormLogIn from './form';


const mockRegistration = vi.fn();
vi.mock('../../rtk/user-api-rtkq.ts', () => ({
  useRegistrationMutation: () => [mockRegistration],
}));

describe('RegistrationForm', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    mockRegistration.mockClear();
    render(<FormLogIn />);
  });

  it('should show error when email is empty',  async() => {
    await user.click(screen.getByRole('button', { name: /отправить/i }));
    expect(await screen.findByText(/почта обязательна/i)).toBeInTheDocument();
  });

    it('should show error for invalid email format', async () => {
    const input = screen.getByLabelText(/почта/i);

    await user.type(input, 'invalid-email@f');
    await user.click(screen.getByRole('button', { name: /отправить/i }));
     screen.debug()
    expect(await screen.findByText(/некорректный формат email/i)).toBeInTheDocument();
  });

    it('should show error if password length exceeds max limit', async () => {
    const passwordInput = screen.getByLabelText(/пароль/i);

    await user.type(passwordInput, 'longerthan5');
    await user.click(screen.getByRole('button', { name: /отправить/i }));

    expect(await screen.findByText(/максимум 5 символа/i)).toBeInTheDocument();
  });

  it('should submit form with valid data and call registration', async () => {
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText(/почта/i);
    const passwordInput = screen.getByLabelText(/пароль/i);

    await user.type(emailInput, 'valid@example.com');
    await user.type(passwordInput, 'passw');

    await user.click(screen.getByRole('button', { name: /отправить/i }));

    // Проверяем, что мутация вызвана с правильными данными
    expect(mockRegistration).toHaveBeenCalledWith({
      email: 'valid@example.com',
      password: 'passw',
    });
  });
});
