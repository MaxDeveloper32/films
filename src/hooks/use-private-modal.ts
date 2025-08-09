import { useState } from 'react';
import { useAppSelector } from './use-app-redux/use-app-redux';
import { useNavigate } from 'react-router-dom';

const usePrivateModal = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleNavigateReg = () => {
    navigate('/auth');
  };

  return { isAuth, isOpen, handleCloseModal, handleOpenModal, handleNavigateReg };
};

export { usePrivateModal };
