import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Trials.css";

function TrialOne() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
    }

    // Check localStorage for quiz completion flag
    const completed = localStorage.getItem("quizCompleted");
    if (completed) {
      setQuizCompleted(true);
    }
  }, []);

  return (
    <div id="OneBodyDiv">
      <div id="bgOne">
        <audio id="T1" autoPlay loop controls ref={audioRef}>
          <source src="../Wisdom.mp3" type="audio/mpeg" />
        </audio>

        <h2 id="ShallowsTitle">Welcome to the Shallows</h2>
        <br />
        <h4 id="ShallowsText">
          This Trial is more about using what you <br />
          know about yourself <br />
          than just what you know
        </h4>

        <div>
          <button
            id="QuizButton"
            onClick={() => navigate("/Quiz")}
            disabled={quizCompleted}
          >
            {quizCompleted ? "Test Complete" : "Begin Test"}
          </button>
        </div>

        <button id="ShallowsGoBackButton" onClick={() => navigate("/Trials")}>
          Go Back
        </button>
        <br />
        <button
          id="ResetQuizButton"
          onClick={() => {
            localStorage.removeItem("wisdom");

            setQuizCompleted(false);
          }}
        >
          Reset Quiz
        </button>
      </div>
    </div>
  );
}

export default TrialOne;
