import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Trials.css";

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
          <p id="KnowledgeTitle">Knowledge Trial</p>
        </div>
        <div>
          <h3 id="KnowledgeText">
            Welcome to the Knowledge Trial;
            <br />
            TBD
          </h3>
        </div>
        <button
          id="KnowledgeGoBackButton"
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
