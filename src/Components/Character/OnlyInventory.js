import React from "react";
import Inventory from "./Inventory";
import { useNavigate } from "react-router-dom";

function OnlyInventory() {
  const navigate = useNavigate();

  return (
    <div id="OIOut">
      <div id="invcase">
        <Inventory />
        <div id="AdjTotalsTitle">
          Adjustment Totals:
          <button id="inventgoback" onClick={() => navigate("/Bressone")}>
            Back to Bressone
          </button>
        </div>
      </div>
    </div>
  );
}
export default OnlyInventory;
