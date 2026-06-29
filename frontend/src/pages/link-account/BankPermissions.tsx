import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import bar from "../../assets/icons/progressBar.png";
import shieldIcon from "../../assets/icons/secure-lock.png";
import "./BankPermission.css"

export default function BankPermissions() {
  const location = useLocation();
  const navigate = useNavigate();
  const bankName = location.state?.bankName || "Your Bank";

  const handleAllow = () => {
    
    console.log("Access allowed for:", bankName);
  };

  return (
    <div className="permissions">

      <div className="permissions-header">
        <button onClick={() => navigate(-1)}>←</button>
        <img src={logo} alt="PocketSync" className="permissions-logo" />
      </div>

      <div className="permission-progressbar">
        <img src={bar} alt="progress bar" />
    </div>

      <p className="permissions-title">
        Pocketsync would like to access your bank details
      </p>

      <div className="permissions-list">
        <div className="permissions-item">
          <span>🏦</span>
          <div>
            <p className="permissions-item-title">Account balances</p>
            <p className="permissions-item-sub">View your account balances</p>
          </div>
        </div>
        <div className="permissions-item">
          <span>📋</span>
          <div>
            <p className="permissions-item-title">Transaction History</p>
            <p className="permissions-item-sub">View recent transactions</p>
          </div>
        </div>
        <div className="permissions-item">
          <span>👤</span>
          <div>
            <p className="permissions-item-title">Account Identity</p>
            <p className="permissions-item-sub">Verify your account identity</p>
          </div>
        </div>
      </div>

      <div className="permissions-security">
            <img src={shieldIcon} alt="secure" />
            <div>
              <p className="security-title">Your Data is Secure</p>
              <p className="security-text">Banking credentials are never stored. We use encrypted connections trusted by millions.</p>
            </div>
    </div>

      <div className="permissions-buttons">
        <button className="permissions-cancel" onClick={() => navigate(-1)}>Cancel</button>
        <button className="permissions-allow" onClick={handleAllow}>Allow</button>
      </div>

    </div>
  );
}