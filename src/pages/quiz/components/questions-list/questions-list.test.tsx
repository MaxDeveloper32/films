import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuestionList from './questions-list';
import { useQuestion } from '../../../../hooks/use-question';

vi.mock('../../../../hooks/use-question', () => ({
  useQuestion: vi.fn(),
}));

const mockHandleNextQuestion = vi.fn();
const mockHandleRetry = vi.fn();
const mockHandleOptionSelect = vi.fn();

describe('QuestionList Component', () => {
  const user = userEvent.setup();
  const defaultQuizState = {
    currentQuestionIndex: 0,
    selectedOption: '',
    correctAnswersCount: 0,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('рендерит TimerChoice если withTimer === null', () => {
    // Мокаем хук
    vi.mocked(useQuestion).mockReturnValue({
      quizState: defaultQuizState,
      handleNextQuestion: mockHandleNextQuestion,
      handleRetry: mockHandleRetry,
      handleOptionSelect: mockHandleOptionSelect,
    });

    render(<QuestionList />);
    expect(screen.getByText(/Без таймера/i)).toBeInTheDocument(); // Предположим, у TimerChoice есть такой текст
  });

  it('рендерит Result если индекс больше количества вопросов', async () => {
    vi.mocked(useQuestion).mockReturnValue({
      quizState: {
        currentQuestionIndex: 5,
        selectedOption: '',
        correctAnswersCount: 2,
      },
      handleNextQuestion: mockHandleNextQuestion,
      handleRetry: mockHandleRetry,
      handleOptionSelect: mockHandleOptionSelect,
    });

    render(<QuestionList />);
    expect(screen.getByRole('button', { name: /Попробовать еще раз/i })).toBeInTheDocument();
  });

  it('рендерит ListItem с правильными пропсами', async () => {
    vi.mocked(useQuestion).mockReturnValue({
      quizState: {
        ...defaultQuizState,
        selectedOption: 'Кристофер Нолан',
      },
      handleNextQuestion: mockHandleNextQuestion,
      handleRetry: mockHandleRetry,
      handleOptionSelect: mockHandleOptionSelect,
    });

    render(<QuestionList />);
    const timerButton = screen.getByRole('button', { name: /без таймера/i });
    await user.click(timerButton);
    // Проверяем, что вопрос отображается
    expect(screen.getByRole('button', { name: /Кристофер Нолан/i })).toBeInTheDocument();

    // Проверяем, что кнопка имеет правильный текст
    expect(screen.getByRole('button', { name: /Следующий вопрос/i })).toBeInTheDocument();
  });

  it('вызывает handleOptionSelect при выборе варианта', async () => {
    const quizStateRef = { current: { ...defaultQuizState } }; // создаём ref для quizState

    const mockHandleOptionSelect = vi.fn().mockImplementation((option) => {
      quizStateRef.current.selectedOption = option;
    });

    vi.mocked(useQuestion).mockReturnValue({
      quizState: quizStateRef.current,
      handleNextQuestion: vi.fn(),
      handleRetry: vi.fn(),
      handleOptionSelect: mockHandleOptionSelect,
    });

    render(<QuestionList />);
    const timerButton = screen.getByRole('button', { name: /без таймера/i });
    await userEvent.click(timerButton);

    const optionButton = screen.getByRole('button', { name: /Джеймс Кэмерон/i });
    await userEvent.click(optionButton);
    expect(mockHandleOptionSelect).toHaveBeenCalledWith('Джеймс Кэмерон', 'Джеймс Кэмерон');
  });

  it('кнопка вызывает handleNextQuestion при клике', async () => {
    vi.mocked(useQuestion).mockReturnValue({
      quizState: {
        ...defaultQuizState,
        selectedOption: 'Джеймс Кэмерон',
      },
      handleNextQuestion: mockHandleNextQuestion,
      handleRetry: mockHandleRetry,
      handleOptionSelect: mockHandleOptionSelect,
    });

    render(<QuestionList />);
    await user.click(screen.getByRole('button', { name: /без таймера/i }));
    await user.click(screen.getByRole('button', { name: /Следующий вопрос/i }));

    expect(mockHandleNextQuestion).toHaveBeenCalled();
    screen.debug();
  });

   it('кнопка вызывает таймер', async () => {
    vi.mocked(useQuestion).mockReturnValue({
      quizState: defaultQuizState,
      handleNextQuestion: mockHandleNextQuestion,
      handleRetry: mockHandleRetry,
      handleOptionSelect: mockHandleOptionSelect,
    });
    render(<QuestionList />);
    await user.click(screen.getByRole('button', { name: /С таймером/i }));
    screen.debug();
  });
});
