import { useState } from "react";
import { Link } from "react-router-dom";

import "./Login.css";

import AuthCard from "../../components/auth/AuthCard/AuthCard";
import AuthHeader from "../../components/auth/AuthHeader/AuthHeader";

import Input from "../../components/common/Input/Input";
import PasswordInput from "../../components/common/PasswordInput/PasswordInput";
import Checkbox from "../../components/common/Checkbox/Checkbox";
import Button from "../../components/common/Button/Button";
import AuthFooter from "../../components/auth/AuthFooter/AuthFooter";


export default function Login() {

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
    console.log("Login successful");
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