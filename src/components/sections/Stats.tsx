"use client";

/**
 * Stats Component - Display statistics with animated numbers
 *
 * Usage:
 * ```tsx
 * import { Stats } from "@/components/sections";
 *
 * // Default variant (no background)
 * <Stats
 *   headline="Nuestros resultados"
 *   stats={[
 *     { value: "+20,000", label: "Personas tratadas" },
 *     { value: "90%", label: "Tasa de satisfacción" },
 *     { value: "180 días", label: "Promedio de resultados" },
 *   ]}
 * />
 *
 * // Cards variant (with shadows and borders)
 * <Stats
 *   headline="Lo que nos diferencia"
 *   variant="cards"
 *   stats={[
 *     { value: "100%", label: "En línea", icon: "/images/icons/online.svg" },
 *     { value: "24h", label: "Envío gratis", icon: "/images/icons/shipping.svg" },
 *   ]}
 * />
 *
 * // Minimal variant (compact padding)
 * <Stats variant="minimal" stats={[...]} />
 * ```
 *
 * Features:
 * - Animated number counting on scroll
 * - Responsive grid (2-4 columns on desktop, stack on mobile)
 * - Optional icons
 * - Three visual variants
 * - Accessibility: respects prefers-reduced-motion
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Stats.module.css";

// ============================================
// TYPES
// ============================================

interface Stat {
  value?: string;
  label?: string;
  icon?: string;
}

interface StatsProps {
  headline?: string;
  stats?: Stat[];
  variant?: "default" | "cards" | "minimal";
  tinaField?: string;
}

// ============================================
// STAT CARD COMPONENT
// ============================================

function StatCard({
  stat,
  variant = "default",
  animate = false,
}: {
  stat: Stat;
  variant: "default" | "cards" | "minimal";
  animate?: boolean;
}) {
  const { value = "0", label = "Estadística", icon } = stat;
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!animate) {
      setDisplayValue(value);
      return;
    }

    // Extract numeric value for animation
    const numericMatch = value.match(/[\d,]+/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseInt(numericMatch[0].replace(/,/g, ""), 10);
    if (isNaN(targetNum)) {
      setDisplayValue(value);
      return;
    }

    // Animate from 0 to target
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetNum / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, targetNum);

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(value); // Show final value with formatting
      } else {
        // Format intermediate value
        const formatted = Math.floor(current).toLocaleString("es-MX");
        setDisplayValue(value.replace(/[\d,]+/, formatted));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, animate]);

  return (
    <div className={`${styles.statCard} ${styles[`statCard${variant.charAt(0).toUpperCase() + variant.slice(1)}`]}`}>
      {icon && (
        <div className={styles.iconContainer}>
          <Image src={icon} alt="" width={40} height={40} className={styles.icon} />
        </div>
      )}
      <div className={styles.statContent}>
        <div className={styles.statValue}>{displayValue}</div>
        <div className={styles.statLabel}>{label}</div>
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function Stats({
  headline = "Nuestros resultados",
  stats = [],
  variant = "default",
  tinaField,
}: StatsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Default stats if none provided
  const defaultStats: Stat[] = [
    { value: "+20,000", label: "Personas tratadas" },
    { value: "90%", label: "Tasa de satisfacción" },
    { value: "180 días", label: "Promedio de resultados" },
    { value: "100%", label: "En línea" },
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${styles[`section${variant.charAt(0).toUpperCase() + variant.slice(1)}`]}`}
      data-tina-field={tinaField}
    >
      {/* Desktop Layout */}
      <div className={styles.desktopLayout}>
        {headline && <h2 className={styles.headline}>{headline}</h2>}

        <div className={styles.statsGrid}>
          {displayStats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              variant={variant}
              animate={isVisible}
            />
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className={styles.mobileLayout}>
        {headline && <h2 className={styles.headline}>{headline}</h2>}

        <div className={styles.statsStack}>
          {displayStats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              variant={variant}
              animate={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
