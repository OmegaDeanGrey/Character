import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Trials.css";
import Puzzle from "./Puzzle";

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
          <p id="LifeForceTitle">Western Wood Trial</p>
        </div>
        <div>
          <h3 id="LifeForceText">
            Welcome to the Western Wood's Trial;
            <br />
            <Puzzle
              image="/Triforce.png" // <- replace with your asset
              gridSize={3} // 3×3 (try 4 or 5 for harder)
              pieceSize={96} // px per piece
              timeLimit={120} // seconds
              onComplete={() => {
                // e.g., mark trial completion, save to localStorage, navigate, etc.
                localStorage.setItem("trialthree_completed", "1");
                alert("Completed!");
              }}
              onFail={() => {
                // retry logic etc.
                alert("Time’s up!");
              }}
            />
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
