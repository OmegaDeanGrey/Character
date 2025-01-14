import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Trials.css";

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
          <p id="LuckTitle">Luck Trial</p>
        </div>
        <div>
          <h3 id="LuckText">
            Welcome to the Luck Trial;
            <br />
            TBD
          </h3>
        </div>
        <button
          id="LuckGoBackButton"
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
