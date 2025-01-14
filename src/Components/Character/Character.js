import "../../App.css";

import React, { useEffect, useState } from "react";

const Character = () => {
  const [characterStats, setCharacterStats] = useState({});

  useEffect(() => {
    const savedStats = localStorage.getItem("characterStats");
    if (savedStats) {
      setCharacterStats(JSON.parse(savedStats));
    }
  }, []); //this useEffect should be added to anything I want to add to the character sheet

  return (
    <div id="CharacterContainer">
      <div id="BgCharacter">
        <h1 id="CharacterTitle">Saved Character</h1>
        {Object.keys(characterStats).length > 0 ? (
          <ul>
            {Object.entries(characterStats).map(([key, value]) => (
              <li key={key} id="AttributeListItems">
                {key} - {value}
              </li>
            ))}
          </ul>
        ) : (
          <p id="NoCharacter">No character saved yet.</p>
        )}
      </div>
    </div>
  );
};

export default Character;
