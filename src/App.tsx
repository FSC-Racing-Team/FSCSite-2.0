// designed by alongio
import { useEffect, useState } from "react";
import HomePage from "./components/HomePage";
import ElectricDivisionPage from "./components/ElectricDivisionPage";
import MechVehicleDynamicsPage from "./components/MechVehicleDynamicsPage";
import MechMechanicalDesignPage from "./components/MechMechanicalDesignPage";
import MechAerodynamicsPage from "./components/MechAerodynamicsPage";
import ManagementStrategyPage from "./components/ManagementStrategyPage";
import ManagementMarketingPage from "./components/ManagementMarketingPage";
import ManagementProfessoriPage from "./components/ManagementProfessoriPage";
import GaragePage from "./components/GaragePage";
import AdminPage from "./components/AdminPage";
import FAQPage from "./components/FAQPage";
import PartnersPage from "./components/PartnersPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");

  const resolveRouteFromHash = (hashValue: string): string => {
    const hash = hashValue.replace(/^#/, "").toLowerCase().trim();
    if (!hash) {
      return "home";
    }

    if (hash === "electric") {
      return "electric-powertrain";
    }

    if (hash === "electric-hv") {
      return "electric-powertrain";
    }

    if (hash === "electric-lv") {
      return "electric-safety";
    }

    if (hash === "mech") {
      return "mech-vd";
    }

    if (hash === "management") {
      return "management-strategy";
    }

    if (
      hash === "home" ||
      hash === "electric-powertrain" ||
      hash === "electric-safety" ||
      hash === "electric-control" ||
      hash === "mech-vd" ||
      hash === "mech-design" ||
      hash === "mech-aero" ||
      hash === "management-strategy" ||
      hash === "management-marketing" ||
      hash === "management-prof" ||
      hash === "garage" ||
      hash === "faq" ||
      hash === "sponsor" ||
      hash === "admin"
    ) {
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

  useEffect(() => {
    const isInnerPage = currentPage !== "home";
    document.documentElement.classList.toggle("inner-page-active", isInnerPage);
    document.body.classList.toggle("inner-page-active", isInnerPage);

    return () => {
      document.documentElement.classList.remove("inner-page-active");
      document.body.classList.remove("inner-page-active");
    };
  }, [currentPage]);

  const navigateTo = (page: string) => {
    const normalizedPage = resolveRouteFromHash(page);
    const currentHash = window.location.hash.slice(1).toLowerCase().trim();

    if (currentHash !== normalizedPage) {
      window.location.hash = normalizedPage;
    }

    setCurrentPage(normalizedPage);
  };

  if (
    currentPage === "electric-powertrain" ||
    currentPage === "electric-safety" ||
    currentPage === "electric-control"
  ) {
    return <ElectricDivisionPage onNavigate={navigateTo} division={currentPage} />;
  }

  if (currentPage === "mech-vd") {
    return <MechVehicleDynamicsPage onNavigate={navigateTo} />;
  }

  if (currentPage === "mech-design") {
    return <MechMechanicalDesignPage onNavigate={navigateTo} />;
  }

  if (currentPage === "mech-aero") {
    return <MechAerodynamicsPage onNavigate={navigateTo} />;
  }

  if (currentPage === "garage") {
    return <GaragePage onNavigate={navigateTo} />;
  }

  if (currentPage === "management-strategy") {
    return <ManagementStrategyPage onNavigate={navigateTo} />;
  }

  if (currentPage === "management-marketing") {
    return <ManagementMarketingPage onNavigate={navigateTo} />;
  }

  if (currentPage === "management-prof") {
    return <ManagementProfessoriPage onNavigate={navigateTo} />;
  }

  if (currentPage === "admin") {
    return <AdminPage onNavigate={navigateTo} />;
  }

  if (currentPage === "faq") {
    return <FAQPage onNavigate={navigateTo} />;
  }

  if (currentPage === "sponsor") {
    return <PartnersPage onNavigate={navigateTo} />;
  }

  return <HomePage onNavigate={navigateTo} />;
}
