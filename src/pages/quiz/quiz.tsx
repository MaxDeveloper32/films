import { useState } from 'react';
import QuestionList from './components/questions-list/questions-list';
import './quiz.css';
import TableResult from './components/table-result/table-result';

const Quiz = () => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  return (
    <div className="wrapper-films">
      <div className="quiz">
        {!isQuizStarted && (
          <>
            <h2> Привет! начнем ? </h2>
            <button className="quiz__start quiz--button" onClick={() => setIsQuizStarted(true)}>
              Начать
            </button>
          </>
        )}

        {isQuizStarted && <QuestionList />}
      </div>

      <TableResult />
    </div>
  );
};

export default Quiz;
