import React, { useState } from "react";

function CalculatePower() {
  const [heroPower, setHeroPower] = useState();

  const trialOneResults = localStorage.getItem("T1Result");
  const trialTwoResults = localStorage.getItem("T2Result");
  const trialThreeResults = localStorage.getItem("T3Result");
  const trialFourResults = localStorage.getItem("T4Result");
  const trialFiveResults = localStorage.getItem("T5Result");
  const trialSixResults = localStorage.getItem("T6Result");
  const PowerIndex =
    trialOneResults +
    trialTwoResults +
    trialThreeResults +
    trialFourResults +
    trialFiveResults +
    trialSixResults;

  if (PowerIndex == 0 - 10) {
    setHeroPower("1");
  }
  if (PowerIndex == 10 - 20) {
    setHeroPower("2");
  }
  if (PowerIndex == 20 - 30) {
    setHeroPower("3");
  }
  if (PowerIndex == 30 - 40) {
    setHeroPower("4");
  }
  if (PowerIndex == 40 - 50) {
    setHeroPower("5");
  }
  if (PowerIndex == 50 - 60) {
    setHeroPower("6");
  }
  if (PowerIndex == 60 - 70) {
    setHeroPower("7");
  }
  if (PowerIndex == 70 - 80) {
    setHeroPower("8");
  }
  if (PowerIndex == 80 - 90) {
    setHeroPower("9");
  }
  if (PowerIndex == 90 - 100) {
    setHeroPower("10");
  }
  return <>{heroPower}</>;
}
export default CalculatePower;
