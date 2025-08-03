import React, { createContext, useContext, useState } from "react";

// Create Context
const PartyContext = createContext();

// Custom Hook to use the context
export const useParty = () => useContext(PartyContext);

// Context Provider
export const PartyProvider = ({ children }) => {
  const [party, setParty] = useState([]);
  const [fullParty, setFullParty] = useState(false);
  const [recruited, setRecruited] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [characterStats, setCharacterStats] = useState([]);
  const maxPartySize = 5;

  // Add a member to the party
  const addToParty = (member) => {
    if (party.length >= maxPartySize) {
      alert("Party is full! Remove a member to add a new one.");
      setFullParty(true);
      return;
    }

    const initializedMember = {
      ...member,
      currentHP:
        typeof member.currentHP === "number"
          ? member.currentHP
          : typeof member.maxHP === "number"
          ? member.maxHP
          : 1,
      id: `player-${party.length}`,
    };

    setRecruited("");
    setParty((prevParty) => [...prevParty, initializedMember]);
  };

  // Remove a member from the party
  const removeFromParty = (index) => {
    setParty((prevParty) => prevParty.filter((_, i) => i !== index));
  };

  // Clear the party (if needed elsewhere)
  const clearParty = () => {
    setParty([]);
  };

  return (
    <PartyContext.Provider
      value={{
        party,
        setParty,
        recruited,
        setRecruited,
        addToParty,
        removeFromParty,
        clearParty,
        fullParty,
        setFullParty,
        characterName,
        setCharacterName,
        characterStats,
        setCharacterStats,
      }}
    >
      {children}
    </PartyContext.Provider>
  );
};
