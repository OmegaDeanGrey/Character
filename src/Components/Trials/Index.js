import React from "react";
import "./Trials.css";
import { useNavigate } from "react-router-dom";

function TrialsIndex() {
  const navigate = useNavigate();

  return (
    <div id="OuterGrid">
      <div>
        <button
          className="TrialButtonTop"
          id="TrialButtonOne"
          onClick={() => {
            navigate("/TrialOne");
          }}
        >
          Wisdom
        </button>
      </div>
      <div>
        <button
          className="TrialButtonBottom"
          id="TrialButtonTwo"
          onClick={() => {
            navigate("/TrialFour");
          }}
        >
          Luck
        </button>
      </div>
      <div>
        <button
          className="TrialButtonTop"
          id="TrialButtonThree"
          onClick={() => {
            navigate("/TrialTwo");
          }}
        >
          Alignment
        </button>
      </div>
      <br />
      <div>
        <button
          className="TrialButtonBottom"
          id="TrialButtonFour"
          onClick={() => {
            navigate("/TrialFive");
          }}
        >
          Courage
        </button>
      </div>
      <div>
        <button
          className="TrialButtonTop"
          id="TrialButtonFive"
          onClick={() => {
            navigate("/TrialThree");
          }}
        >
          LifeForce
        </button>
      </div>
      <div>
        <button
          className="TrialButtonBottom"
          id="TrialButtonSix"
          onClick={() => {
            navigate("/TrialSix");
          }}
        >
          Knowledge
        </button>
      </div>
    </div>
  );
}
export default TrialsIndex;
