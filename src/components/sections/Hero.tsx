"use client";

import Image from "next/image";
import Link from "next/link";
import { normalizeImageUrl } from "@/lib/images";
import styles from "./Hero.module.css";

// ============================================
// TYPES
// ============================================

interface HeroProps {
  badge?: string;
  headline?: string;
  benefits?: Array<{ text?: string }>;
  ctaText?: string;
  ctaLink?: string;
  priceText?: string;
  backgroundImage?: string;
  backgroundImageMobile?: string;
  tinaField?: string;
}

// ============================================
// SUB-COMPONENTS
// ============================================

// Check icon (24x24 circle with checkmark)
function CheckIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="10" stroke="#FCFCFD" strokeWidth="1.5" />
      <path
        d="M8 12L11 15L16 9"
        stroke="#FCFCFD"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function Hero({
  badge = "+20.000 personas ya vieron resultados",
  headline = "El tratamiento más efectivo de México para la caída del cabello",
  benefits = [
    { text: "Resultados en 90 - 180 días" },
    { text: "Científicamente comprobado" },
    { text: "100% en línea, con envío gratis" },
  ],
  ctaText = "Comienza hoy",
  ctaLink = "/quiz",
  priceText = "Desde $467/mes",
  backgroundImage = "/images/bg-hero-desk.png",
  backgroundImageMobile = "/images/bg-hero-mobile.png",
  tinaField,
}: HeroProps) {
  const normalizedSrc = normalizeImageUrl(backgroundImage);
  const normalizedSrcMobile = normalizeImageUrl(backgroundImageMobile);

  return (
    <section
      className="relative w-full min-h-[820px] md:min-h-0 md:h-[645px] overflow-hidden rounded-bl-[24px] rounded-br-[24px] md:rounded-bl-[64px] md:rounded-br-[54px]"
      data-tina-field={tinaField}
    >
      {/* Background - Mobile */}
      <div className="absolute inset-0 block md:hidden">
        <Image
          src={normalizedSrcMobile}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
      </div>

      {/* Background - Desktop */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src={normalizedSrc}
          alt=""
          fill
          className="object-cover object-[70%_center]"
          priority
          sizes="100vw"
          quality={90}
        />
      </div>

      {/* Content - Single responsive section */}
      {/* Mobile: relative, pt-102px, px-16px, max-w-343px */}
      {/* Desktop: absolute, top-166px, left-207px, w-576px */}
      <div className={styles.heroContent}>
        <div className="max-w-[343px] md:max-w-none flex flex-col gap-6 md:gap-10">
          {/* Badge */}
          <div className="inline-flex items-center h-8 md:h-12 px-4 md:px-[21px] bg-[rgba(255,255,255,0.31)] rounded-[32px] gap-2 w-fit">
            <span className="text-[14px] md:text-[16px] leading-[17px] md:leading-5 text-[#FCFCFD] font-normal text-center whitespace-nowrap">
              {badge}
            </span>
          </div>

          {/* Headline + Benefits wrapper */}
          <div className="flex flex-col gap-6">
            {/* Headline */}
            <h1
              className="w-full md:w-[588px] text-[32px] md:text-[40px] font-medium leading-[34px] md:leading-[44px] tracking-[-0.64px] md:tracking-[-0.8px] text-[#FAFAFA] md:text-[#FCFCFD]"
              style={{ fontFamily: 'var(--font-dm-sans), system-ui, sans-serif' }}
            >
              {headline}
            </h1>

            {/* Benefits */}
            <div className="w-full flex flex-col gap-3 md:gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-[18px] md:text-[20px] leading-[22px] md:leading-6 text-[#FCFCFD] font-normal">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="w-full flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
            {/* Button */}
            <Link
              href={ctaLink}
              className="w-full md:w-[202px] h-14 px-6 md:px-8 flex items-center justify-center bg-[rgba(246,245,245,0.95)] hover:bg-white rounded-[32px] text-[#222222] md:text-[#383838] text-[16px] font-medium leading-5 transition-colors"
            >
              {ctaText}
            </Link>

            {/* Price */}
            {priceText && (
              <div className="w-full md:w-auto h-8 md:h-auto flex items-center justify-center">
                <span className="text-[16px] leading-5 text-[#FCFCFD] font-normal text-center">
                  {priceText}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
