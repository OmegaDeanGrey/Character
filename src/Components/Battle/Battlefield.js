import React from "react";

function BattleField({ players = [], enemies = [] }) {
  const renderGrid = (team) => {
    return team.map((member, index) => (
      <button key={index} className="grid-cell">
        {member ? (
          <>
            <div>{member.name}</div>
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
    <div className="battlefield">
      <div className="grid player-side">{renderGrid(players)}</div>

      <div className="grid enemy-side">{renderGrid(enemies)}</div>
    </div>
  );
}

export default BattleField;
