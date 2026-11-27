import "./ElectricPage.css";
import ContactGate from "./Contacts";
import FscFooter from "./FscFooter";
import PageDrawerMenu from "./PageDrawerMenu";
import BackgroundFX from "./BackgroundFX";
import useLowPerformanceMode from "../hooks/useLowPerformanceMode";

type ElectricDivision = "electric-powertrain" | "electric-safety" | "electric-control";

interface ElectricMember {
  name: string;
  image?: string;
}

interface ElectricDivisionPageProps {
  onNavigate: (page: string) => void;
  division: ElectricDivision;
}

const divisions: Record<ElectricDivision, { title: string; lead: ElectricMember; members: ElectricMember[] }> = {
  "electric-powertrain": {
    title: "POWERTRAIN",
    lead: { name: "Vincenzo Grasso" },
    members: [
      { name: "Angelo Pettinato", image: "/dev/assets/uploads/angelo-pettinato.png" },
      { name: "Luigi Tinnirello" }
    ]
  },
  "electric-safety": {
    title: "SAFETY AND WIRING",
    lead: { name: "Riccardo Barbagallo", image: "/dev/assets/uploads/rbarb.png" },
    members: [{ name: "Dario Cavallaro" }]
  },
  "electric-control": {
    title: "CONTROL SYSTEM",
    lead: { name: "Lorenzo Buzzurro", image: "/dev/assets/uploads/lobuzz.png" },
    members: [
      { name: "Flavia Sorbello" },
      { name: "Giuliano Zafarana" },
      { name: "Giovanni Spadaro", image: "/dev/assets/uploads/gvsp.png" },
      { name: "Cristiano Calì" },
      { name: "Gabriele Cassaniti" }
    ]
  }
};

export default function ElectricDivisionPage({ onNavigate, division }: ElectricDivisionPageProps) {
  const isLowPerformance = useLowPerformanceMode();
  const { title, lead, members } = divisions[division];
  const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

  const renderMember = (member: ElectricMember, isLead = false) => (
    <article
      className={`dept-member-card${isLead ? " dept-member-card--lead" : ""}`}
      key={member.name}
    >
      <div className="dept-member-avatar-wrap">
        {member.image ? (
          <img className="dept-member-avatar" src={withBase(member.image)} alt={member.name} />
        ) : (
          <div className="dept-member-avatar dept-member-avatar--placeholder" aria-hidden="true" />
        )}
      </div>
      <div className="dept-member-content">
        <div className="dept-member-name">{member.name}</div>
      </div>
    </article>
  );

  return (
    <>
      <BackgroundFX lite={isLowPerformance} />

      <div className="mech-page electric-page">
        <PageDrawerMenu onNavigate={onNavigate} currentSection={division} />

        <section className="mech-section-wrapper electric-division-wrapper">
          <div className="mech-section-container electric-section">
            <h2 className="teamV3Title deptSectionTitle">{title}</h2>

            <section className="dept-members" aria-label={`Membri ${title}`}>
              <div className="dept-members-layout">
                <div className="dept-members-leads">{renderMember(lead, true)}</div>
                <div className="dept-members-regular">{members.map((member) => renderMember(member))}</div>
              </div>
            </section>
          </div>
        </section>

        <ContactGate />
        <FscFooter />
      </div>
    </>
  );
}
