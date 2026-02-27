// designed by alongio
import React from "react";
import Threads from "./Threads";
import BlurText from "./BlurText";
import ScrollVelocity from "./ScrollVelocity";
import useLowPerformanceMode from "../hooks/useLowPerformanceMode";

export default function Team(): React.ReactElement {
  const isLowPerformance = useLowPerformanceMode();

  return (
    <section id="teamPage" className="teamV3" aria-label="Sezione Team">
      {/* BG: Threads */}
      {!isLowPerformance ? (
        <div className="teamV3Bg" aria-hidden="true">
          <Threads
            color={[0.9, 0.95, 1]}
            amplitude={0.9}
            distance={0}
            enableMouseInteraction={false}
          />
          <div className="teamV3Vignette" />
        </div>
      ) : null}

      {/* Contenuto */}
      <div className="teamV3Inner">
        <BlurText
          text={`FSC Racing è il team Formula SAE dell’Università di Catania.\n
Progettiamo e realizziamo una vettura da competizione come esercizio di ingegneria applicata.\n
Un progetto universitario con standard competitivi.`}
          animateBy="words"
          direction="top"
          delay={140}
          className="teamV3Title"
        />
      </div>

      {/* Marquee a limite sezione */}
      <div className="teamV3Marquee" aria-hidden="true">
        <ScrollVelocity
          texts={["FSC RACING TEAM •", "FSC RACING TEAM •"]}
          velocity={55}
          className="teamV3MarqueeText"
        />
      </div>
    </section>
  );
}