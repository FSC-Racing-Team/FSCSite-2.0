// designed by alongio
import { useEffect, useRef, useState, type ReactElement } from "react";
import { useInView } from "../hooks/useInView";

export default function Team(): ReactElement {
  const statRef = useRef<HTMLDivElement>(null);
  const statInView = useInView(statRef, { threshold: 0.5 });
  const [memberCount, setMemberCount] = useState(0);

  useEffect(() => {
    if (!statInView || memberCount === 40) return;

    const startTime = performance.now();
    const duration = 1200;
    let animationFrame = 0;

    const animateCount = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setMemberCount(Math.round(progress * 40));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateCount);
      }
    };

    animationFrame = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [statInView]);

  return (
    <section id="teamPage" className="teamV3" aria-label="Sezione Team">
      {/* Contenuto principale: Title, lead paragraph, stat */}
      <div className="teamV3Inner">
        <h2 className="teamV3Title">CHI SIAMO</h2>

        <p className="teamV3Lead">
          FSC Racing è un team di corse gestito da studenti situato presso l'Università di Catania. Il team è composto da un gruppo eterogeneo di ragazze e ragazzi, che cercano di portare la propria istruzione fuori dalle aule universitarie e nel mondo reale.
        </p>

        <div className="teamV3Stat" ref={statRef}>
          <div className="teamV3StatNumber" aria-label={`${memberCount} membri`}>{memberCount}+</div>
          <div className="teamV3StatSub">Membri attivi provenienti da diverse facoltà</div>
        </div>
      </div>

    </section>
  );
}