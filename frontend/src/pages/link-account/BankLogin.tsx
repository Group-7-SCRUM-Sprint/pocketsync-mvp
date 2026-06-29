import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo.svg";
import bar from "../../assets/icons/progressBar.png";
import shieldIcon from "../../assets/icons/secure-lock.png";
import "./BankLogin.css";

export default function BankLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const bankName = location.state?.bankName || "Your Bank";
  const bankLogo = location.state?.bankLogo || null;

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    bvn: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showBvn, setShowBvn] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    navigate("/accounts/permissions", { state: { bankName } });
  };

    return (
  <div className="bank-login">

    <div className="banklogin-header">
      <button onClick={() => navigate(-1)}>←</button>
      <img src={logo} alt="PocketSync" className="banklogin-logo" />
    </div>

   <div className="progressbar-login">
        <img src={bar} alt="progress bar" />
    </div>

    {bankLogo && (
  <div className="bank-login__bank-icon">
    <img src={bankLogo} alt={bankName} />
  </div>
    )}

    <h1 className="banklogin-title">Add {bankName}</h1>
    <p className="banklogin-subtitle">Search for your bank or choose from the list</p>


    <label className="banklogin-label">USERNAME</label>
    <input className="bankLogin-input" type="text" name="username" placeholder="Enter Username" value={formData.username} onChange={handleChange} />

    <label className="banklogin-label">PASSWORD</label>
    <div className="bankLogin-input-wrapper">
      <input className="bankLogin-input" type={showPassword ? "text" : "password"} name="password" placeholder="Enter your account password" value={formData.password} onChange={handleChange} />
      <button className="bankLogin-eye" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>

    <label className="banklogin-label">BVN</label>
    <div className="bankLogin-input-wrapper">
      <input className="bankLogin-input" type={showBvn ? "text" : "password"} name="bvn" placeholder="Enter your 11 digit pin" value={formData.bvn} onChange={handleChange} />
      <button className="bankLogin-eye" onClick={() => setShowBvn(!showBvn)}>
        {showBvn ? "Hide" : "Show"}
      </button>
    </div>

    <div className="bankLogin-security">
            <img src={shieldIcon} alt="secure" />
            <div>
              <p className="security-title">Your Data is Secure</p>
              <p className="security-text">Banking credentials are never stored. We use encrypted connections trusted by millions.</p>
            </div>
    </div>

        <div className="bankLogin-buttons">
             <button className="bankLogin-cancel" onClick={() => navigate(-1)}>Cancel</button>
             <button className="bankLogin-continue" onClick={handleContinue}>Continue</button>
         </div>

  </div>
);
}
