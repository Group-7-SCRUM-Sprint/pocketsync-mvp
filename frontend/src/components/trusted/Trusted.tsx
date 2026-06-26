import "./Trusted.css";

import zenith from "../../assets/icons/zenith.png";
import gtbank from "../../assets/icons/gtbank.png";
import access from "../../assets/icons/AccessBank.png";
import firstbank from "../../assets/icons/FirstBank.png";
import fcmb from "../../assets/icons/Fcmb.png";
import fidelity from "../../assets/icons/Fidelity.png";

export default function Trusted() {
  return (
    <section className="trusted">

      <div className="trusted__container">

        <p className="trusted__label">
          Trusted by users across Nigeria
        </p>

        <div className="trusted__logos">

          <img src={zenith} alt="zenith" />
          <img src={gtbank} alt="gtbank" />
          <img src={access} alt="access" />
          <img src={firstbank} alt="firstbank" />
          <img src={fcmb} alt="fcmb" />
          <img src={fidelity} alt="fidelity" />

        </div>

      </div>

    </section>
  );
}