// designed by alongio
import { useEffect, useState } from "react";
import HomePage from "./components/HomePage";
import ElectricHighVoltagePage from "./components/ElectricHighVoltagePage";
import ElectricLowVoltagePage from "./components/ElectricLowVoltagePage";
import MechVehicleDynamicsPage from "./components/MechVehicleDynamicsPage";
import MechMechanicalDesignPage from "./components/MechMechanicalDesignPage";
import MechAerodynamicsPage from "./components/MechAerodynamicsPage";
import ManagementStrategyPage from "./components/ManagementStrategyPage";
import ManagementMarketingPage from "./components/ManagementMarketingPage";
import ManagementProfessoriPage from "./components/ManagementProfessoriPage";
import GaragePage from "./components/GaragePage";
import AdminPage from "./components/AdminPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");

  const resolveRouteFromHash = (hashValue: string): string => {
    const hash = hashValue.toLowerCase().trim();
    if (!hash) {
      return "home";
    }

    if (hash === "electric") {
      return "electric-hv";
    }

    if (hash === "mech") {
      return "mech-vd";
    }

    if (hash === "management") {
      return "management-strategy";
    }

    if (
      hash === "home" ||
      hash === "electric-hv" ||
      hash === "electric-lv" ||
      hash === "mech-vd" ||
      hash === "mech-design" ||
      hash === "mech-aero" ||
      hash === "management-strategy" ||
      hash === "management-marketing" ||
      hash === "management-prof" ||
      hash === "garage" ||
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

  const navigateTo = (page: string) => {
    window.location.hash = page;
    setCurrentPage(resolveRouteFromHash(page));
  };

  if (currentPage === "electric-hv") {
    return <ElectricHighVoltagePage onNavigate={navigateTo} />;
  }

  if (currentPage === "electric-lv") {
    return <ElectricLowVoltagePage onNavigate={navigateTo} />;
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

  return <HomePage onNavigate={navigateTo} />;
}

