"use client";

/**
 * BeforeAfter Component - Interactive before/after image comparison
 *
 * Usage:
 * ```tsx
 * import { BeforeAfter } from "@/components/sections";
 *
 * // Slider variant (drag to compare)
 * <BeforeAfter
 *   headline="Resultados reales"
 *   subheadline="Desliza para comparar"
 *   variant="slider"
 *   cases={[
 *     {
 *       beforeImage: "/images/before-1.jpg",
 *       afterImage: "/images/after-1.jpg",
 *       name: "Carlos M.",
 *       duration: "6 meses",
 *       product: "Kit Premium"
 *     }
 *   ]}
 * />
 *
 * // Side by side variant
 * <BeforeAfter variant="sideBySide" cases={[...]} />
 *
 * // Grid variant (multiple cases)
 * <BeforeAfter variant="grid" cases={[...]} />
 * ```
 */

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import styles from "./BeforeAfter.module.css";

// ============================================
// TYPES
// ============================================

interface Case {
  beforeImage?: string;
  afterImage?: string;
  name?: string;
  duration?: string;
  product?: string;
  testimonial?: string;
}

interface BeforeAfterProps {
  headline?: string;
  subheadline?: string;
  cases?: Case[];
  variant?: "slider" | "sideBySide" | "grid";
  tinaField?: string;
}

// ============================================
// SLIDER COMPONENT
// ============================================

function ImageSlider({ case: caseData }: { case: Case }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current || !isDragging) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
      setSliderPosition(percentage);
    },
    [isDragging]
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchend", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, []);

  const beforeImage = caseData.beforeImage || "/images/placeholder.jpg";
  const afterImage = caseData.afterImage || "/images/placeholder.jpg";

  return (
    <div className={styles.sliderCard}>
      <div
        ref={containerRef}
        className={styles.sliderContainer}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* After Image (background) */}
        <div className={styles.imageWrapper}>
          <Image
            src={afterImage}
            alt="Después"
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <span className={styles.label + " " + styles.labelAfter}>Después</span>
        </div>

        {/* Before Image (clipped) */}
        <div
          className={styles.beforeWrapper}
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={beforeImage}
            alt="Antes"
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <span className={styles.label + " " + styles.labelBefore}>Antes</span>
        </div>

        {/* Slider Handle */}
        <div
          className={styles.sliderHandle}
          style={{ left: `${sliderPosition}%` }}
        >
          <div className={styles.sliderLine} />
          <div className={styles.sliderButton}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8l4 4-4 4M6 8l-4 4 4 4" />
            </svg>
          </div>
        </div>
      </div>

      {/* Case Info */}
      {(caseData.name || caseData.duration || caseData.product) && (
        <div className={styles.caseInfo}>
          {caseData.name && <span className={styles.caseName}>{caseData.name}</span>}
          {caseData.duration && (
            <span className={styles.caseDuration}>{caseData.duration} de tratamiento</span>
          )}
          {caseData.product && (
            <span className={styles.caseProduct}>Usando: {caseData.product}</span>
          )}
        </div>
      )}

      {caseData.testimonial && (
        <p className={styles.testimonial}>"{caseData.testimonial}"</p>
      )}
    </div>
  );
}

// ============================================
// SIDE BY SIDE COMPONENT
// ============================================

function SideBySide({ case: caseData }: { case: Case }) {
  const beforeImage = caseData.beforeImage || "/images/placeholder.jpg";
  const afterImage = caseData.afterImage || "/images/placeholder.jpg";

  return (
    <div className={styles.sideBySideCard}>
      <div className={styles.sideBySideImages}>
        <div className={styles.sideBySideImage}>
          <Image
            src={beforeImage}
            alt="Antes"
            fill
            className={styles.image}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <span className={styles.label + " " + styles.labelBefore}>Antes</span>
        </div>
        <div className={styles.sideBySideImage}>
          <Image
            src={afterImage}
            alt="Después"
            fill
            className={styles.image}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <span className={styles.label + " " + styles.labelAfter}>Después</span>
        </div>
      </div>

      {(caseData.name || caseData.duration) && (
        <div className={styles.caseInfo}>
          {caseData.name && <span className={styles.caseName}>{caseData.name}</span>}
          {caseData.duration && (
            <span className={styles.caseDuration}>{caseData.duration}</span>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function BeforeAfter({
  headline = "Resultados reales de clientes",
  subheadline,
  cases = [],
  variant = "slider",
  tinaField,
}: BeforeAfterProps) {
  // Default cases if none provided
  const defaultCases: Case[] = [
    {
      beforeImage: "/images/before-placeholder.jpg",
      afterImage: "/images/after-placeholder.jpg",
      name: "Cliente Ejemplo",
      duration: "6 meses",
      product: "Kit Premium",
    },
  ];

  const displayCases = cases.length > 0 ? cases : defaultCases;

  return (
    <section className={styles.section} data-tina-field={tinaField}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.headline}>{headline}</h2>
          {subheadline && <p className={styles.subheadline}>{subheadline}</p>}
        </div>

        {variant === "slider" && (
          <div className={styles.sliderLayout}>
            {displayCases.map((caseData, index) => (
              <ImageSlider key={index} case={caseData} />
            ))}
          </div>
        )}

        {variant === "sideBySide" && (
          <div className={styles.sideBySideLayout}>
            {displayCases.map((caseData, index) => (
              <SideBySide key={index} case={caseData} />
            ))}
          </div>
        )}

        {variant === "grid" && (
          <div className={styles.gridLayout}>
            {displayCases.map((caseData, index) => (
              <SideBySide key={index} case={caseData} />
            ))}
          </div>
        )}

        <p className={styles.disclaimer}>
          * Los resultados pueden variar de persona a persona
        </p>
      </div>
    </section>
  );
}
