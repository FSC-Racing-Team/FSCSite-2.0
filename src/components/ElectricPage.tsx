// designed by alongio
import "./ElectricPage.css";
import ContactGate from "./Contacts";
import FscFooter from "./FscFooter";
import PageDrawerMenu from "./PageDrawerMenu";
import DepartmentMembers from "./DepartmentMembers";
import BackgroundFX from "./BackgroundFX";
import useLowPerformanceMode from "../hooks/useLowPerformanceMode";

interface ElectricPageProps {
  onNavigate: (page: string) => void;
}

export default function ElectricPage({ onNavigate }: ElectricPageProps) {
  const isLowPerformance = useLowPerformanceMode();
  const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

  return (
    <>
      <BackgroundFX lite={isLowPerformance} />
      
      <div className="electric-page">
        <PageDrawerMenu onNavigate={onNavigate} currentSection="electric-hv" />

      {/* Header */}
      <section id="chi-siamo">
        <div className="container">
          <section className="intro" aria-label="Presentazione del team">
            <div className="logo-box">
              <img src={withBase("/images/logo.png")} alt="Logo FSC Racing Team" />
            </div>
            <div className="about">
              <h2>Reparto Elettrico</h2>
              <p>
                E' il cuore tecnologico della vettura da competizione, responsabile di progettare
                e sviluppare i sistemi elettrici che alimentano e controllano il veicolo.
              </p>
            </div>
          </section>
        </div>
      </section>

      <div className="divisore"></div>

      {/* HIGH VOLTAGE */}
      <section className="hv-wrapper">
        <div className="hv-container">
          <div className="header">
            <span className="pip"></span> High Voltage
          </div>

          <section id="hv-feat" aria-label="High Voltage approfondimenti">
            <DepartmentMembers title="Team High Voltage" department="electric-hv" />
        </section>
        </div>
      </section>

      {/* LOW VOLTAGE */}
      <section className="glv-wrapper">
        <div className="glv-container">
          <div className="header">
            <span className="pip"></span> Low Voltage & Control
          </div>

          <section id="glv-feat" aria-label="Low Voltage approfondimenti">
            <DepartmentMembers title="Team Low Voltage" department="electric-lv" />
          </section>
        </div>
      </section>

      {/* Contacts & Footer */}
      <ContactGate />
      <FscFooter />
      </div>
    </>
  );
}
