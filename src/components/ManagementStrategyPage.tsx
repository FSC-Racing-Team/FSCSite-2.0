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

interface ManagementStrategyPageProps {
  onNavigate: (page: string) => void;
}

const focusItems: DetailItem[] = [
  {
    title: "Strategia & Pianificazione",
    desc: "Definiamo obiettivi, roadmap e priorità operative del team, garantendo coerenza tra attività tecniche e risultati attesi.",
    img: "/images/collage-mgmt/collage-1.jpeg",
    role: "Management",
    name: "Pianificazione"
  }
];

export default function ManagementStrategyPage({ onNavigate }: ManagementStrategyPageProps) {
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

      <div className="management-page electric-page">
        <PageDrawerMenu onNavigate={onNavigate} currentSection="management-strategy" />

        <section className="mech-section-wrapper mgmt-section-wrapper">
          <div className="mech-section-container electric-section mgmt-focus mgmt-dept-section mgmt-section-container">
            <h2 className="teamV3Title deptSectionTitle">MANAGEMENT</h2>
            <DepartmentMembers title="Team Management" department="management" />

            <div className="grid-feat">
              {focusItems.map(renderCard)}
            </div>
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
