"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./CtaTimer.module.css";

// ============================================
// TYPES
// ============================================

interface CtaTimerProps {
  variant?: "countdown" | "urgency" | "limited";
  headline?: string;
  subheadline?: string;
  endDate?: string; // ISO date string
  ctaText?: string;
  ctaLink?: string;
  limitedText?: string; // "Solo 10 lugares disponibles"
  tinaField?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

// ============================================
// UTILITIES
// ============================================

/**
 * Calculate time remaining until end date
 */
function calculateTimeRemaining(endDate: string): TimeRemaining {
  const end = new Date(endDate).getTime();
  const now = new Date().getTime();
  const difference = end - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false,
  };
}

/**
 * Format number with leading zero
 */
function formatTimeUnit(value: number): string {
  return value.toString().padStart(2, "0");
}

// ============================================
// COUNTDOWN TIMER DISPLAY
// ============================================

interface TimerDisplayProps {
  timeRemaining: TimeRemaining;
  variant: "countdown" | "urgency" | "limited";
}

function TimerDisplay({ timeRemaining, variant }: TimerDisplayProps) {
  const { days, hours, minutes, seconds, isExpired } = timeRemaining;

  if (isExpired) {
    return (
      <div className={styles.expiredMessage}>La oferta ha terminado</div>
    );
  }

  // Countdown variant: Big timer boxes
  if (variant === "countdown") {
    return (
      <div className={styles.timerGrid}>
        <div className={styles.timeBox}>
          <div className={styles.timeValue}>{formatTimeUnit(days)}</div>
          <div className={styles.timeLabel}>Días</div>
        </div>
        <div className={styles.timeSeparator}>:</div>
        <div className={styles.timeBox}>
          <div className={styles.timeValue}>{formatTimeUnit(hours)}</div>
          <div className={styles.timeLabel}>Horas</div>
        </div>
        <div className={styles.timeSeparator}>:</div>
        <div className={styles.timeBox}>
          <div className={styles.timeValue}>{formatTimeUnit(minutes)}</div>
          <div className={styles.timeLabel}>Minutos</div>
        </div>
        <div className={styles.timeSeparator}>:</div>
        <div className={styles.timeBox}>
          <div className={styles.timeValue}>{formatTimeUnit(seconds)}</div>
          <div className={styles.timeLabel}>Segundos</div>
        </div>
      </div>
    );
  }

  // Urgency & Limited variants: Inline timer
  return (
    <div className={styles.inlineTimer}>
      <span className={styles.inlineTimeUnit}>
        {formatTimeUnit(days)}d
      </span>
      <span className={styles.inlineTimeUnit}>
        {formatTimeUnit(hours)}h
      </span>
      <span className={styles.inlineTimeUnit}>
        {formatTimeUnit(minutes)}m
      </span>
      <span className={styles.inlineTimeUnit}>
        {formatTimeUnit(seconds)}s
      </span>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function CtaTimer({
  variant = "countdown",
  headline = "Oferta por tiempo limitado",
  subheadline = "Aprovecha esta oportunidad única",
  endDate,
  ctaText = "Aprovecha ahora",
  ctaLink = "/quiz",
  limitedText = "Solo 10 lugares disponibles",
  tinaField,
}: CtaTimerProps) {
  // Default end date: 7 days from now
  const defaultEndDate = new Date();
  defaultEndDate.setDate(defaultEndDate.getDate() + 7);

  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(
    calculateTimeRemaining(endDate || defaultEndDate.toISOString())
  );

  // Update timer every second
  useEffect(() => {
    const targetDate = endDate || defaultEndDate.toISOString();

    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate, defaultEndDate]);

  // Variant-specific class names
  const sectionClass = `${styles.section} ${styles[variant]}`;
  const containerClass = `${styles.container} ${styles[`${variant}Container`]}`;

  return (
    <section className={sectionClass} data-tina-field={tinaField}>
      {/* Desktop Layout */}
      <div className={styles.desktopLayout}>
        <div className={containerClass}>
          <div className={styles.content}>
            {/* Limited variant: show limited text prominently */}
            {variant === "limited" && limitedText && (
              <div className={styles.limitedBadge}>{limitedText}</div>
            )}

            <h2 className={styles.headline}>{headline}</h2>

            {subheadline && (
              <p className={styles.subheadline}>{subheadline}</p>
            )}

            <TimerDisplay timeRemaining={timeRemaining} variant={variant} />

            {!timeRemaining.isExpired && (
              <Link href={ctaLink} className={styles.ctaButton}>
                {ctaText}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className={styles.mobileLayout}>
        <div className={`${styles.mobileContainer} ${styles[`mobile${variant.charAt(0).toUpperCase() + variant.slice(1)}`]}`}>
          <div className={styles.mobileContent}>
            {/* Limited variant: show limited text prominently */}
            {variant === "limited" && limitedText && (
              <div className={styles.mobileLimitedBadge}>{limitedText}</div>
            )}

            <h2 className={styles.mobileHeadline}>{headline}</h2>

            {subheadline && (
              <p className={styles.mobileSubheadline}>{subheadline}</p>
            )}

            <TimerDisplay timeRemaining={timeRemaining} variant={variant} />

            {!timeRemaining.isExpired && (
              <Link href={ctaLink} className={styles.mobileCtaButton}>
                {ctaText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
