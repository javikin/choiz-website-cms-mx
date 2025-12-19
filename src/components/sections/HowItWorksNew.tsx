"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { normalizeImageUrl } from "@/lib/images";
import styles from "./HowItWorksNew.module.css";

// ============================================
// TYPES
// ============================================

interface Step {
  number?: number;
  title?: string;
  description?: string;
  image?: string;
}

interface HowItWorksNewProps {
  headline?: string;
  steps?: Step[];
  ctaText?: string;
  ctaLink?: string;
  tinaField?: string;
}

// ============================================
// DEFAULT DATA
// ============================================

const defaultSteps: Step[] = [
  {
    number: 1,
    title: "Completa el cuestionario",
    description:
      "Contestar el formulario te tomará 5 minutos. Tus respuestas nos permitirán crear una formula personalizada",
    image: "/images/how-it-works/step-1.png",
  },
  {
    number: 2,
    title: "Recibe tu diagnóstico",
    description:
      "Tendrás una consulta con un doctor que evaluará tu caso y formulará un tratamiento a tu medida.",
    image: "/images/how-it-works/step-2.png",
  },
  {
    number: 3,
    title: "Enviamos el tratamiento",
    description:
      "Recibe en tu puerta una cajita con tu tratamiento, incluye: cápsulas, loción, shampoo y vitaminas.",
    image: "/images/how-it-works/step-3.png",
  },
  {
    number: 4,
    title: "Monitoreamos tus resultados",
    description:
      "Realizamos seguimiento a tu evolución para ajustar tu plan si es necesario.",
    image: "/images/how-it-works/step-4.png",
  },
];

// ============================================
// SUB-COMPONENTS
// ============================================

// Arrow Left Icon
function ArrowLeftIcon({ disabled }: { disabled?: boolean }) {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path
        d="M10.5 13L5.5 8.5L10.5 4"
        stroke={disabled ? "#D3D4D5" : "#7C7C7C"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Arrow Right Icon
function ArrowRightIcon({ disabled }: { disabled?: boolean }) {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path
        d="M6.5 4L11.5 8.5L6.5 13"
        stroke={disabled ? "#D3D4D5" : "#7C7C7C"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Step Card Component
function StepCard({ step }: { step: Step }) {
  return (
    <div className={styles.card}>
      {/* Phone Mockup Image */}
      <div className={styles.phoneContainer}>
        {step.image && (
          <Image
            src={normalizeImageUrl(step.image)}
            alt={step.title || `Paso ${step.number}`}
            fill
            className={styles.phoneImage}
            sizes="(max-width: 768px) 272px, 200px"
            loading="lazy"
          />
        )}
      </div>

      {/* Step Info */}
      <div className={styles.stepInfo}>
        {/* Step Number Badge */}
        <div className={styles.stepBadge}>{step.number}</div>

        {/* Title and Description */}
        <div className={styles.stepContent}>
          <h3 className={styles.stepTitle}>{step.title}</h3>
          <p className={styles.stepDescription}>{step.description}</p>
        </div>
      </div>
    </div>
  );
}

// Desktop Navigation Arrows
function DesktopNavArrows({
  onPrev,
  onNext,
  canPrev,
  canNext,
}: {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
}) {
  return (
    <div className={styles.desktopNavArrows}>
      <button
        onClick={onPrev}
        disabled={!canPrev}
        className={`${styles.desktopNavButton} ${!canPrev ? styles.navButtonDisabled : ""}`}
        aria-label="Anterior"
      >
        <ArrowLeftIcon disabled={!canPrev} />
      </button>
      <button
        onClick={onNext}
        disabled={!canNext}
        className={`${styles.desktopNavButton} ${!canNext ? styles.navButtonDisabled : ""}`}
        aria-label="Siguiente"
      >
        <ArrowRightIcon disabled={!canNext} />
      </button>
    </div>
  );
}

// Pagination Dots (Mobile)
function PaginationDots({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  return (
    <div className={styles.paginationDots}>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`${styles.dot} ${index === current ? styles.dotActive : ""}`}
        />
      ))}
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function HowItWorksNew({
  headline = "Cómo funciona Choiz",
  steps,
  ctaText = "Comenzar hoy",
  ctaLink = "/quiz",
  tinaField,
}: HowItWorksNewProps) {
  const displaySteps = steps && steps.length > 0 ? steps : defaultSteps;
  const scrollRef = useRef<HTMLDivElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [desktopIndex, setDesktopIndex] = useState(0);

  // Mobile scroll handlers
  const scrollToIndex = useCallback((index: number) => {
    if (scrollRef.current) {
      const cardWidth = 272;
      const gap = 16;
      const containerWidth = scrollRef.current.clientWidth;
      const scrollPosition =
        index * (cardWidth + gap) - (containerWidth - cardWidth) / 2;
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  }, []);

  // Desktop scroll handlers
  const scrollToDesktopIndex = useCallback((index: number) => {
    if (desktopScrollRef.current) {
      const cardWidth = 200;
      const gap = 32;
      desktopScrollRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth",
      });
      setDesktopIndex(index);
    }
  }, []);

  const handleDesktopPrev = useCallback(() => {
    if (desktopIndex > 0) {
      scrollToDesktopIndex(desktopIndex - 1);
    }
  }, [desktopIndex, scrollToDesktopIndex]);

  const handleDesktopNext = useCallback(() => {
    if (desktopIndex < displaySteps.length - 4) {
      scrollToDesktopIndex(desktopIndex + 1);
    }
  }, [desktopIndex, displaySteps.length, scrollToDesktopIndex]);

  // Update current index on mobile scroll
  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const cardWidth = 272;
      const gap = 16;
      const containerWidth = scrollRef.current.clientWidth;
      const scrollLeft = scrollRef.current.scrollLeft;
      const adjustedScroll = scrollLeft + (containerWidth - cardWidth) / 2;
      const newIndex = Math.round(adjustedScroll / (cardWidth + gap));
      setCurrentIndex(Math.max(0, Math.min(newIndex, displaySteps.length - 1)));
    }
  }, [displaySteps.length]);

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", handleScroll);
      return () => ref.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  return (
    <section className={styles.section} data-tina-field={tinaField}>
      {/* Desktop Layout */}
      <div className={styles.desktopLayout}>
        <div className={styles.container}>
          {/* Header with Title, CTA and Nav Arrows */}
          <div className={styles.header}>
            <h2 className={styles.title}>{headline}</h2>
            <div className={styles.headerRight}>
              <Link href={ctaLink} className={styles.ctaButton}>
                {ctaText}
              </Link>
              <DesktopNavArrows
                onPrev={handleDesktopPrev}
                onNext={handleDesktopNext}
                canPrev={desktopIndex > 0}
                canNext={desktopIndex < displaySteps.length - 4}
              />
            </div>
          </div>

          {/* Steps Cards */}
          <div className={styles.cardsContainer} ref={desktopScrollRef}>
            {displaySteps.map((step, index) => (
              <StepCard key={index} step={{ ...step, number: index + 1 }} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className={styles.mobileLayout}>
        {/* Title */}
        <h2 className={styles.mobileTitle}>{headline}</h2>

        {/* Carousel */}
        <div className={styles.mobileCarousel} ref={scrollRef}>
          {displaySteps.map((step, index) => (
            <StepCard key={index} step={{ ...step, number: index + 1 }} />
          ))}
        </div>

        {/* Pagination Dots */}
        <PaginationDots total={displaySteps.length} current={currentIndex} />

        {/* CTA Button */}
        <div className={styles.mobileCta}>
          <Link href={ctaLink} className={styles.mobileCtaButton}>
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
