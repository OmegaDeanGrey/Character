import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Trials.css";

const NOTES = [
  { name: "C4", midi: 60 },
  { name: "C#4", midi: 61 },
  { name: "D4", midi: 62 },
  { name: "D#4", midi: 63 },
  { name: "E4", midi: 64 },
  { name: "F4", midi: 65 },
  { name: "F#4", midi: 66 },
  { name: "G4", midi: 67 },
  { name: "G#4", midi: 68 },
  { name: "A4", midi: 69 },
  { name: "A#4", midi: 70 },
  { name: "B4", midi: 71 },
];

const midiToFreq = (m) => 440 * Math.pow(2, (m - 69) / 12);

// PianoKeyboard Component
function PianoKeyboard({ keyStatus, handleKeyClick }) {
  // White keys in one octave (C D E F G A B)
  const whiteKeys = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];

  // Black keys and their positions relative to white keys
  const blackKeys = [
    { name: "C#4", position: 0.65 },
    { name: "D#4", position: 1.65 },
    // No black key between E and F
    { name: "F#4", position: 3.65 },
    { name: "G#4", position: 4.65 },
    { name: "A#4", position: 5.65 },
  ];

  return (
    <div
      className="piano-container"
      style={{
        position: "relative",
        width: 280,
        height: 180,
        userSelect: "none",
      }}
    >
      {/* White keys */}
      {whiteKeys.map((note, idx) => (
        <button
          key={note}
          onClick={() =>
            handleKeyClick(
              note,
              NOTES.findIndex((n) => n.name === note)
            )
          }
          className={`white-key ${keyStatus[note] || "idle"}`}
          aria-pressed={keyStatus[note] === "correct"}
          style={{
            position: "relative",
            width: 40,
            height: 180,
            border: "1px solid black",
            backgroundColor:
              keyStatus[note] === "correct"
                ? "lightgreen"
                : keyStatus[note] === "wrong"
                ? "#f99"
                : "white",
            zIndex: 1,
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 10,
              width: "100%",
              textAlign: "center",
              fontSize: 12,
            }}
          >
            {note}
          </div>
        </button>
      ))}

      {/* Black keys */}
      {blackKeys.map(({ name, position }) => (
        <button
          key={name}
          onClick={() =>
            handleKeyClick(
              name,
              NOTES.findIndex((n) => n.name === name)
            )
          }
          className={`black-key ${keyStatus[name] || "idle"}`}
          aria-pressed={keyStatus[name] === "correct"}
          style={{
            position: "absolute",
            left: 40 * position,
            width: 28,
            height: 110,
            backgroundColor:
              keyStatus[name] === "correct"
                ? "lightgreen"
                : keyStatus[name] === "wrong"
                ? "#f99"
                : "black",
            borderRadius: "0 0 4px 4px",
            border: "1px solid black",
            zIndex: 2,
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 10,
              width: "100%",
              textAlign: "center",
              fontSize: 10,
              color: "white",
            }}
          >
            {name}
          </div>
        </button>
      ))}
    </div>
  );
}

