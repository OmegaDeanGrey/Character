import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Trials.css";
import Differences from "./Differences";

function TrialThree() {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
    }
  }, []);

  const navigate = useNavigate();

  return (
    <div id="ThreeBodyDiv">
      <div id="bgThree">
        <audio id="T3" autoPlay loop controls>
          <source src="../LifeForce.mp3" type="audio/mpeg" />
        </audio>

        <div>
          <p id="LifeForceTitle">LifeForce Trial</p>
        </div>
        <div>
          <h3 id="LifeForceText">
            Welcome to the LifeForce Trial;
            <br />
            <Differences />
          </h3>
        </div>
        <button
          id="LifeForceGoBackButton"
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
export default TrialThree;
