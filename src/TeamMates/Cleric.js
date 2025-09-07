import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParty } from "../Components/Context/PartyContext";
import baseStatsByClass from "../Components/Character/BaseStats";

function Cleric() {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const { party, addToParty } = useParty();
  const isPartyFull = party.length >= 5;
  const [cleric, setCleric] = useState(null);

  const generateNewCleric = () => {
    const names = [
      "Eve",
      "Roe",
      "Roweena",
      "Vanessa",
      "Ulric",
      "Rian",
      "Umberto",
      "Diego",
      "Christo",
      "Padre",
      "Eden",
      "Rye",
      "Constantine",
      "Bo",
    ];
    const usedNames = new Set(party.map((member) => member.name));
    const availableNames = names.filter((name) => !usedNames.has(name));
    const randomName =
      availableNames.length > 0
        ? availableNames[Math.floor(Math.random() * availableNames.length)]
        : `Cleric${Math.floor(Math.random() * 1000)}`;

    const clericBase = baseStatsByClass["Cleric"];
    const baseHP = clericBase.HP + Math.floor(Math.random() * 10);
    return {
      name: randomName,
      role: "Cleric",
      strength: clericBase.Strength + Math.floor(Math.random() * 10),
      intelligence: clericBase.Intelligence + Math.floor(Math.random() * 10),
      speed: clericBase.Speed + Math.floor(Math.random() * 10),
      defense: clericBase.Defense + Math.floor(Math.random() * 10),
      maxHP: baseHP,
      currentHP: baseHP,
      level: 1,
      BG: clericBase.BG,
      Icon: clericBase.Icon,
    };
  };

  useEffect(() => {
    setCleric(generateNewCleric());
  }, []);

  const handleAddToParty = () => {
    if (isPartyFull || !cleric) return;

    addToParty(cleric);
    setShowOverlay(true);

    setTimeout(() => {
      setShowOverlay(false);
      setCleric(generateNewCleric()); // Generate a new unique fighter
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
            backgroundColor: "rgba(239, 221, 221, 0.7)", // Semi-transparent black
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9000,
            textShadow: "0 0 10px black, 0 0 20px grey",
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "8rem",
              textShadow: "0 0 10px black, 0 0 20px grey",
              animation: "fadeIn 7s ease-out",
            }}
          >
            Cleric <br />
            Let's Go Fellow!
          </h1>
        </div>
      )}
      {isPartyFull && (
        <div>
          <p id="PFCleric">Party Full</p>
        </div> // Disable button if the party is full
      )}
      <div className="containerdiv">
        <div id="clericall">
          <h1 id="clerictitle">Cleric</h1>
          <div id="Clericdesc">
            <h2>Abilty: Healing Hands</h2>

            <p>Strong Healing to the Weakest Ally</p>
          </div>
          <div>
            <ul id="Clericadj">
              <li>Str: 20</li>
              <li>Int: 70</li>
              <li>Spd: 20</li>
              <li>Def: 35</li>
              <li>HP: 30</li>
            </ul>
          </div>

          <button
            className="dabuttons"
            id="ClericSelectButton"
            onClick={handleAddToParty}
            disabled={isPartyFull} // Disable button if the party is full
          >
            Recruit
          </button>

          <button
            className="dabuttons"
            id="ClericbttButton"
            onClick={() => navigate("/Party")}
          >
            View Team
          </button>
        </div>
      </div>
    </>
  );
}

export default Cleric;
