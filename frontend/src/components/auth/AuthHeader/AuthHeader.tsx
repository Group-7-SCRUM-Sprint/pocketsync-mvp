import "./AuthHeader.css";
import logo from "../../../assets/logo.svg";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({
  title,
  subtitle,
}: AuthHeaderProps) {
  return (
    <div className="auth-header">

      <img
        src={logo}
        alt="PocketSync"
        className="auth-header__logo"
      />

      <h1 className="auth-header__title">
        {title}
      </h1>

      <p className="auth-header__subtitle">
        {subtitle}
      </p>

    </div>
  );
}