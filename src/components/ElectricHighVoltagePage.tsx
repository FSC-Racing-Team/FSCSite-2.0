import "./ElectricPage.css";
import ContactGate from "./Contacts";
import FscFooter from "./FscFooter";
import PageDrawerMenu from "./PageDrawerMenu";
import DepartmentMembers from "./DepartmentMembers";
import BackgroundFX from "./BackgroundFX";
import useLowPerformanceMode from "../hooks/useLowPerformanceMode";

interface ElectricHighVoltagePageProps {
  onNavigate: (page: string) => void;
}

export default function ElectricHighVoltagePage({ onNavigate }: ElectricHighVoltagePageProps) {
  const isLowPerformance = useLowPerformanceMode();

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
            </section>
          </div>
        </section>

        <ContactGate />
        <FscFooter />
      </div>
    </>
  );
}
