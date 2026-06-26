import "./Landing.css";

import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/hero/Hero";

export default function Landing() {
  return (
    <>
      <Navbar />

      <main className="landing-page">
        <Hero />
      </main>
    </>
  );
}