import "./Landing.css";

import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/hero/Hero";
import Trusted from "../../components/trusted/Trusted";
import About from "../../components/about/About";
import Features from "../../components/features/Features";
import CTA from "../../components/cta/CTA";


export default function Landing() {
  return (
    <>
      <Navbar />

      <main className="landing-page">
        <Hero />
        <Trusted />
        <About />
        <Features />
        <CTA />
      </main>
    </>
  );
}