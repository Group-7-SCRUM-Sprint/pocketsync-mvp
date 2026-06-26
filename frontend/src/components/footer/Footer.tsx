import "./Footer.css";

import { Link } from "react-router-dom";

import logo from "../../assets/logo.svg";

import {
  Globe,
  Smartphone,
  AtSign,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer__container">

        <div className="footer__top">

          {/* Left */}

          <div className="footer__brand">

            <img
              src={logo}
              alt="PocketSync"
              className="footer__logo"
            />

            <p className="footer__description">
              Precision financial infrastructure for the modern African entrepreneur.
              Licensed and regulated by the Central Bank of Nigeria.
            </p>

          </div>

          {/* Right */}

          <div className="footer__links">

            <div className="footer__column">

              <h4>Product</h4>

              <Link to="/">Dashboard</Link>
              <Link to="/">Security</Link>
              <Link to="/">API Docs</Link>

            </div>

            <div className="footer__column">

              <h4>Company</h4>

              <Link to="/">About Us</Link>
              <Link to="/">Careers</Link>
              <Link to="/">Contact</Link>

            </div>

            <div className="footer__column">

              <h4>Legal</h4>

              <Link to="/">Privacy</Link>
              <Link to="/">Terms</Link>
              <Link to="/">Disclosures</Link>

            </div>

          </div>

        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">

          <p>
            © 2024 PocketSync. All rights reserved.
          </p>

          <div className="footer__social">

            <a href="#">
              <Globe size={18} />
            </a>

            <a href="#">
              <Smartphone size={18} />
            </a>

            <a href="#">
              <AtSign size={18} />
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}