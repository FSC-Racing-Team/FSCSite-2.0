// designed by alongio
import { useEffect, useState } from "react";

type Accent = "cyan" | "red" | "mgmt";

type DepartmentBranch = {
  label: string;
  href: string;
  subtitle: string;
};

interface ThreePanelsProps {
  onNavigate: (page: string) => void;
}

const departmentBranches: Record<number, DepartmentBranch[]> = {
  0: [
    {
      label: "High Voltage",
      href: "#electric-hv",
      subtitle: "Gestione battery pack, BMS e sicurezza alta tensione: layout celle, isolamento, interlock, TS e interfacce GLV/HV conformi a regolamento FS."
    },
    {
      label: "Low Voltage",
      href: "#electric-lv",
      subtitle: "Sistemi di controllo 12V: ECU custom, acquisizione dati, dashboard pilota, cablaggi e schede distribuzione alimentazione."
    },
  ],
  1: [
    {
      label: "Dinamica",
      href: "#mech-vd",
      subtitle: "Gestione sospensioni, studio comportamentale di masse sospese e non sospese."
    },
    {
      label: "Meccanica",
      href: "#mech-design",
      subtitle: "Progettazione CAD, analisi delle sollecitazioni, modellazione e studio delle componenti meccaniche."
    },
    {
      label: "Aerodinamica",
      href: "#mech-aero",
      subtitle: "Simulazione CFD, simulazioni CAD e ottimizzazione delle superfici aerodinamiche."
    },
  ],
  2: [
    {
      label: "Management",
      href: "#management-strategy",
      subtitle: "Direzione aziendale, valutazione dei rischi, allocazione del budget e sviluppo degli obiettivi di business."
    },
    {
      label: "Marketing & Comunicazione",
      href: "#management-marketing",
      subtitle: "Pianificazione strategica della comunicazione, analisi di mercato, modellazione dell'immagine aziendale e sviluppo delle relazioni esterne."
    },
  ],
};

export default function ThreePanels({ onNavigate }: ThreePanelsProps) {
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

  const renderDepartmentIcon = (kind: "electric" | "mech" | "management") => {
    const iconMap = {
      electric: "/images/ICONA ELETTRICA.svg",
      mech: "/images/ICONA MECCANICA.svg",
      management: "/images/ICONA MANAGEMENT.svg"
    } as const;

    return <img src={iconMap[kind]} alt="" aria-hidden="true" className="tpIconImage" />;
  };

  return (
    <section className="tpSection" aria-label="3 panels" id="team">
      <div className="tpAmbient" aria-hidden="true" />

      <div className="tpTopBar">
        <h2 className="tpTopTitle">il team</h2>
      </div>

      <div className={`tpGrid ${isOn ? "tpOn" : ""}`}>
        <section
          className={`tpPanel ${active === 0 ? "tpActive" : ""}`}
          style={{ ["--i" as string]: 0 } as React.CSSProperties}
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
                {renderDepartmentIcon("electric")}
              </div>
              <h2 className="tpTitle">ELETTRICA</h2>
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
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onNavigate(branch.href.slice(1));
                  }}
                >
                  <span className="tpElectricLinkContent">
                    <span className="tpElectricLinkTitle">{branch.label}</span>
                    <span className="tpElectricLinkSubtitle">{branch.subtitle}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section
          className={`tpPanel tpPanelMech ${active === 1 ? "tpActive" : ""}`}
          style={{ ["--i" as string]: 1 } as React.CSSProperties}
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
                {renderDepartmentIcon("mech")}
              </div>
              <h2 className="tpTitle">MECCANICA</h2>
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
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onNavigate(branch.href.slice(1));
                  }}
                >
                  <span className="tpElectricLinkContent">
                    <span className="tpElectricLinkTitle">{branch.label}</span>
                    <span className="tpElectricLinkSubtitle">{branch.subtitle}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section
          id="management"
          className={`tpPanel ${active === 2 ? "tpActive" : ""}`}
          style={{ ["--i" as string]: 2 } as React.CSSProperties}
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
                {renderDepartmentIcon("management")}
              </div>
              <h2 className="tpTitle">MANAGEMENT</h2>
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
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onNavigate(branch.href.slice(1));
                  }}
                >
                  <span className="tpElectricLinkContent">
                    <span className="tpElectricLinkTitle">{branch.label}</span>
                    <span className="tpElectricLinkSubtitle">{branch.subtitle}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="tpBottomBar">
        <a
          className="tpTopButton"
          href="#management-prof"
          onClick={(e) => {
            e.preventDefault();
            setActive(2);
            onNavigate("management-prof");
          }}
        >
          SUPPORTO ACCADEMICO
        </a>
      </div>
    </section>
  );
}