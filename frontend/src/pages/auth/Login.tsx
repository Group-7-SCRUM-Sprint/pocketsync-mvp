import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { accounts as mockAccounts, transactions as mockTransactions } from "../../data/mockData";

import "./Login.css";

import AuthCard from "../../components/auth/AuthCard/AuthCard";
import AuthHeader from "../../components/auth/AuthHeader/AuthHeader";

import Input from "../../components/common/Input/Input";
import PasswordInput from "../../components/common/PasswordInput/PasswordInput";
import Checkbox from "../../components/common/Checkbox/Checkbox";
import Button from "../../components/common/Button/Button";
import AuthFooter from "../../components/auth/AuthFooter/AuthFooter";


export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const newErrors = {
    email: "",
    password: "",
  };


  if (!email.trim()) {
    newErrors.email = "Email is required";
  }

  if (!password.trim()) {
    newErrors.password = "Password is required";
  }

  setErrors(newErrors);

  if (!newErrors.email && !newErrors.password) {
    // Ensure login loads or creates the user record but does NOT clear existing per-user data
    try {
      const stored = localStorage.getItem("ps_user");
      let userObj: { name: string; email: string } | null = null;
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.email === email) userObj = parsed;
        } catch {
          /* ignore malformed ps_user */
        }
      }

      if (!userObj) {
        const nameFromEmail = email.split("@")[0] || "";
        userObj = { name: nameFromEmail, email };
      }

      localStorage.setItem("ps_user", JSON.stringify(userObj));

      // If this user has no per-user accounts/transactions, seed with app mock data on login
      try {
        const accountsKey = `ps_accounts_${email || "guest"}`;
        const txKey = `ps_transactions_${email || "guest"}`;
        if (!localStorage.getItem(accountsKey)) {
          localStorage.setItem(accountsKey, JSON.stringify(mockAccounts || []));
        }
        if (!localStorage.getItem(txKey)) {
          localStorage.setItem(txKey, JSON.stringify(mockTransactions || []));
        }
      } catch {
        /* ignore storage errors */
      }
    } catch {
      /* ignore storage errors */
    }

    navigate("/dashboard");
  }
};

  return (
    <AuthCard>
      <AuthHeader
        title="Welcome Back"
        subtitle="Sign in to continue managing all your accounts securely."
      />

      <form
          className="login-form"
          onSubmit={handleSubmit}
        >

        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          error={errors.email}
        />

        

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          error={errors.password}
        />

        <div className="login-form__options">

          <Checkbox label="Remember me" />

          <Link
            to="/forgot-password"
            className="login-form__forgot"
          >
            Forgot Password?
          </Link>

        </div>

        <Button
          type="submit"
          className="login-form__button" >

          Login
        </Button>

      </form>

      <AuthFooter
        text="Don't have an account?"
        linkText="Create Account"
        to="/register"
      />
    </AuthCard>
  );
}