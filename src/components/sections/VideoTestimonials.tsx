"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { normalizeImageUrl } from "@/lib/images";
import styles from "./VideoTestimonials.module.css";

// ============================================
// TYPES
// ============================================

interface VideoTestimonial {
  name?: string;
  backgroundImage?: string;
  videoUrl?: string;
}

interface VideoTestimonialsProps {
  headline?: string;
  highlightText?: string;
  videos?: VideoTestimonial[];
  ctaText?: string;
  ctaLink?: string;
  tinaField?: string;
}

// ============================================
// DEFAULT DATA
// ============================================

const defaultVideos: VideoTestimonial[] = [
  {
    name: "Usuario 1",
    backgroundImage: "/images/testimonials/video-1.jpg",
    videoUrl: "#",
  },
  {
    name: "Usuario 2",
    backgroundImage: "/images/testimonials/video-2.jpg",
    videoUrl: "#",
  },
  {
    name: "Usuario 3",
    backgroundImage: "/images/testimonials/video-3.jpg",
    videoUrl: "#",
  },
];

// ============================================
// SUB-COMPONENTS
// ============================================

// Play Button Icon
function PlayIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <path
        d="M21 18.5V37.5L38.5 28L21 18.5Z"
        fill="#FCFCFD"
        stroke="#FCFCFD"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

// Video Card Component
function VideoCard({ video }: { video: VideoTestimonial }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        {/* Background Image */}
        <div className={styles.imageContainer}>
          {video.backgroundImage && (
            <Image
              src={normalizeImageUrl(video.backgroundImage)}
              alt={video.name || "Video testimonio"}
              fill
              className={styles.image}
              sizes="323px"
              loading="lazy"
            />
          )}
          {/* Gradient Overlay */}
          <div className={styles.overlay} />
        </div>

        {/* Play Button */}
        <div className={styles.playButton}>
          <PlayIcon />
        </div>
      </div>
    </div>
  );
}

// Navigation Arrows for Mobile
function NavigationArrows({
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
    <div className={styles.navArrows}>
      <button
        onClick={onPrev}
        disabled={!canPrev}
        className={`${styles.navButton} ${!canPrev ? styles.navButtonDisabled : ""}`}
        aria-label="Anterior"
      >
        <ArrowLeftIcon disabled={!canPrev} />
      </button>
      <button
        onClick={onNext}
        disabled={!canNext}
        className={styles.navButton}
        aria-label="Siguiente"
      >
        <ArrowRightIcon disabled={!canNext} />
      </button>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function VideoTestimonials({
  headline = "No lo decimos nosotros, lo dicen",
  highlightText = "nuestros usuarios",
  videos,
  ctaText = "Comienza hoy",
  ctaLink = "/quiz",
  tinaField,
}: VideoTestimonialsProps) {
  const displayVideos = videos && videos.length > 0 ? videos : defaultVideos;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Scroll handlers for mobile
  const scrollToIndex = useCallback((index: number) => {
    if (scrollRef.current) {
      const cardWidth = 323;
      const gap = 16;
      scrollRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  }, []);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  }, [currentIndex, scrollToIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < displayVideos.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  }, [currentIndex, displayVideos.length, scrollToIndex]);

  // Update current index on scroll
  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const cardWidth = 323;
      const gap = 16;
      const scrollLeft = scrollRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      setCurrentIndex(newIndex);
    }
  }, []);

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
          {/* Title */}
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>
              <span className={styles.titleNormal}>{headline} </span>
              <span className={styles.titleHighlight}>{highlightText}</span>
            </h2>
          </div>

          {/* Video Cards */}
          <div className={styles.cardsContainer}>
            {displayVideos.map((video, index) => (
              <VideoCard key={index} video={video} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className={styles.mobileLayout}>
        {/* Title */}
        <h2 className={styles.mobileTitle}>
          <span className={styles.titleNormal}>{headline} </span>
          <span className={styles.titleHighlight}>{highlightText}</span>
        </h2>

        {/* Carousel */}
        <div className={styles.mobileCarousel} ref={scrollRef}>
          {displayVideos.map((video, index) => (
            <VideoCard key={index} video={video} />
          ))}
        </div>

        {/* Navigation Arrows */}
        <NavigationArrows
          onPrev={handlePrev}
          onNext={handleNext}
          canPrev={currentIndex > 0}
          canNext={currentIndex < displayVideos.length - 1}
        />

        {/* CTA Button */}
        <div className={styles.mobileCta}>
          <Link href={ctaLink} className={styles.ctaButton}>
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
