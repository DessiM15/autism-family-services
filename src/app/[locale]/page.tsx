import { Hero } from "@/components/home/Hero";
import {
  VerseSection,
  MissionSection,
  CACSection,
  JenniferSection,
  ServicesSection,
  AbaSection,
  ValuesSection,
  FirstVisitSection,
  TestimonialsSection,
  ClosingCTA,
} from "@/components/home/Sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MissionSection />
      <VerseSection />
      <CACSection />
      <JenniferSection />
      <ServicesSection />
      <AbaSection />
      <ValuesSection />
      <FirstVisitSection />
      <TestimonialsSection />
      <ClosingCTA />
    </>
  );
}
