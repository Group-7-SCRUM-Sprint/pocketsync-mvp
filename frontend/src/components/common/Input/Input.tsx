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
    <div className="input">

      <label className="input__label">
        {label}
      </label>

      <input
        className={`input__field ${className}`}
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