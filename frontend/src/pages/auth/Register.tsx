import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Register.css";

import AuthCard from "../../components/auth/AuthCard/AuthCard";
import AuthHeader from "../../components/auth/AuthHeader/AuthHeader";
import AuthFooter from "../../components/auth/AuthFooter/AuthFooter";

import Input from "../../components/common/Input/Input";
import PasswordInput from "../../components/common/PasswordInput/PasswordInput";
import Checkbox from "../../components/common/Checkbox/Checkbox";
import Button from "../../components/common/Button/Button";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Persist new user to localStorage so Dashboard shows an empty state tied to this user
    try {
      localStorage.setItem("ps_user", JSON.stringify({ name: name || "", email }));
      // ensure we clear any prior synced data for this new user
      const accountsKey = `ps_accounts_${email || "guest"}`;
      const txKey = `ps_transactions_${email || "guest"}`;
      localStorage.setItem(accountsKey, JSON.stringify([]));
      localStorage.setItem(txKey, JSON.stringify([]));
    } catch {}

    navigate("/register/success");
  };

  return (
    <AuthCard>
      <AuthHeader
        title="Create your account"
        subtitle="Get started by creating your PocketSync account."
      />

      <form className="register-form" onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          label="Password"
          placeholder="Create a password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          required
        />

        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          required
        />

        <Button
          type="submit"
          className="register-form__button"
        >
          Create Account
        </Button>
      </form>

      <AuthFooter
        text="Already have an account?"
        linkText="Sign In"
        to="/login"
      />
    </AuthCard>
  );
}