import React, { useState } from "react";
import { qa } from "./data";
import "./quiz.css";

function Quiz() {
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [data, setData] = useState(qa[index]);

  React.useEffect(() => {
    setData(qa[index]);
    setSelectedOption(null);
    setShowAnswer(false);
  }, [index]);

  // Move to the next question or end quiz
  const handleNext = () => {
    if (index < qa.length - 1) {
      setIndex(index + 1);
    } else {
      setQuizFinished(true);
    }
  };

  // Handle user's answer selection
  const handleAnswer = (option) => {
    setSelectedOption(option);
    setShowAnswer(true);

    // Check if the selected option matches the correct answer's option number
    if (option === data[`option${data.ans}`]) {
      setScore(score + 1);
    }
  };

  // Reset the quiz
  const handleRestart = () => {
    setIndex(0);
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    return (
      <div className="container">
        <div className="header">
          <h1 className="heading">Quiz Completed</h1>
        </div>
        <div className="section">
          <h2 className="score">Your Score: {score} / {qa.length}</h2>
        </div>
        <div className="footer">
          <button className="restart-button" onClick={handleRestart}>
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1 className="heading">FIFA Men's Football World Cup</h1>
      </div>

      <div className="section">
        <h2 className="question">
          {index + 1}. {data.question}
        </h2>
      </div>

      <div className="footer">
        <ul className="lists">
          <button
            className={selectedOption === data.option1 ? "selected" : ""}
            onClick={() => handleAnswer(data.option1)}
            disabled={showAnswer}
          >
            <h2>{data.option1}</h2>
          </button>
          <button
            className={selectedOption === data.option2 ? "selected" : ""}
            onClick={() => handleAnswer(data.option2)}
            disabled={showAnswer}
          >
            <h2>{data.option2}</h2>
          </button>
          <button
            className={selectedOption === data.option3 ? "selected" : ""}
            onClick={() => handleAnswer(data.option3)}
            disabled={showAnswer}
          >
            <h2>{data.option3}</h2>
          </button>
          <button
            className={selectedOption === data.option4 ? "selected" : ""}
            onClick={() => handleAnswer(data.option4)}
            disabled={showAnswer}
          >
            <h2>{data.option4}</h2>
          </button>
        </ul>

        {showAnswer && (
          <h3 className="answer-feedback">
            {selectedOption === data[`option${data.ans}`] ? "Correct!" : "Wrong!"}
          </h3>
        )}

        <button
          className="next-button"
          onClick={handleNext}
          disabled={!showAnswer}
        >
          {index < qa.length - 1 ? "Next" : "Finish"}
        </button>

        <h3>
          {index + 1} of {qa.length}
        </h3>
      </div>
    </div>
  );
}

export default Quiz;
