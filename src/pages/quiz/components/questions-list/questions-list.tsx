import { useState } from 'react';
import './questions-list.css';
import Result from '../result/result';
import TimerChoice from '../timer-choice/timer-choice';
import { useQuestion } from '../../../../hooks/use-question';
import ListItem from '../list-item/list-item';
import QuestionTimer from '../question-timer/question-timer';
import ProgressBar from '../progress-bar/progress-bar';

const questions = [
  {
    id: 1,
    question: "Кто режиссёр фильма 'Титаник'?",
    options: ['Джеймс Кэмерон', 'Кристофер Нолан', 'Стивен Спилберг', 'Мартин Скорсезе'],
    answer: 'Джеймс Кэмерон',
  },
  {
    id: 2,
    question: "В каком году вышел фильм 'Побег из Шоушенка'?",
    options: ['1994', '1999', '1992', '1997'],
    answer: '1994',
  },
  {
    id: 3,
    question: 'Какой фильм получил Оскар за лучший фильм в 2020 году?',
    options: ['Паразиты', '1917', 'Брачная история', 'Джокер'],
    answer: 'Паразиты',
  },
  {
    id: 4,
    question: "Кто является главным героем в фильме 'Интерстеллар'?",
    options: ['Купер', 'Мэттью Макконахи', 'Том Хэнкс', 'Брэд Питт'],
    answer: 'Купер',
  },
  {
    id: 5,
    question: "Кто исполняет роль Джокера в фильме 'Темный рыцарь'?",
    options: ['Хит Леджер', ' Heath Ledger', 'Хавьер Бардем', 'Лиам Нисон'],
    answer: 'Хит Леджер',
  },
];

const QuestionList = () => {
  const { quizState, handleNextQuestion, handleRetry, handleOptionSelect } = useQuestion();
  const [withTimer, setWithTimer] = useState<boolean | null>(null);

  const currentQuestion = questions[quizState.currentQuestionIndex];
  const progress = ((quizState.currentQuestionIndex + 1) / questions.length) * 100;
  const currentQuestionNumber = quizState.currentQuestionIndex + 1;

  const handleStartOver = () => {
    handleRetry();
    setWithTimer(null);
  };

  if (quizState.currentQuestionIndex >= questions.length) {
    return <Result result={quizState.correctAnswersCount} onRetry={handleStartOver} />;
  }

  if (withTimer === null) {
    return <TimerChoice setWithTimer={setWithTimer} />;
  }

  return (
    <section className="questions-list">
      <ProgressBar
        progress={progress}
        question={currentQuestionNumber}
        questionsLength={questions.length}
      />

      {withTimer && <QuestionTimer question={currentQuestion} onSkip={handleNextQuestion} />}
      <ListItem
        currentQuestion={currentQuestion}
        selectedOption={quizState.selectedOption}
        onOptionSelect={handleOptionSelect}
      />

      <button className="quiz--button" onClick={handleNextQuestion}>
        {quizState.selectedOption === '' ? 'Пропустить' : 'Следующий вопрос'}
      </button>
    </section>
  );
};

export default QuestionList;
