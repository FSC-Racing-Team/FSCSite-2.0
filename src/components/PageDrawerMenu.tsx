import { useEffect, useState } from "react";

interface PageDrawerMenuProps {
  onNavigate: (page: string) => void;
  currentSection: "management" | "electric" | "mech" | "garage";
}

export default function PageDrawerMenu({ onNavigate, currentSection }: PageDrawerMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const adminUrl = `${import.meta.env.BASE_URL}admin/index.html?v=20260227`;

  const sectionItems = [
    { key: "management" as const, text: "Management", link: "#management", page: "management" },
    { key: "electric" as const, text: "Elettrica", link: "#electric", page: "electric" },
    { key: "mech" as const, text: "Meccanica", link: "#mech", page: "mech" },
    { key: "garage" as const, text: "Garage", link: "#garage", page: "garage" },
  ];

  const otherSections = sectionItems.filter((item) => item.key !== currentSection);

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

              {otherSections.map((item) => (
                <div className="menu-item" key={item.key}>
                  <a
                    href={item.link}
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      onNavigate(item.page);
                    }}
                  >
                    {item.text}
                  </a>
                </div>
              ))}

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