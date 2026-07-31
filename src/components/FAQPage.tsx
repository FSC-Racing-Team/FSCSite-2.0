import { useState } from "react";
import "./FAQPage.css";
import PageDrawerMenu from "./PageDrawerMenu";
import FscFooter from "./FscFooter";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQPageProps {
  onNavigate: (page: string) => void;
}

export default function FAQPage({ onNavigate }: FAQPageProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const faqItems: FAQItem[] = [
    {
      id: "faq-1",
      question: "COSA È LA FORMULA STUDENT?",
      answer: "L'obiettivo della competizione è simulare la nascita di una vera e propria start-up gli studenti devono concepire, progettare, costruire e testare un prototipo di auto da corsa in stile Formula Student in autonomia un team di studenti provenienti da università diverse a livello mondiale competono costruendo e testando automobili da corsa leggere in conformità al Regolamento tecnico rigorous di oltre 100 pagine."
    },
    {
      id: "faq-2",
      question: "POSSO UNIRMI ANCHE NON ESSENDO UN INGEGNERE?",
      answer: "Sì, il nostro team è aperto a persone con diverse competenze e background. Abbiamo bisogno non solo di ingegneri, ma anche di designer, specialisti in comunicazione, esperti di finanza e amministrazione, e molti altri. Ogni contributo è prezioso per il successo del progetto."
    },
    {
      id: "faq-3",
      question: "QUALI SONO I REQUISITI DI AMMISSIONE?",
      answer: "I requisiti principali sono: passione per il progetto, disponibilità a dedicare tempo, e voglia di imparare lavorando in team. Specifiche competenze tecniche non sono necessarie, ma la motivazione sì. Cerchiamo persone dedicate che vogliano crescere insieme al team."
    },
    {
      id: "faq-4",
      question: "COME POSSO CONTATTARVI?",
      answer: "Puoi contattarci attraverso il nostro sito nella sezione Contatti, oppure trovare i nostri canali social ufficiali. Rispondiamo il prima possibile a tutte le richieste."
    }
  ];

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <main className="faqPage">
      <PageDrawerMenu onNavigate={onNavigate} currentSection="faq" />
      
      <div className="faqContainer">
        <div className="faqHeader">
          <h1>FREQUENTLY ASKED QUESTIONS</h1>
        </div>

        <div className="faqAccordion">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className={`faqItem ${expandedId === item.id ? "expanded" : ""}`}
            >
              <button
                className="faqQuestion"
                onClick={() => toggleExpanded(item.id)}
                aria-expanded={expandedId === item.id}
                aria-controls={`${item.id}-content`}
              >
                <span className="questionText">{item.question}</span>
                <span className="toggleIcon">+</span>
              </button>
              
              {expandedId === item.id && (
                <div id={`${item.id}-content`} className="faqAnswer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <FscFooter />
    </main>
  );
}
