import { render, screen } from '@testing-library/react';
import ProgressBar from './progress-bar';

const defaultProps = {
  progress: 20,
  question: 1,
  questionsLength: 5,
};

describe('TimerChoice', () => {
  it('отображает правильное количество вопросов', () => {
    const { getByText } = render(<ProgressBar {...defaultProps} />);

    expect(getByText(`Вопрос 1/5`)).toBeInTheDocument();
    screen.debug();
  });

  it('отображает правильный процент прогресса', () => {
    const { rerender } = render(<ProgressBar {...defaultProps} />);

    const progressBar = screen.getByTestId('progress-fill');
    expect(progressBar).toHaveStyle(`width: ${defaultProps.progress}%`);

    rerender(<ProgressBar progress={40} question={2} questionsLength={defaultProps.questionsLength} />)
    expect(progressBar).toHaveStyle(`width: ${40}%`);
  });

  it('отображает 100% прогресса', () => {
  const { rerender } = render(<ProgressBar {...defaultProps} />);
  const progressBar = screen.getByTestId('progress-fill');
  rerender(<ProgressBar progress={100} question={5} questionsLength={5} />);
  expect(progressBar).toHaveStyle('width: 100%');
});

it('обновляет текст вопроса при изменении prop "question"', () => {
  const { rerender } = render(<ProgressBar {...defaultProps} />);
  expect(screen.getByText('Вопрос 1/5')).toBeInTheDocument();

  rerender(<ProgressBar progress={60} question={3} questionsLength={5} />);
  expect(screen.getByText('Вопрос 3/5')).toBeInTheDocument();
});
});
