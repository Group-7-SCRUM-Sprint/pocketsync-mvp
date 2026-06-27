import { useNavigate } from "react-router-dom";
import "./Hero.css";
import dashboardImage from "../../assets/images/hero-dashboard.jpg";
import gtbankLogo from "../../assets/icons/gtbank.png";
import zenithLogo from "../../assets/icons/zenith.png";

import Button from "../common/Button/Button";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero__container">
        {/* Left Content */}
        <div className="hero__content">
          <span className="hero__badge">
            CBN LICENSED & SECURE
          </span>

            <h1 className="hero__title">
                All Your Accounts.
            <br />
                <span>One Secured Dashboard.</span>
            </h1>

          <p className="hero__description">
            Aggregate all your Nigerian bank accounts, Bills, and expenses into a single, high-velocity dashboard. 
          </p>

          <div className="hero__actions">
            <Button onClick={() => navigate("/register")}>Get Started</Button>

            <button className="hero__secondary-btn" onClick={() => navigate("/login")}>
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="hero__image">
            <img
                src={dashboardImage}
                alt="PocketSync Dashboard"
            />

            {/* Floating Card 1 */}
          <div className="floating-card floating-card--top">

            <img
              src={gtbankLogo}
              alt="GTBank"
            />

            <h4>GTBank Synced</h4>

          </div>

          {/* Floating Card 2 */}

          <div className="floating-card floating-card--bottom">

            <img
              src={zenithLogo}
              alt="Zenith"
            />

            <h4>Zenith Bank Synced</h4>

          </div>

        </div>
      </div>
    </section>
  );
}