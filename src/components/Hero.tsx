// designed by alongio
"use client";

import { useEffect, useState } from "react";
import LogoActive from "./LogoActive";
import HeroSlideshow from "./HeroSlideshow";

type HeroProps = {
  booted: boolean;
};

export default function Hero({ booted }: HeroProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [wheelAngle, setWheelAngle] = useState(0);
  const adminUrl = `${import.meta.env.BASE_URL}admin/index.html?v=20260227`;

  const goTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleWheelClick = () => setWheelAngle((prev) => prev + 180);

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
            <div className="heroLeft">
              <div className="eleWrap" aria-label="Liotru logo">
                <LogoActive wheelRotation={wheelAngle} onWheelClick={handleWheelClick} />
              </div>
            </div>
            <div className="heroRight">
              <div className="heroTitle" aria-label="FSC Racing Team">
                <span>FSC</span>
                <span>RACING</span>
                <span>TEAM</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
