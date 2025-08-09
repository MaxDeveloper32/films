import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRegistrationMutation } from '../../rtk/endpoints/user-auth/user-api.endpoint';

const NAME_RULES = {
  required: 'Поле обязательно',
  minLength: {
  value: 3,
  message: 'Минимум 3 символа',
  },
};

type FormValid = {
  email: string;
  password: string;
  username: string;

};

const FormLogIn = () => {
  const form = useForm<FormValid>();
  const navigate = useNavigate();
  const {formState: { errors }} = form;
  const [registration] = useRegistrationMutation();

  const handleSubmit = (data: FormValid) => {
    registration(data);
    navigate('/')
  };
  return (
    <form
      className="user-registration__form"
      onSubmit={(event) => void form.handleSubmit(handleSubmit)(event)}
    >
      <div className="user-registration__wrapper">
  <label htmlFor="name">Имя:</label>
  <input
    id="name"
    className="user-registration__input"
    type="text"
    placeholder="Имя"
    {...form.register('username', {
      required: 'Введите имя',
    })}
  />
  {errors.username && <span className="error">{errors.username.message}</span>}
</div>

      <div className="user-registration__wrapper">
        <label htmlFor="password">Пароль:</label>
        <input
          id="password"
          className="user-registration__input"
          type="password"
          placeholder="Password"
          {...form.register('password', {
            ...NAME_RULES,
            maxLength: {
              value: 10,
              message: 'Максимум 5 символа',
            },
          })}
        />

        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>
      <button className="user-registration__submit" type="submit">
        Отправить
      </button>
    </form>
  );
};

export default FormLogIn;
