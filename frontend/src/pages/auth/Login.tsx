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
  return (
    <AuthCard>
      <AuthHeader
        title="Welcome Back"
        subtitle="Sign in to continue managing all your accounts securely."
      />

      <form className="login-form">

        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
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

        <Button className="login-form__button">
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