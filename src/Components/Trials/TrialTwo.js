import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Trials.css";
import EE2 from "../Home/EE2";

function TrialTwo() {
  const [power, setPower] = useState(0);
  const audioRef = useRef(null);
  const [trialTwoCompleted, setTrialTwoCompleted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
    }
  }, []);

  const navigate = useNavigate();

  const handleTrialCompletion = () => {
    // const strength = 70;
    // localStorage.setItem(
    //   "strengthResult",
    //   JSON.stringify({ Strength: strength })
    // );
    localStorage.setItem("TrialTwoCompleted", "true");
    setTrialTwoCompleted(true);
    navigate("/Trials");
  };

  return (
    <div id="TwoBodyDiv">
      <div id="bgTwo">
        <div id="Bannerbg2"></div>
        <audio id="T2" autoPlay loop controls>
          <source src="../Alignment.mp3" type="audio/mpeg" />
        </audio>
        <div>
          <button
            id="EE2"
            onClick={() => {
              navigate("/EE2");
            }}
          >
            Tas
          </button>
        </div>
        <div>
          <button
            id="CompleteTrialTwoButton"
            onClick={handleTrialCompletion}
            disabled={trialTwoCompleted}
          >
            Complete Trial
          </button>
          <p id="AlignmentTitle">Welcome to the Eagle's Nest</p>
        </div>
        <div>
          <h3 id="AlignmentText">Here your test is Simple</h3>
        </div>

        <button
          id="AlignmentGoBackButton"
          onClick={() => {
            navigate("/Trials");
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
export default TrialTwo;
