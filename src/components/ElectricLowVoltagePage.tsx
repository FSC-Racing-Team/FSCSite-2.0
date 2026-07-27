import "./ElectricPage.css";
import ContactGate from "./Contacts";
import FscFooter from "./FscFooter";
import PageDrawerMenu from "./PageDrawerMenu";
import DepartmentMembers from "./DepartmentMembers";
import BackgroundFX from "./BackgroundFX";
import useLowPerformanceMode from "../hooks/useLowPerformanceMode";

interface ElectricLowVoltagePageProps {
  onNavigate: (page: string) => void;
}

export default function ElectricLowVoltagePage({ onNavigate }: ElectricLowVoltagePageProps) {
  const isLowPerformance = useLowPerformanceMode();

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
            </section>
          </div>
        </section>

        <ContactGate />
        <FscFooter />
      </div>
    </>
  );
}
