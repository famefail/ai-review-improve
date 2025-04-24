import Navbar from '@/components/landing/organisms/Navbar';
import Hero from '@/components/landing/organisms/Hero';
import Features from '@/components/landing/organisms/Features';
import Benefits from '@/components/landing/organisms/Benefits';
import Demo from '@/components/landing/organisms/Demo';
import Footer from '@/components/landing/organisms/Footer';

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