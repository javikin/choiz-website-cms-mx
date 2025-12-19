"use client";

/**
 * Benefits Component - Display product/service benefits
 *
 * Usage:
 * ```tsx
 * import { Benefits } from "@/components/sections";
 *
 * // Default variant (grid with icons)
 * <Benefits
 *   headline="¿Por qué elegir Choiz?"
 *   subheadline="Todo lo que necesitas para recuperar tu cabello"
 *   benefits={[
 *     {
 *       icon: "/images/icons/science.svg",
 *       title: "Ciencia comprobada",
 *       description: "Fórmulas respaldadas por estudios clínicos"
 *     },
 *     {
 *       icon: "/images/icons/doctor.svg",
 *       title: "Médicos certificados",
 *       description: "Seguimiento personalizado con especialistas"
 *     }
 *   ]}
 * />
 *
 * // Cards variant (elevated cards)
 * <Benefits variant="cards" benefits={[...]} />
 *
 * // List variant (compact list)
 * <Benefits variant="list" benefits={[...]} />
 *
 * // Comparison variant (us vs them)
 * <Benefits variant="comparison" benefits={[...]} competitorName="Otros" />
 * ```
 */

import Image from "next/image";
import styles from "./Benefits.module.css";

// ============================================
// TYPES
// ============================================

interface Benefit {
  icon?: string;
  title?: string;
  description?: string;
  competitorHas?: boolean; // For comparison variant
}

interface BenefitsProps {
  headline?: string;
  subheadline?: string;
  benefits?: Benefit[];
  variant?: "default" | "cards" | "list" | "comparison";
  competitorName?: string;
  tinaField?: string;
}

// ============================================
// ICON FALLBACKS
// ============================================

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.checkIcon}>
    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.xIcon}>
    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ============================================
// BENEFIT CARD COMPONENT
// ============================================

function BenefitCard({
  benefit,
  variant,
}: {
  benefit: Benefit;
  variant: "default" | "cards" | "list";
}) {
  const { icon, title = "Beneficio", description } = benefit;

  return (
    <div className={`${styles.benefitCard} ${styles[`benefitCard${variant.charAt(0).toUpperCase() + variant.slice(1)}`]}`}>
      <div className={styles.iconWrapper}>
        {icon ? (
          <Image src={icon} alt="" width={48} height={48} className={styles.icon} />
        ) : (
          <div className={styles.iconPlaceholder}>
            <CheckIcon />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.benefitTitle}>{title}</h3>
        {description && <p className={styles.benefitDescription}>{description}</p>}
      </div>
    </div>
  );
}

// ============================================
// COMPARISON ROW COMPONENT
// ============================================

function ComparisonRow({
  benefit,
  competitorName,
}: {
  benefit: Benefit;
  competitorName: string;
}) {
  const { title = "Característica", competitorHas = false } = benefit;

  return (
    <div className={styles.comparisonRow}>
      <div className={styles.comparisonFeature}>{title}</div>
      <div className={`${styles.comparisonCell} ${styles.comparisonUs}`}>
        <CheckIcon />
      </div>
      <div className={`${styles.comparisonCell} ${competitorHas ? styles.comparisonHas : styles.comparisonNot}`}>
        {competitorHas ? <CheckIcon /> : <XIcon />}
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function Benefits({
  headline = "¿Por qué elegir Choiz?",
  subheadline,
  benefits = [],
  variant = "default",
  competitorName = "Otros",
  tinaField,
}: BenefitsProps) {
  // Default benefits if none provided
  const defaultBenefits: Benefit[] = [
    {
      title: "100% en línea",
      description: "Sin salir de casa, todo desde tu celular",
    },
    {
      title: "Médicos certificados",
      description: "Especialistas en salud capilar te acompañan",
    },
    {
      title: "Envío gratis",
      description: "Recibe tu tratamiento en la puerta de tu casa",
    },
    {
      title: "Garantía de resultados",
      description: "Si no ves mejoras, te devolvemos tu dinero",
    },
  ];

  const displayBenefits = benefits.length > 0 ? benefits : defaultBenefits;

  return (
    <section className={styles.section} data-tina-field={tinaField}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.headline}>{headline}</h2>
          {subheadline && <p className={styles.subheadline}>{subheadline}</p>}
        </div>

        {/* Default Grid Variant */}
        {variant === "default" && (
          <div className={styles.grid}>
            {displayBenefits.map((benefit, index) => (
              <BenefitCard key={index} benefit={benefit} variant="default" />
            ))}
          </div>
        )}

        {/* Cards Variant */}
        {variant === "cards" && (
          <div className={styles.cardsGrid}>
            {displayBenefits.map((benefit, index) => (
              <BenefitCard key={index} benefit={benefit} variant="cards" />
            ))}
          </div>
        )}

        {/* List Variant */}
        {variant === "list" && (
          <div className={styles.list}>
            {displayBenefits.map((benefit, index) => (
              <BenefitCard key={index} benefit={benefit} variant="list" />
            ))}
          </div>
        )}

        {/* Comparison Variant */}
        {variant === "comparison" && (
          <div className={styles.comparisonTable}>
            <div className={styles.comparisonHeader}>
              <div className={styles.comparisonFeature}></div>
              <div className={styles.comparisonCell + " " + styles.comparisonHeaderCell}>
                <span className={styles.comparisonBrand}>Choiz</span>
              </div>
              <div className={styles.comparisonCell + " " + styles.comparisonHeaderCell}>
                <span className={styles.comparisonCompetitor}>{competitorName}</span>
              </div>
            </div>
            {displayBenefits.map((benefit, index) => (
              <ComparisonRow
                key={index}
                benefit={benefit}
                competitorName={competitorName}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