export default function TrialFive() {
  const navigate = useNavigate();

  // UI / game state
  const [trialStarted, setTrialStarted] = useState(false);
  const [targetIndex, setTargetIndex] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [keyStatus, setKeyStatus] = useState({}); // noteName -> 'idle'|'wrong'|'correct'
  const [trialComplete, setTrialComplete] = useState(false);
  const [message, setMessage] = useState("");

  // audio
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);

  const scoring = [3, 2, 1, 0];

  useEffect(() => {
    const initial = {};
    NOTES.forEach((n) => (initial[n.name] = "idle"));
    setKeyStatus(initial);
  }, []);

  const ensureAudioContext = () => {
    if (!audioCtxRef.current) {
      const ctx = new (window.AudioContext || window.AudioContext)();
      audioCtxRef.current = ctx;
      const gain = ctx.createGain();
      gain.gain.value = 0.25;
      gain.connect(ctx.destination);
      masterGainRef.current = gain;
    } else if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  const playTone = (midi, duration = 800) => {
    ensureAudioContext();
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = midiToFreq(midi);
    osc.connect(gainNode);
    gainNode.connect(masterGainRef.current);
    const now = ctx.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(1, now + 0.01);
    osc.start(now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration / 1000);
    osc.stop(now + duration / 1000 + 0.05);
  };

  const beginTrial = () => {
    setTrialStarted(true);
    setTrialComplete(false);
    setAttempts(0);
    setMessage("Listen to the tone and pick the matching key.");
    setKeyStatus(() => {
      const reset = {};
      NOTES.forEach((n) => (reset[n.name] = "idle"));
      return reset;
    });
    const idx = Math.floor(Math.random() * NOTES.length);
    setTargetIndex(idx);
    playTone(NOTES[idx].midi, 900);
  };

  const replayTone = () => {
    if (targetIndex === null) return;
    playTone(NOTES[targetIndex].midi, 900);
  };

  const handleKeyClick = (noteName, idx) => {
    if (!trialStarted || trialComplete) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    const correct = idx === targetIndex;
    if (correct) {
      // --- Save result based on attempts ---
      let resultValue = "1";
      if (newAttempts === 1) resultValue = "3";
      else if (newAttempts === 2) resultValue = "2";
      localStorage.setItem("trialfiveresult", resultValue);

      setTrialComplete(true);
      setMessage(
        `Correct! ${noteName} — you earned result value ${resultValue}.`
      );
      setKeyStatus((prev) => ({ ...prev, [noteName]: "correct" }));
    } else {
      setKeyStatus((prev) => ({ ...prev, [noteName]: "wrong" }));
      setMessage(`Wrong! ${noteName} is not the tone. Try again.`);
      setTimeout(() => {
        setKeyStatus((prev) => {
          if (prev[noteName] === "correct") return prev;
          return { ...prev, [noteName]: "idle" };
        });
      }, 700);

      if (newAttempts >= 4) {
        setTrialComplete(true);
        setMessage(
          `Out of tries — the correct note was ${NOTES[targetIndex].name}.`
        );
        setKeyStatus((prev) => ({
          ...prev,
          [NOTES[targetIndex].name]: "correct",
        }));
        // --- If out of tries, save worst-case result ---
        localStorage.setItem("trialfiveresults", "1");
      }
    }

    playTone(NOTES[idx].midi, 500);
  };

  const resetEverything = () => {
    setTrialStarted(false);
    setTargetIndex(null);
    setAttempts(0);
    setScore(0);
    setMessage("");
    setTrialComplete(false);
    setKeyStatus(() => {
      const reset = {};
      NOTES.forEach((n) => (reset[n.name] = "idle"));
      return reset;
    });
  };

  return (
    <div id="bgFive">
      <div id="trial-five-root">
        <div className="trial-header">
          <h1>Cloud Fortress — Pitch Match Trial</h1>
          <p className="instructions">
            Press <strong>Begin Trial</strong> to hear a tone, then click the
            piano key that matches it.
          </p>
          <div className="controls">
            {!trialStarted && (
              <button className="btn primary" onClick={beginTrial}>
                Begin Trial
              </button>
            )}
            {trialStarted && !trialComplete && (
              <>
                <button className="btn" onClick={replayTone}>
                  Replay Tone
                </button>
                <button
                  className="btn secondary"
                  onClick={() => {
                    setTrialComplete(true);
                    setMessage(`Revealed: ${NOTES[targetIndex].name}`);
                    setKeyStatus((prev) => ({
                      ...prev,
                      [NOTES[targetIndex].name]: "correct",
                    }));
                  }}
                >
                  Reveal
                </button>
              </>
            )}
            {trialComplete && (
              <button
                className="btn primary"
                onClick={() => {
                  setTrialComplete(false);
                  setAttempts(0);
                  setMessage("");
                  setKeyStatus(() => {
                    const reset = {};
                    NOTES.forEach((n) => (reset[n.name] = "idle"));
                    return reset;
                  });
                  const idx = Math.floor(Math.random() * NOTES.length);
                  setTargetIndex(idx);
                  playTone(NOTES[idx].midi, 900);
                  setTrialStarted(true);
                }}
              >
                New Round
              </button>
            )}
            <button className="btn danger" onClick={() => navigate("/Trials")}>
              Back to Trials
            </button>
            <button className="btn small" onClick={resetEverything}>
              Reset All
            </button>
          </div>
        </div>

        <div className="trial-info">
          <div>
            Score: <strong>{score}</strong>
          </div>
          <div>
            Attempts this round: <strong>{attempts}</strong>
          </div>
          <div className="message">{message}</div>
        </div>

        {/* Replace the grid below with PianoKeyboard */}
        <PianoKeyboard keyStatus={keyStatus} handleKeyClick={handleKeyClick} />

        <div className="legend">
          <span className="legend-item">
            <span className="dot correct"></span> Correct
          </span>
          <span className="legend-item">
            <span className="dot wrong"></span> Wrong (flashes)
          </span>
          <span className="legend-item">
            <span className="dot idle"></span> Idle
          </span>
        </div>
      </div>
      <button
        id="FiveGoBackButton"
        onClick={() => {
          navigate("/Trials");
        }}
      >
        Go Back
      </button>
    </div>
  );
}
