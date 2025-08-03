import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParty } from "../Components/Context/PartyContext";

function Android() {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const { party, addToParty } = useParty();
  const isPartyFull = party.length >= 5;

  const names = [
    "X1273",
    "X1274",
    "X1275",
    "X1276",
    "X1277",
    "Beep",
    "Boop",
    "C3-P",
    "Porky",
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

  const android = {
    name: randomName,
    strength: Math.abs(Math.floor(Math.random() * 100) + 30),
    intelligence: Math.abs(Math.floor(Math.random() * 100) - 30),
    speed: Math.abs(Math.floor(Math.random() * 100) + 10),
    defense: Math.abs(Math.floor(Math.random() * 100) + 10),
    HP: Math.abs(Math.floor(Math.random() * 100) + 10),
  };

  const handleAddToParty = () => {
    if (isPartyFull) return;
    if (party.length < 5) addToParty(android);

    setShowOverlay(true);
    setTimeout(() => {
      setShowOverlay(false); // Hide overlay after 1 second
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
            zIndex: 199000,
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "8rem",
              textShadow: "0 0 10px black, 0 0 20px grey",
              animation: "fadeIn 3s ease-out",
            }}
          >
            Android - {android.name} <br />
            All Your Base Are Belong to Us
          </h1>
        </div>
      )}
      <div className="containerdiv4">
        <h1>Android</h1>
        <h2>Abilty: </h2>
        <br />
        <typed>Deals Either Physical or Mental Damage</typed>
        <ul>
          <li>Str: -10</li>
          <li>Int: +10</li>
          <li>Speed: -10</li>
          <li>Defense: -10</li>
          <li>HP: +0</li>
        </ul>
        <button
          id="AndroidSelectButton"
          onClick={handleAddToParty}
          disabled={isPartyFull} // Disable button if the party is full
        >
          Recruit
        </button>
        {isPartyFull && (
          <div>
            <p id="PFAndroid">Party Full</p>
          </div> // Disable button if the party is full
        )}
        <button id="AndroidbttButton" onClick={() => navigate("/TeamIndex")}>
          Back to Team Index
        </button>
      </div>
    </>
  );
}

export default Android;
