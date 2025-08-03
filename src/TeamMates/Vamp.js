import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParty } from "../Components/Context/PartyContext";
import baseStatsByClass from "../Components/Character/BaseStats";

function Vamp() {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const { party, addToParty } = useParty();
  const isPartyFull = party.length >= 5;
  const [vamp, setVamp] = useState("");

  const generateNewVamp = () => {
    const names = [
      "Rod",
      "Samuel",
      "Arian",
      "Adrian",
      "Riley",
      "Simon",
      "Blade",
      "Frost",
      "Deacon",
      "LeGrange",
      "Dean",
      "Lestat",
      "Vlad",
      "Tom",
      "Nosfer",
      "Pitt",
      "Blackula",
    ];

    const usedNames = new Set(party.map((member) => member.name));
    const availableNames = names.filter((name) => !usedNames.has(name));
    const randomName =
      availableNames.length > 0
        ? availableNames[Math.floor(Math.random() * availableNames.length)]
        : `Vampire${Math.floor(Math.random() * 1000)}`;

    const vampBase = baseStatsByClass["Vampire"];
    const baseHP = vampBase.HP + Math.floor(Math.random() * 10);

    return {
      name: randomName,
      role: "Vampire",
      strength: vampBase.Strength + Math.floor(Math.random() * 10),
      intelligence: vampBase.Intelligence + Math.floor(Math.random() * 10),
      speed: vampBase.Speed + Math.floor(Math.random() * 10),
      defense: vampBase.Defense + Math.floor(Math.random() * 10),
      maxHP: baseHP,
      currentHP: baseHP,
      level: 1,
    };
  };

  useEffect(() => {
    setVamp(generateNewVamp());
  }, []);

  const handleAddToParty = () => {
    if (isPartyFull || !vamp) return;

    addToParty(vamp);
    setShowOverlay(true);

    setTimeout(() => {
      setShowOverlay(false);
      setVamp(generateNewVamp()); // Generate a new unique fighter
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
            backgroundColor: "rgba(82, 3, 3, 0.7)", // Semi-transparent black
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9000,
            textShadow: "0 0 10px black, 0 0 20px grey",
          }}
        >
          <h1
            style={{
              color: "black",
              fontSize: "8rem",
              textShadow: "0 0 10px white, 0 0 20px grey",
              animation: "fadeIn 7s ease-out",
            }}
          >
            Vampire <br />
            They Stand No Chance
          </h1>
        </div>
      )}

      {isPartyFull && (
        <div>
          <p id="PFFighter">Party Full</p>
        </div>
      )}

      <div className="containerdiv">
        <div id="Vampall">
          <h1 id="Vamptitle">Vampire</h1>
          <div id="Vampdesc">
            <h2>Ability: Drain</h2>

            <p>Attacks and Gains Life</p>
          </div>
          <div id="Vampatt">
            <ul>
              <li>Str: 60</li>
              <li>Int: 60</li>
              <li>Spd: 60</li>
              <li>Def: 25</li>
              <li>HP: 25</li>
            </ul>
          </div>

          <button
            className="vampbutt"
            id="VampSelectButton"
            onClick={handleAddToParty}
            disabled={isPartyFull}
          >
            Recruit
          </button>

          <button
            className="vampbutt"
            id="VampbttButton"
            onClick={() => navigate("/Party")}
          >
            View Team
          </button>
        </div>
      </div>
    </>
  );
}

export default Vamp;
