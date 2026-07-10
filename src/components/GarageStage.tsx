// designed by alongio
import { useEffect, useState } from "react";

type Accent = "cyan" | "red" | "mgmt";

type DepartmentBranch = {
  label: string;
  href: string;
};

interface ThreePanelsProps {
  onNavigate: (page: string) => void;
}

const departmentBranches: Record<number, DepartmentBranch[]> = {
  0: [
    { label: "High Voltage", href: "#electric" },
    { label: "Low Voltage", href: "#electric" },
  ],
  1: [
    { label: "Vehicle Dynamics", href: "#mech" },
    { label: "Mechanical Design", href: "#mech" },
    { label: "Aerodynamics", href: "#mech" },
  ],
  2: [
    { label: "Strategy & Ops", href: "#management" },
    { label: "Marketing & Communication", href: "#management" },
  ],
};

export default function ThreePanels({ onNavigate: _onNavigate }: ThreePanelsProps) {
  const [active, setActive] = useState<number>(1); // default: Meccanica
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsOn(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const onKey =
    (idx: number) =>
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === "Enter") {
        setActive(idx);
      }
    };

  return (
    <section className="tpSection" aria-label="3 panels" id="team">
      {/* ambient SOLO dentro la sezione (non fixed) */}
      <div className="tpAmbient" aria-hidden="true" />

      <div className="tpTopBar">
        <h2 className="tpTopTitle">il team</h2>
      </div>

      <div className={`tpGrid ${isOn ? "tpOn" : ""}`}>
        {/* 1) ELETTRICA */}
        <section
          className={`tpPanel ${active === 0 ? "tpActive" : ""}`}
          style={{ ["--i" as any]: 0 }}
          data-accent={"cyan" satisfies Accent}
          data-panel="electric"
          tabIndex={0}
          aria-label="Elettrica"
          onMouseEnter={() => setActive(0)}
          onFocus={() => setActive(0)}
          onClick={() => setActive(0)}
          onKeyDown={onKey(0)}
        >
          <div className="tpContent tpElectricPanel">
            <div className="tpElectricDefault">
              <div className="tpIcon" aria-hidden="true">
                <svg viewBox="0 0 220 220" fill="none">
                  <g
                    stroke="rgba(232,238,247,.78)"
                    strokeWidth="2.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  >
                    <path d="M122 22 L70 118 H118 L96 198 L150 104 H108 L122 22 Z" />
                  </g>
                  <g opacity=".55" stroke="rgba(232,238,247,.35)" strokeWidth="1.2">
                    <path d="M156 42 C182 66 190 96 182 132" />
                    <path d="M60 52 C34 78 28 108 38 146" />
                  </g>
                </svg>
              </div>
              <h2 className="tpTitle">Elettrica</h2>
              <p className="tpDesc">
                Architettura elettronica, cablaggi, sensori e integrazione. Dati affidabili, sistemi
                robusti.
              </p>
            </div>
            <div className="tpElectricHover" aria-label="Sottoreparti Elettrica">
              {departmentBranches[0].map((branch) => (
                <a
                  key={branch.label}
                  className="tpElectricLink"
                  href={branch.href}
                  onClick={(e) => e.stopPropagation()}
                >
                  {branch.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 2) MECCANICA */}
        <section
          className={`tpPanel tpPanelMech ${active === 1 ? "tpActive" : ""}`}
          style={{ ["--i" as any]: 1 }}
          data-accent={"red" satisfies Accent}
          data-panel="electric"
          tabIndex={0}
          aria-label="Meccanica"
          onMouseEnter={() => setActive(1)}
          onFocus={() => setActive(1)}
          onClick={() => setActive(1)}
          onKeyDown={onKey(1)}
        >
          <div className="tpContent tpElectricPanel">
            <div className="tpElectricDefault">
              <div className="tpIcon" aria-hidden="true">
                <svg viewBox="0 0 220 220" fill="none">
                  <g
                    stroke="rgba(232,238,247,.78)"
                    strokeWidth="2.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  >
                    <path d="M122 22 L70 118 H118 L96 198 L150 104 H108 L122 22 Z" />
                  </g>
                  <g opacity=".55" stroke="rgba(232,238,247,.35)" strokeWidth="1.2">
                    <path d="M156 42 C182 66 190 96 182 132" />
                    <path d="M60 52 C34 78 28 108 38 146" />
                  </g>
                </svg>
              </div>
              <h2 className="tpTitle">Meccanica</h2>
              <p className="tpDesc">
                Telaio, sospensioni, powertrain e manufacturing. Prestazioni misurabili, iterazione
                rapida.
              </p>
            </div>
            <div className="tpElectricHover" aria-label="Sottoreparti Meccanica">
              {departmentBranches[1].map((branch) => (
                <a
                  key={branch.label}
                  className="tpElectricLink"
                  href={branch.href}
                  onClick={(e) => e.stopPropagation()}
                >
                  {branch.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 3) MANAGEMENT */}

        <section
          id="management"
          className={`tpPanel ${active === 2 ? "tpActive" : ""}`}
          style={{ ["--i" as any]: 2 }}
          data-accent={"cyan" satisfies Accent}
          data-panel="electric"
          tabIndex={0}
          aria-label="Management"
          onMouseEnter={() => setActive(2)}
          onFocus={() => setActive(2)}
          onClick={() => setActive(2)}
          onKeyDown={onKey(2)}
        >
          <div className="tpContent tpElectricPanel">
            <div className="tpElectricDefault">
              <div className="tpIcon" aria-hidden="true">
                <svg viewBox="0 0 220 220" fill="none">
                  <g
                    stroke="rgba(232,238,247,.78)"
                    strokeWidth="2.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  >
                    <path d="M122 22 L70 118 H118 L96 198 L150 104 H108 L122 22 Z" />
                  </g>
                  <g opacity=".55" stroke="rgba(232,238,247,.35)" strokeWidth="1.2">
                    <path d="M156 42 C182 66 190 96 182 132" />
                    <path d="M60 52 C34 78 28 108 38 146" />
                  </g>
                </svg>
              </div>
              <h2 className="tpTitle">Management</h2>
              <p className="tpDesc">
                Pianificazione, risorse, sponsor e coordinamento. Un progetto coerente, dall’idea al
                risultato.
              </p>
            </div>
            <div className="tpElectricHover" aria-label="Sottoreparti Management">
              {departmentBranches[2].map((branch) => (
                <a
                  key={branch.label}
                  className="tpElectricLink"
                  href={branch.href}
                  onClick={(e) => e.stopPropagation()}
                >
                  {branch.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="tpBottomBar">
        <a className="tpTopButton" href="#management" onClick={() => setActive(2)}>
          supporto accademico
        </a>
      </div>
    </section>
  );
}