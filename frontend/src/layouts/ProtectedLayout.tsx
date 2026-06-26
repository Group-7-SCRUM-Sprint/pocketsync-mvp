import { Outlet } from "react-router-dom";
import "./ProtectedLayout.css";

export default function ProtectedLayout() {
  return (
    <main className="protected-layout">
      <Outlet />
    </main>
  );
}