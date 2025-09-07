import React from "react";
import "./DialogBox.css";

function DialogBox({ name, portrait, text, onNext, isLast, choices }) {
  return (
    <div className="dialog-wrapper">
      {portrait && (
        <img src={portrait} alt={name} className="dialog-portrait" />
      )}

      <div className="dialog-box">
        {name && <div className="dialog-name">{name}</div>}
        <div className="dialog-text">{text}</div>
        {choices ? (
          <div className="choices">
            {choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => onNext(choice.next)}
                id="choices"
              >
                {choice.label}
              </button>
            ))}
          </div>
        ) : (
          <button onClick={() => onNext()}>
            {isLast ? "Continue" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
}

export default DialogBox;
