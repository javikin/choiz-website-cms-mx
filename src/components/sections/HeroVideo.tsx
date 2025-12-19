"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./HeroVideo.module.css";

// ============================================
// TYPES
// ============================================

interface HeroVideoProps {
  variant?: 'fullscreen' | 'background' | 'inline';
  badge?: string;
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaLink?: string;
  videoUrl?: string;
  posterImage?: string;
  tinaField?: string;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Detects video platform and returns embed URL
 * Supports: YouTube, Vimeo, direct video URLs
 */
function getVideoEmbedUrl(url: string): { type: 'youtube' | 'vimeo' | 'direct'; embedUrl: string } | null {
  if (!url) return null;

  // YouTube detection
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1&mute=1&loop=1&playlist=${youtubeMatch[1]}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`
    };
  }

  // Vimeo detection
  const vimeoRegex = /(?:vimeo\.com\/)(\d+)/;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch) {
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=1&loop=1&background=1&controls=0`
    };
  }

  // Direct video URL (mp4, webm, etc.)
  if (url.match(/\.(mp4|webm|ogg)$/i)) {
    return {
      type: 'direct',
      embedUrl: url
    };
  }

  return null;
}

// ============================================
// SUB-COMPONENTS
// ============================================

/**
 * Video player component - handles YouTube, Vimeo, and direct videos
 */
function VideoPlayer({
  videoUrl,
  posterImage,
  variant
}: {
  videoUrl?: string;
  posterImage?: string;
  variant: 'fullscreen' | 'background' | 'inline';
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Autoplay direct videos when ready
    if (videoRef.current && variant !== 'inline') {
      videoRef.current.play().catch(() => {
        // Autoplay failed - user interaction required
      });
    }
  }, [variant]);

  const videoInfo = videoUrl ? getVideoEmbedUrl(videoUrl) : null;

  if (!videoInfo) {
    return posterImage ? (
      <div
        className={styles.posterFallback}
        style={{ backgroundImage: `url(${posterImage})` }}
      />
    ) : null;
  }

  // YouTube or Vimeo iframe
  if (videoInfo.type === 'youtube' || videoInfo.type === 'vimeo') {
    return (
      <iframe
        src={videoInfo.embedUrl}
        className={styles.videoIframe}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        onLoad={() => setIsLoaded(true)}
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
    );
  }

  // Direct video
  return (
    <video
      ref={videoRef}
      className={styles.videoElement}
      autoPlay={variant !== 'inline'}
      muted={variant !== 'inline'}
      loop={variant !== 'inline'}
      playsInline
      controls={variant === 'inline'}
      poster={posterImage}
      onLoadedData={() => setIsLoaded(true)}
      style={{ opacity: isLoaded ? 1 : 0 }}
    >
      <source src={videoInfo.embedUrl} type="video/mp4" />
      Su navegador no soporta el elemento de video.
    </video>
  );
}

/**
 * Content overlay - headline, subheadline, CTA
 */
function ContentOverlay({
  badge,
  headline,
  subheadline,
  ctaText,
  ctaLink,
  variant
}: Pick<HeroVideoProps, 'badge' | 'headline' | 'subheadline' | 'ctaText' | 'ctaLink'> & { variant: string }) {
  return (
    <div className={styles[`content${variant.charAt(0).toUpperCase() + variant.slice(1)}` as keyof typeof styles]}>
      <div className={styles.contentInner}>
        {/* Badge */}
        {badge && (
          <div className={styles.badge}>
            <span className={styles.badgeText}>{badge}</span>
          </div>
        )}

        {/* Headline */}
        {headline && (
          <h1 className={styles.headline} style={{ fontFamily: 'var(--font-dm-sans), system-ui, sans-serif' }}>
            {headline}
          </h1>
        )}

        {/* Subheadline */}
        {subheadline && (
          <p className={styles.subheadline}>{subheadline}</p>
        )}

        {/* CTA Button */}
        {ctaText && ctaLink && (
          <Link href={ctaLink} className={styles.ctaButton}>
            {ctaText}
          </Link>
        )}
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

/**
 * HeroVideo Component
 *
 * Displays a hero section with video background
 * Supports 3 variants:
 * - fullscreen: Video fills entire viewport
 * - background: Video behind text overlay (default)
 * - inline: Video side-by-side with text
 *
 * @example
 * // Background variant (default)
 * <HeroVideo
 *   badge="Nuevo"
 *   headline="Tratamiento revolucionario"
 *   subheadline="Resultados visibles en 90 días"
 *   ctaText="Comenzar ahora"
 *   ctaLink="/quiz"
 *   videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
 *   posterImage="/images/hero-poster.jpg"
 * />
 *
 * @example
 * // Inline variant
 * <HeroVideo
 *   variant="inline"
 *   headline="Mira cómo funciona"
 *   videoUrl="/videos/demo.mp4"
 * />
 */
export function HeroVideo({
  variant = 'background',
  badge = "Nuevo lanzamiento",
  headline = "Descubre el poder del tratamiento capilar",
  subheadline = "Resultados científicamente comprobados en 90 días",
  ctaText = "Comienza hoy",
  ctaLink = "/quiz",
  videoUrl = "",
  posterImage = "",
  tinaField,
}: HeroVideoProps) {
  // Fullscreen variant - video fills viewport
  if (variant === 'fullscreen') {
    return (
      <section
        className={styles.heroFullscreen}
        data-tina-field={tinaField}
      >
        <div className={styles.videoContainer}>
          <VideoPlayer
            videoUrl={videoUrl}
            posterImage={posterImage}
            variant={variant}
          />
          <div className={styles.videoOverlay} />
        </div>
        <ContentOverlay
          badge={badge}
          headline={headline}
          subheadline={subheadline}
          ctaText={ctaText}
          ctaLink={ctaLink}
          variant={variant}
        />
      </section>
    );
  }

  // Inline variant - video side by side with text
  if (variant === 'inline') {
    return (
      <section
        className={styles.heroInline}
        data-tina-field={tinaField}
      >
        <div className={styles.inlineContainer}>
          {/* Content column */}
          <div className={styles.inlineContent}>
            <ContentOverlay
              badge={badge}
              headline={headline}
              subheadline={subheadline}
              ctaText={ctaText}
              ctaLink={ctaLink}
              variant={variant}
            />
          </div>

          {/* Video column */}
          <div className={styles.inlineVideo}>
            <VideoPlayer
              videoUrl={videoUrl}
              posterImage={posterImage}
              variant={variant}
            />
          </div>
        </div>
      </section>
    );
  }

  // Background variant (default) - video behind text
  return (
    <section
      className={styles.heroBackground}
      data-tina-field={tinaField}
    >
      <div className={styles.videoContainer}>
        <VideoPlayer
          videoUrl={videoUrl}
          posterImage={posterImage}
          variant={variant}
        />
        <div className={styles.videoOverlay} />
      </div>
      <ContentOverlay
        badge={badge}
        headline={headline}
        subheadline={subheadline}
        ctaText={ctaText}
        ctaLink={ctaLink}
        variant={variant}
      />
    </section>
  );
}
