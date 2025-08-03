import React from "react";
import Character from "./Character";
import Inventory from "./Inventory";
import "../../TeamMates/TeamMates.css";
import { useNavigate } from "react-router-dom";

function OnlyCharacter() {
  const navigate = useNavigate();
  return (
    <>
      <div id="OnlyOut">
        <Character />

        <div id="heroitemsdiv">
          <Inventory />
        </div>
      </div>
    </>
  );
}
export default OnlyCharacter;
