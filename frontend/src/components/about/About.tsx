import "./About.css";
import modal from "../../assets/images/modal01.png";
import gtbankLogo from "../../assets/icons/gtbank.png";
import zenithLogo from "../../assets/icons/zenith.png";

import Button from "../common/Button/Button";

export default function About() {
  return (
    <section className="about">
      <div className="about__container">
        {/* Left Image */}
        <div className="about__image">
            <img
                src={modal}
                alt="PocketSync Modal"
            />

            {/* Floating Card 1 */}
         <div className="about-card about-card--top">

            <img
              src={gtbankLogo}
              alt="GTBank"
            />

            <h4>GTBank Synced</h4>

          </div>

          {/* Floating Card 2 */}

          <div className="about-card about-card--bottom">

            <img
              src={zenithLogo}
              alt="Zenith"
            />

            <h4>Zenith Bank Synced</h4>

          </div>

        </div>


        {/* Right Content */}
        <div className="about__content">

            <h2 className="about__title">
                About Pocketsync
            </h2>

          <p className="about__description">
            Aggregate all your Nigerian bank accounts, Bills, and expenses into a single, high-velocity dashboard. 
          </p>

          <div className="about__actions">
            <Button>Get Started</Button>

            <button className="about__secondary-btn">
              Learn More
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}