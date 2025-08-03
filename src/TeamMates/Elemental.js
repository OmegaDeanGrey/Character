import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParty } from "../Components/Context/PartyContext";

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
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
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
    const newElemental = {
      name: randomName,
      role: "Elemental",
      strength: Math.abs(Math.floor(Math.random() * 100) + 30),
      intelligence: Math.abs(Math.floor(Math.random() * 100) - 30),
      speed: Math.abs(Math.floor(Math.random() * 100) + 10),
      defense: Math.abs(Math.floor(Math.random() * 100) + 10),
      HP: Math.abs(Math.floor(Math.random() * 100) + 10),
    };
    setElemental(newElemental);
  }, []);

  const handleAddToParty = () => {
    if (isPartyFull) return;
    if (party.length < 5) addToParty(elemental);
    if (!elemental) return;
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
              color: "black",
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

      <div className="containerdiv">
        <div
          id="Elementalall"
          style={{
            backgroundImage: `url(${images[index]})`,
          }}
        >
          <h1 id="Elementaltitle">Elemental</h1>
          <div id="Elementaldesc">
            <h2>Element Burst</h2>

            <p>Performs one of 4 attacks</p>
          </div>
          <div id="Elementalatt">
            <ul type="horizontal">
              <div>
                <li id="item1">Str: +0</li>
              </div>
              <div>
                <li id="item2">Int: +30</li>
              </div>
              <div>
                <li id="item3">Speed: +0</li>
              </div>
              <div>
                <li id="item4">Defense: +0</li>
              </div>
              <div>
                <li id="item5">HP: +0</li>
              </div>
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
            {isPartyFull && (
              <div>
                <p id="PFElemental">Party Full</p>
              </div> // Disable button if the party is full
            )}
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
