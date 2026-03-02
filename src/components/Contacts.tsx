// designed by alongio
import React, { useEffect, useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
// @ts-ignore - LaserFlow is a JSX component
import { LaserFlow } from "./LaserFlow";
import useLowPerformanceMode from "../hooks/useLowPerformanceMode";

function isValidEmail(value: string) {
  const v = value.trim();
  if (!v) return false;

  // HTML5-ish check via input validity (browser-grade)
  const tmp = document.createElement("input");
  tmp.type = "email";
  tmp.value = v;
  if (tmp.checkValidity()) return true;

  // fallback
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

function escapeHtml(str: string) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default function ContactGate() {
  const env = import.meta.env as Record<string, string | undefined>;
  const emailJsPublicKey = env.VITE_EMAILJS_PUBLIC_KEY || "EZoeTiMOVjbTneoi6";
  const emailJsServiceId = env.VITE_EMAILJS_SERVICE_ID || "fscsiteform";
  const emailJsTemplateId = env.VITE_EMAILJS_TEMPLATE_ID || "FSCRACING0101";

  const isLowPerformance = useLowPerformanceMode();
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const okEmail = useMemo(() => isValidEmail(email), [email]);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const firstRef = useRef<HTMLInputElement | null>(null);

  const openModal = () => {
    if (!okEmail) return;
    setIsOpen(true);

    requestAnimationFrame(() => {
      firstRef.current?.focus();
    });
  };

  const closeModal = () => {
    setIsOpen(false);
    requestAnimationFrame(() => {
      // focus back to email input
      const el = document.getElementById("cg-email") as HTMLInputElement | null;
      el?.focus();
    });
  };

  // ESC closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  useEffect(() => {
    emailjs.init({ publicKey: emailJsPublicKey });
  }, [emailJsPublicKey]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (isSending) {
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("email", email.trim());

    const firstName = String(data.get("firstName") || "").trim();
    const lastName = String(data.get("lastName") || "").trim();
    const corso = String(data.get("corso") || "").trim();
    const reparto = String(data.get("reparto") || "").trim();
    const message = String(data.get("message") || "").trim();
    const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();

    const params = {
      from_name: fullName || firstName || "Contatto FSC Site",
      first_name: firstName,
      last_name: lastName,
      corso,
      reparto,
      reply_to: email.trim(),
      email: email.trim(),
      message: [
        `Nome: ${firstName || "-"}`,
        `Cognome: ${lastName || "-"}`,
        `Email: ${email.trim() || "-"}`,
        `Corso di laurea: ${corso || "-"}`,
        `Reparto: ${reparto || "-"}`,
        "",
        "Messaggio:",
        message || "-",
      ].join("\n"),
      user_message: message,
    };

    setIsSending(true);

    try {
      await emailjs.send(emailJsServiceId, emailJsTemplateId, params);
      alert("Email inviata con successo!");
      form.reset();
      setEmail("");
      closeModal();
    } catch (error) {
      console.error("FAILED...", error);
      alert("C'è stato un problema nell'invio dell'email.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="cgPage" aria-label="Contact gate" id="contacts">
      <div className="cgVolcanoBg" aria-hidden="true" />
      <header className="cgHeader">
        <h1 className="cgH1">
          Sei pronto a 
          <br />
            Correre con noi?
        </h1>
      </header>

      {!isLowPerformance ? (
        <LaserFlow
          color="#A80000"
          horizontalSizing={1.24}
          verticalSizing={1.2}
          wispDensity={5}
          wispSpeed={12}
          wispIntensity={0}
          horizontalBeamOffset={0.0}
          verticalBeamOffset={-0.5}
        />
      ) : null}

      <main className="cgHero">
        <div className="cgGate">
          <div className="cgParenRow" aria-label="Email input">
            <span className="cgParen" aria-hidden="true">
              [
            </span>

            <input
              id="cg-email"
              className="cgEmailInput"
              type="email"
              autoComplete="email"
              placeholder="Inserisci la tua Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (okEmail) openModal();
                }
              }}
            />

            <span className="cgParen" aria-hidden="true">
              ]
            </span>
          </div>

          <div className="cgActions">
            <button className="cgBtn" disabled={!okEmail} onClick={openModal}>
              Continua
            </button>
          </div>

          <div className="cgHint" aria-live="polite">
            {!email.trim()
              ? ""
              : okEmail
              ? ""
              : "Inserisci un'email valida (es. nome@dominio.com)."}
          </div>
        </div>
      </main>

      <div className="cgDivider" aria-hidden="true" />

      <footer className="cgFooter">
        <div className="cgFootRow">
          <div>
            <div className="cgFootSmall">
              CONTATTACI PER
              <br />
              SAPERNE DI PIÙ.
            </div>
          </div>

          <div className="cgFootCenter">

          </div>

          <div className="cgFootRight">
            <div className="cgFootSmall">CONTATTI GENERALI</div>
            <div className="cgFootBig">fsc_generale@outlook.it</div>
          </div>
        </div>
      </footer>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`cgOverlay ${isOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Contact details form"
      >
        <div className="cgDialogWrap">
          <button className="cgClose" type="button" aria-label="Close form" onClick={closeModal}>
            <span className="cgX" aria-hidden="true" />
          </button>

          <div ref={cardRef} className="cgCard" tabIndex={-1}>
            <p className="cgCardTitle">
              Perfetto. Solo alcune domande per indirizzare la tua richiesta.
            </p>

            <form className="cgForm" onSubmit={onSubmit} noValidate>
              <div className="cgGrid">
                <div className="cgField">
                  <div className="cgLabel">NOME</div>
                  <input ref={firstRef} className="cgInput" name="firstName" autoComplete="given-name" required />
                </div>

                <div className="cgField">
                  <div className="cgLabel">COGNOME</div>
                  <input className="cgInput" name="lastName" autoComplete="family-name" />
                </div>

                <div className="cgField cgFull">
                  <div className="cgLabel">CORSO DI LAUREA</div>
                  <input className="cgInput" name="corso" autoComplete="organization" />
                </div>

                <div className="cgField cgFull">
                  <div className="cgLabel">REPARTO</div>
                  <select className="cgSelect" name="reparto" defaultValue="">
                    <option value="" disabled>
                      Seleziona un reparto…
                    </option>
                    <option>Telaio</option>
                    <option>Motore</option>
                    <option>Sospensioni</option>
                    <option>Aerodinamica</option>
                    <option>Elettronica</option>
                    <option>Informatica</option>
                    <option>Marketing</option>
                    <option>Management</option>
                    <option>Altro</option>
                  </select>
                </div>

                <div className="cgField cgFull">
                  <div className="cgLabel">MESSAGGIO</div>
                  <textarea className="cgTextarea" name="message" required />
                </div>
              </div>

              <div
                className="cgMetaEmail"
                dangerouslySetInnerHTML={{ __html: `Email utilizzata: <b>${escapeHtml(email.trim())}</b>` }}
              />

              <button className={`cgSubmit${isSending ? " is-loading" : ""}`} type="submit" disabled={isSending}>
                {isSending ? (
                  <>
                    <span className="cgSubmitSpinner" aria-hidden="true" />
                    Invio...
                  </>
                ) : (
                  "Invia"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}