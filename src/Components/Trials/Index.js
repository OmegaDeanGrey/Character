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
          Shallows
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
          Volcanic Cave
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
          Lofty Peaks
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
          Cloud Fortress
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
          Western Wood
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
          Great Hills
        </button>
      </div>
    </div>
  );
}
export default TrialsIndex;
