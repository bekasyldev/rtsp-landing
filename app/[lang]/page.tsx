import { notFound } from 'next/navigation';
import { getDictionary, hasLocale } from './dictionaries';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import DemoStream from '../components/DemoStream';
import ProblemSolution from '../components/ProblemSolution';
import Onboarding from '../components/Onboarding';
import Features from '../components/Features';
import PricingPreview from '../components/PricingPreview';
import Faq from '../components/Faq';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default async function Page({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <Nav dict={dict.nav} lang={lang} />
      <Hero dict={dict.hero} />
      <main>
        <DemoStream dict={dict.demo} />
        <ProblemSolution dict={dict.problemSolution} />
        <Onboarding dict={dict.onboarding} />
        <Features dict={dict.features} />
        <PricingPreview dict={dict.pricing} />
        <Faq dict={dict.faq} />
        <Contact dict={dict.contact} />
      </main>
      <Footer dict={dict.footer} nav={dict.nav} />
    </>
  );
}
