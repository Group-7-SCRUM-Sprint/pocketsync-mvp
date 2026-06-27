import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import "./PasswordInput.css";

import type { InputHTMLAttributes } from "react";

interface PasswordInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface PasswordInputProps {
  label: string;
  placeholder?: string;
  name?: string;
}

export default function PasswordInput({
  label,
  placeholder,
  name,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-input">

      <label className="password-input__label">
        {label}
      </label>

      <div className="password-input__wrapper">

        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          name={name}
          className="password-input__field"
        />

        <button
          type="button"
          className="password-input__toggle"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>

      </div>

    </div>
  );
}