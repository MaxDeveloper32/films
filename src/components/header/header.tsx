import { useLocation, useNavigate } from 'react-router-dom';
import Logo from './logo';
import UserProfiler from './components/user-profiler/user-profiler';
import HeaderQuiz from './components/header-quiz/header-quiz';
import { useAppSelector } from '../../hooks/use-app-redux/use-app-redux';

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const handleQuiz = () => {
    navigate('/quiz');
  };

  const handleRegister = () => {
    navigate('/auth');
  };

  return (
    <div className="wrapper-films">
      <header className="header">
        <Logo isActive={pathname !== '/'} />

        <HeaderQuiz handleQuiz={handleQuiz} pathname={pathname} />
        <UserProfiler />

        {!isAuth && (
          <div>
            <button onClick={handleRegister}>Войти</button>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
