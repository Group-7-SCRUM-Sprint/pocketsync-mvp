import { Link } from "react-router-dom";

import "./RegistrationSuccess.css";

import AuthCard from "../../components/auth/AuthCard/AuthCard";
import Button from "../../components/common/Button/Button";

import successIcon from "../../assets/icons/success.svg";

export default function RegistrationSuccess() {
  return (
    <AuthCard>

      <div className="success">

        <img
          src={successIcon}
          alt="Success"
          className="success__icon"
        />

        <h1 className="success__title">
          Welcome to <br /> PocketSync!
        </h1>

        <p className="success__description">
          Your account has been created successfully.
          You're ready to start managing all your bank
          accounts from one secure dashboard.
        </p>

        <div className="success__actions">

          <Link to="/dashboard">
            <Button className="success__button">
              Go to Dashboard
            </Button>
          </Link>

          {/* <Link to="/accounts/link">
            <Button
              variant="outline"
              className="success__button"
            >
              Link Bank Account
            </Button>
          </Link> */}
          <Link
            to="/accounts/link"
            state={{ openWizard: true }}
          >
            <Button
              variant="outline"
              className="success__button"
            >
              Link Bank Account
            </Button>
          </Link>

        </div>

      </div>

    </AuthCard>
  );
}