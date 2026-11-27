import "./ElectricPage.css";
import ContactGate from "./Contacts";
import FscFooter from "./FscFooter";
import PageDrawerMenu from "./PageDrawerMenu";
import DepartmentMembers from "./DepartmentMembers";
import BackgroundFX from "./BackgroundFX";
import useLowPerformanceMode from "../hooks/useLowPerformanceMode";

interface ManagementMarketingPageProps {
  onNavigate: (page: string) => void;
}

export default function ManagementMarketingPage({ onNavigate }: ManagementMarketingPageProps) {
  const isLowPerformance = useLowPerformanceMode();

  return (
    <>
      <BackgroundFX lite={isLowPerformance} />

      <div className="management-page electric-page">
        <PageDrawerMenu onNavigate={onNavigate} currentSection="management-marketing" />

        <section className="mech-section-wrapper mgmt-business-wrapper">
          <div className="mech-section-container electric-section mgmt-focus mgmt-dept-section mgmt-business-section mgmt-section-container">
            <h2 className="teamV3Title deptSectionTitle">MARKETING & COMUNICAZIONE</h2>
            <DepartmentMembers title="Team Marketing e Comunicazione" department="marketing-comunicazione" />
          </div>
        </section>

        <ContactGate />
        <FscFooter />
      </div>
    </>
  );
}
