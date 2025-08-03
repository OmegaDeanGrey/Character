import React from "react";
import "./Battle.css";
import { Link } from "react-router-dom";

function BattleHome() {
  return (
    <div id="BattleHomeOut">
      <div id="bannerhomevelonia"></div>
      <h1 id="BattleHomeTitle">Velonia</h1>
      <div>
        <div>.</div> <div>.</div>
        <div>
          <Link to="/Bressone" id="Bressone">
            Bressone
          </Link>
          <div>
            <Link to="/Dvasheld" id="Dvasheld">
              Dvasheld
            </Link>
          </div>
        </div>{" "}
        <div>.</div>
        <div>.</div> <div>.</div> <div>.</div>
        <Link to="/Sableheim" id="Sableheim">
          Sableheim
        </Link>
      </div>
      <div>.</div>
      <div>.</div>
      <div>.</div>
      <div>.</div>
      <div>.</div>
      <div>.</div>
      <div>.</div>
      <div>.</div>
      <div>.</div>
      <div>.</div> <div>.</div> <div>.</div>
      <div>
        <Link to="/WesternWood" id="WesternWood">
          WesternWood
        </Link>
      </div>
    </div>
  );
}
export default BattleHome;
