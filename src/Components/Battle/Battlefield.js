import React from "react";

function BattleField({ players = [], enemies = [] }) {
  const renderGrid = (team) => {
    // Ensure 6 slots: 2 rows x 3 columns
    const slots = Array.from({ length: 6 }, (_, i) => team[i] || null);

    return slots.map((member, index) => (
      <button
        key={member?.id || index} // use existing id if present
        id={member?.id || `slot-${index}`} // keep id tags
        className="grid-cell"
        style={{
          backgroundImage: member?.Icon ? `url(${member.Icon})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }}
      >
        {member ? (
          <>
            <div>{member.name || member.Name}</div>
            <div>
              HP: {member.currentHP ?? member.HP}/{member.maxHP ?? member.HP}
            </div>
            {member.role && <div>{member.role}</div>}
          </>
        ) : (
          <div>Empty</div>
        )}
      </button>
    ));
  };

  return (
    <div className="battle-container">
      <div className="grid player-side">{renderGrid(players)}</div>
      <div className="grid enemy-side">{renderGrid(enemies)}</div>
    </div>
  );
}

export default BattleField;
