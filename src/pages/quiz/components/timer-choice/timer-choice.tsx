type TimerChoice = {
  setWithTimer: (withTimer: boolean) => void;
};

const TimerChoice = ({ setWithTimer }: TimerChoice) => (
  <div className="timer-choice">
    <h3>Играть с таймером или без?</h3>
    <div className="timer-options">
      <button className="quiz--button" onClick={() => setWithTimer(true)}>
        С таймером
      </button>
      <button className="quiz--button" onClick={() => setWithTimer(false)}>
        Без таймера
      </button>
    </div>
  </div>
);

export default TimerChoice;
