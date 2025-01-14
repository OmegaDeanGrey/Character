import React, { useEffect, useState } from "react";

const Character = () => {
  const [characterStats, setCharacterStats] = useState({});

  useEffect(() => {
    const savedStats = localStorage.getItem("characterStats");
    if (savedStats) {
      setCharacterStats(JSON.parse(savedStats));
    }
  }, []);

  return (
    <div>
      <h1>Saved Character</h1>
      {Object.keys(characterStats).length > 0 ? (
        <ul>
          {Object.entries(characterStats).map(([key, value]) => (
            <li key={key}>
              {key}: {value}
            </li>
          ))}
        </ul>
      ) : (
        <p>No character saved yet.</p>
      )}
    </div>
  );
};

export default Character;
