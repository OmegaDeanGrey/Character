import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParty } from "../Components/Context/PartyContext";

function Summoner() {
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
  const [alert, setAlert] = useState("");
  // useEffect(() => {
  //   // Generate stats only once
  //   setStats({
  //     strength: Math.floor(Math.random() * 100),
  //     intelligence: Math.floor(Math.random() * 100),
  //     speed: Math.floor(Math.random() * 100),
  //     defense: Math.floor(Math.random() * 100),
  //     hp: Math.floor(Math.random() * 100),
  //   });
  // }, []);

  const summoner = {
    name: randomName,
    strength: Math.abs(Math.floor(Math.random() * 100) + 30),
    intelligence: Math.abs(Math.floor(Math.random() * 100) - 30),
    speed: Math.abs(Math.floor(Math.random() * 100) + 10),
    defense: Math.abs(Math.floor(Math.random() * 100) + 10),
    HP: Math.abs(Math.floor(Math.random() * 100) + 10),
  };

  const handleAddToParty = () => {
    if (isPartyFull) return;
    if (party.length < 5) addToParty(summoner);

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
            Summoner - {summoner.name} <br />
            Arise & Destroy
          </h1>
        </div>
      )}
      <div className="containerdiv4">
        <img src="./Monster11.png" id="Summoner1" type="video/mp4" />
        <img src="./Monster2.png" id="Summoner2" type="video/mp4" />
        <img src="./Monster3.png" id="Summoner3" type="video/mp4" />

        <h1>Summoner</h1>
        <h2>Abilty: Familiar</h2>
        <br />
        <typed>Summon Monster to damage any number of opponents</typed>
        <ul>
          <li>Str: -10</li>
          <li>Int: +10</li>
          <li>Speed: -10</li>
          <li>Defense: -10</li>
          <li>HP: +0</li>
        </ul>
        <button
          id="ClericSelectButton"
          onClick={handleAddToParty}
          disabled={isPartyFull} // Disable button if the party is full
          title={isPartyFull ? "Party is full" : ""} // Tooltip message
          {...(isPartyFull ? "View Party" : "Party Full")}
        >
          Recruit
        </button>
        <button id="ClericbttButton" onClick={() => navigate("/TeamIndex")}>
          Back to Team Index
        </button>
      </div>
    </>
  );
}

export default Summoner;
