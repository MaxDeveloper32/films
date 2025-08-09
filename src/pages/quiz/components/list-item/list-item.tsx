import classNames from 'classnames';

type Questions = {
  id: number;
  question: string;
  options: string[];
  answer: string;
};

type ListItemProps = {
  currentQuestion: Questions;
  selectedOption: string;
  onOptionSelect: (option: string, answer: string) => void;
};

const ListItem = ({ currentQuestion, selectedOption, onOptionSelect }: ListItemProps) => {
  return (
  <li className="questions-list__item" key={currentQuestion.id}>
    <h3> {currentQuestion.question} </h3>
    <ul className="questions-list__options">
      {currentQuestion.options.map((option) => (
        <li
          className={classNames('questions-list__option', {
            'questions-list__option--active': option === selectedOption,
          })}
          key={option}
        >
          <button onClick={() => onOptionSelect(option, currentQuestion.answer)}>{option}</button>
        </li>
      ))}
    </ul>
  </li>
);
}

export default ListItem;
