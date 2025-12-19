"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import styles from "./Formulas.module.css";

// ============================================
// TYPES
// ============================================

interface Tag {
  text?: string;
  variant?: "purple" | "blue";
}

interface Formula {
  name?: string;
  image?: string;
  tags?: Tag[];
  ctaText?: string;
  ctaLink?: string;
}

interface FormulasProps {
  headline?: string;
  highlightText?: string;
  formulas?: Formula[];
  tinaField?: string;
}

// ============================================
// TAG COMPONENT
// ============================================

function FormulaTag({ text, variant = "purple" }: Tag) {
  return (
    <span
      className={`${styles.tag} ${
        variant === "blue" ? styles.tagBlue : styles.tagPurple
      }`}
    >
      {text}
    </span>
  );
}

// ============================================
// FORMULA CARD COMPONENT
// ============================================

function FormulaCard({ formula }: { formula: Formula }) {
  const {
    name = "Producto",
    image = "/images/placeholder-product.png",
    tags = [],
    ctaText = "Ver si soy apto",
    ctaLink = "/quiz",
  } = formula;

  return (
    <div className={styles.card}>
      {/* Image Container with Tags */}
      <div className={styles.imageContainer}>
        {/* Tags */}
        {tags.length > 0 && (
          <div className={styles.tagsContainer}>
            {tags.map((tag, index) => (
              <FormulaTag key={index} text={tag.text} variant={tag.variant} />
            ))}
          </div>
        )}

        {/* Product Image */}
        <div className={styles.productImageWrapper}>
          <Image
            src={image}
            alt={name}
            width={111}
            height={136}
            className={styles.productImage}
          />
        </div>
      </div>

      {/* Product Name */}
      <div className={styles.cardContent}>
        <p className={styles.productName}>{name}</p>
      </div>

      {/* CTA Button */}
      <div className={styles.cardCta}>
        <Link href={ctaLink} className={styles.ctaButton}>
          {ctaText}
        </Link>
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function Formulas({
  headline = "Creamos",
  highlightText = "fórmulas personalizadas",
  formulas = [],
  tinaField,
}: FormulasProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Default formulas if none provided
  const defaultFormulas: Formula[] = [
    {
      name: "Dutasteride 0.5mg + Minoxidil 1.25/2.5/3.75/5mg + Biotina 2.5mg (Oral)",
      image: "/images/products/capsulas-1.png",
      tags: [
        { text: "Cápsulas", variant: "purple" },
        { text: "Fácil adopción", variant: "blue" },
      ],
      ctaText: "Ver si soy apto",
      ctaLink: "/quiz",
    },
    {
      name: "Dutasteride 0.25% + Minoxidil 7% + Tretinoína 0.0125% (Tópico)",
      image: "/images/products/locion-1.png",
      tags: [{ text: "Loción", variant: "purple" }],
      ctaText: "Ver si soy apto",
      ctaLink: "/quiz",
    },
    {
      name: "Finasterida 1mg + Minoxidil 2.5/3.75/5mg (Oral)",
      image: "/images/products/capsulas-2.png",
      tags: [
        { text: "Cápsulas", variant: "purple" },
        { text: "Fácil adopción", variant: "blue" },
      ],
      ctaText: "Ver si soy apto",
      ctaLink: "/quiz",
    },
    {
      name: "Minoxidil 2.5/3.75/5mg (Oral)",
      image: "/images/products/capsulas-3.png",
      tags: [
        { text: "Cápsulas", variant: "purple" },
        { text: "Fácil adopción", variant: "blue" },
      ],
      ctaText: "Ver si soy apto",
      ctaLink: "/quiz",
    },
  ];

  const displayFormulas = formulas.length > 0 ? formulas : defaultFormulas;

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const cardWidth = 297 + 16; // card width + gap
      const newActiveSlide = Math.round(scrollLeft / cardWidth);
      setActiveSlide(Math.min(newActiveSlide, displayFormulas.length - 1));
    }
  };

  const scrollToSlide = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = 297 + 16;
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
        {/* Title */}
        <div className={styles.titleContainer}>
          <h2 className={styles.titleDesktop}>
            <span className={styles.normal}>{headline} </span>
            <span className={styles.highlight}>{highlightText} </span>
            <span className={styles.normal}>para maximizar los resultados</span>
          </h2>
        </div>

        {/* Cards Row */}
        <div className={styles.cardsRowDesktop}>
          {displayFormulas.map((formula, index) => (
            <FormulaCard key={index} formula={formula} />
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className={styles.mobileLayout}>
        {/* Title */}
        <h2 className={styles.titleMobile}>
          <span className={styles.normal}>{headline} </span>
          <span className={styles.highlight}>{highlightText}</span>
          <span className={styles.normal}> para maximizar los resultados</span>
        </h2>

        {/* Scrollable Cards */}
        <div
          ref={scrollContainerRef}
          className={styles.cardsScrollMobile}
          onScroll={handleScroll}
        >
          {displayFormulas.map((formula, index) => (
            <FormulaCard key={index} formula={formula} />
          ))}
        </div>

        {/* Pagination Dots */}
        <div className={styles.pagination}>
          {displayFormulas.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${
                activeSlide === index ? styles.dotActive : ""
              }`}
              onClick={() => scrollToSlide(index)}
              aria-label={`Ir a fórmula ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
