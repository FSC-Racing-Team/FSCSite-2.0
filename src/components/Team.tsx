// designed by alongio
import type { ReactElement } from "react";
import ScrollVelocity from "./ScrollVelocity";

export default function Team(): ReactElement {
  return (
    <section id="teamPage" className="teamV3" aria-label="Sezione Team">
      {/* Contenuto principale: Title, lead paragraph, stat */}
      <div className="teamV3Inner">
        <h2 className="teamV3Title">CHI SIAMO</h2>

        <p className="teamV3Lead">
          FSC Racing è un team di corse gestito da studenti situato presso l'Università di Catania. Il team è composto da un gruppo eterogeneo di ragazze e ragazzi, che cercano di portare la propria istruzione fuori dalle aule universitarie e nel mondo reale.
        </p>

        <div className="teamV3Stat">
          <div className="teamV3StatNumber">40+</div>
          <div className="teamV3StatSub">Membri attivi provenienti da diverse facoltà</div>
        </div>
      </div>

      {/* Marquee a limite sezione (preservata) */}
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