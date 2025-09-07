import React, { useEffect, useMemo, useRef, useState } from "react";

export default function Puzzle({
  image = "/Triforce.png",
  gridSize = 3,
  pieceSize = 96,
  timeLimit = 90,
  onComplete,
  onFail,
}) {
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [pieces, setPieces] = useState([]);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isOver, setIsOver] = useState(false);
  const timerRef = useRef(null);

  const boardPx = pieceSize * gridSize;

  const makeInitialPieces = () => {
    const arr = [];
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        arr.push({
          id: `${r}-${c}`,
          correctRow: r,
          correctCol: c,
          rotation: [0, 90, 180, 270][Math.floor(Math.random() * 4)],
          currentSlot: null,
        });
      }
    }
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const startPuzzle = () => {
    setPieces(makeInitialPieces());
    setTimeLeft(timeLimit);
    setIsOver(false);
    setShowPuzzle(true);

    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setIsOver(true);
          saveResult(false); // fail case
          onFail && onFail();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const allowDrop = (e) => e.preventDefault();

  const onDragStartPiece = (e, pieceId) => {
    e.dataTransfer.setData("text/pieceId", pieceId);
  };

  const onDropToSlot = (e, row, col) => {
    e.preventDefault();
    if (isOver) return;
    const pieceId = e.dataTransfer.getData("text/pieceId");
    if (!pieceId) return;

    setPieces((prev) => {
      const dragged = prev.find((p) => p.id === pieceId);
      const occupantIndex = prev.findIndex(
        (p) =>
          p.currentSlot &&
          p.currentSlot.row === row &&
          p.currentSlot.col === col
      );
      const draggedIndex = prev.findIndex((p) => p.id === pieceId);
      if (!dragged) return prev;

      const newArr = [...prev];
      if (occupantIndex !== -1) {
        const tempSlot = newArr[occupantIndex].currentSlot;
        newArr[occupantIndex] = {
          ...newArr[occupantIndex],
          currentSlot: dragged.currentSlot,
        };
        newArr[draggedIndex] = { ...dragged, currentSlot: tempSlot };
      } else {
        newArr[draggedIndex] = { ...dragged, currentSlot: { row, col } };
      }

      queueMicrotask(() => checkComplete(newArr));
      return newArr;
    });
  };

  const onDropToTray = (e) => {
    e.preventDefault();
    if (isOver) return;
    const pieceId = e.dataTransfer.getData("text/pieceId");
    if (!pieceId) return;

    setPieces((prev) => {
      const idx = prev.findIndex((p) => p.id === pieceId);
      if (idx === -1) return prev;
      const newArr = [...prev];
      newArr[idx] = { ...newArr[idx], currentSlot: null };
      queueMicrotask(() => checkComplete(newArr));
      return newArr;
    });
  };

  const rotatePiece = (pieceId) => {
    if (isOver) return;
    setPieces((prev) => {
      const idx = prev.findIndex((p) => p.id === pieceId);
      if (idx === -1) return prev;
      const newArr = [...prev];
      newArr[idx] = {
        ...newArr[idx],
        rotation: (newArr[idx].rotation + 90) % 360,
      };
      queueMicrotask(() => checkComplete(newArr));
      return newArr;
    });
  };

  const checkComplete = (arr) => {
    const allPlaced = arr.every((p) => p.currentSlot !== null);
    if (!allPlaced) return;
    const allCorrect = arr.every(
      (p) =>
        p.rotation % 360 === 0 &&
        p.currentSlot.row === p.correctRow &&
        p.currentSlot.col === p.correctCol
    );
    if (allCorrect) {
      clearInterval(timerRef.current);
      setIsOver(true);
      saveResult(true);
      onComplete && onComplete();
    }
  };

  const saveResult = (completed) => {
    let resultValue = "1"; // default fail
    if (completed) {
      if (timeLeft <= 20) {
        resultValue = "2"; // finished but with ≤20s left
      } else {
        resultValue = "3"; // finished with >20s left
      }
    }
    localStorage.setItem("trialthreeresults", resultValue);
  };

  const pieceStyle = (p) => {
    const bgSize = `${boardPx}px ${boardPx}px`;
    const bgX = -(p.correctCol * pieceSize);
    const bgY = -(p.correctRow * pieceSize);

    return {
      width: `${pieceSize}px`,
      height: `${pieceSize}px`,
      backgroundImage: `url(${image})`,
      backgroundSize: bgSize,
      backgroundPosition: `${bgX}px ${bgY}px`,
      transform: `rotate(${p.rotation}deg)`,
      transformOrigin: "center center",
      border: "1px solid #444",
      borderRadius: "6px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
      cursor: "grab",
      userSelect: "none",
    };
  };

  const slotBoxStyle = {
    width: `${boardPx}px`,
    height: `${boardPx}px`,
    display: "grid",
    gridTemplateColumns: `repeat(${gridSize}, ${pieceSize}px)`,
    gridTemplateRows: `repeat(${gridSize}, ${pieceSize}px)`,
    gap: "2px",
    background: "rgba(0,0,0,0.2)",
    padding: "2px",
    borderRadius: "10px",
    border: "2px solid #999",
  };

  const trayStyle = {
    minHeight: `${pieceSize + 16}px`,
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    padding: "8px",
    background: "rgba(255,255,255,0.08)",
    border: "2px dashed #888",
    borderRadius: "10px",
  };

  const rotateBtnStyle = {
    position: "absolute",
    right: "-6px",
    top: "-6px",
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    border: "1px solid #444",
    background: "#f3f3f3",
    fontSize: "12px",
    lineHeight: "20px",
    textAlign: "center",
    cursor: "pointer",
    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
  };

  if (!showPuzzle) {
    return (
      <div style={{ maxWidth: 600, margin: "40px auto", textAlign: "center" }}>
        <h2>Puzzle Trial</h2>
        <p>
          Drag and drop the pieces into the correct places to reassemble the
          image. Double-click a piece (or use the ⟳ button) to rotate it. You
          must finish before the timer runs out!
        </p>
        <button
          onClick={startPuzzle}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "8px",
            border: "none",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
          }}
        >
          Start Puzzle
        </button>
      </div>
    );
  }

  return (
    <div
      id="TrialThreePuzzle"
      style={{
        display: "grid",
        gridTemplateColumns: `${boardPx}px 1fr`,
        gap: "16px",
        alignItems: "start",
        maxWidth: "min(95vw, 1000px)",
        margin: "20px auto",
      }}
    >
      {/* Board */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              color: isOver ? (timeLeft > 0 ? "#22c55e" : "#ef4444") : "#fff",
            }}
          >
            {isOver
              ? timeLeft > 0
                ? "✔ Completed!"
                : "✖ Time Up!"
              : `Time: ${timeLeft}s`}
          </div>
          <div style={{ opacity: 0.85 }}>
            {gridSize} × {gridSize}
          </div>
        </div>

        <div style={slotBoxStyle}>
          {Array.from({ length: gridSize * gridSize }).map((_, idx) => {
            const row = Math.floor(idx / gridSize);
            const col = idx % gridSize;
            const occupant = pieces.find(
              (p) =>
                p.currentSlot &&
                p.currentSlot.row === row &&
                p.currentSlot.col === col
            );
            return (
              <div
                key={`slot-${row}-${col}`}
                onDragOver={allowDrop}
                onDrop={(e) => onDropToSlot(e, row, col)}
                style={{
                  position: "relative",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px dashed rgba(255,255,255,0.12)",
                  borderRadius: "6px",
                }}
              >
                {occupant && (
                  <div
                    draggable
                    onDragStart={(e) => onDragStartPiece(e, occupant.id)}
                    onDoubleClick={() => rotatePiece(occupant.id)}
                    style={{
                      ...pieceStyle(occupant),
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        rotatePiece(occupant.id);
                      }}
                      style={rotateBtnStyle}
                    >
                      ⟳
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tray */}
      <div>
        <div style={{ marginBottom: 8, fontWeight: "bold" }}>Pieces</div>
        <div onDragOver={allowDrop} onDrop={onDropToTray} style={trayStyle}>
          {pieces
            .filter((p) => p.currentSlot === null)
            .map((p) => (
              <div
                key={`tray-${p.id}`}
                draggable
                onDragStart={(e) => onDragStartPiece(e, p.id)}
                onDoubleClick={() => rotatePiece(p.id)}
                style={{ ...pieceStyle(p), position: "relative" }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    rotatePiece(p.id);
                  }}
                  style={rotateBtnStyle}
                >
                  ⟳
                </button>
              </div>
            ))}
        </div>
        <div style={{ marginTop: 12, fontSize: 12, opacity: 0.8 }}>
          Tip: <b>Drag</b> pieces onto the board. <b>Double-click</b> (or use ⟳)
          to rotate.
        </div>
      </div>
    </div>
  );
}
