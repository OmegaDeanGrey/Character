import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParty } from "../Components/Context/PartyContext";
import Stars from "../Components/Utility/Stars";
import baseStatsByClass from "../Components/Character/BaseStats";

function Fairy() {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const { party, addToParty } = useParty();
  const isPartyFull = party.length >= 5;
  const [fairy, setFairy] = useState("");

  const generateNewFairy = () => {
    const names = [
      "Bart",
      "Peevley",
      "DewDrop",
      "Chuckle",
      "Jane",
      "Curtain",
      "Kai",
      "Tink",
      "Wink",
      "Blink",
      "Clyde",
      "Zarina",
      "Hobart",
      "Jinx",
    ];

    const usedNames = new Set(party.map((member) => member.name));
    const availableNames = names.filter((name) => !usedNames.has(name));
    const randomName =
      availableNames.length > 0
        ? availableNames[Math.floor(Math.random() * availableNames.length)]
        : `Fairy${Math.floor(Math.random() * 1000)}`;

    const fairyBase = baseStatsByClass["Fairy"];
    const baseHP = fairyBase.HP + Math.floor(Math.random() * 10);

    return {
      name: randomName,
      role: "Fairy",
      strength: fairyBase.Strength + Math.floor(Math.random() * 10),
      intelligence: fairyBase.Intelligence + Math.floor(Math.random() * 10),
      speed: fairyBase.Speed + Math.floor(Math.random() * 10),
      defense: fairyBase.Defense + Math.floor(Math.random() * 10),
      maxHP: baseHP,
      currentHP: baseHP,
      level: 1,
    };
  };

  useEffect(() => {
    setFairy(generateNewFairy());
  }, []);

  const handleAddToParty = () => {
    if (isPartyFull || !fairy) return;

    addToParty(fairy);
    setShowOverlay(true);

    setTimeout(() => {
      setShowOverlay(false);
      setFairy(generateNewFairy()); // Generate a new unique fighter
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
              color: "pink",
              fontSize: "8rem",
              textShadow: "0 0 10px white, 0 0 20px grey",
              animation: "fadeIn 7s ease-out",
            }}
          >
            Fairy <br />
            For the Light of Velonia!
          </h1>
        </div>
      )}

      {isPartyFull && (
        <div>
          <p id="PFFairy">Party Full</p>
        </div> // Disable button if the party is full
      )}

      <div className="containerdiv">
        <Stars count={100} />
        <div id="fairyall">
          <h1 id="fairytitle">Fairy</h1>
          <div id="fairydesc">
            <h2>Ability: Polarity</h2>

            <p>Damages Random enemy and Heal Random Ally</p>
          </div>
          <div id="fairyatt">
            <ul>
              <li>Str: 15</li>
              <li>Int: 60</li>
              <li>Spd: 40</li>
              <li>Def: 35</li>
              <li>HP: 25</li>
            </ul>
          </div>

          <button
            id="FairySelectButton"
            onClick={handleAddToParty}
            disabled={isPartyFull}
          >
            Recruit
          </button>

          <button id="FairybttButton" onClick={() => navigate("/Party")}>
            View Team
          </button>
        </div>
      </div>
    </>
  );
}

export default Fairy;
