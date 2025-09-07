// src/Utility/DialogRoom.js
import React, { useState } from "react";
import DialogBox from "./DialogBox";

function DialogRoom({ dialogue, background, onComplete }) {
  const [dialogIndex, setDialogIndex] = useState(0);

  const nextDialog = (jumpTo = null) => {
    if (jumpTo !== null) {
      setDialogIndex(jumpTo);
    } else if (dialogIndex < dialogue.length - 1) {
      setDialogIndex(dialogIndex + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  return (
    <div
      className="DialogRoom"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <DialogBox
        {...dialogue[dialogIndex]}
        onNext={nextDialog}
        isLast={dialogIndex === dialogue.length - 1}
      />
    </div>
  );
}

export default DialogRoom;
