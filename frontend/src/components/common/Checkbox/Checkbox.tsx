import "./Checkbox.css";
import type { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Checkbox({
  label,
  className = "",
  ...props
}: CheckboxProps) {
  return (
    <label className={`checkbox ${className}`}>

      <input
        type="checkbox"
        className="checkbox__input"
        {...props}
      />

      <span className="checkbox__custom" />

      <span className="checkbox__label">
        {label}
      </span>

    </label>
  );
}