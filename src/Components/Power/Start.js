import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Power.css";
import HBackground from "../Home/HBackground";

const Start = ({ onCompletion, onSaveAndQuit }) => {
  const steps = [
    {
      label: "Race",
      choices: [
        {
          label: "Human",
          related: [{ label: "Barbarian" }, { label: "European" }],
        },
        {
          label: "Elf",
          related: [{ label: "Sylvan Elf" }, { label: "Drow Elf" }],
        },
        {
          label: "Dwarf",
          related: [{ label: "Mountain Dwarf" }, { label: "Hill Dwarf" }],
        },
        {
          label: "Halfling",
          related: [{ label: "Kender" }, { label: "Hobbit" }],
        },
        { label: "Orc" },
      ],
    },
    {
      label: "Class",
      choices: [
        {
          label: "Fighter",
          related: [{ label: "Samurai" }, { label: "Wrestler" }],
        },
        { label: "Thief", related: [{ label: "Scout" }, { label: "Ninja" }] },
        {
          label: "Mage",
          related: [
            { label: "Magi White" },
            { label: "Magi Black" },
            { label: "Magi Red" },
          ],
        },
        { label: "Cleric" },
        { label: "Ranger" },
      ],
    },
    {
      label: "Element",
      choices: [
        { label: "Earth" },
        { label: "Water" },
        { label: "Wind" },
        { label: "Fire" },
        { label: "Lightning" },
        { label: "Holy" },
        { label: "Dark" },
      ],
    },
  ];

  const [characterName, setCharacterName] = useState("");
  const [characterStats, setCharacterStats] = useState({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentChoices, setCurrentChoices] = useState(steps[0].choices);
  const [isNameStep, setIsNameStep] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const navigate = useNavigate();

  const saveToLocalStorage = () => {
    localStorage.setItem("characterStats", JSON.stringify(characterStats));
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    setCharacterStats((prevStats) => ({
      ...prevStats,
      Name: characterName,
    }));
    setIsNameStep(false);
  };

  const handleChoiceClick = (choice) => {
    const step = steps[currentStepIndex];
    setCharacterStats((prevStats) => ({
      ...prevStats,
      [step.label]: choice.label,
    }));

    if (choice.related && choice.related.length > 0) {
      setCurrentChoices(choice.related);
    } else {
      const nextStepIndex = currentStepIndex + 1;
      if (nextStepIndex < steps.length) {
        setCurrentStepIndex(nextStepIndex);
        setCurrentChoices(steps[nextStepIndex].choices);
      } else {
        setCurrentChoices([]);
        setIsComplete(true);
      }
    }
  };

  const handleStartOver = () => {
    setCharacterName("");
    setCharacterStats({});
    setCurrentStepIndex(0);
    setCurrentChoices(steps[0].choices);
    setIsNameStep(true);
    setIsComplete(false);
    localStorage.removeItem("characterStats");
  };

  return (
    <div id="NameDiv">
      <h1 id="CYC">Create Your Character</h1>
      {isComplete ? (
        <div>
          <h2>Character Creation Complete!</h2>
          <ul id="StatsAll">
            {Object.entries(characterStats).map(([key, value]) => (
              <li id="Stats" key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
          <div>
            <button
              id="ReadyButton"
              onClick={() => {
                saveToLocalStorage();
                localStorage.setItem("trialsEnabled", "true");
                onCompletion();
                navigate("/Trials");
              }}
              style={{ margin: "10px" }}
            >
              Ready?
            </button>
            <button
              id="SaveAndQuitButton"
              onClick={() => {
                saveToLocalStorage();
                localStorage.removeItem("trialsEnabled");
                if (onSaveAndQuit) onSaveAndQuit(); // Optional execution
                navigate("/Home");
              }}
              style={{ margin: "10px" }}
            >
              Save & Quit
            </button>
            <button
              id="StartOverButton"
              onClick={handleStartOver}
              style={{ margin: "10px" }}
            >
              Start Over
            </button>
          </div>
        </div>
      ) : isNameStep ? (
        <form onSubmit={handleNameSubmit}>
          <label id="NameLabel">
            Character Name:
            <input
              id="NameInput"
              type="text"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              required
            />
          </label>
          <button id="NameButton" type="submit">
            Next
          </button>
        </form>
      ) : (
        <div>
          {currentChoices.length > 0 && (
            <div>
              <h2 className="Title">Select {steps[currentStepIndex].label}</h2>
              {currentChoices.map((choice, index) => (
                <button
                  id="RaceSelectButton"
                  key={index}
                  onClick={() => handleChoiceClick(choice)}
                  style={{ margin: "10px", padding: "10px" }}
                >
                  {choice.label}
                </button>
              ))}
            </div>
          )}
          <div>
            <h3 className="Title">Character Stats</h3>
            <ul>
              {Object.entries(characterStats).map(([key, value]) => (
                <li id="Stat" key={key}>
                  {key}: {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Start;
