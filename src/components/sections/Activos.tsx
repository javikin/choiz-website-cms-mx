"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import styles from "./Activos.module.css";

// ============================================
// TYPES
// ============================================

interface Activo {
  name?: string;
  description?: string;
  image?: string;
}

interface ActivosProps {
  headline?: string;
  highlightText?: string;
  ctaText?: string;
  ctaLink?: string;
  activos?: Activo[];
  tinaField?: string;
}

// ============================================
// ACTIVO CARD COMPONENT
// ============================================

function ActivoCard({ activo }: { activo: Activo }) {
  const {
    name = "Activo",
    description = "Descripción del activo",
    image = "/images/activos/placeholder.png",
  } = activo;

  return (
    <div className={styles.card}>
      {/* Text Content */}
      <div className={styles.cardContent}>
        <h3 className={styles.activoName}>{name}</h3>
        <p className={styles.activoDescription}>{description}</p>
      </div>

      {/* Image */}
      <div className={styles.imageContainer}>
        <Image
          src={image}
          alt={name}
          width={140}
          height={100}
          className={styles.activoImage}
        />
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function Activos({
  headline = "Utilizamos activos de calidad y con",
  highlightText = "evidencia científica",
  ctaText = "Encontrar mi fórmula personalizada",
  ctaLink = "/quiz",
  activos = [],
  tinaField,
}: ActivosProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Default activos if none provided
  const defaultActivos: Activo[] = [
    {
      name: "Dutasterida",
      description: "Detiene la caída y promueve el crecimiento del folículo",
      image: "/images/activos/dutasterida.png",
    },
    {
      name: "Minoxidil",
      description:
        "Reactiva los folículos dañados y favorece la circulación sanguínea",
      image: "/images/activos/minoxidil.png",
    },
    {
      name: "Finasterida",
      description: "Detiene la caída y promueve el crecimiento del folículo",
      image: "/images/activos/finasterida.png",
    },
    {
      name: "Biotina",
      description: "Mejora el grosor y la textura del cabello",
      image: "/images/activos/biotina.png",
    },
    {
      name: "Tretinoína",
      description: "Mejora la absorción del Minoxidil",
      image: "/images/activos/tretinoina.png",
    },
  ];

  const displayActivos = activos.length > 0 ? activos : defaultActivos;

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const cardWidth = 190 + 16; // card width + gap
      const newActiveSlide = Math.round(scrollLeft / cardWidth);
      setActiveSlide(Math.min(newActiveSlide, displayActivos.length - 1));
    }
  };

  const scrollToSlide = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = 190 + 16;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
      setActiveSlide(index);
    }
  };

  return (
    <section className={styles.section} data-tina-field={tinaField}>
      {/* Desktop Layout */}
      <div className={styles.desktopLayout}>
        {/* Header Row */}
        <div className={styles.headerRow}>
          <h2 className={styles.titleDesktop}>
            <span className={styles.normal}>{headline} </span>
            <span className={styles.highlight}>{highlightText}</span>
          </h2>
          <Link href={ctaLink} className={styles.ctaDesktop}>
            {ctaText}
          </Link>
        </div>

        {/* Cards Row */}
        <div className={styles.cardsRowDesktop}>
          {displayActivos.map((activo, index) => (
            <ActivoCard key={index} activo={activo} />
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className={styles.mobileLayout}>
        {/* Title */}
        <h2 className={styles.titleMobile}>
          <span className={styles.normal}>{headline} </span>
          <span className={styles.highlight}>{highlightText}</span>
        </h2>

        {/* Scrollable Cards */}
        <div
          ref={scrollContainerRef}
          className={styles.cardsScrollMobile}
          onScroll={handleScroll}
        >
          {displayActivos.map((activo, index) => (
            <ActivoCard key={index} activo={activo} />
          ))}
        </div>

        {/* CTA Button */}
        <Link href={ctaLink} className={styles.ctaMobile}>
          {ctaText}
        </Link>
      </div>
    </section>
  );
}
