import './progress-bar.css'

type ProgressBarProps = {
  progress: number;
  question: number;
  questionsLength: number;
};

const ProgressBar = ({ progress, question, questionsLength }: ProgressBarProps) => (
  <>
    <div className="progress-bar">
      <div className="progress-bar__fill" style={{ width: `${progress}%` }} data-testid="progress-fill"></div>
    </div>

    <span>Вопрос {`${question}/${questionsLength}`}</span>
  </>
);

export default ProgressBar;
