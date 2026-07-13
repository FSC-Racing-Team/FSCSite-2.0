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
}

interface ElectricLowVoltagePageProps {
  onNavigate: (page: string) => void;
}

export default function ElectricLowVoltagePage({ onNavigate }: ElectricLowVoltagePageProps) {
  const [selectedDetail, setSelectedDetail] = useState<DetailItem | null>(null);
  const isLowPerformance = useLowPerformanceMode();
  const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

  const lvItems: DetailItem[] = [
    {
      title: "ECU & Data Acquisition",
      desc: "Centralina elettronica basata su microcontroller STM32. Gestione sensori, attuatori e CAN Bus. Logging dati in tempo reale e telemetria.",
      img: "/images/collage-elect/ecu.jpg"
    },
    {
      title: "Wiring & PCB Design",
      desc: "Progettazione schede elettroniche custom per distribuzione alimentazione 12V/5V. Layout cablaggi LV conformi a regolamento. Design PCB multi-layer per ridurre EMI.",
      img: "/images/collage-elect/pcb.jpg"
    },
    {
      title: "Dashboard & HMI",
      desc: "Display TFT per pilota con dati in tempo reale: velocita, batteria, temperature. Interfaccia touch-screen per configurazione parametri. Indicatori LED di stato e allarmi.",
      img: "/images/collage-elect/dashboard.jpg"
    }
  ];

  const openDetail = (item: DetailItem) => {
    setSelectedDetail(item);
  };

  const closeDetail = () => {
    setSelectedDetail(null);
  };

  const renderCard = (item: DetailItem) => (
    <article
      key={item.title}
      className="card1-feat"
      tabIndex={0}
      onClick={() => openDetail(item)}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          openDetail(item);
        }
      }}
    >
      <div className="img-feat">
        <img src={withBase(item.img)} alt={item.title} onError={(event) => { event.currentTarget.style.opacity = "0.2"; }} />
      </div>
      <div className="meta-feat">
        <div className="role-feat">Approfondimento</div>
        <div className="name-feat">{item.title}</div>
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

      <div className="electric-page">
        <PageDrawerMenu onNavigate={onNavigate} currentSection="electric-lv" />

        <section className="glv-wrapper">
          <div className="glv-container">
            <h2 className="teamV3Title lvTitle">LOW VOLTAGE</h2>

            <section id="glv-feat" aria-label="Low Voltage approfondimenti">
              <DepartmentMembers title="Team Low Voltage" department="electric-lv" />

              <div className="intro-feat">
                <div className="media-feat">
                  <img src={withBase("/images/collage-elect/glv.jpg")} alt="LV Hero" onError={(event) => { event.currentTarget.style.opacity = "0.2"; }} />
                </div>
                <div className="copy-feat">
                  <h2>ECU, Wiring, Dashboard &amp; Acquisition</h2>
                  <p>
                    Sistemi di controllo 12V: ECU custom, acquisizione dati, dashboard pilota,
                    cablaggi e schede di distribuzione alimentazione.
                  </p>
                </div>
              </div>

              <div className="grid-feat">
                {lvItems.map(renderCard)}
              </div>
            </section>
          </div>
        </section>

        <ContactGate />
        <FscFooter />

        <div
          className="detail-overlay-feat"
          aria-hidden={!selectedDetail}
          onClick={closeDetail}
        >
          {selectedDetail && (
            <div
              className="detail-modal-feat"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="detail-topbar-feat">
                <div className="detail-title-feat">{selectedDetail.title}</div>
                <button
                  className="detail-close-feat"
                  onClick={closeDetail}
                  aria-label="Chiudi dettaglio"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="detail-media-feat">
                <img src={withBase(selectedDetail.img)} alt={selectedDetail.title} onError={(event) => { event.currentTarget.style.opacity = "0.2"; }} />
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
