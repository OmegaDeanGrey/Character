import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Nav";
import App from "../../App";
import Start from "./Start";
import "./Power.css";
import Quiz from "../Trials/Quiz";

function PowerIndex() {
  const navigate = useNavigate();

  const handleGameStart = () => {
    navigate("/Start");
  };

  const handleQuizStart = () => {
    navigate("/quiz");
  };
  return (
    <div id="GHome">
      <div>
        <header className="GameHead">
          <h1 id="Welcome"></h1>
        </header>
        <div>
          <button id="WellButt" onClick={handleGameStart}>
            START
          </button>
          {/* <button onClick={handleQuizStart}>Quiz</button> */}
        </div>
      </div>
    </div>
  );
}

export default PowerIndex;
