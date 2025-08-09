import { render, screen } from '@testing-library/react';
import QuestionTimer from './question-timer';
import { act } from 'react-dom/test-utils';

const question = {
  id: 1,
  question: "Кто режиссёр фильма 'Титаник'?",
  options: ['Джеймс Кэмерон', 'Кристофер Нолан', 'Стивен Спилберг', 'Мартин Скорсезе'],
  answer: 'Джеймс Кэмерон',
};
const questionSecond = {
  id: 2,
  question: "В каком году вышел фильм 'Побег из Шоушенка'?",
  options: ['1994', '1999', '1992', '1997'],
  answer: '1994',
};

describe('QuestionTimer', () => {
  const onSkipMock = vi.fn();
  beforeEach(() => {
    vi.useFakeTimers();
    onSkipMock.mockClear();
  });

  it('должен отображать оставшееся время и обновлять его каждую секунду', async () => {
    render(<QuestionTimer question={question} onSkip={onSkipMock} />);

    // Проверяем начальное значение
    expect(screen.getByText(/Осталось времени: 5 сек./)).toBeInTheDocument();

    // Перематываем таймер на 3 секунды
    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000);
    });

    // Проверяем, что время уменьшилось
    expect(screen.getByText(/Осталось времени: 2 сек./)).toBeInTheDocument();

    // Перематываем до конца
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });

    // Проверяем, что время равно нулю
    expect(screen.getByText(/Осталось времени: 0 сек./)).toBeInTheDocument();

    // Проверяем, что onSkip был вызван один раз
    expect(onSkipMock).toHaveBeenCalledTimes(1);
  });

  it('должен перезапустить таймер при изменении вопроса', async () => {
    const { rerender } = render(<QuestionTimer question={question} onSkip={onSkipMock} />);

    expect(screen.getByText(/Осталось времени: 5 сек./)).toBeInTheDocument();

    rerender(<QuestionTimer question={questionSecond} onSkip={onSkipMock} />);
    // Ждём немного и проверяем, что таймер снова стартовал
    screen.debug();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });
    expect(screen.getByText(/Осталось времени: 4 сек./)).toBeInTheDocument();
  });

  it('должен остановить таймер при размонтировании', () => {
  const { unmount } = render(<QuestionTimer question={question} onSkip={onSkipMock} />);
  unmount();
  vi.advanceTimersByTimeAsync(5000);
  expect(onSkipMock).not.toHaveBeenCalled(); // Не должен вызвать onSkip после unmount
});
});
