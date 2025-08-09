import { useEffect, useState } from "react";

type Questions = {
  id: number;
  question: string;
  options: string[];
  answer: string;
};

type QuestionTimerProps = {
  question: Questions;
  onSkip: () => void;
};

const TIME_LIMIT = 5;

const QuestionTimer = ({ question, onSkip }: QuestionTimerProps) => {
  const [time, setTime] = useState(TIME_LIMIT);
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    setTime(5);
    setIsSkipped(false);

    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [question]);

  useEffect(() => {
    if (time === 0 && !isSkipped) {
      setIsSkipped(true);
      onSkip();
    }
  }, [time, isSkipped, onSkip]);

  return <div>Осталось времени: {time} сек.</div>;
};


export default QuestionTimer;
