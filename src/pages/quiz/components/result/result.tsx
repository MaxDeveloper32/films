import { useEffect } from 'react';
import { useAppDispatch } from '../../../../hooks/use-app-redux/use-app-redux';
import { updatesResult } from '../../../../rtk/slice/table-result/table-result.slice';
import './result.css';

type ResultProps = {
  result: number;
  onRetry: () => void;
};

const Result = ({ result, onRetry }: ResultProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
   dispatch(updatesResult(result));
  }, [result]);

  return (
    <div className="result-quiz">
      <p className="result-quiz__result"> {result} </p>

      <button className="quiz--button" onClick={onRetry}>
        Попробовать еще раз ?
      </button>
    </div>
  );
};

export default Result;
