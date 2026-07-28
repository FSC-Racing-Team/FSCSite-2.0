import "./ElectricPage.css";
import ContactGate from "./Contacts";
import FscFooter from "./FscFooter";
import PageDrawerMenu from "./PageDrawerMenu";
import DepartmentMembers from "./DepartmentMembers";
import BackgroundFX from "./BackgroundFX";
import useLowPerformanceMode from "../hooks/useLowPerformanceMode";

interface MechAerodynamicsPageProps {
  onNavigate: (page: string) => void;
}

export default function MechAerodynamicsPage({ onNavigate }: MechAerodynamicsPageProps) {
  const isLowPerformance = useLowPerformanceMode();

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
            </section>
          </div>
        </section>

        <ContactGate />
        <FscFooter />
      </div>
    </>
  );
}
