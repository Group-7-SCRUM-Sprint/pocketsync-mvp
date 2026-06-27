import { Link } from "react-router-dom";
import "./AuthFooter.css";

interface AuthFooterProps {
  text: string;
  linkText: string;
  to: string;
}

export default function AuthFooter({
  text,
  linkText,
  to,
}: AuthFooterProps) {
  return (
    <div className="auth-footer">
      <p>
        {text}{" "}
        <Link to={to}>
          {linkText}
        </Link>
      </p>
    </div>
  );
}