import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParty } from "../Components/Context/PartyContext";

function Giant() {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const { party, addToParty } = useParty();
  const isPartyFull = party.length >= 5;
  const [giant, setGiant] = useState("");

  useEffect(() => {
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
      "Alice",
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
      "Lestat",
      "Vlad",
      "Tom",
      "Nosfer",
      "Pitt",
      "Blackula",
    ];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const newGiant = {
      name: randomName,
      role: "Giant",
      strength: Math.abs(Math.floor(Math.random() * 100) + 30),
      intelligence: Math.abs(Math.floor(Math.random() * 100) - 30),
      speed: Math.abs(Math.floor(Math.random() * 100) + 10),
      defense: Math.abs(Math.floor(Math.random() * 100) + 10),
      HP: Math.abs(Math.floor(Math.random() * 100) + 10),
    };
    setGiant(newGiant);
  }, []);

  const handleAddToParty = () => {
    if (isPartyFull) return;
    if (party.length < 5) addToParty(giant);
    if (!giant) return;
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
            Thrwomp!
          </h1>
        </div>
      )}
      <div className="containerdiv">
        <div id="Giantall">
          <h1 id="Gianttitle">Giant</h1>
          <div id="Giantdesc">
            <h2>Seismic</h2>

            <p>Damages all characters on both teams</p>
          </div>
          <div id="Giantatt">
            <ul>
              <li>Str: +40</li>
              <li>Int: -60</li>
              <li>Speed: +10</li>
              <li>Defense: +10</li>
              <li>HP: +20</li>
            </ul>
          </div>

          <button
            className="Giantbutt"
            id="GiantSelectButton"
            onClick={handleAddToParty}
            disabled={isPartyFull} // Disable button if the party is full
            title={isPartyFull ? "Party is full" : ""} // Tooltip message
            // {...(isPartyFull ? "View Party" : "Party Full")}
          >
            Recruit
          </button>
          {isPartyFull && (
            <div>
              <p id="PFGiant">Party Full</p>
            </div> // Disable button if the party is full
          )}
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
