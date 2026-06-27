import { Outlet } from "react-router-dom";
import "./AuthLayout.css";

export default function AuthLayout() {
  return (
    <main className="auth-layout">
      <div className="auth-layout__container">
        <Outlet />
      </div>
    </main>
  );
}