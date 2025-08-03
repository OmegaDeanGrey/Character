import React, { useEffect, useRef } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function HBackground() {
  const navigate = useNavigate("");
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
    }
  }, []);

  return (
    <div className="App" id="homeBG">
      <div id="bannerhome">
        <p id="MainTitle">EROWIND</p>
      </div>

      <div id="hbout">
        <button className="homebuttons" onClick={() => navigate("/Start")}>
          NEW GAME
        </button>
        <button className="homebuttons">CONTINUE</button>
        <button
          className="homebuttons"
          id="EE"
          onClick={() => navigate("/EE")}
        ></button>
      </div>
      <audio id="T1" autoPlay loop controls ref={audioRef}>
        <source src="../Luck.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default HBackground;
