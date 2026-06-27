import "./Input.css";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export default function Input({
  label,
  error,
  required,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="input">
      <label className="input__label">
        {label}

        {required && (
          <span className="input__required">*</span>
        )}
      </label>

      <input
        className={`input__field ${
          error ? "input__field--error" : ""
        } ${className}`}
        {...props}
      />

      {error && (
        <span className="input__error">
          {error}
        </span>
      )}
    </div>
  );
}