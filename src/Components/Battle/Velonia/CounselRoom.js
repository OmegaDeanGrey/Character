// src/Scenes/CounselRoom.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useParty } from "../../Context/PartyContext.js";
import DialogRoom from "../../Utility/DialogRoom";

function CounselRoom() {
  const navigate = useNavigate();
  const { party } = useParty();

  const dialogue = [
    {
      text: "Welcome to the Kingdom behind the Horran Falls...",
      name: "Ahn DaQuin",
      portrait: "/DwarfKing.png",
    },
    {
      text: "Evils linger beyond our Fortress walls.",
      name: "Ahn DaQuin",
      portrait: "/DwarfKing.png",
    },
    {
      text: "Your assistance would be of great relief to our beleaguered warriors.",
      name: "Ahn DaQuin",
      portrait: "/DwarfKing.png",
    },
    {
      text: "We have never seen a shadow so dark in our halls.",
      name: "Ahn DaQuin",
      portrait: "/DwarfKing.png",
    },
    {
      text: "Will you help us Hero?",
      name: "Ahn DaQuin",
      portrait: "/DwarfKing.png",
      choices: [
        { label: "I am with you!", next: 5 },
        { label: "I do not yet trust you.", next: 5 },
      ],
    },
    { text: "Prepare for battle!", name: "Hero", portrait: "/HeroIcon.png" },
  ];

  return (
    <DialogRoom
      dialogue={dialogue}
      background="/Dvashold.png"
      onComplete={() => navigate("/Dvasheld")}
    />
  );
}

export default CounselRoom;
