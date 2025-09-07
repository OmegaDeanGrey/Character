import React, { useState, useEffect } from "react";

const Memory = () => {
  const [round, setRound] = useState(0); // current round
  const [gridSize, setGridSize] = useState(4);
  const [pattern, setPattern] = useState([]);
  const [playerSelection, setPlayerSelection] = useState([]);
  const [showPattern, setShowPattern] = useState(false);
  const [message, setMessage] = useState("");
  const [completedRounds, setCompletedRounds] = useState(0);
  const [tries, setTries] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gridSizes = [4, 5, 6];
  const squaresToLight = [5, 7, 9];

  const startRound = (roundNum) => {
    if (roundNum > 3) return; // cap at 3
    const size = gridSizes[roundNum - 1];
    const lights = squaresToLight[roundNum - 1];
    setGridSize(size);

    const totalSquares = size * size;
    let newPattern = [];
    while (newPattern.length < lights) {
      const randomIndex = Math.floor(Math.random() * totalSquares);
      if (!newPattern.includes(randomIndex)) newPattern.push(randomIndex);
    }

    setPattern(newPattern);
    setPlayerSelection([]);
    setShowPattern(true);
    setMessage("");

    setTimeout(() => setShowPattern(false), 2000 + roundNum * 500);
  };

  const handleClick = (index) => {
    if (showPattern || gameOver) return;
    if (playerSelection.includes(index)) return;

    const newSelection = [...playerSelection, index];
    setPlayerSelection(newSelection);

    if (newSelection.length === pattern.length) {
      const correct =
        [...newSelection].sort((a, b) => a - b).join(",") ===
        [...pattern].sort((a, b) => a - b).join(",");

      if (correct) {
        setCompletedRounds((prev) => prev + 1);
        if (round < 3) {
          setMessage("✅ Correct! Next round...");
          setTimeout(() => setRound(round + 1), 1500);
        } else {
          endGame(completedRounds + 1); // all 3 done
        }
      } else {
        setMessage("❌ Wrong!");
        setTries((prev) => {
          const newTries = prev + 1;
          if (newTries >= 3) {
            endGame(completedRounds); // out of tries
          } else {
            setTimeout(() => startRound(round), 1500);
          }
          return newTries;
        });
      }
    }
  };

  const endGame = (finalCompleted) => {
    setGameOver(true);
    let resultValue = "1";
    if (finalCompleted === 2) resultValue = "2";
    if (finalCompleted === 3) resultValue = "3";
    localStorage.setItem("trialsixresults", resultValue);
    setMessage("🎮 Game over! Your result has been recorded.");
  };

  const startGame = () => {
    setRound(1);
    setCompletedRounds(0);
    setTries(0);
    setGameOver(false);
    setMessage("");
  };

  useEffect(() => {
    if (round > 0 && !gameOver) startRound(round);
  }, [round, gameOver]);

  return (
    <div
      id="MemoryCase"
      style={{
        maxWidth: "600px",
        width: "90vw",
        textAlign: "center",
        margin: "0 auto",
      }}
    >
      {round === 0 || gameOver ? (
        <div>
          <h1 className="text-2xl font-bold mb-2">Memory</h1>
          <button
            onClick={startGame}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {gameOver ? "Play Again" : "Start Game"}
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-xl font-bold mb-2">Round {round}</h1>
          <p className="mb-2">Tries: {tries} / 3</p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${gridSize}, 50px)`,
              gridTemplateRows: `repeat(${gridSize}, 50px)`,
              gap: 0,
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            {Array.from({ length: gridSize * gridSize }).map((_, index) => (
              <div
                key={index}
                onClick={() => handleClick(index)}
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: showPattern
                    ? pattern.includes(index)
                      ? "#6bc1ff"
                      : "#ddd"
                    : playerSelection.includes(index)
                    ? "#8cff8c"
                    : "#eee",
                  borderRadius: "8px",
                  border: "2px solid #999",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
              />
            ))}
          </div>
          <p id="MemoryMessage" className="mt-2">
            {message}
          </p>
        </>
      )}
    </div>
  );
};

export default Memory;
