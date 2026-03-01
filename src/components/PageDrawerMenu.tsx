import { useEffect, useState } from "react";
// @ts-ignore - FlowingMenu is a JSX component
import FlowingMenu from "./FlowingMenu";

interface PageDrawerMenuProps {
  onNavigate: (page: string) => void;
  currentSection: "management" | "electric" | "mech";
}

export default function PageDrawerMenu({ onNavigate, currentSection }: PageDrawerMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const adminUrl = `${import.meta.env.BASE_URL}admin/index.html?v=20260227`;

  const sectionItems = [
    { key: "management" as const, text: "Management", link: "#management", page: "management" },
    { key: "electric" as const, text: "Elettrica", link: "#electric", page: "electric" },
    { key: "mech" as const, text: "Meccanica", link: "#mech", page: "mech" },
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
            <FlowingMenu
              items={[
                { text: "Home", link: "#home", onClick: () => { setMenuOpen(false); onNavigate("home"); } },
                ...otherSections.map((item) => ({
                  text: item.text,
                  link: item.link,
                  onClick: () => {
                    setMenuOpen(false);
                    onNavigate(item.page);
                  },
                })),
                { text: "Area Riservata", link: adminUrl, onClick: () => { setMenuOpen(false); window.location.assign(adminUrl); } }
              ]}
              bgColor="transparent"
              speed={5}
            />
          ) : null}
        </div>
      </aside>
    </>
  );
}