import "./PartnersPage.css";
import PageDrawerMenu from "./PageDrawerMenu";

interface PartnersPageProps {
  onNavigate: (page: string) => void;
}

const partnerLevels = ["MAIN", "PLATINUM", "GOLD", "SILVER"];

const platinumPartners = [
  ["/images/logo-siemens.png", "Siemens", "Per il gruppo ruota"],
  ["/images/oni_welding_logo.png", "ONI Welding", "per i software di simulazione della vettura"],
  ["/images/Palmeri-pneumatici-Logo.avif", "Palmeri Pneumatici", "Per la costruzione del telaio"],
  ["/images/pizzeria_il_pancione_logo.webp", "Pizzeria Il Pancione", ""],
];

const partnerLogosByLevel = {
  // Aggiungere qui le immagini dei partner Main.
  MAIN: [],
  PLATINUM: platinumPartners,
  // Aggiungere qui le immagini dei partner Gold.
  GOLD: [],
  // Aggiungere qui le immagini dei partner Silver.
  SILVER: [],
};

export default function PartnersPage({ onNavigate }: PartnersPageProps) {
  return (
    <main className="partnersPage">
      <PageDrawerMenu onNavigate={onNavigate} currentSection="sponsor" />

      <div className="partnersContainer">
        <header className="partnersHeader">
          <h1>I NOSTRI PARTNERS</h1>
        </header>

        <div className="partnerLevels">
          {partnerLevels.map((level) => (
            <section className="partnerLevel" key={level}>
              <h2>{level}</h2>
              <div className="partnerLogos" aria-label={`Partner ${level}`}>
                {partnerLogosByLevel[level as keyof typeof partnerLogosByLevel].map(([src, alt, description]) => (
                  <div className="partnerLogoSlot" key={src}>
                    <img src={src} alt={alt} />
                    {description && <p>{description}</p>}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}