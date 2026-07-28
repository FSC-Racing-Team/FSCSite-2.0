// designed by alongio
"use client";

import { useEffect, useState } from "react";
import HeroSlideshow from "./HeroSlideshow";

type HeroProps = {
  booted: boolean;
};

export default function Hero({ booted }: HeroProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const adminUrl = `${import.meta.env.BASE_URL}admin/index.html?v=20260227`;
  const logoWithTextUrl = `${import.meta.env.BASE_URL}logo-con-scritta.png`;

  const goTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!booted) {
      setRevealed(false);
      return;
    }
    const handle = window.setTimeout(() => setRevealed(true), 40);
    return () => window.clearTimeout(handle);
  }, [booted]);

  return (
    <section className="page" id="heroPage">
      <div className="topbar">
        <a
          className="topbarBrand"
          href="#heroPage"
          aria-label="Torna alla sezione iniziale"
          onClick={(e) => {
            e.preventDefault();
            goTo("heroPage");
          }}
        >
          <img className="topbarLogo" src={logoWithTextUrl} alt="FSC Racing Team" />
        </a>
        <button
          className={`hamb ${menuOpen ? "is-on" : ""}`}
          aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`drawerShade ${menuOpen ? "is-on" : ""}`} onClick={() => setMenuOpen(false)} />
      <aside className={`drawer ${menuOpen ? "is-on" : ""}`} aria-hidden={!menuOpen}>
        <div className="drawerHead">
          <div className="drawerTitle">MENU</div>
        </div>
        <div className="drawerBody">
          {menuOpen ? (
            <nav className="simple-menu" aria-label="Menu">
              <div className="menu-item">
                <a href="#heroPage" onClick={(e) => { e.preventDefault(); goTo("heroPage"); }}>
                  Home
                </a>
              </div>
              <div className="menu-item">
                <a href="#team" onClick={(e) => { e.preventDefault(); goTo("team"); }}>
                  il team
                </a>
              </div>
              <div className="menu-item">
                <a href="#contatti" onClick={(e) => { e.preventDefault(); goTo("contatti"); }}>
                  Contacts
                </a>
              </div>
              <div className="menu-item">
                <a href="#garage" onClick={(e) => { e.preventDefault(); setMenuOpen(false); window.location.hash = "garage"; }}>
                  Garage
                </a>
              </div>
              <div className="menu-item">
                <a href={adminUrl} onClick={(e) => { e.preventDefault(); setMenuOpen(false); window.location.assign(adminUrl); }}>
                  Area Riservata
                </a>
              </div>
            </nav>
          ) : null}
        </div>
      </aside>

      <div className="stage">
        <div className="stageBottom">
          <HeroSlideshow />
        </div>
        <section className={`reveal ${revealed ? "is-on" : ""}`}>
          <div className="wipe" />
          <div className="inner heroCentral">
            <div className="heroRight">
              <div className="heroHeading">
                <div className="heroTitle" aria-label="Formula Student Catania">
                  <span>FORMULA STUDENT CATANIA</span>
                </div>
                <p className="heroSubtitle">Formula Student Team dell'Università di Catania</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
