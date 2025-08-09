
type HeaderQuizProps = {
  pathname: string;
  handleQuiz: () => void;
};

const HeaderQuiz = ({ pathname, handleQuiz }: HeaderQuizProps) => {
  return (
    <>
      {pathname !== '/quiz' && (
        <div className="header__quiz-block">
          <button
            className="header__quiz-button gradient-border-button"
            onClick={handleQuiz}
          >
            Пройти небольшой Quiz
          </button>
        </div>
      )}
    </>
  );
};

export default HeaderQuiz;
