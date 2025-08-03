import React, { useState } from "react";
import VeloniaEnemies from "../Velonia/VeloniaEnemies";
import BattleManager from "../BattleManager";
import { useNavigate } from "react-router-dom";

function BressoneBattle() {
  const [enemies, setEnemies] = useState([]);
  const [battleStarted, setBattleStarted] = useState(false);
  const navigate = useNavigate();

  const startBattle = () => {
    const goblins = VeloniaEnemies.goblins(3);
    setEnemies(goblins);
    setBattleStarted(true);
  };

  const returnToTown = () => {
    // setBattleStarted(false);
    // setEnemies([]); // Clear enemies but keep party HP/exp intact
    // navigate("/Bressone");
    alert("Battle Over");
  };

  return (
    <div className="bressone-battle-container">
      {!battleStarted && (
        <div id="StartScreen">
          <button onClick={startBattle} className="lnbutt">
            Start Battle
          </button>
        </div>
      )}

      {battleStarted && (
        <div>
          <h1 id="BBTitle">Outside Bressone</h1>
          <div>
            <BattleManager enemies={enemies} onBattleEnd={returnToTown} />
            <button onClick={returnToTown} className="lnbutt">
              Return to Town
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BressoneBattle;
