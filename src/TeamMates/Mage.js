import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParty } from "../Components/Context/PartyContext.js";

function Mage() {
  const [stats, setStats] = useState({});
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const { party, addToParty } = useParty();
  const isPartyFull = party.length >= 5;

  const names = [
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
    "Eve",
    "Frank",
    "Mike",
    "Joe",
    "Drew",
    "Kornebari",
    "Valeria",
    "Dot",
    "Vaughn",
    "Bean",
    "Jake",
    "Alicia",
    "Bobby",
    "Charles",
    "Dana",
    "Evan",
    "Franklin",
    "Mika",
    "Joey",
    "Dora",
    "Barni",
    "Valerie",
    "Dottie",
    "Vince",
    "Ben",
    "Jack",
  ];
  const randomName = names[Math.floor(Math.random() * names.length)];

  const mage = {
    name: randomName,
    role: "Mage",
    strength: Math.abs(Math.floor(Math.random() * 100) - 20),
    intelligence: Math.abs(Math.floor(Math.random() * 100) + 30),
    speed: Math.abs(Math.floor(Math.random() * 100) - 10),
    defense: Math.abs(Math.floor(Math.random() * 100) - 10),
    HP: Math.abs(Math.floor(Math.random() * 100) - 30),
  };

  const handleAddToParty = () => {
    if (isPartyFull) return;
    if (party.length < 5) addToParty(mage);

    setShowOverlay(true);
    setTimeout(() => {
      setShowOverlay(false); // Hide overlay after 1 second
    }, 1000);
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
            backgroundColor: "rgba(37, 36, 36, 0.7)", // Semi-transparent black
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "8rem",
              textShadow: "0 0 10px #ff0, 0 0 20px #ff0",
              animation: "fadeIn 1s ease-out",
            }}
          >
            Mage - {mage.name} <br />
            Added to Team!
          </h1>
        </div>
      )}
      <div className="containerdiv">
        <video muted autoPlay loop controls id="MageVid">
          <source src="./MageVid.mp4" type="video/mp4" />
        </video>

        <h1>Mage</h1>
        <h2>Abilty: Spellcast</h2>
        <br />

        <typed>Uses magic to effect all enemies</typed>
        <ul>
          <li>Str: -30</li>
          <li>Int: +30</li>
          <li>Speed: -10</li>
          <li>Defense: -10</li>
          <li>HP: -30</li>
        </ul>
        <button
          id="atpButton"
          onClick={handleAddToParty}
          disabled={isPartyFull} // Disable button if the party is full
          title={isPartyFull ? "Party is full" : ""} // Tooltip message
          {...(isPartyFull ? "View Party" : "Party Full")}
        >
          Recruit
        </button>
        <button id="MagebttButton" onClick={() => navigate("/TeamIndex")}>
          Back to Team Index
        </button>
      </div>
    </>
  );
}

export default Mage;
