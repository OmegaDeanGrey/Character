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
        <button className="TMB" onClick={() => navigate("/Mage")}>
          Fairy
        </button>
        <button className="TMB" onClick={() => navigate("/Mage")}>
          Vampire
        </button>
        <button className="TMB" onClick={() => navigate("/Mage")}>
          Ogre
        </button>
        <button className="TMB" onClick={() => navigate("/Mage")}>
          Giant
        </button>
        <button className="TMB" onClick={() => navigate("/Mage")}>
          Werewolf
        </button>
        <button className="TMB" onClick={() => navigate("/Mage")}>
          Android
        </button>
      </div>
      <div className="ButtonRows">
        <button className="TMB" onClick={() => navigate("/Mage")}>
          Valkyrie
        </button>
        <button className="TMB" onClick={() => navigate("/Mage")}>
          BeastMaster
        </button>
        <button className="TMB" onClick={() => navigate("/Mage")}>
          Satyr
        </button>
        <button className="TMB" onClick={() => navigate("/Mage")}>
          Witch
        </button>
        <button className="TMB" onClick={() => navigate("/Mage")}>
          Ranger
        </button>
        <button className="TMB" onClick={() => navigate("/Mage")}>
          Centaur
        </button>
      </div>
    </div>
  );
}

export default TeamIndex;
