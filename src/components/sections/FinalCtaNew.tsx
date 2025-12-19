"use client";

import Image from "next/image";
import Link from "next/link";
import { normalizeImageUrl } from "@/lib/images";
import styles from "./FinalCtaNew.module.css";

// ============================================
// TYPES
// ============================================

interface FinalCtaNewProps {
  headline?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  tinaField?: string;
}

// ============================================
// MAIN COMPONENT
// ============================================

export function FinalCtaNew({
  headline = "Recupera tu cabello y tu confianza con Choiz",
  ctaText = "Comienza hoy",
  ctaLink = "/quiz",
  backgroundImage = "/images/final-cta-bg.jpg",
  tinaField,
}: FinalCtaNewProps) {
  return (
    <section className={styles.section} data-tina-field={tinaField}>
      {/* Desktop Layout */}
      <div className={styles.desktopLayout}>
        <div className={styles.container}>
          {/* Background Image */}
          <div className={styles.imageContainer}>
            {backgroundImage && (
              <Image
                src={normalizeImageUrl(backgroundImage)}
                alt="Recupera tu cabello"
                fill
                className={styles.image}
                sizes="1024px"
                loading="lazy"
              />
            )}
            {/* Dark Overlay */}
            <div className={styles.overlay} />
          </div>

          {/* Content */}
          <div className={styles.content}>
            <h2 className={styles.headline}>{headline}</h2>
            <Link href={ctaLink} className={styles.ctaButton}>
              {ctaText}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className={styles.mobileLayout}>
        <div className={styles.mobileContainer}>
          {/* Background Image */}
          <div className={styles.mobileImageContainer}>
            {backgroundImage && (
              <Image
                src={normalizeImageUrl(backgroundImage)}
                alt="Recupera tu cabello"
                fill
                className={styles.image}
                sizes="343px"
                loading="lazy"
              />
            )}
            {/* Gradient Overlay */}
            <div className={styles.mobileOverlay} />
          </div>

          {/* Content */}
          <div className={styles.mobileContent}>
            <h2 className={styles.mobileHeadline}>{headline}</h2>
            <Link href={ctaLink} className={styles.mobileCtaButton}>
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
