import {useState} from "react";
import shieldIcon from "../../assets/icons/secure-lock.png";

const ALL_BANKS = [
  "GTBank", "Opay", "Access Bank", "Palmpay", "UBA", "Kuda Bank", "First Bank", "Moniepoint",
];
export default function LinkAccount() {
  const [search, setSearch]= useState("");

  /* filters banks when the user searches */
  const filteredBanks = ALL_BANKS.filter((bank) => bank.toLowerCase().includes(search.toLowerCase())
  );

  return(
   <div className="link-account">

    <div className="li-header">
        <button onClick={()=> window.history.back()}>←</button>
    </div>

    <h1 className="li-title">Select Your Bank</h1>
    <p className="li-subtitile">Search For Your Bank Here</p>

    <input className="li-search" type="text" placeholder="Search for your bank" value={search} onChange={(e) => setSearch(e.target.value)} />

    <p>{filteredBanks.length} banks found</p>

    <div className="li-banks">
      <p className="li-banks-labels">POPULAR BANKS</p>
      <div className="li-banks-grid">
          {filteredBanks.map((bank) => (
          <div key={bank} className="bank-card">
            <span>{bank}</span>
            <span className="bank-cardsub">Tap to connect</span>
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