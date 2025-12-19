/**
 * PressLogos Component
 *
 * Displays media/press logos with hover effects
 * Supports static grid or auto-scrolling marquee variants
 *
 * @example
 * <PressLogos
 *   headline="Como se ha visto en"
 *   logos={[
 *     { image: '/logos/forbes.svg', name: 'Forbes', url: 'https://...' },
 *     { image: '/logos/techcrunch.svg', name: 'TechCrunch' }
 *   ]}
 *   variant="static"
 * />
 */

import React from 'react';
import Image from 'next/image';
import styles from './PressLogos.module.css';

interface Logo {
  image: string;
  name: string;
  url?: string;
}

interface PressLogosProps {
  headline?: string;
  logos?: Logo[];
  variant?: 'static' | 'slider';
  tinaField?: string;
}

export const PressLogos: React.FC<PressLogosProps> = ({
  headline = 'Como se ha visto en',
  logos = [],
  variant = 'static',
  tinaField,
}) => {
  // If no logos provided, don't render
  if (!logos || logos.length === 0) {
    return null;
  }

  // Logo item renderer with optional link wrapper
  const renderLogo = (logo: Logo, index: number) => {
    const logoContent = (
      <div
        className={styles.logoItem}
        role="img"
        aria-label={logo.name}
      >
        <Image
          src={logo.image}
          alt={logo.name}
          width={120}
          height={60}
          className={styles.logoImage}
          loading="lazy"
        />
      </div>
    );

    // Wrap in link if URL provided
    if (logo.url) {
      return (
        <a
          key={`${logo.name}-${index}`}
          href={logo.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.logoLink}
          aria-label={`Ver artículo en ${logo.name}`}
        >
          {logoContent}
        </a>
      );
    }

    return (
      <div key={`${logo.name}-${index}`}>
        {logoContent}
      </div>
    );
  };

  // Static grid variant
  if (variant === 'static') {
    return (
      <section
        className={styles.section}
        aria-label="Menciones en medios"
        data-tina-field={tinaField}
      >
        <div className={styles.container}>
          {headline && (
            <h2 className={styles.headline}>{headline}</h2>
          )}
          <div className={styles.logosGrid}>
            {logos.map((logo, index) => renderLogo(logo, index))}
          </div>
        </div>
      </section>
    );
  }

  // Slider/marquee variant
  return (
    <section
      className={styles.section}
      aria-label="Menciones en medios"
      data-tina-field={tinaField}
    >
      <div className={styles.container}>
        {headline && (
          <h2 className={styles.headline}>{headline}</h2>
        )}
        <div className={styles.sliderContainer}>
          <div className={styles.sliderTrack}>
            {/* Duplicate logos for seamless infinite scroll */}
            {[...logos, ...logos].map((logo, index) => renderLogo(logo, index))}
          </div>
        </div>
      </div>
    </section>
  );
};
