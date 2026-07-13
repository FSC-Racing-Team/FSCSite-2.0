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

interface ElectricHighVoltagePageProps {
  onNavigate: (page: string) => void;
}

export default function ElectricHighVoltagePage({ onNavigate }: ElectricHighVoltagePageProps) {
  const [selectedDetail, setSelectedDetail] = useState<DetailItem | null>(null);
  const isLowPerformance = useLowPerformanceMode();
  const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

  const hvItems: DetailItem[] = [
    {
      title: "Accumulator - Pack design & layout",
      desc: "Progettazione meccanica del box accumulatori, selezione celle, interconnessioni e raffreddamento. Packaging e integrazione nel telaio. Integrazione e sviluppo inverter.",
      img: "/images/collage-elect/battery.jpg"
    },
    {
      title: "BMS & Sensing",
      desc: "Battery Management System custom: monitoraggio tensioni, correnti, temperature. Bilanciamento celle e comunicazione CAN con ECU. Protezione da sovra/sotto-carica e temperatura eccessiva.",
      img: "/images/collage-elect/bms.jpg"
    },
    {
      title: "HV Safety & Shutdown",
      desc: "Catena TSAC, IMD, AIRs, fusibili e interruttori rapidi. Isolamento HV, interlock e protezioni da cortocircuito. Integrazione BSPD e sensori di impatto.",
      img: "/images/collage-elect/hv-safety.jpg"
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
        <PageDrawerMenu onNavigate={onNavigate} currentSection="electric-hv" />

        <section className="hv-wrapper">
          <div className="hv-container">
            <h2 className="teamV3Title hvTitle">HIGH VOLTAGE</h2>

            <section id="hv-feat" aria-label="High Voltage approfondimenti">
              <DepartmentMembers title="Team High Voltage" department="electric-hv" />

              <div className="intro-feat">
                <div className="media-feat">
                  <img src={withBase("/images/collage-elect/elettrica.jpg")} alt="HV Hero" onError={(event) => { event.currentTarget.style.opacity = "0.2"; }} />
                </div>
                <div className="copy-feat">
                  <h2>Battery Pack, Powertrain &amp; HV Safety</h2>
                  <p>
                    Gestione pack, BMS e sicurezza alta tensione: layout celle, isolamento, interlock,
                    TS e interfacce GLV/HV conformi a regolamento FS.
                  </p>
                </div>
              </div>

              <div className="grid-feat">
                {hvItems.map(renderCard)}
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
