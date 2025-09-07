import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParty } from "../Components/Context/PartyContext";
import baseStatsByClass from "../Components/Character/BaseStats";

function Archer() {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const { party, addToParty } = useParty();
  const isPartyFull = party.length >= 5;
  const [archer, setArcher] = useState("");

  const generateNewArcher = () => {
    const names = [
      "Rod",
      "Samuel",
      "Arian",
      "Asma",
      "Ronald",
      "Riley",
      "Ron",
      "Rawley",
      "Ronpm start",
      "Sylvestre",
      "Fiero",
      "Remy",
      "Robin",
      "Legolas",
      "Quan",
    ];

    const usedNames = new Set(party.map((member) => member.name));
    const availableNames = names.filter((name) => !usedNames.has(name));
    const randomName =
      availableNames.length > 0
        ? availableNames[Math.floor(Math.random() * availableNames.length)]
        : `Archer${Math.floor(Math.random() * 1000)}`;

    const archerBase = baseStatsByClass["Archer"];
    const baseHP = archerBase.HP + Math.floor(Math.random() * 10);

    return {
      name: randomName,
      role: "Archer",
      strength: archerBase.Strength + Math.floor(Math.random() * 10),
      intelligence: archerBase.Intelligence + Math.floor(Math.random() * 10),
      speed: archerBase.Speed + Math.floor(Math.random() * 10),
      defense: archerBase.Defense + Math.floor(Math.random() * 10),
      maxHP: baseHP,
      currentHP: baseHP,
      level: 1,
      BG: archerBase.BG,
      Icon: archerBase.Icon,
    };
  };

  useEffect(() => {
    setArcher(generateNewArcher());
  }, []);

  const handleAddToParty = () => {
    if (isPartyFull || !archer) return;

    addToParty(archer);
    setShowOverlay(true);

    setTimeout(() => {
      setShowOverlay(false);
      setArcher(generateNewArcher()); // Generate a new unique fighter
    }, 2000);
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
            backgroundColor: "rgb(47, 42, 4)", // Semi-transparent black
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9000,
            textShadow: "0 0 10px white, 0 0 20px grey",
          }}
        >
          <h1
            style={{
              color: "yellow",
              fontSize: "8rem",
              textShadow: "0 10px 10px black, 0 0 20px grey",
              animation: "fadeIn 7s ease-out",
            }}
          >
            Archer <br />
            At Your Service
          </h1>
        </div>
      )}
      {isPartyFull && (
        <div>
          <p id="PFArcher">Party Full</p>
        </div> // Disable button if the party is full
      )}
      <div className="containerdiv">
        <video id="Archervid" autoPlay loop muted>
          <source src="./arrows.mp4" type="video/mp4" />
        </video>

        <div id="Archerall">
          <h1 id="Archertitle">Archer</h1>
          <div className="Archerdesc" id="Archerdesc">
            <h2>Ability: Volley</h2>

            <p>Ranged attack on random target </p>
          </div>
          <div>
            <ul id="Archeradj">
              <li>Str: 35</li>
              <li>Int: 35</li>
              <li>Speed: 50</li>
              <li>Defense: 35</li>
              <li>HP: 30</li>
            </ul>
          </div>

          <button
            className="archbutt"
            id="ArcherSelectButton"
            onClick={handleAddToParty}
            disabled={isPartyFull} // Disable button if the party is full
          >
            Recruit
          </button>

          <button
            className="archbutt"
            id="ArcherbttButton"
            onClick={() => navigate("/Party")}
          >
            View Team
          </button>
        </div>
      </div>
    </>
  );
}

export default Archer;
