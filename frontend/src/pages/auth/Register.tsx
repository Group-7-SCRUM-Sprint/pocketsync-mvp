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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Replace with actual registration API call
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
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          required
        />

        <PasswordInput
          label="Password"
          placeholder="Create a password"
          required
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