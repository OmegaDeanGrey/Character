import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Trials.css";

const Quiz = () => {
  const questions = [
    {
      question: "Number of inches from the NorthPole to the Sun?",
      options: ["3.2K^8in", "72.3million", "Who Knows"],
      answer: "Who Knows",
    },
    {
      question: "What is the Middle Name of this games Creator?",
      options: ["Dean", "Marie", "I Don't Know", "Yevaldi"],
      answer: "I Don't Know",
    },
    {
      question: "How Many Questions Did you get right so Far?",
      options: ["None", "One", "Two"],
      answer: "Two",
    },
    {
      question: "Who sells seashell's down by the seashore?",
      options: ["Shelly", "Sally", "Charlie Brown", "Your Aunt Carol"],
      answer: "Sally",
    },
    {
      question: "Seashells are probably free and easy to find?",
      options: ["No", "It is the Seashore", "Leave Sally Alone"],
      answer: "It is the Seashore",
    },
    // Add more questions as needed
  ];

  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOptionClick = (selectedOption) => {
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz-container">
      <div id="BgQuiz">
        {showScore ? (
          <div id="ScoreContainer">
            <span>
              <div className="score-section">
                You scored {score} out of {questions.length}
              </div>

              <div id="QuizGoBackButtonContainer">
                <button
                  id="QuizGoBackButton"
                  onClick={() => {
                    navigate("/Trials");
                  }}
                >
                  Go Back
                </button>
              </div>
            </span>
          </div>
        ) : (
          <>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestionIndex + 1}</span>/
                {questions.length}
              </div>

              <div className="question-text">
                {questions[currentQuestionIndex].question}
              </div>
            </div>
            <div className="answer-section">
              {questions[currentQuestionIndex].options.map((option) => (
                <div>
                  <button
                    className="QuizAnswerButtons"
                    key={option}
                    onClick={() => handleAnswerOptionClick(option)}
                  >
                    {option}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
