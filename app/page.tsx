import Preloader from "@/components/home/Preloader";
import HeroEntrance from "@/components/home/HeroEntrance";
import Manifesto from "@/components/home/Manifesto";
import ClubTour from "@/components/home/ClubTour";
import FullThrottle from "@/components/home/FullThrottle";
import StudiosList from "@/components/home/StudiosList";
import DayAtWays from "@/components/home/DayAtWays";
import LocalSection from "@/components/home/LocalSection";
import Founders from "@/components/Founders";
import Plans from "@/components/Plans";
import FinalCta from "@/components/FinalCta";
import { clubSchema, faqSchema, homeFaq } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([clubSchema, faqSchema(homeFaq)]) }}
      />
      <Preloader />
      <main id="contenu">
        <HeroEntrance />
        <Manifesto />
        <ClubTour />
        <FullThrottle />
        <StudiosList />
        <DayAtWays />
        <Founders />
        <Plans />
        <LocalSection />
        <FinalCta />
      </main>
    </>
  );
}
