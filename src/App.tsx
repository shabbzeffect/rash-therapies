import { About, Services, Stats } from "./components/About";
import { Approach, Speaking } from "./components/Approach";
import { Booking } from "./components/Booking";
import { Navbar, TopBar } from "./components/Chrome";
import { CircleAndJournal, Stories } from "./components/Content";
import { FeesFaq } from "./components/FeesFaq";
import { FloatingActions, Footer, Toaster } from "./components/Footer";
import { FeaturedStrip, Hero } from "./components/Hero";

export default function App() {
  return (
    <div className="min-h-dvh bg-ivory">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-forest focus:px-5 focus:py-2.5 focus:text-[13px] focus:font-bold focus:text-ivory"
      >
        Skip to content
      </a>
      <TopBar />
      <Navbar />
      <main id="main">
        <Hero />
        <FeaturedStrip />
        <About />
        <Stats />
        <Services />
        <Approach />
        <Speaking />
        <Stories />
        <CircleAndJournal />
        <FeesFaq />
        <Booking />
      </main>
      <Footer />
      <FloatingActions />
      <Toaster />
    </div>
  );
}
