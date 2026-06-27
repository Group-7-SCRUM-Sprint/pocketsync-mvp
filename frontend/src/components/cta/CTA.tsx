import { useNavigate } from "react-router-dom";
import "./CTA.css";

import Button from "../../components/common/Button/Button";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="cta">
      <div className="cta__container">

        <h2 className="cta__title">
          Ready to Take Absolute Control?
        </h2>

        <p className="cta__description">
          Join the next generation of Nigerian entrepreneurs who are building
          wealth through data-driven financial management.
        </p>

        <div className="cta__actions">
          <Button onClick={() => navigate("/register")}>
            Create Your Account
          </Button>

          <button className="cta__secondary-btn" onClick={() => navigate("/register")}>
            Speak to an Advisor
          </button>
        </div>

      </div>
    </section>
  );
}