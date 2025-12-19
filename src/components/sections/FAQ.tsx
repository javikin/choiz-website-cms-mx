"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";

interface FAQItem {
  question?: string;
  answer?: string;
}

interface FAQProps {
  headline?: string;
  highlightText?: string;
  items?: FAQItem[];
  tinaField?: string;
}

export function FAQ({
  headline = "¿Tienes preguntas? Aquí te dejamos",
  highlightText = "respuestas",
  items = [],
  tinaField,
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className={styles.section} data-tina-field={tinaField}>
      {/* Desktop Layout */}
      <div className={styles.desktopLayout}>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <h2 className={styles.headline}>
              {headline} <span className={styles.highlight}>{highlightText}</span>
            </h2>
          </div>

          {/* FAQ Items */}
          <div className={styles.faqList}>
            {items.map((item, index) => (
              <div key={index} className={styles.faqItem}>
                <button
                  className={styles.faqQuestion}
                  onClick={() => toggleItem(index)}
                  aria-expanded={openIndex === index}
                >
                  <span className={styles.questionText}>{item.question}</span>
                  <span className={styles.icon}>
                    {openIndex === index ? (
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <rect x="8" y="15" width="16" height="2" fill="#383838" />
                      </svg>
                    ) : (
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <rect x="8" y="15" width="16" height="2" fill="#A0A0A0" />
                        <rect x="15" y="8" width="2" height="16" fill="#A0A0A0" />
                      </svg>
                    )}
                  </span>
                </button>
                {openIndex === index && item.answer && (
                  <div className={styles.faqAnswer}>
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className={styles.mobileLayout}>
        <div className={styles.mobileContainer}>
          {/* Header */}
          <h2 className={styles.mobileHeadline}>
            {headline} <span className={styles.highlight}>{highlightText}</span>
          </h2>

          {/* FAQ Items */}
          <div className={styles.mobileFaqList}>
            {items.map((item, index) => (
              <div key={index} className={styles.mobileFaqItem}>
                <button
                  className={styles.mobileFaqQuestion}
                  onClick={() => toggleItem(index)}
                  aria-expanded={openIndex === index}
                >
                  <span className={styles.mobileQuestionText}>{item.question}</span>
                  <span className={styles.mobileIcon}>
                    {openIndex === index ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="5" y="11.5" width="14" height="1.5" fill="#3B3345" />
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="5" y="11.5" width="14" height="1.5" fill="#B1B1B1" />
                        <rect x="11.25" y="5" width="1.5" height="14" fill="#B1B1B1" />
                      </svg>
                    )}
                  </span>
                </button>
                {openIndex === index && item.answer && (
                  <div className={styles.mobileFaqAnswer}>
                    <p>{item.answer}</p>
                  </div>
                )}
                <div className={styles.mobileDivider} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
