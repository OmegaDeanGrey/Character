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
  elementalBurstAction,
  giantSeismicAction,
  werewolfHumanAttackAction,
  werewolfBeastAttackAction,
  heroAction,
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
    const mainHero = JSON.parse(localStorage.getItem("finalCharacter"));
    const otherPlayers = party
      .filter((p) => p.Name !== mainHero?.Name)
      .map((p) => ({
        ...p,
        currentHP: typeof p.currentHP === "number" ? p.currentHP : p.HP,
        id: p.id || `player-${p.Name}`,
        Icon: p.Icon,
      }));

    // 2x3 grid: [front-left, front-center(hero), front-right, back-left, back-center, back-right]
    const arrangedPlayers = Array(6).fill(null);

    if (mainHero) {
      arrangedPlayers[1] = {
        ...mainHero,
        id: "player-hero",
        currentHP: mainHero.currentHP ?? mainHero.HP,
        Icon: mainHero.Icon,
      };
    }

    let otherIndex = 0;
    for (let i = 0; i < arrangedPlayers.length; i++) {
      if (arrangedPlayers[i] === null && otherPlayers[otherIndex]) {
        arrangedPlayers[i] = {
          ...otherPlayers[otherIndex],
          currentHP:
            otherPlayers[otherIndex].currentHP ?? otherPlayers[otherIndex].HP,
        };
        otherIndex++;
      }
    }

    const enemySetup = enemies.map((e, index) => ({
      ...e,
      id: e.id ?? `enemy-${index}`,
      currentHP: typeof e.currentHP === "number" ? e.currentHP : e.HP,
    }));

    setPlayers(arrangedPlayers);
    setEnemyState(enemySetup);

    const order = [...arrangedPlayers.filter(Boolean), ...enemySetup].sort(
      (a, b) => b.Speed - a.Speed
    );
    setTurnOrder(order);
    setCurrentTurnIndex(0);
    setBattleOver(false);
    setBattleLog([]);
  }, [party, enemies]);

  useEffect(() => {
    if (battleOver || turnOrder.length === 0) return;

    const currentActor = turnOrder[currentTurnIndex];
    if (!currentActor || currentActor.currentHP <= 0) {
      proceedToNextTurn();
      return;
    }

    const timer = setTimeout(() => {
      handleAction(currentActor);
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentTurnIndex, turnOrder, battleOver]);

  const handleAction = (actor) => {
    if (!actor) return;

    let logs = [];
    let effects = [];

    const livingPlayers = players.filter((p) => p && p.currentHP > 0);

    switch (actor.role) {
      case "Hero":
        ({ logs, effects } = heroAction(actor, players, enemyState));
        applyEffects(effects, "enemy");
        break;

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

      case "Elemental":
        ({ logs, effects } = elementalBurstAction(actor, players, enemyState));
        applyEffects(effects, "enemy");
        break;

      case "Giant":
        ({ logs, effects } = giantSeismicAction(actor, players, enemyState));
        applyEffects(effects, "enemy");
        break;

      case "WereWolf":
        if (actor.form === "human") {
          ({ logs, effects } = werewolfHumanAttackAction(
            actor,
            players,
            enemyState
          ));
        } else {
          ({ logs, effects } = werewolfBeastAttackAction(
            actor,
            players,
            enemyState
          ));
        }
        applyEffects(effects, "enemy");
        break;

      // Generic enemy attacks
      case "Goblin":
      case "Orc":
      case "Spriggan":
      case "NightMare":
        if (livingPlayers.length > 0) {
          const target =
            livingPlayers[Math.floor(Math.random() * livingPlayers.length)];
          const damage =
            actor.role === "NightMare"
              ? Math.max(1, actor.strength)
              : Math.max(1, actor.strength - target.defense);

          setPlayers((prev) =>
            prev.map((p) =>
              p && p.id === target.id
                ? { ...p, currentHP: Math.max(0, p.currentHP - damage) }
                : p
            )
          );

          const actionName =
            actor.role === "NightMare"
              ? "PhantomKick"
              : actor.role === "Spriggan"
              ? "Shenanigans"
              : actor.role === "Orc"
              ? "clubs"
              : "hits";

          logs.push(
            `${actor.name} ${actionName} ${target.name} for ${damage} damage!`
          );
        }
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
            const currentHP =
              typeof e.currentHP === "number" ? e.currentHP : e.HP;
            return {
              ...e,
              currentHP: Math.max(0, currentHP - effect.value),
            };
          }
          return e;
        })
      );
    }
    if (targetType === "ally" || targetType === "both") {
      setPlayers((prev) =>
        prev.map((p) => {
          if (!p) return null;
          const effect = effects.find((eff) => eff.targetId === p.id);
          if (effect && effect.type === "heal") {
            const maxHP = typeof p.maxHP === "number" ? p.maxHP : p.HP;
            const currentHP = typeof p.currentHP === "number" ? p.currentHP : 0;
            return {
              ...p,
              currentHP: Math.min(maxHP, currentHP + effect.value),
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
    const allPlayersDead = players
      .filter(Boolean)
      .every((p) => p.currentHP <= 0);

    if (allEnemiesDead) {
      setBattleLog((prev) => [...prev, "Victory! All enemies defeated."]);
      setBattleOver(true);
      setParty(
        party.map((p) => {
          const player = players.find((pl) => pl?.Name === p.Name);
          return { ...p, currentHP: player?.currentHP ?? p.HP };
        })
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
        {battleLog.slice(-6).map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
}

export default BattleManager;
