import "./Input.css";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="input-group">
      <label className="input-label">
        {label}
      </label>

      <input
        className={`input-field ${error ? "input-error" : ""} ${className}`}
        {...props}
      />

      {error && (
        <p className="input-error-text">
          {error}
        </p>
      )}
    </div>
  );
}