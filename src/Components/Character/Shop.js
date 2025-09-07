import React from "react";
import { useState, useEffect } from "react";
import "../Character/Character.css";

function Shop() {
  const [helm, setHelm] = useState("");
  const [armor, setArmor] = useState("");
  const [accessory, setAccessory] = useState("");

  //helms
  const handleFeatheredCap = () => {
    const featheredcap = "Feathered Cap";
    setHelm(featheredcap);
    localStorage.setItem("headgear", featheredcap);
    alert("Added Helm");
  };

  const handleHeavyHelm = () => {
    const heavyhelm = "Heavy Helm";
    setHelm(heavyhelm);
    localStorage.setItem("headgear", heavyhelm);
    alert("Added helm");
  };

  //armor
  const handleStuddedLeather = () => {
    const studdedLeather = "Studded Leather";
    setArmor(studdedLeather);
    localStorage.setItem("mail", studdedLeather);
    alert("Added Armor");
  };

  const handlePlateMail = () => {
    const plateMail = "Plate Mail";
    setArmor(plateMail);
    localStorage.setItem("mail", plateMail);
    alert("Added Armor");
  };

  //accessories
  const handleIoniaSpellbook = () => {
    const ioniaSpellBook = "Ionia Spellbook";
    setAccessory(ioniaSpellBook);
    localStorage.setItem("accessory", ioniaSpellBook);
    alert("Added Accessory");
  };

  const handleRobustSheild = () => {
    const robustSheild = "Robust Sheild";
    setAccessory(robustSheild);
    localStorage.setItem("accessory", robustSheild);
    alert("Added Accessory");
  };

  const handlePaladinBanner = () => {
    const paladinBanner = "Coat of Arms";
    setAccessory(paladinBanner);
    localStorage.setItem("accessory", paladinBanner);
    alert("Added Accessory");
  };

  const handleSableimAmulet = () => {
    const sableimAmulet = "Sableim Amulet";
    setAccessory(sableimAmulet);
    localStorage.setItem("accessory", sableimAmulet);
    alert("Added Accessory");
  };

  const handleHermesBracer = () => {
    const hermesBracer = "Hermes Bracer";
    setAccessory(hermesBracer);
    localStorage.setItem("accessory", hermesBracer);
    alert("Added Accessory");
  };
  console.log(helm, accessory, armor);

  return (
    <div id="shopdiv">
      <span>
        <div id="helms">
          <div className="shoplist">
            <label>Helms</label>
            <ul>
              <li className="shopitems">
                <button className="shopbutton" onClick={handleFeatheredCap}>
                  Feathered Cap ---- SPD +4
                </button>
              </li>
              <li className="shopitems">
                <button className="shopbutton" onClick={handleHeavyHelm}>
                  Heavy Helm --- SPD -2/DEF +2
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div id="armor" className="shoplist">
          Armor
          <ul>
            <li className="shopitems">
              <button className="shopbutton" onClick={handleStuddedLeather}>
                Studded Leatbers --- SPD +1/DEF +1
              </button>
            </li>
            <li className="shopitems">
              <button className="shopbutton" onClick={handlePlateMail}>
                Plate Mail --- SPD -4/DEF +2/HP +4
              </button>
            </li>
          </ul>
        </div>
      </span>

      <div id="Accessories" className="shoplist">
        Accessories
        <ul>
          <li className="shopitems">
            <button className="shopbutton" onClick={handleIoniaSpellbook}>
              Ionia Spellbook --- INT +3/DEF -1
            </button>
          </li>
          <li className="shopitems">
            <button className="shopbutton" onClick={handleRobustSheild}>
              Robust Sheild --- DEF +3/SPD -1
            </button>
          </li>
          <li className="shopitems">
            <button className="shopbutton" onClick={handlePaladinBanner}>
              Coat of Arms --- STR +2/HP +1
            </button>
          </li>
          <li className="shopitems">
            <button className="shopbutton" onClick={handleSableimAmulet}>
              Sableim Amulet --- HP +5
            </button>
          </li>
          <li className="shopitems">
            <button className="shopbutton" onClick={handleHermesBracer}>
              Hermes Bracer --- SPD +3/DEF +2/HP -3
            </button>
          </li>
        </ul>
      </div>
      <p id="VSTitle">Velonia Shoppe</p>
    </div>
  );
}
export default Shop;
