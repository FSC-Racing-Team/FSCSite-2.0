import "./ElectricPage.css";
import ContactGate from "./Contacts";
import FscFooter from "./FscFooter";
import PageDrawerMenu from "./PageDrawerMenu";
import DepartmentMembers from "./DepartmentMembers";
import BackgroundFX from "./BackgroundFX";
import useLowPerformanceMode from "../hooks/useLowPerformanceMode";

interface MechVehicleDynamicsPageProps {
  onNavigate: (page: string) => void;
}

export default function MechVehicleDynamicsPage({ onNavigate }: MechVehicleDynamicsPageProps) {
  const isLowPerformance = useLowPerformanceMode();

  return (
    <>
      <BackgroundFX lite={isLowPerformance} />

      <div className="mech-page electric-page">
        <PageDrawerMenu onNavigate={onNavigate} currentSection="mech-vd" />

        <section className="mech-section-wrapper mech-vd-wrapper">
          <div className="mech-section-container electric-section">
            <h2 className="teamV3Title deptSectionTitle">VEHICLE DYNAMICS</h2>

            <section aria-label="Vehicle Dynamics approfondimenti">
              <DepartmentMembers title="Team Vehicle Dynamics" department="mech-vd" />
            </section>
          </div>
        </section>

        <ContactGate />
        <FscFooter />
      </div>
    </>
  );
}
