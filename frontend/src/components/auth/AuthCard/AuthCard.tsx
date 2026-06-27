import "./AuthCard.css";
import type { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <section className="auth-card">
      {children}
    </section>
  );
}