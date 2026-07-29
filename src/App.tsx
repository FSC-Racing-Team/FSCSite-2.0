// designed by alongio
import { useEffect, useState } from "react";
import HomePage from "./components/HomePage";
import ElectricPage from "./components/ElectricPage";
import MechPage from "./components/MechPage";
import GaragePage from "./components/GaragePage";
import ManagementPage from "./components/ManagementPage";
import AdminPage from "./components/AdminPage";
import FAQPage from "./components/FAQPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");

  const resolveRouteFromHash = (hashValue: string): string => {
    const hash = hashValue.toLowerCase().trim();
    if (!hash) {
      return "home";
    }

    if (hash === "home" || hash === "electric" || hash === "mech" || hash === "garage" || hash === "management" || hash === "admin" || hash === "faq") {
      return hash;
    }

    return "home";
  };

  useEffect(() => {
    // Gestisce hash URL per navigazione
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Rimuove il #
      setCurrentPage(resolveRouteFromHash(hash));
    };

    handleHashChange(); // Controlla hash iniziale
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const navigateTo = (page: string) => {
    window.location.hash = page;
    setCurrentPage(resolveRouteFromHash(page));
  };

  if (currentPage === "electric") {
    return <ElectricPage onNavigate={navigateTo} />;
  }

  if (currentPage === "mech") {
    return <MechPage onNavigate={navigateTo} />;
  }

  if (currentPage === "garage") {
    return <GaragePage onNavigate={navigateTo} />;
  }

  if (currentPage === "management") {
    return <ManagementPage onNavigate={navigateTo} />;
  }

  if (currentPage === "admin") {
    return <AdminPage onNavigate={navigateTo} />;
  }

  if (currentPage === "faq") {
    return <FAQPage onNavigate={navigateTo} />;
  }

  return <HomePage onNavigate={navigateTo} />;
}

