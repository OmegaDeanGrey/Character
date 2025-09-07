import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParty } from "../Components/Context/PartyContext";
import baseStatsByClass from "../Components/Character/BaseStats";
import "../App.css";

function WereWolf() {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const { party, addToParty } = useParty();
  const isPartyFull = party.length >= 5;
  const [wereWolf, setWereWolf] = useState("null");

  const generateNewWerewolf = () => {
    const names = [
      "Lucien",
      "Brenda",
      "Chupa",
      "Rue",
      "Jackson",
      "Moe",
      "Taylor",
      "Spot",
      "Rover",
      "Spot",
    ];

    const usedNames = new Set(party.map((member) => member.name));
    const availableNames = names.filter((name) => !usedNames.has(name));
    const randomName =
      availableNames.length > 0
        ? availableNames[Math.floor(Math.random() * availableNames.length)]
        : `WereWolf${Math.floor(Math.random() * 1000)}`;

    const wereWolfBase = baseStatsByClass["WereWolf"];
    const baseHP = wereWolfBase.HP + Math.floor(Math.random() * 10);

    return {
      name: randomName,
      role: "WereWolf",
      strength: wereWolfBase.Strength + Math.floor(Math.random() * 10),
      intelligence: wereWolfBase.Intelligence + Math.floor(Math.random() * 10),
      speed: wereWolfBase.Speed + Math.floor(Math.random() * 10),
      defense: wereWolfBase.Defense + Math.floor(Math.random() * 10),
      maxHP: baseHP,
      currentHP: baseHP,
      level: 1,
    };
  };

  useEffect(() => {
    setWereWolf(generateNewWerewolf());
  }, []);

  const handleAddToParty = () => {
    if (isPartyFull || !wereWolf) return;

    addToParty(wereWolf);
    setShowOverlay(true);

    setTimeout(() => {
      setShowOverlay(false);
      setWereWolf(generateNewWerewolf()); // Generate a new unique fighter
    }, 3000);
  };

  return (
    <>
      {showOverlay && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(239, 221, 221, 0.7)", // Semi-transparent black
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9000,
          }}
        >
          <h1
            style={{
              color: "yellow",
              fontSize: "8rem",
              textShadow: "0 0 10px black, 0 0 20px grey",
              animation: "fadeIn 3s ease-out",
            }}
          >
            WereWolf <br />
            Howuuuu
          </h1>
        </div>
      )}

      {isPartyFull && (
        <div>
          <p id="PFFighter">Party Full</p>
        </div>
      )}

      <div className="containerdiv">
        <div id="wereWolfall">
          <video muted autoPlay playsInline id="MoonVid">
            <source src="./Moonrise.mp4" type="video/mp4" />
          </video>

          <h1 id="wereWolftitle">WereWolf</h1>
          <div className="desccanvas" id="wereWolfdesc">
            <h2>Abilty: Transform</h2>

            <p>Transform Increases Stats</p>
          </div>
          <div>
            <ul id="wereWolfadj">
              <li>Str: 50</li>
              <li>Int: 15</li>
              <li>Spd: 37</li>
              <li>Def: 35</li>
              <li>HP: 20</li>
            </ul>
          </div>
          <button
            className="dabuttons"
            id="wereWolfSelectButton"
            onClick={handleAddToParty}
            disabled={isPartyFull}
          >
            {/* <video id="MoonVid" muted loop preload="auto">
            <source src="../../public/Moonrise.mp4" type="video/mp4" />
          </video> */}
            Recruit
          </button>
          <button
            className="dabuttons"
            id="wereWolfbttButton"
            onClick={() => navigate("/Party")}
          >
            View Party
          </button>
        </div>
      </div>
    </>
  );
}

export default WereWolf;
