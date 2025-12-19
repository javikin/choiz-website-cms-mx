"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import styles from "./SuccessStories.module.css";

// ============================================
// TYPES
// ============================================

interface Testimonial {
  name?: string;
  age?: number;
  quote?: string;
  beforeImage?: string;
  afterImage?: string;
  monthsBefore?: number;
  monthsAfter?: number;
}

interface SuccessStoriesProps {
  highlightText?: string;
  normalText?: string;
  ctaPrimaryText?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
  testimonials?: Testimonial[];
  tinaField?: string;
}

// ============================================
// TESTIMONIAL CARD COMPONENT
// ============================================

function TestimonialCard({
  testimonial,
  isDesktop = false,
}: {
  testimonial: Testimonial;
  isDesktop?: boolean;
}) {
  const {
    name = "Usuario",
    age = 30,
    quote = "",
    beforeImage = "/images/placeholder-before.jpg",
    afterImage = "/images/placeholder-after.jpg",
    monthsBefore = 0,
    monthsAfter = 3,
  } = testimonial;

  return (
    <div className={isDesktop ? styles.cardDesktop : styles.cardMobile}>
      {/* Before/After Images Container */}
      <div className={styles.imagesContainer}>
        {/* Before Image */}
        <div className={styles.imageWrapper}>
          <div className={styles.beforeImage}>
            <Image
              src={beforeImage}
              alt={`${name} - Antes`}
              fill
              className="object-cover"
            />
          </div>
          <span className={styles.monthBadge}>Mes {monthsBefore}</span>
        </div>

        {/* After Image */}
        <div className={styles.imageWrapper}>
          <div className={styles.afterImage}>
            <Image
              src={afterImage}
              alt={`${name} - Después`}
              fill
              className="object-cover"
            />
          </div>
          <span className={styles.monthBadge}>Mes {monthsAfter}</span>
        </div>
      </div>

      {/* Text Content */}
      <div className={styles.cardContent}>
        <p className={styles.cardName}>
          {name}, {age}
        </p>
        <p className={styles.cardQuote}>"{quote}"</p>
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function SuccessStories({
  highlightText = "+20.000 personas",
  normalText = "ya obtuvieron resultados",
  ctaPrimaryText = "Comienza hoy",
  ctaPrimaryLink = "/quiz",
  ctaSecondaryText = "Ver más casos de éxito",
  ctaSecondaryLink = "/casos-exito",
  testimonials = [],
  tinaField,
}: SuccessStoriesProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Default testimonials if none provided
  const defaultTestimonials: Testimonial[] = [
    {
      name: "Roberto",
      age: 26,
      quote:
        "Llevo 3 meses de tratamiento y ya comienzo a ver avances, sin efectos secundarios y de fácil aplicación, estoy atento de ver los resultados a largo plazo.",
      beforeImage: "/images/testimonials/roberto-before.jpg",
      afterImage: "/images/testimonials/roberto-after.jpg",
      monthsBefore: 0,
      monthsAfter: 3,
    },
    {
      name: "Sergio",
      age: 26,
      quote:
        "Uso Choiz hace 7 meses y la verdad es que estoy teniendo muy buenos resultados. Excelentes productos.",
      beforeImage: "/images/testimonials/sergio-before.jpg",
      afterImage: "/images/testimonials/sergio-after.jpg",
      monthsBefore: 0,
      monthsAfter: 7,
    },
    {
      name: "Fernando",
      age: 46,
      quote:
        "Efectividad contra la caída y sin ningún efecto secundario, estoy muy contento de tomar la decisión de probarlo y de mantener la constancia de uso.",
      beforeImage: "/images/testimonials/fernando-before.jpg",
      afterImage: "/images/testimonials/fernando-after.jpg",
      monthsBefore: 0,
      monthsAfter: 10,
    },
    {
      name: "Rafael",
      age: 36,
      quote:
        "Apenas voy a terminar mi tratamiento de 3 meses. La verdad mi mejor opción fue conocer choiz.",
      beforeImage: "/images/testimonials/rafael-before.jpg",
      afterImage: "/images/testimonials/rafael-after.jpg",
      monthsBefore: 0,
      monthsAfter: 3,
    },
  ];

  const displayTestimonials =
    testimonials.length > 0 ? testimonials : defaultTestimonials;

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const cardWidth = 310 + 16; // card width + gap
      const newActiveSlide = Math.round(scrollLeft / cardWidth);
      setActiveSlide(Math.min(newActiveSlide, displayTestimonials.length - 1));
    }
  };

  const scrollToSlide = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = 310 + 16;
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
          {/* Title */}
          <h2 className={styles.titleDesktop}>
            <span className={styles.highlight}>{highlightText}</span>{" "}
            <span className={styles.normal}>{normalText}</span>
          </h2>

          {/* CTAs */}
          <div className={styles.ctaContainer}>
            <Link href={ctaPrimaryLink} className={styles.ctaPrimary}>
              {ctaPrimaryText}
            </Link>
            <Link href={ctaSecondaryLink} className={styles.ctaSecondary}>
              {ctaSecondaryText}
            </Link>
          </div>
        </div>

        {/* Cards Row */}
        <div className={styles.cardsRowDesktop}>
          {displayTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              isDesktop={true}
            />
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className={styles.mobileLayout}>
        {/* Title */}
        <h2 className={styles.titleMobile}>
          <span className={styles.highlight}>{highlightText}</span>{" "}
          <span className={styles.normal}>{normalText}</span>
        </h2>

        {/* Scrollable Cards */}
        <div
          ref={scrollContainerRef}
          className={styles.cardsScrollMobile}
          onScroll={handleScroll}
        >
          {displayTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              isDesktop={false}
            />
          ))}
        </div>

        {/* Pagination Dots */}
        <div className={styles.pagination}>
          {displayTestimonials.slice(0, 3).map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${
                activeSlide === index ? styles.dotActive : ""
              }`}
              onClick={() => scrollToSlide(index)}
              aria-label={`Ir a testimonio ${index + 1}`}
            />
          ))}
        </div>

        {/* CTAs */}
        <div className={styles.ctaContainerMobile}>
          <Link href={ctaPrimaryLink} className={styles.ctaPrimaryMobile}>
            {ctaPrimaryText}
          </Link>
          <Link href={ctaSecondaryLink} className={styles.ctaSecondaryMobile}>
            {ctaSecondaryText}
          </Link>
        </div>
      </div>
    </section>
  );
}
