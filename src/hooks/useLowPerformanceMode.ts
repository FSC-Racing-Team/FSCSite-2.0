import { useEffect, useState } from "react";

const MOBILE_QUERY = "(max-width: 900px), (hover: none) and (pointer: coarse)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export default function useLowPerformanceMode() {
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia(MOBILE_QUERY);
    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const connection = (navigator as any).connection;

    const compute = () => {
      const isMobile = mobileQuery.matches;
      const prefersReducedMotion = reducedMotionQuery.matches;

      const cores = navigator.hardwareConcurrency ?? 8;
      const memory = (navigator as any).deviceMemory ?? 8;
      const saveData = !!connection?.saveData;
      const netType = String(connection?.effectiveType || "").toLowerCase();
      const slowNetwork = netType.includes("2g") || netType.includes("3g");

      const lowTierDesktop = cores <= 4 || memory <= 4 || saveData || slowNetwork || prefersReducedMotion;
      const next = isMobile || lowTierDesktop;
      setIsLowPerformance(next);
      document.documentElement.classList.toggle("low-performance", next);
    };

    compute();

    mobileQuery.addEventListener("change", compute);
    reducedMotionQuery.addEventListener("change", compute);
    connection?.addEventListener?.("change", compute);

    return () => {
      mobileQuery.removeEventListener("change", compute);
      reducedMotionQuery.removeEventListener("change", compute);
      connection?.removeEventListener?.("change", compute);
    };
  }, []);

  return isLowPerformance;
}
