import { useEffect } from "react";
import GarageDoorEngine from "./GarageDoorEngine";
import FscFooter from "./FscFooter";
import BackgroundFX from "./BackgroundFX";
import PageDrawerMenu from "./PageDrawerMenu";
import useLowPerformanceMode from "../hooks/useLowPerformanceMode";

interface GaragePageProps {
  onNavigate: (page: string) => void;
}

export default function GaragePage({ onNavigate }: GaragePageProps) {
  const isLowPerformance = useLowPerformanceMode();

  useEffect(() => {
    document.documentElement.classList.add("garage-page-active");
    document.body.classList.add("garage-page-active");

    window.scrollTo(0, 0);

    return () => {
      document.documentElement.classList.remove("garage-page-active");
      document.body.classList.remove("garage-page-active");
    };
  }, []);

  return (
    <>
      <BackgroundFX lite={isLowPerformance} />

      <main>
        <PageDrawerMenu onNavigate={onNavigate} currentSection="garage" />

        {!isLowPerformance ? <GarageDoorEngine modelUrl="/car.glb" /> : null}

        <FscFooter />
      </main>
    </>
  );
}
