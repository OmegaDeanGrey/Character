import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Trials.css";
import IQ from "./IQ";

function TrialFour() {
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
    <div id="FourBodyDiv">
      <div id="bgFour">
        <audio id="T4" autoPlay loop controls>
          <source src="../Luck.mp3" type="audio/mpeg" />
        </audio>

        <div>
          <p id="FourTitle">Volcanic Cave Trial</p>
        </div>

        <h3 id="FourText">
          Choose the Odd one Out, there is only one correct answer;
        </h3>
        <div id="IQCase">
          <IQ />
        </div>
        <button
          id="FourGoBackButton"
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
export default TrialFour;
