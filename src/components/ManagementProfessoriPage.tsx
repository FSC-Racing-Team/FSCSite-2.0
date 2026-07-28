import "./ElectricPage.css";
import ContactGate from "./Contacts";
import FscFooter from "./FscFooter";
import PageDrawerMenu from "./PageDrawerMenu";
import DepartmentMembers from "./DepartmentMembers";
import BackgroundFX from "./BackgroundFX";
import useLowPerformanceMode from "../hooks/useLowPerformanceMode";

interface ManagementProfessoriPageProps {
  onNavigate: (page: string) => void;
}

export default function ManagementProfessoriPage({ onNavigate }: ManagementProfessoriPageProps) {
  const isLowPerformance = useLowPerformanceMode();

  return (
    <>
      <BackgroundFX lite={isLowPerformance} />

      <div className="management-page electric-page">
        <PageDrawerMenu onNavigate={onNavigate} currentSection="management-prof" />

        <section className="mech-section-wrapper mgmt-prof-wrapper">
          <div className="mech-section-container electric-section mgmt-focus mgmt-dept-section mgmt-prof-section mgmt-section-container">
            <h2 className="teamV3Title deptSectionTitle">IL SUPPORTO ACCADEMICO</h2>
            <DepartmentMembers title="Team Professori" department="professori" />
          </div>
        </section>

        <ContactGate />
        <FscFooter />
      </div>
    </>
  );
}
