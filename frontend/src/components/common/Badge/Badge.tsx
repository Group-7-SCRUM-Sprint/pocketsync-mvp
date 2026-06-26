import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
}

export default function Badge({
  children,
}: BadgeProps) {
  return (
    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
      {children}
    </span>
  );
}