import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./Nav.css";

import HBackground from "./Home/HBackground.js";
import PowerIndex from "./Power/PowerIndex.js";
import Start from "./Power/Start.js";
import Character from "./Character/Character.js";
import TrialsIndex from "./Trials/Index.js";
import TrialOne from "./Trials/TrialOne.js";
import Fighter from "../TeamMates/Fighter.js";
import TeamIndex from "../TeamMates/TeamIndex.js";
import Party from "../TeamMates/Party.js";
import Cleric from "../TeamMates/Cleric.js";
import Mage from "../TeamMates/Mage.js";
import Quiz from "./Trials/Quiz.js";
import TrialTwo from "./Trials/TrialTwo.js";
import TrialThree from "./Trials/TrialThree.js";
import TrialFour from "./Trials/TrialFour.js";
import TrialFive from "./Trials/TrialFive.js";
import TrialSix from "./Trials/TrialSix.js";

function Navbar() {
  const [showCharacterLink, setShowCharacterLink] = useState(false);
  const [showTrialsLink, setShowTrialsLink] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0); // Force re-render

  useEffect(() => {
    const savedStats = localStorage.getItem("characterStats");
    setShowCharacterLink(!!savedStats);

    const trialsEnabled = localStorage.getItem("trialsEnabled");
    setShowTrialsLink(trialsEnabled === "true");
  }, [updateTrigger]); // Re-run when updateTrigger changes

  const triggerUpdate = () => setUpdateTrigger((prev) => prev + 1);

  return (
    <>
      <nav className="navbar">
        <Link to="/THC">
          <h1 className="navbar-logo">Erowind</h1>
        </Link>
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/PowerIndex">Make Character</Link>
          </li>
          {showCharacterLink && (
            <li>
              <Link to="/Character">Character</Link>
            </li>
          )}
          {showTrialsLink && (
            <li>
              <Link to="/Trials">Trials</Link>
            </li>
          )}
          <li>
            <Link to="/Fighter"></Link>
          </li>
          <li>
            <Link to="/Cleric"></Link>
          </li>

          <li>
            <Link to="/TrialOne"></Link>
          </li>

          <li>
            <Link to="/TeamIndex">Select Team</Link>
          </li>
          <li>
            <Link to="/Party">View Party</Link>
          </li>
          <li>
            <Link to="/Mage"></Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HBackground />} />
        <Route path="/PowerIndex" element={<PowerIndex />} />
        <Route
          path="/Start"
          element={
            <Start
              onSaveAndQuit={() => {
                console.log("Character progress saved. Exiting...");
              }}
              onCompletion={() => {
                console.log("Character creation complete!");
                triggerUpdate(); // Trigger Navbar update
              }}
            />
          }
        />
        <Route path="/Character" element={<Character />} />
        <Route path="/Trials" element={<TrialsIndex />} />
        <Route path="/TrialOne" element={<TrialOne />} />
        <Route path="/Fighter" element={<Fighter />} />
        <Route path="/Cleric" element={<Cleric />} />
        <Route path="/Mage" element={<Mage />} />
        <Route path="/TeamIndex" element={<TeamIndex />} />
        <Route path="/Party" element={<Party />} />
        <Route path="/TrialTwo" element={<TrialTwo />} />
        <Route path="/Quiz" element={<Quiz />} />
        <Route path="/TrialThree" element={<TrialThree />} />
        <Route path="/TrialFour" element={<TrialFour />} />
        <Route path="/TrialFive" element={<TrialFive />} />
        <Route path="/TrialSix" element={<TrialSix />} />
      </Routes>
    </>
  );
}

export default Navbar;
