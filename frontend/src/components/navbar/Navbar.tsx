import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.svg";

import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <img
            src={logo}
            alt="PocketSync"
            className="navbar__logo-image"
          />
        </Link>

        {/* Navigation */}
        <nav className={`navbar__links ${isOpen ? "active" : ""}`}>
          <Link to="/">Home</Link>

          <Link to="/">Accounts</Link>

          <Link to="/">Security</Link>

          <Link to="/login" className="navbar__button">
            Login
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="navbar__toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>
      </div>
    </header>
  );
}