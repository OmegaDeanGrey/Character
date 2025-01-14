import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Trials.css";

function TrialTwo() {
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
    <div id="TwoBodyDiv">
      <div id="bgTwo">
        <audio id="T2" autoPlay loop controls>
          <source src="../Alignment.mp3" type="audio/mpeg" />
        </audio>

        <div>
          <p id="AlignmentTitle">Alignment Trial</p>
        </div>
        <div>
          <h3 id="AlignmentText">
            Welcome to the Alignment Trial;
            <br />
            What's in your heart?
          </h3>
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
