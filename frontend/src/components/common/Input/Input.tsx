import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({
  label,
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        {label}
      </label>

      <input
        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
        {...props}
      />
    </div>
  );
}