import { useEffect, useState } from "react";

interface PageDrawerMenuProps {
  onNavigate: (page: string) => void;
  currentSection: "management" | "management-strategy" | "management-marketing" | "management-prof" | "electric-hv" | "electric-lv" | "mech-vd" | "mech-design" | "mech-aero" | "garage" | "faq";
}

export default function PageDrawerMenu({ onNavigate }: PageDrawerMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const adminUrl = `${import.meta.env.BASE_URL}admin/index.html?v=20260227`;
  const logoWithTextUrl = `${import.meta.env.BASE_URL}logo-con-scritta.png`;

  const goHomeAndScroll = (sectionId: string) => {
    onNavigate("home");
    window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const handleNavigate = (page: string) => {
    setMenuOpen(false);
    onNavigate(page);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <div className="topbar">
        <a
          className="topbarBrand"
          href="#home"
          aria-label="Torna alla home"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("home");
            setMenuOpen(false);
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
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    onNavigate("home");
                  }}
                >
                  Home
                </a>
              </div>

              <div className="menu-item">
                <a
                  href="#team"
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    goHomeAndScroll("team");
                  }}
                >
                  il team
                </a>
              </div>

              <div className="menu-item">
                <a
                  href="#contatti"
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    goHomeAndScroll("contatti");
                  }}
                >
                  Contacts
                </a>
              </div>

              <div className="menu-item">
                <a
                  href="#garage"
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    onNavigate("garage");
                  }}
                >
                  Garage
                </a>
              </div>

              <div className="menu-item">
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate("faq");
                  }}
                >
                  FAQ
                </a>
              </div>

              <div className="menu-item">
                <a
                  href={adminUrl}
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    window.location.assign(adminUrl);
                  }}
                >
                  Area Riservata
                </a>
              </div>
            </nav>
          ) : null}
        </div>
      </aside>
    </>
  );
}