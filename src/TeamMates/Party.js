import React, { useContext } from "react";
import { useParty } from "../Components/Context/PartyContext.js";
import "./TeamMates.css";

function Party() {
  const { party, removeFromParty, clearParty } = useParty();

  return (
    <div className="party-container">
      <div id="BgParty">
        <h2 id="PartyTitle">Party Members</h2>
        {party.length === 0 ? (
          <p>No members in your party yet!</p>
        ) : (
          <ol className="party-list">
            {party.map((member, index) => (
              <li id="partymember" key={index} className="party-member">
                <div>
                  <strong id="memberName">
                    {member.name}: {member.role}
                  </strong>
                  <p id="memberStats">
                    Str: {member.strength} | Int: {member.intelligence} | Speed:{" "}
                    {member.speed} | Defense: {member.defense} | HP: {member.HP}
                    <button
                      className="remove-button"
                      onClick={() => removeFromParty(index)} // Remove member
                    >
                      Remove
                    </button>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        )}

        <button id="ClearPartyButton" onClick={clearParty}>
          Clear Party
        </button>
      </div>
    </div>
  );
}

export default Party;
