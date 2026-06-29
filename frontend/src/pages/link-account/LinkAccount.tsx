import {useState} from "react";
import { useNavigate } from "react-router-dom";
import shieldIcon from "../../assets/icons/secure-lock.png";
import pagaLogo from "../../assets/icons/Paga.png";
import wemaLogo from "../../assets/icons/Wema.png";
import stabicLogo from "../../assets/icons/Stanbic.png";
import unionLogo from "../../assets/icons/Union.png"; 
import fidelityLogo from "../../assets/icons/Fidelity.png";
import gtbLogo from "../../assets/icons/gtbank.png";
import bar from "../../assets/icons/progressBar.png";
import logo from "../../assets/logo.svg";
import "./LinkAccount.css";

const ALL_BANKS = [
  {name:"GTBank", logo: gtbLogo },
  {name:"Fidelity", logo: fidelityLogo },
  {name:"Union Bank", logo: unionLogo },
  {name:"Stanbic-ibtc", logo: stabicLogo },
  {name:"Wema", logo: wemaLogo },
  {name:"Paga", logo: pagaLogo },
];
export default function LinkAccount() {
  const [search, setSearch]= useState("");
  const navigate = useNavigate();
  const handleBankSelect = (bankName: string, bankLogo:string) => {
  navigate("/accounts/Login", { state: { bankName, bankLogo} });
};

  /* filters banks when the user searches */
  const filteredBanks = ALL_BANKS.filter((bank) => bank.name.toLowerCase().includes(search.toLowerCase())
  );

  return(
   <div className="link-account">

    <div className="li-header">
       <img src={logo} alt="pocketsync" className="li-logo"/>
    </div>

    <div className="progress-bar">
        <img src={bar} alt="progress bar" />
    </div>

    <h1 className="li-title">Select Your Bank</h1>
    <p className="li-subtitle">Search for your bank or choose from the list</p>

    <input className="li-search" type="text" placeholder="Search for your bank"value={search} onChange={(e) => setSearch(e.target.value)} />

    <div className="li-banks">
      <p className="li-banks-labels">POPULAR BANKS</p>
      <div className="li-banks-grid">
          {filteredBanks.map((bank) => (
          <div key={bank.name} className="bank-card" onClick={() => handleBankSelect(bank.name, bank.logo)}>
            <img src={bank.logo} alt={bank.name}/>

            <div style={{flex:1}}>
              <span>{bank.name}</span>
              <p className="bank-cardsub">Tap to connect</p>
            </div>
            <span>›</span>
          </div>
          ))}
      </div>
    </div>

          <div className="li-security">
            <img src={shieldIcon} alt="secure" />
            <div>
              <p className="security-title">Your Data is Secure</p>
              <p className="security-text">Banking credentials are never stored. We use encrypted connections trusted by millions.</p>
            </div>
          </div>


   </div>
  );
}