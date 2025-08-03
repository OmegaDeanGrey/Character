import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParty } from "../Components/Context/PartyContext";

function Witch() {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const { party, addToParty } = useParty();
  const isPartyFull = party.length >= 5;
  const [witch, setWitch] = useState(null);

  useEffect(() => {
    const names = ["Alice", "Diana", "Eve", "Circe", "Jack"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const newWitch = {
      name: randomName,
      role: "Witch",
      strength: Math.abs(Math.floor(Math.random() * 100) - 20),
      intelligence: Math.abs(Math.floor(Math.random() * 100) + 30),
      speed: Math.abs(Math.floor(Math.random() * 100) - 10),
      defense: Math.abs(Math.floor(Math.random() * 100) - 10),
      HP: Math.abs(Math.floor(Math.random() * 100) - 30),
    };
    setWitch(newWitch);
  }, []);

  const handleAddToParty = () => {
    if (isPartyFull) return;
    if (party.length < 5) addToParty(witch);
    if (!witch) return;
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
            zIndex: 9000,
          }}
        >
          <h1
            style={{
              color: "black",
              fontSize: "8rem",
              textShadow: "0 0 10px black, 0 0 20px grey",
              animation: "fadeIn 3s ease-out",
            }}
          >
            Witch - <br />
            Something Wicked This Way Comes
          </h1>
        </div>
      )}
      <div className="containerdiv" id="witchall">
        {isPartyFull && (
          <div>
            <p id="PF">Party Full</p>
          </div> // Disable button if the party is full
        )}

        <h1 id="witchtitle">Witch</h1>
        <h2 id="witchdesc">
          Abilty: Ritual
          <p>Buff Allies stats and/or Lower enemy stats</p>
        </h2>
        <div id="witchatt">
          <ul>
            <li>Str: -30</li>
            <li>Int: +20</li>
            <li>Speed: +10</li>
            <li>Defense: -20</li>
            <li>HP: +0</li>
          </ul>
        </div>
        <button
          className="dabuttons"
          id="witchrecruit"
          onClick={() => {
            handleAddToParty();
          }}
          disabled={isPartyFull}
        >
          Recruit
        </button>

        <button id="WitchbttButton" onClick={() => navigate("/Party")}>
          View Party
        </button>
      </div>
    </>
  );
}

export default Witch;
