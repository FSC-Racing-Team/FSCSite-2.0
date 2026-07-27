// designed by alongio
import { useMemo } from "react";

export default function FscFooter() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="fscFooter">
      <div className="footerWrap">
        <div className="brand" aria-hidden="true">
          <span className="brandMain">FSC</span>
          <span className="brandTail">RACING</span>
        </div>

        <div className="legalOuter" aria-label="Legal">
          <div>
            ©<span id="year">{year}</span> FSC RACING.
          </div>
          <a href="#">PRIVACY POLICY</a>
          <a href="#">TERMS OF USE</a>
        </div>
      </div>
    </footer>
  );
}