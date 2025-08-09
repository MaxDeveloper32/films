import './register-user.css';
///import Footer from '../footer/footer';
import { lazy } from 'react';
import FormLogIn from './form';

const Footer = lazy(() => import('../footer/footer'));

const RegistrationForm = () => {
  return (
    <div className="wrapper-films user-registration ">
      <FormLogIn />
      <Footer />
    </div>
  );
};

export default RegistrationForm;
