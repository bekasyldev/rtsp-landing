import Nav from "./components/Nav";
import Hero from "./components/Hero";
import DemoStream from "./components/DemoStream";
import ProblemSolution from "./components/ProblemSolution";
import Onboarding from "./components/Onboarding";
import Features from "./components/Features";
import PricingPreview from "./components/PricingPreview";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      <main>
        <DemoStream />
        <ProblemSolution />
        <Onboarding />
        <Features />
        <PricingPreview />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
