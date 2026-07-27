import { useRef, useState } from "react";
import "./ElectricPage.css";
import ContactGate from "./Contacts";
import FscFooter from "./FscFooter";
import PageDrawerMenu from "./PageDrawerMenu";
import DepartmentMembers from "./DepartmentMembers";
import BackgroundFX from "./BackgroundFX";
import useLowPerformanceMode from "../hooks/useLowPerformanceMode";

interface ManagementPageProps {
  onNavigate: (page: string) => void;
}

interface SwipeStart {
  x: number;
  y: number;
}

const collageItems = [
  {
    img: "/images/collage-mgmt/collage-1.jpeg",
    alt: "Talking",
    caption: "Talking"
  },
  {
    img: "/images/collage-mgmt/collage-2.jpeg",
    alt: "Planning",
    caption: "Planning"
  },
  {
    img: "/images/collage-mgmt/collage-3.jpg",
    alt: "Working",
    caption: "Working"
  }
];

export default function ManagementPage({ onNavigate }: ManagementPageProps) {
  const isLowPerformance = useLowPerformanceMode();
  const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
  const [order, setOrder] = useState<number[]>([0, 1, 2]);
  const swipeStart = useRef<SwipeStart | null>(null);

  const goNext = () => {
    setOrder((prev) => {
      const next = [...prev];
      const last = next.pop();
      if (last === undefined) {
        return prev;
      }
      next.unshift(last);
      return next;
    });
  };

  const goPrev = () => {
    setOrder((prev) => {
      const next = [...prev];
      const first = next.shift();
      if (first === undefined) {
        return prev;
      }
      next.push(first);
      return next;
    });
  };

  const onStart = (x: number, y: number) => {
    swipeStart.current = { x, y };
  };

  const onMove = (x: number, y: number) => {
    if (!swipeStart.current) {
      return;
    }
    const dx = x - swipeStart.current.x;
    const dy = y - swipeStart.current.y;
    const threshold = 28;

    if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy)) {
      return;
    }

    swipeStart.current = null;
    if (dx < 0) {
      goNext();
    } else {
      goPrev();
    }
  };

  return (
    <>
      <BackgroundFX lite={isLowPerformance} />

      <div className="management-page electric-page">
        <PageDrawerMenu onNavigate={onNavigate} currentSection="management" />

        <section id="chi-siamo">
          <div className="container">
            <section className="intro" aria-label="Presentazione del team">
              <div className="logo-box">
                <img src={withBase("/images/logo.png")} alt="Logo FSC Racing Team" />
              </div>
              <div className="about">
                <h2>Reparto Management</h2>
                <p>
                  Il fulcro della pianificazione e della gestione del nostro progetto. Coordiniamo
                  risorse, tempi e budget per garantire che ogni aspetto del lavoro sia efficiente e
                  allineato agli obiettivi del team.
                </p>
                <p>
                  Dalla strategia alla comunicazione, il nostro compito è rendere il Team FSC
                  un'unità coesa e orientata al successo.
                </p>
              </div>
            </section>
          </div>

          <section className="mgmt-collage-wrap" aria-label="Collage del team">
            <div className="mgmt-collage">
              <figure className="mgmt-tile mgmt-i1"><img src={withBase("/images/collage-mgmt/collage-1.jpeg")} alt="Team Presentation" /></figure>
              <figure className="mgmt-tile mgmt-i2"><img src={withBase("/images/collage-mgmt/collage-3.jpg")} alt="Site Launch" /></figure>
              <figure className="mgmt-tile mgmt-i3"><img src={withBase("/images/collage-mgmt/collage-2.jpeg")} alt="Dettagli operativi" /></figure>
            </div>
          </section>

          <section className="mgmt-polaroid-stack" aria-label="Galleria mobile">
            <div
              className="mgmt-stack"
              onTouchStart={(e) => onStart(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchMove={(e) => onMove(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchEnd={() => { swipeStart.current = null; }}
              onPointerDown={(e) => onStart(e.clientX, e.clientY)}
              onPointerMove={(e) => onMove(e.clientX, e.clientY)}
              onPointerUp={() => { swipeStart.current = null; }}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") {
                  goPrev();
                }
                if (e.key === "ArrowRight") {
                  goNext();
                }
              }}
              tabIndex={0}
            >
              {order.map((index, visualIndex) => {
                const card = collageItems[index];
                return (
                  <figure
                    className="mgmt-polaroid"
                    key={card.caption}
                    style={{
                      zIndex: visualIndex + 1,
                      transform: `translate(${visualIndex * 3}px, ${visualIndex * 2}px) rotate(${(visualIndex - 1) * 2}deg)`
                    }}
                  >
                    <div className="mgmt-polaroid-frame">
                      <img src={withBase(card.img)} alt={card.alt} />
                      <figcaption>{card.caption}</figcaption>
                    </div>
                  </figure>
                );
              })}
            </div>
            <div className="mgmt-swipe-hint" aria-hidden="true">Swipe ⇄</div>
          </section>
        </section>

        <section className="mech-section-wrapper mgmt-section-wrapper">
          <div className="mech-section-container electric-section mgmt-focus mgmt-dept-section mgmt-section-container">
            <div className="header">
              <span className="pip"></span> Management
            </div>
            <DepartmentMembers title="Team Management" department="management" />
          </div>
        </section>

        <section className="mech-section-wrapper mgmt-section-wrapper mgmt-business-wrapper">
          <div className="mech-section-container electric-section mgmt-focus mgmt-dept-section mgmt-business-section mgmt-section-container">
            <div className="header">
              <span className="pip"></span> Marketing e Comunicazione
            </div>
            <DepartmentMembers title="Team Marketing e Comunicazione" department="marketing-comunicazione" />
          </div>
        </section>

        <section className="mech-section-wrapper mgmt-section-wrapper mgmt-prof-wrapper">
          <div className="mech-section-container electric-section mgmt-focus mgmt-dept-section mgmt-prof-section mgmt-section-container">
            <div className="header">
              <span className="pip"></span> Professori
            </div>
            <DepartmentMembers title="Team Professori" department="professori" />
          </div>
        </section>

        <ContactGate />
        <FscFooter />
      </div>
    </>
  );
}
