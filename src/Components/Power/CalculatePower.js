import React, { useEffect, useState } from "react";
import elementPowers from "./ElementPower"; // adjust path if needed

function CalculatePower() {
  const [heroPower, setHeroPower] = useState(null);
  const [finalPower, setFinalPower] = useState(null);
  const [element, setElement] = useState(null);

  useEffect(() => {
    // Load characterStats to get element
    const savedStats = localStorage.getItem("characterStats");
    if (savedStats) {
      const parsedStats = JSON.parse(savedStats);
      setElement(parsedStats.Element);
    }

    // Collect trial results
    const trialOne = Number(localStorage.getItem("trialoneresults")) || 0;
    const trialTwo = Number(localStorage.getItem("trialtworesults")) || 0;
    const trialThree = Number(localStorage.getItem("trialthreeresults")) || 0;
    const trialFour = Number(localStorage.getItem("trialfourresults")) || 0;
    const trialFive = Number(localStorage.getItem("trialfiveresults")) || 0;
    const trialSix = Number(localStorage.getItem("trialsixresults")) || 0;

    const PowerIndex =
      trialOne + trialTwo + trialThree + trialFour + trialFive + trialSix;

    let heroLevel = 1;
    if (PowerIndex >= 7 && PowerIndex <= 12) {
      heroLevel = 2;
    } else if (PowerIndex >= 13 && PowerIndex <= 18) {
      heroLevel = 3;
    }

    setHeroPower(heroLevel);

    // Save hero power level
    localStorage.setItem("heroPowerLevel", heroLevel);
  }, []);

  useEffect(() => {
    if (element && heroPower && elementPowers[element]) {
      const power = elementPowers[element][heroPower];
      setFinalPower(power);

      // Save for battle usage
      localStorage.setItem("finalCharacterPower", power);
    }
  }, [element, heroPower]);

  return (
    <div>
      {heroPower && element && finalPower ? (
        <>
          <p>Hero Power Level: {heroPower}</p>
          <p>
            Element: <b>{element}</b>
          </p>
          <p>
            Battle Power: <b>{finalPower}</b>
          </p>
        </>
      ) : (
        <p>Calculating power...</p>
      )}
    </div>
  );
}

export default CalculatePower;
