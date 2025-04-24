import Benefits from "@/components/landing/organisms/Benefits";
import Demo from "@/components/landing/organisms/Demo";
import Features from "@/components/landing/organisms/Features";
import Footer from "@/components/landing/organisms/Footer";
import Hero from "@/components/landing/organisms/Hero";
import Navbar from "@/components/landing/organisms/Navbar";

export default function LandingTemplate() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      <Benefits />
      <Demo />
      {/* <CTA /> */}
      <Footer />
    </div>
  );
}
