import "./ElectricPage.css";
import ContactGate from "./Contacts";
import FscFooter from "./FscFooter";
import PageDrawerMenu from "./PageDrawerMenu";
import DepartmentMembers from "./DepartmentMembers";
import BackgroundFX from "./BackgroundFX";
import useLowPerformanceMode from "../hooks/useLowPerformanceMode";

interface MechMechanicalDesignPageProps {
  onNavigate: (page: string) => void;
}

export default function MechMechanicalDesignPage({ onNavigate }: MechMechanicalDesignPageProps) {
  const isLowPerformance = useLowPerformanceMode();

  return (
    <>
      <BackgroundFX lite={isLowPerformance} />

      <div className="mech-page electric-page">
        <PageDrawerMenu onNavigate={onNavigate} currentSection="mech-design" />

        <section className="mech-section-wrapper mech-design-wrapper">
          <div className="mech-section-container electric-section">
            <h2 className="teamV3Title deptSectionTitle">MECHANICAL DESIGN</h2>

            <section aria-label="Mechanical Design approfondimenti">
              <DepartmentMembers title="Team Mechanical Design" department="mech-design" />
            </section>
          </div>
        </section>

        <ContactGate />
        <FscFooter />
      </div>
    </>
  );
}
