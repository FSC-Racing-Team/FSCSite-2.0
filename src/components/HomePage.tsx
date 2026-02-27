// designed by alongio
import { useEffect, useState } from "react";
import LoaderOverlay from "./LoaderOverlay";
import HeroPage from "./Hero";
import TeamPage from "./Team";
import GarageDoorEngine from "./GarageDoorEngine";
import ThreePanels from "./GarageStage";
import FscFooter from "./FscFooter";
import ContactGate from "./Contacts";
import useLowPerformanceMode from "../hooks/useLowPerformanceMode";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [booted, setBooted] = useState(false);
  const isLowPerformance = useLowPerformanceMode();

  useEffect(() => {
    window.scrollTo(0, 0);

    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue("--fakeLoad")
      .trim();
    const fakeLoad = Number.parseInt(raw || "1000", 10);

    const t = window.setTimeout(() => setBooted(true), Number.isFinite(fakeLoad) ? fakeLoad : 1000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      <LoaderOverlay off={booted} />
      {!isLowPerformance ? <div className="bg" /> : null}
      {!isLowPerformance ? <div className="grain" /> : null}

      <main>
        <HeroPage booted={booted} />
        <TeamPage />
        <ThreePanels onNavigate={onNavigate} />

        {!isLowPerformance ? <GarageDoorEngine modelUrl="/car.glb" /> : null}
        <ContactGate />
        <FscFooter />
      </main>
    </>
  );
}
