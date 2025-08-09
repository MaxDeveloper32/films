import { render, screen } from '@testing-library/react';
import ListItem from './list-item';

type Questions = {
  id: number;
  question: string;
  options: string[];
  answer: string;
};

const mockQuestion: Questions = {
  id: 1,
  question: 'Что такое React?',
  options: ['Библиотека', 'Фреймворк', 'Язык программирования'],
  answer: 'Библиотека',
};

describe('ListItem', () => {
  it('отображает вопрос и опции', () => {
    render(<ListItem currentQuestion={mockQuestion} selectedOption="" onOptionSelect={() => {}} />);

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Что такое React?');
    mockQuestion.options.forEach((option) => expect(screen.getByText(option)).toBeInTheDocument());
  });

  it('подсвечивает выбранную опцию', () => {
    const selectedOption = 'Фреймворк';

    render(
      <ListItem
        currentQuestion={mockQuestion}
        selectedOption={selectedOption}
        onOptionSelect={() => {}}
      />
    );


    const optionButtons = screen.getAllByRole('button');
    optionButtons.forEach((button) => {
      if (button.textContent === selectedOption) {
        expect(button.closest('li')).toHaveClass('questions-list__option--active');
      } else {
        expect(button.closest('li')).not.toHaveClass('questions-list__option--active');
      }
    });
  });
});
