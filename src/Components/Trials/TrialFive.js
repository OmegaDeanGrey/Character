import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Trials.css";

function TrialFive() {
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
    <div id="FiveBodyDiv">
      <div id="bgFive">
        <audio id="T5" autoPlay loop controls>
          <source src="../Courage.mp3" type="audio/mpeg" />
        </audio>

        <div>
          <p id="CourageTitle">Courage Trial</p>
        </div>
        <div>
          <h3 id="CourageText">
            Welcome to the Courage Trial;
            <br />
            TBD
          </h3>
        </div>
        <button
          id="CourageGoBackButton"
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
export default TrialFive;
