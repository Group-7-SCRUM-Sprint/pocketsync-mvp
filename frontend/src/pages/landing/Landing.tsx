import "./Landing.css";

import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/hero/Hero";
import Trusted from "../../components/trusted/Trusted";

export default function Landing() {
  return (
    <>
      <Navbar />

      <main className="landing-page">
        <Hero />
        <Trusted />
      </main>
    </>
  );
}