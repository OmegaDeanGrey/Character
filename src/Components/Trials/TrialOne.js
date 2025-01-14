import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Trials.css";
import Quiz from "./Quiz";

function TrialOne() {
  const navigate = useNavigate();

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
    }
  }, []);

  return (
    <div id="OneBodyDiv">
      <div id="bgOne">
        <audio id="T1" autoPlay loop controls>
          <source src="../Wisdom.mp3" type="audio/mpeg" />
        </audio>

        <div>
          <h2 id="WisdomTitle">Welcome to the Wisdom Trial; </h2>
        </div>
        <div>
          <br />
          <h4 id="WisdomText">
            This test is more about using what you know about yourself
            <br /> more than just what you know
          </h4>
        </div>
        <div>
          <button
            id="QuizButton"
            onClick={() => {
              navigate("/Quiz");
            }}
          >
            Begin Test
          </button>
        </div>
        <button
          id="WisdomGoBackButton"
          onClick={() => {
            navigate("/Trials");
          }}
        >
          Go Back
        </button>
        <br />
      </div>
    </div>
  );
}

export default TrialOne;
