import { useState } from "react";
import "./ElectricPage.css";
import ContactGate from "./Contacts";
import FscFooter from "./FscFooter";
import PageDrawerMenu from "./PageDrawerMenu";
import DepartmentMembers from "./DepartmentMembers";
import BackgroundFX from "./BackgroundFX";
import useLowPerformanceMode from "../hooks/useLowPerformanceMode";

interface DetailItem {
  title: string;
  desc: string;
  img: string;
  role: string;
  name: string;
}

interface MechAerodynamicsPageProps {
  onNavigate: (page: string) => void;
}

const aerodynamicsItems: DetailItem[] = [
  {
    title: "Aerodynamics - Aero package & CFD",
    desc: "Studio di ali, endplate, fondo e diffusore; simulazioni CFD (steady/transient), correlazione con assetto (ride-height, rake) e post-processing dei risultati.",
    img: "/images/collage-elect/Immagine5.png",
    role: "Aerodynamics",
    name: "Aero package & CFD"
  }
];

export default function MechAerodynamicsPage({ onNavigate }: MechAerodynamicsPageProps) {
  const [selectedDetail, setSelectedDetail] = useState<DetailItem | null>(null);
  const isLowPerformance = useLowPerformanceMode();
  const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

  const renderCard = (item: DetailItem) => (
    <article
      key={item.title}
      className="card1-feat"
      tabIndex={0}
      onClick={() => setSelectedDetail(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setSelectedDetail(item);
        }
      }}
    >
      <div className="img-feat">
        <img src={withBase(item.img)} alt={item.title} onError={(e) => { e.currentTarget.style.opacity = "0.2"; }} />
      </div>
      <div className="meta-feat">
        <div className="role-feat">{item.role}</div>
        <div className="name-feat">{item.name}</div>
      </div>
      <div className="arrow-feat">
        <svg viewBox="0 0 24 24">
          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </article>
  );

  return (
    <>
      <BackgroundFX lite={isLowPerformance} />

      <div className="mech-page electric-page">
        <PageDrawerMenu onNavigate={onNavigate} currentSection="mech-aero" />

        <section className="mech-section-wrapper mech-aero-wrapper">
          <div className="mech-section-container electric-section">
            <h2 className="teamV3Title deptSectionTitle">AERODYNAMICS</h2>

            <section aria-label="Aerodynamics approfondimenti">
              <DepartmentMembers title="Team Aerodynamics" department="mech-aero" />

              <div className="intro-feat">
                <div className="media-feat">
                  <img src={withBase("/images/collage-elect/aero.jpeg")} alt="Aero Hero" onError={(e) => { e.currentTarget.style.opacity = "0.2"; }} />
                </div>
                <div className="copy-feat">
                  <h2>CFD, CAD & Aerodynamic Analysis</h2>
                  <p>Simulazione CFD, simulazioni CAD e ottimizzazione delle superfici aerodinamiche.</p>
                </div>
              </div>

              <div className="grid-feat">
                {aerodynamicsItems.map(renderCard)}
              </div>
            </section>
          </div>
        </section>

        <ContactGate />
        <FscFooter />

        <div
          className="detail-overlay-feat"
          aria-hidden={!selectedDetail}
          onClick={() => setSelectedDetail(null)}
        >
          {selectedDetail && (
            <div
              className="detail-modal-feat"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="detail-topbar-feat">
                <div className="detail-title-feat">{selectedDetail.title}</div>
                <button
                  className="detail-close-feat"
                  onClick={() => setSelectedDetail(null)}
                  aria-label="Chiudi dettaglio"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="detail-media-feat">
                <img src={withBase(selectedDetail.img)} alt={selectedDetail.title} onError={(e) => { e.currentTarget.style.opacity = "0.2"; }} />
              </div>

              <div className="detail-copy-feat">
                <h3>{selectedDetail.title}</h3>
                <p>{selectedDetail.desc}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
