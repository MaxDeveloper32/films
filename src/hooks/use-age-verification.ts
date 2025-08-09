import { useState } from 'react';

const LIMITED_AGE = 18;

const useAgeVerification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAgeConfirmOpen, setIsAgeConfirmOpen] = useState(false);

  const handleOpenModal = (userAge: number) => {
    if (userAge >= LIMITED_AGE) {
      setIsAgeConfirmOpen(true);
    } else {
      setIsOpen(true);
    }
  };

  const handleAgeConfirm = (isConfirm: boolean) => {
    setIsAgeConfirmOpen(false);
    if (isConfirm) {
      setIsOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    isAgeConfirmOpen,
    handleOpenModal,
    handleAgeConfirm,
    handleCloseModal,
  };
};

export { useAgeVerification };
