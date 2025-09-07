import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParty } from "../Components/Context/PartyContext";
import baseStatsByClass from "../Components/Character/BaseStats";

function Elemental() {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const { party, addToParty } = useParty();
  const isPartyFull = party.length >= 5;
  const [elemental, setElemental] = useState("");
  const [index, setIndex] = useState(0);

  const images = ["/Volcano.png", "/Tidal.png", "/Tornado.png", "/Quake.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const generateNewElemental = () => {
    const names = [
      "Ifrit",
      "Shiva",
      "Ben",
      "Sue",
      "Reid",
      "Johnny",
      "Gaia",
      "Sven",
      "Umberto",
      "Svetlana",
    ];
    const usedNames = new Set(party.map((member) => member.name));
    const availableNames = names.filter((name) => !usedNames.has(name));
    const randomName =
      availableNames.length > 0
        ? availableNames[Math.floor(Math.random() * availableNames.length)]
        : `Elemental${Math.floor(Math.random() * 1000)}`;

    const elementalBase = baseStatsByClass["Elemental"];
    const baseHP = elementalBase.HP + Math.floor(Math.random() * 10);

    return {
      name: randomName,
      role: "Elemental",
      strength: elementalBase.Strength + Math.floor(Math.random() * 10),
      intelligence: elementalBase.Intelligence + Math.floor(Math.random() * 10),
      speed: elementalBase.Speed + Math.floor(Math.random() * 10),
      defense: elementalBase.Defense + Math.floor(Math.random() * 10),
      maxHP: baseHP,
      currentHP: baseHP,
      level: 1,
    };
  };

  useEffect(() => {
    setElemental(generateNewElemental());
  }, []);

  const handleAddToParty = () => {
    if (isPartyFull || !elemental) return;

    addToParty(elemental);
    setShowOverlay(true);

    setTimeout(() => {
      setShowOverlay(false);
      setElemental(generateNewElemental()); // Generate a new unique fighter
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
            backgroundColor: "rgba(143, 123, 240, 0.7)", // Semi-transparent black
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9000,
            textShadow: "0 0 10px black, 0 0 20px grey",
          }}
        >
          <h1
            style={{
              color: "orange",
              fontSize: "8rem",
              textShadow: "0 0 10px white, 0 0 20px grey",
              animation: "fadeIn 7s ease-out",
            }}
          >
            Elemental <br />
            From the Flames and Currents
          </h1>
        </div>
      )}

      {isPartyFull && (
        <div>
          <p id="PFFighter">Party Full</p>
        </div>
      )}

      <div className="containerdiv">
        <div id="Elementalall" className={`elemental-bg bg-${index}`}>
          <h1 id="Elementaltitle">Elemental</h1>
          <div id="Elementaldesc">
            <h2>Ability: Element Burst</h2>

            <p>Performs one of 4 attacks</p>
          </div>
          <div id="Elementalatt">
            <ul type="horizontal">
              <li>Str: 10</li>

              <li>Int: 60</li>

              <li>Speed: 20</li>

              <li>Defense: 30</li>

              <li>HP: 30</li>
            </ul>
          </div>
          <div>
            <button
              className="Elementalbutt"
              id="ElementalSelectButton"
              onClick={handleAddToParty}
              disabled={isPartyFull} // Disable button if the party is full
            >
              Recruit
            </button>

            <button
              className="Elementalbutt"
              id="ElementalbttButton"
              onClick={() => navigate("/Party")}
            >
              View Team
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Elemental;
