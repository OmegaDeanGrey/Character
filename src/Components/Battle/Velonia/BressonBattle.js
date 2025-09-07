import React, { useState } from "react";
import BressoneEnemies from "../Velonia/BressoneEnemies";
import BattleManager from "../BattleManager";
import { useNavigate } from "react-router-dom";
import "../Battle.css";
import DialogBox from "../../Utility/DialogBox";

function BressoneBattle() {
  const [enemies, setEnemies] = useState([]);
  const [battleStarted, setBattleStarted] = useState(false);
  const [dialogIndex, setDialogIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const navigate = useNavigate();

  // story text (can expand with portraits/names later)
  const dialogue = [
    {
      text: "The winds outside Bressone carry whispers of danger...",
      name: "Narrator",
    },
    {
      text: "A group of monsters lurks beyond the city walls.",
      name: "Narrator",
    },
    {
      text: "Your party steels themselves for the coming fight.",
      name: "Narrator",
    },
    {
      text: "We will eat your faces off!",
      name: "Monster",
      portrait: "/GoblinLeader.png",
    },
    { text: "Prepare for battle!", name: "Hero", portrait: "/HeroIcon.png" },
  ];

  const nextDialog = () => {
    if (dialogIndex < dialogue.length - 1) {
      setDialogIndex(dialogIndex + 1);
    } else {
      startBattle();
    }
  };

  const startBattle = () => {
    setTransitioning(true);
    setTimeout(() => {
      const generatedEnemies = BressoneEnemies.randomEnemies(3);
      setEnemies(generatedEnemies);
      setBattleStarted(true);
      setTransitioning(false);
    }, 800); // matches CSS animation duration
  };

  const returnToTown = () => navigate("/Bressone");

  const BressoneBattleComplete = () => alert("Battle Complete");

  return (
    <div>
      {/* Pre-battle dialog */}
      {!battleStarted && !transitioning && (
        <div className="bressone-battle-container">
          <DialogBox
            {...dialogue[dialogIndex]}
            onNext={nextDialog}
            isLast={dialogIndex === dialogue.length - 1}
          />
        </div>
      )}

      {/* Transition overlay */}
      {transitioning && <div className="battle-transition"></div>}

      {/* Battlefield (shown after transition completes) */}
      {battleStarted && !transitioning && (
        <div className="battlefield">
          <h1 id="BBTitle">Bressone Outskirts</h1>
          <BattleManager
            enemies={enemies}
            onBattleEnd={BressoneBattleComplete}
          />
          <button onClick={returnToTown} id="bbreturn">
            Return to Town
          </button>
        </div>
      )}
    </div>
  );
}

export default BressoneBattle;
