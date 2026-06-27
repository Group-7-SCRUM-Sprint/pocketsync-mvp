import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./PasswordInput.css";

import type { InputHTMLAttributes } from "react";

interface PasswordInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export default function PasswordInput({
  label,
  error,
  required,
  className = "",
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-input">

      <label className="password-input__label">
        {label}

        {required && (
          <span className="password-input__required">*</span>
        )}
      </label>

      <div className="password-input__wrapper">

        <input
          type={showPassword ? "text" : "password"}
          className={`password-input__field ${
            error ? "password-input__field--error" : ""
          } ${className}`}
          {...props}
        />

        <button
          type="button"
          className="password-input__toggle"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>

      </div>

      {error && (
        <span className="password-input__error">
          {error}
        </span>
      )}

    </div>
  );
}