import { useEffect } from "react";
import PageDrawerMenu from "./PageDrawerMenu";

interface AdminPageProps {
  onNavigate: (page: string) => void;
}

export default function AdminPage({ onNavigate }: AdminPageProps) {
  const decapAdminUrl = `${import.meta.env.BASE_URL}admin/`;

  useEffect(() => {
    window.location.replace(decapAdminUrl);
  }, [decapAdminUrl]);

  return (
    <>
      <div className="bg" />
      <div className="grain" />

      <div className="admin-page electric-page">
        <PageDrawerMenu onNavigate={onNavigate} currentSection="management" />

        <section className="admin-shell">
          <header className="admin-header">
            <p className="admin-kicker">Area Riservata</p>
            <h1>Pubblicazione Contenuti</h1>
            <p>Reindirizzamento automatico al CMS ufficiale in corso…</p>
            <p>
              <a
                href={decapAdminUrl}
                target="_self"
                className="admin-add-btn"
                style={{ display: "inline-flex", textDecoration: "none", marginTop: "10px" }}
              >
                Vai al CMS di pubblicazione (/admin)
              </a>
            </p>
          </header>

          <div className="admin-panel">
            <p className="admin-kicker" style={{ letterSpacing: ".08em", marginTop: "14px" }}>
              Usa solo il CMS `/admin` per creare commit e pubblicare i dati del team.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
