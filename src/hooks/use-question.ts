import { useState } from 'react';

export const useQuestion = () => {
  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    selectedOption: '',
    correctAnswersCount: 0,
  });

  const handleNextQuestion = () => {
    setQuizState((prevState) => ({
      ...prevState,
      selectedOption: '',
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
    }));
  };

  const handleRetry = () => {
    setQuizState({ currentQuestionIndex: 0, selectedOption: '', correctAnswersCount: 0 });
  };

  const handleOptionSelect = (option: string, answer: string) => {
    if (quizState.selectedOption === option) return;

    setQuizState((prevState) => {
      const wasCorrect = prevState.selectedOption === answer;
      const isCorrect = option === answer;
      let newCorrectCount = prevState.correctAnswersCount;

      if (wasCorrect && !isCorrect) {
        newCorrectCount -= 1;
      } else if (!wasCorrect && isCorrect) {
        newCorrectCount += 1;
      }

      return {
        ...prevState,
        selectedOption: option,
        correctAnswersCount: newCorrectCount,
      };
    });
  };

  return {
    quizState,
    handleNextQuestion,
    handleRetry,
    handleOptionSelect,
  };
};
