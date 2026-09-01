import { Hero } from "@/components/home/Hero";
import { StartHereSection } from "@/components/home/StartHereSection";
import { VerseReveal } from "@/components/home/VerseReveal";
import { EventsStrip } from "@/components/home/EventsStrip";
import {
  CACSection,
  JenniferSection,
  ServicesSection,
  FirstVisitSection,
  TestimonialsSection,
  ClosingCTA,
} from "@/components/home/Sections";

/**
 * The order a frightened parent needs it in:
 * who we are → where do I start → can I trust you → what do you offer →
 * what do you believe → what will it be like → what can I join →
 * who else came here → call us.
 *
 * The mission, values and ABA explainer deliberately live on /about and /aba
 * rather than here; the homepage's job is to get someone to the right door.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <StartHereSection />
      <CACSection />
      <JenniferSection />
      <ServicesSection />
      <VerseReveal />
      <FirstVisitSection />
      <EventsStrip />
      <TestimonialsSection />
      <ClosingCTA />
    </>
  );
}
