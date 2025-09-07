import React, { useEffect, useState } from "react";
import "./Trials.css";
import { useNavigate } from "react-router-dom";

function TrialsIndex() {
  const navigate = useNavigate();
  // const [trialFourDone, setTrialFourDone] = useState(false);

  // useEffect(() => {
  //   const result = localStorage.getItem("trialfourresult");
  //   if (result) {
  //     setTrialFourDone(true);
  //   }
  // }, []);

  return (
    <div id="OuterGrid">
      <audio id="T4" autoPlay loop controls>
        <source src="../FinalMidnight.mp3" type="audio/mpeg" />
      </audio>
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
          // disabled={trialFourDone}
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
