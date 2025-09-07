import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Trials.css";
import Memory from "./Memory";

function TrialSix() {
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
    <div id="SixBodyDiv">
      <div id="bgSix">
        <audio id="T6" autoPlay loop controls>
          <source src="../Knowledge.mp3" type="audio/mpeg" />
        </audio>

        <div>
          <p id="SixTitle">Great Hills Trial</p>
        </div>
        <div>
          <h3 id="SixText">
            Get ready to memorize the tiles that light up
            <br />
            click on the appropriate tiles to advance the round
          </h3>
          <br />
          <div id="MemoryCase">
            <Memory />
          </div>
        </div>
        <button
          id="SixGoBackButton"
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
export default TrialSix;
