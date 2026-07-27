import "./ElectricPage.css";
import ContactGate from "./Contacts";
import FscFooter from "./FscFooter";
import PageDrawerMenu from "./PageDrawerMenu";
import DepartmentMembers from "./DepartmentMembers";
import BackgroundFX from "./BackgroundFX";
import useLowPerformanceMode from "../hooks/useLowPerformanceMode";

interface ManagementStrategyPageProps {
  onNavigate: (page: string) => void;
}

export default function ManagementStrategyPage({ onNavigate }: ManagementStrategyPageProps) {
  const isLowPerformance = useLowPerformanceMode();

  return (
    <>
      <BackgroundFX lite={isLowPerformance} />

      <div className="management-page electric-page">
        <PageDrawerMenu onNavigate={onNavigate} currentSection="management-strategy" />

        <section className="mech-section-wrapper mgmt-section-wrapper">
          <div className="mech-section-container electric-section mgmt-focus mgmt-dept-section mgmt-section-container">
            <h2 className="teamV3Title deptSectionTitle">MANAGEMENT</h2>
            <DepartmentMembers title="Team Management" department="management" />
          </div>
        </section>

        <ContactGate />
        <FscFooter />
      </div>
    </>
  );
}
