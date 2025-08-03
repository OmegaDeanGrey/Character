import React, { useState, useEffect } from "react";
import BattleField from "./Battlefield";
import { useParty } from "../Context/PartyContext";
import {
  fighterSlashAction,
  clericHealingHandsAction,
  archerVolleyAction,
  summonerFamiliarAction,
  mageSpellcastAction,
  rogueBackstabAction,
  fairyPolarityAction,
  vampireDrainAction,
} from "./BattleActions";

function BattleManager({ enemies, onBattleEnd }) {
  const { party, setParty } = useParty();

  const [turnOrder, setTurnOrder] = useState([]);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [battleLog, setBattleLog] = useState([]);
  const [players, setPlayers] = useState([]);
  const [enemyState, setEnemyState] = useState([]);
  const [battleOver, setBattleOver] = useState(false);

  useEffect(() => {
    const playerSetup = party.map((p, index) => ({
      ...p,
      id: `player-${index}`,
      currentHP:
        typeof p.currentHP === "number"
          ? p.currentHP
          : typeof p.maxHP === "number"
          ? p.maxHP
          : 1,
    }));

    const enemySetup = enemies.map((e, index) => ({
      ...e,
      id: e.id ?? `enemy-${index}`,
      currentHP:
        typeof e.currentHP === "number"
          ? e.currentHP
          : typeof e.maxHP === "number"
          ? e.maxHP
          : 1,
    }));

    setPlayers(playerSetup);
    setEnemyState(enemySetup);

    const order = [...playerSetup, ...enemySetup].sort(
      (a, b) => b.speed - a.speed
    );
    setTurnOrder(order);
    setCurrentTurnIndex(0);
    setBattleOver(false);
    setBattleLog([]);
  }, [party, enemies]);

  useEffect(() => {
    if (battleOver || turnOrder.length === 0) return;

    const currentActor = turnOrder[currentTurnIndex];
    if (currentActor.currentHP <= 0) {
      proceedToNextTurn();
      return;
    }

    setTimeout(() => {
      handleAction(currentActor);
    }, 1500);
  }, [currentTurnIndex, turnOrder, battleOver]);

  const handleAction = (actor) => {
    let logs = [];
    let effects = [];

    switch (actor.role) {
      case "Fighter":
        ({ logs, effects } = fighterSlashAction(actor, players, enemyState));
        applyEffects(effects, "enemy");
        break;

      case "Cleric":
        ({ logs, effects } = clericHealingHandsAction(
          actor,
          players,
          enemyState
        ));
        applyEffects(effects, "ally");
        break;

      case "Archer":
        ({ logs, effects } = archerVolleyAction(actor, players, enemyState));
        applyEffects(effects, "enemy");
        break;

      case "Summoner":
        ({ logs, effects } = summonerFamiliarAction(
          actor,
          players,
          enemyState
        ));
        applyEffects(effects, "enemy");
        break;

      case "Mage":
        ({ logs, effects } = mageSpellcastAction(actor, players, enemyState));
        applyEffects(effects, "enemy");
        break;

      case "Rogue":
        ({ logs, effects } = rogueBackstabAction(actor, players, enemyState));
        applyEffects(effects, "enemy");
        break;

      case "Fairy":
        ({ logs, effects } = fairyPolarityAction(actor, players, enemyState));
        applyEffects(effects, "both");
        break;

      case "Vampire":
        ({ logs, effects } = vampireDrainAction(actor, players, enemyState));
        applyEffects(effects, "both");
        break;

      case "Goblin":
        const livingPlayers = players.filter((p) => p.currentHP > 0);
        if (livingPlayers.length > 0) {
          const target =
            livingPlayers[Math.floor(Math.random() * livingPlayers.length)];
          const damage = Math.max(1, actor.strength - target.defense);
          const newPlayers = players.map((p) =>
            p.id === target.id
              ? { ...p, currentHP: Math.max(0, p.currentHP - damage) }
              : p
          );
          setPlayers(newPlayers);
          logs.push(`${actor.name} hits ${target.name} for ${damage} damage!`);
        }
        break;

      default:
        logs.push(`${actor.name} does nothing.`);
        break;
    }

    setBattleLog((prev) => [...prev, ...logs]);
    checkBattleEnd();
    proceedToNextTurn();
  };

  const applyEffects = (effects, targetType) => {
    if (targetType === "enemy" || targetType === "both") {
      setEnemyState((prev) =>
        prev.map((e) => {
          const effect = effects.find((eff) => eff.targetId === e.id);
          if (effect && effect.type === "damage") {
            return {
              ...e,
              currentHP: Math.max(0, e.currentHP - effect.value),
            };
          }
          return e;
        })
      );
    } else if (targetType === "ally" || targetType === "both") {
      setPlayers((prev) =>
        prev.map((p) => {
          const effect = effects.find((eff) => eff.targetId === p.id);
          if (effect && effect.type === "heal") {
            return {
              ...p,
              currentHP: Math.min(
                typeof p.maxHP === "number" ? p.maxHP : p.HP,
                p.currentHP + effect.value
              ),
            };
          }
          return p;
        })
      );
    }
  };

  const proceedToNextTurn = () => {
    setCurrentTurnIndex((prev) =>
      prev + 1 >= turnOrder.length ? 0 : prev + 1
    );
  };

  const checkBattleEnd = () => {
    const allEnemiesDead = enemyState.every((e) => e.currentHP <= 0);
    const allPlayersDead = players.every((p) => p.currentHP <= 0);

    if (allEnemiesDead) {
      setBattleLog((prev) => [...prev, "Victory! All enemies defeated."]);
      setBattleOver(true);
      setParty(
        party.map((p, index) => ({
          ...p,
          currentHP: players[index]?.currentHP ?? p.HP,
        }))
      );
      if (onBattleEnd) onBattleEnd(true);
    } else if (allPlayersDead) {
      setBattleLog((prev) => [...prev, "Defeat! Your party has fallen."]);
      setBattleOver(true);
      if (onBattleEnd) onBattleEnd(false);
    }
  };

  return (
    <div className="battle-container">
      <BattleField players={players} enemies={enemyState} />
      <div className="battle-log">
        {battleLog.slice(-5).map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
}

export default BattleManager;
