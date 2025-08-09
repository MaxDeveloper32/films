import { renderHook, act } from '@testing-library/react';
import { useQuestion } from './use-question';

describe('useQuestion hook', () => {
  it('должен сбрасывать состояние при вызове handleRetry', () => {
    const { result } = renderHook(() => useQuestion());
    // Изменяем состояние
    act(() => {
      result.current.handleOptionSelect('option1', 'option1');
      result.current.handleNextQuestion();
    });

    expect(result.current.quizState).toEqual({
      currentQuestionIndex: 1,
      selectedOption: '',
      correctAnswersCount: 1,
    });

    act(() => {
      result.current.handleRetry();
    });

    expect(result.current.quizState).toEqual({
      currentQuestionIndex: 0,
      selectedOption: '',
      correctAnswersCount: 0,
    });
  });

  it('должен увеличивать счетчик правильных ответов', () => {
    const { result } = renderHook(() => useQuestion());
    act(() => {
      result.current.handleOptionSelect('option1', 'option1');
    });

    expect(result.current.quizState.correctAnswersCount).toBe(1);
  });

  it('should not double-count correct answer if selected twice', () => {
    const { result } = renderHook(() => useQuestion());

    act(() => {
      result.current.handleOptionSelect('correct', 'correct');
    });
    act(() => {
      result.current.handleOptionSelect('correct', 'correct');
    });

    expect(result.current.quizState.correctAnswersCount).toBe(1);
  });

  it('Если выбран правильный ответ, затем не правильный, то correctAnswersCount=0 ', () => {
    const { result } = renderHook(() => useQuestion());

    act(() => {
      result.current.handleOptionSelect('A', 'A');
    });

    expect(result.current.quizState.correctAnswersCount).toBe(1);

    act(() => {
      result.current.handleOptionSelect('B', 'A');
    });

    expect(result.current.quizState.correctAnswersCount).toBe(0);

    act(() => {
      result.current.handleOptionSelect('A', 'A');
    });

    expect(result.current.quizState.correctAnswersCount).toBe(1);
  });

  it('handleNextQuestion очищает selectedOption и переходит к следующему вопросу', () => {
    const { result } = renderHook(() => useQuestion());

    act(() => {
      result.current.handleNextQuestion();
    });

    expect(result.current.quizState.selectedOption).toBe('');
    expect(result.current.quizState.currentQuestionIndex).toBe(1);
  });
});
