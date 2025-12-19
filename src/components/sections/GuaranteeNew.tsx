"use client";

/**
 * GuaranteeNew Component - Money-back guarantee section
 *
 * Usage:
 * ```tsx
 * import { GuaranteeNew } from "@/components/sections";
 *
 * // Default variant (badge + text)
 * <GuaranteeNew
 *   days="180"
 *   headline="Garantía de éxito asegurada"
 *   description="Si no ves resultados, te devolvemos tu dinero"
 *   variant="default"
 * />
 *
 * // Centered variant (all centered)
 * <GuaranteeNew variant="centered" days="90" />
 *
 * // Minimal variant (compact)
 * <GuaranteeNew variant="minimal" days="30" />
 *
 * // With CTA button
 * <GuaranteeNew
 *   ctaText="Comenzar sin riesgo"
 *   ctaLink="/quiz"
 * />
 * ```
 */

import Link from "next/link";
import styles from "./GuaranteeNew.module.css";

// ============================================
// TYPES
// ============================================

interface GuaranteeNewProps {
  days?: string;
  headline?: string;
  description?: string;
  variant?: "default" | "centered" | "minimal";
  ctaText?: string;
  ctaLink?: string;
  termsLink?: string;
  tinaField?: string;
}

// ============================================
// SUB-COMPONENTS
// ============================================

function BadgeCircle({ days }: { days: string }) {
  return (
    <div className={styles.badgeContainer}>
      {/* Dashed circle border */}
      <svg className={styles.badgeSvg} viewBox="0 0 172 172" fill="none">
        <circle
          cx="86"
          cy="86"
          r="80"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray="12 8"
        />
      </svg>

      {/* Inner content */}
      <div className={styles.badgeInner}>
        <span className={styles.daysNumber}>{days}</span>
        <span className={styles.daysLabel}>días</span>
      </div>

      {/* Checkmark badge */}
      <div className={styles.checkBadge}>
        <svg
          className={styles.checkIcon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function GuaranteeNew({
  days = "180",
  headline = "Garantía de éxito asegurada",
  description = "Estamos seguros de que recuperarás tu cabello y sino te devolvemos tu dinero.",
  variant = "default",
  ctaText,
  ctaLink = "/quiz",
  termsLink = "/terminos",
  tinaField,
}: GuaranteeNewProps) {
  const variantClass = styles[`section${variant.charAt(0).toUpperCase() + variant.slice(1)}`];

  return (
    <section
      className={`${styles.section} ${variantClass}`}
      data-tina-field={tinaField}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <BadgeCircle days={days} />

          <div className={styles.textContent}>
            <h2 className={styles.headline}>{headline}</h2>
            <p className={styles.description}>
              {description}{" "}
              <Link href={termsLink} className={styles.termsLink}>
                Términos y condiciones
              </Link>
            </p>

            {ctaText && (
              <Link href={ctaLink} className={styles.ctaButton}>
                {ctaText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
