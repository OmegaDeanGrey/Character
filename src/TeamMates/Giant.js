import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParty } from "../Components/Context/PartyContext";
import baseStatsByClass from "../Components/Character/BaseStats";

function Giant() {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const { party, addToParty } = useParty();
  const isPartyFull = party.length >= 5;
  const [giant, setGiant] = useState("");

  const generateNewGiant = () => {
    const names = [
      "Franken",
      "Hober",
      "Gord",
      "Dot",
      "Riad",
      "Clops",
      "Bill",
      "Alma",
      "Sarah",
      "Caramon",
    ];

    const usedNames = new Set(party.map((member) => member.name));
    const availableNames = names.filter((name) => !usedNames.has(name));
    const randomName =
      availableNames.length > 0
        ? availableNames[Math.floor(Math.random() * availableNames.length)]
        : `Giant${Math.floor(Math.random() * 1000)}`;

    const giantBase = baseStatsByClass["Giant"];
    const baseHP = giantBase.HP + Math.floor(Math.random() * 10);

    return {
      name: randomName,
      role: "Giant",
      strength: giantBase.Strength + Math.floor(Math.random() * 10),
      intelligence: giantBase.Intelligence + Math.floor(Math.random() * 10),
      speed: giantBase.Speed + Math.floor(Math.random() * 10),
      defense: giantBase.Defense + Math.floor(Math.random() * 10),
      maxHP: baseHP,
      currentHP: baseHP,
      level: 1,
    };
  };

  useEffect(() => {
    setGiant(generateNewGiant());
  }, []);

  const handleAddToParty = () => {
    if (isPartyFull || !giant) return;

    addToParty(giant);
    setShowOverlay(true);

    setTimeout(() => {
      setShowOverlay(false);
      setGiant(generateNewGiant()); // Generate a new unique fighter
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
            backgroundColor: "rgba(19, 18, 18, 0.7)", // Semi-transparent black
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
              textShadow: "0 0 10px white, 0 0 20px grey",
              animation: "fadeIn 7s ease-out",
            }}
          >
            Giant <br />
            Thwomp!
          </h1>
        </div>
      )}

      {isPartyFull && (
        <div>
          <p id="PFFighter">Party Full</p>
        </div>
      )}

      <div className="containerdiv">
        <div id="Giantall">
          <h1 id="Gianttitle">Giant</h1>
          <div id="Giantdesc">
            <h2 id="Giantdesctitle">Ability: Seismic</h2>
            <br />
            <p>Chance to hurt enemies and allies</p>
          </div>
          <div id="Giantatt">
            <ul>
              <li>Str: 50</li>
              <li>Int: 5</li>
              <li>Spd: 15</li>
              <li>Def: 65</li>
              <li>HP: 50</li>
            </ul>
          </div>

          <button
            className="Giantbutt"
            id="GiantSelectButton"
            onClick={handleAddToParty}
            disabled={isPartyFull}
          >
            Recruit
          </button>

          <button
            className="Giantbutt"
            id="GiantbttButton"
            onClick={() => navigate("/Party")}
          >
            View Team
          </button>
        </div>
      </div>
    </>
  );
}

export default Giant;
