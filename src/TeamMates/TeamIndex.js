import React from "react";
import { useNavigate } from "react-router-dom";
import "./TeamMates.css";

function TeamIndex() {
  const navigate = useNavigate();

  return (
    <div id="ButtonsAll">
      <div className="ButtonRows">
        <button
          className="TMB"
          id="FighterButton"
          onClick={() => navigate("/Fighter")}
        >
          Fighter
        </button>
        <button
          className="TMB"
          id="ClericButton"
          onClick={() => navigate("/Cleric")}
        >
          Cleric
        </button>
        <button
          className="TMB"
          id="MageButton"
          onClick={() => navigate("/Mage")}
        >
          Mage
        </button>
        <button
          className="TMB"
          id="ArcherButton"
          onClick={() => navigate("/Mage")}
        >
          Archer
        </button>
        <button
          className="TMB"
          id="SummonerButton"
          onClick={() => navigate("/Mage")}
        >
          Summoner
        </button>
        <button className="TMB" onClick={() => navigate("/Mage")}>
          Rogue
        </button>
      </div>
      <div className="ButtonRows">
        <button className="TMB" onClick={() => navigate("/Mage")}></button>
        <button className="TMB" onClick={() => navigate("/Mage")}>
          Vampire
        </button>
        <button className="TMB" onClick={() => navigate("/Mage")}>
          WereWolf
        </button>
        <button className="TMB" onClick={() => navigate("/Mage")}>
          Android
        </button>
        <button className="TMB" onClick={() => navigate("/Mage")}></button>
        <button className="TMB" onClick={() => navigate("/Mage")}></button>
      </div>
    </div>
  );
}

export default TeamIndex;
