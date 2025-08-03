import "../../App.css";
import React, { useEffect, useState } from "react";
import baseStatsByClass from "../Character/BaseStats";
import { useParty } from "../Context/PartyContext";
import CalculatePower from "../Power/CalculatePower";

function Character() {
  // const [characterStats, setCharacterStats] = useState({});
  const [quizStats, setQuizStats] = useState({});
  const [strengthResults, setStrengthResults] = useState(0);
  const [powerFlag, setPowerFlag] = useState(false);
  const { characterStats, setCharacterStats, characterName } = useParty();
  useEffect(() => {
    const savedStats = localStorage.getItem("characterStats");
    const headgear = localStorage.getItem("headgear");
    const accessory = localStorage.getItem("accessory");

    const mail = localStorage.getItem("mail");
    const TOne = localStorage.getItem("trialOneCompleted");
    const TTwo = localStorage.getItem("trialTwoCompleted");
    const TThree = localStorage.getItem("trialThreeCompleted");
    const TFour = localStorage.getItem("trialFourCompleted");
    const TFive = localStorage.getItem("trialFiveCompleted");
    const TSix = localStorage.getItem("trialSixCompleted");

    if (TOne && TTwo && TThree && TFour && TFive && TSix) {
      setPowerFlag(true);
    }

    const parsedStats = savedStats ? JSON.parse(savedStats) : {};
    const charClass = parsedStats.Class;
    const elemental = parsedStats.Element;
    const baseStats = baseStatsByClass[charClass] || {};
    // const parsedQuiz = wisdom ? JSON.parse(wisdom) : {};
    // const parsedStrength = strength ? JSON.parse(strength) : {};
    console.log(parsedStats);
    let str = baseStats.Strength || 0;
    let int = baseStats.Intelligence || 0;
    let spd = baseStats.Speed || 0;
    let def = baseStats.Defense || 0;
    let hp = baseStats.HP || 0;

    if (headgear === "Feathered Cap") {
      spd += 4;
    }

    if (headgear === "Heavy Helm") {
      spd -= 2;
      def += 2;
      hp += 2;
    }

    if (mail === "Studded Leather") {
      spd += 1;
      def += 1;
    }

    if (mail === "Plate Mail") {
      spd -= 4;
      def += 2;
      hp += 4;
    }

    if (accessory === "Ionia Spellbook") {
      int += 3;
      def -= 1;
    }

    if (accessory === "Robust Sheild") {
      def += 3;
      spd -= 1;
    }

    if (accessory === "Coat of Arms") {
      str += 2;
      hp += 1;
    }

    if (accessory === "Sableim Amulet") {
      hp += 5;
    }

    if (accessory === "Hermes Bracer") {
      spd += 3;
      def += 2;
      hp -= 3;
    }

    if (elemental === "Stone") {
    }

    console.log(parsedStats);
    const finalCharacter = {
      ...parsedStats,
      name: parsedStats.name,
      Strength: str,
      Intelligence: int,
      Speed: spd,
      Defense: def,
      HP: hp,
    };

    localStorage.setItem("finalCharacter", JSON.stringify(finalCharacter));
    console.log(finalCharacter);
    setCharacterStats(parsedStats);
    setQuizStats({ Intelligence: int, Speed: spd, Defense: def, HP: hp });
    setStrengthResults({ Strength: str });
  }, []);
  console.log(characterStats);
  return (
    <div id="CharacterContainer">
      <div id="BgCharacter">
        {/* <img id="BWE" src="/BW.png" /> */}
        <h1 id="CharacterTitle">{characterStats.Name}</h1>

        <div id="characterinsides">
          <h2 className="statslabel">Character Stats</h2>
          {Object.keys(characterStats).length > 0 ? (
            <ul>
              {Object.entries(characterStats).map(([key, value]) => (
                <li key={key} id="AttributeListItems">
                  {key} - {value}
                </li>
              ))}
            </ul>
          ) : (
            <p id="NoCharacter">No character saved yet.</p>
          )}
        </div>
        <div>
          {powerFlag && (
            <h2>
              Hero Power:
              <CalculatePower />
            </h2>
          )}
          <h2 id="CYT">Complete Your Trials to Finalize Character Stats</h2>
        </div>
        <div>
          <div>
            <h2 className="statslabel">Attributes</h2>
            <ul className="AttLists">
              <li className="AttributeItems">Int: {quizStats.Intelligence}</li>
              <li className="AttributeItems">
                Str: {strengthResults.Strength}
              </li>
              <li className="AttributeItems">Speed: {quizStats.Speed}</li>
              <li className="AttributeItems">Def: {quizStats.Defense}</li>
              <li className="AttributeItems">HP: {quizStats.HP}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Character;
