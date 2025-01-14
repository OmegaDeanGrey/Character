import React, { createContext, useContext, useState } from "react";

// Create Context
const PartyContext = createContext();

// Custom Hook to use the context
export const useParty = () => useContext(PartyContext);

// Context Provider
export const PartyProvider = ({ children }) => {
  const [party, setParty] = useState([]);
  const [fullParty, setFullParty] = useState(false);
  const maxPartySize = 5;

  // Add a member to the party
  const addToParty = (member) => {
    if (party.length >= maxPartySize) {
      alert("Party is full! Remove a member to add a new one.");
      setFullParty(true);
      return;
    }
    setParty((prevParty) => [...prevParty, member]);
  };
  if (fullParty) {
    alert("Party is full! Remove a member to add a new one.");
  }
  // Remove a member from the party
  // PartyProvider.js
  const removeFromParty = (index) => {
    setParty((prevParty) => prevParty.filter((_, i) => i !== index));
  };

  const clearParty = () => {
    setParty([]);
  };

  return (
    <PartyContext.Provider
      value={{ party, addToParty, removeFromParty, clearParty }}
    >
      {children}
    </PartyContext.Provider>
  );
};
