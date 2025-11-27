"use client";

import Image from "next/image";
import Link from "next/link";

// ============================================
// TYPES
// ============================================

interface HeroProps {
  badge?: string;
  headline?: string;
  benefits?: Array<{ text?: string }>;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  tinaField?: string;
}

// ============================================
// SUB-COMPONENTS
// ============================================

// Check icon for benefits list
function CheckIcon() {
  return (
    <div className="w-6 h-6 relative overflow-hidden flex-shrink-0">
      <div
        className="absolute w-5 h-5 left-[2px] top-[2px] rounded-full"
        style={{
          outline: "1.8px solid white",
          outlineOffset: "-0.9px",
        }}
      />
      <svg
        className="absolute left-[9px] top-[9px]"
        width="7"
        height="7"
        viewBox="0 0 7 7"
        fill="none"
      >
        <path
          d="M1 3.5L2.5 5L6 1.5"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// Badge text component
function HeroBadge({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <p
      className="text-[20px] text-[#E8E8E8] tracking-[0.8px] leading-[17px]"
      style={{ fontWeight: 400 }}
    >
      {text}
    </p>
  );
}

// Headline with highlighted word
function HeroHeadline({ headline }: { headline: string }) {
  const renderHeadline = () => {
    if (headline.includes("cabello")) {
      const parts = headline.split("cabello");
      return (
        <>
          <span className="text-[#F0F9FF]">{parts[0]}</span>
          <span className="text-[#EAE1FF]">cabello</span>
          <span className="text-[#F0F9FF]">{parts[1]}</span>
        </>
      );
    }
    return <span className="text-[#F0F9FF]">{headline}</span>;
  };

  return (
    <h1
      className="text-[40px] md:text-[60px] leading-[1.1] md:leading-[66px]"
      style={{ fontWeight: 500 }}
    >
      {renderHeadline()}
    </h1>
  );
}

// Single benefit item
function BenefitItem({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <div className="flex items-center gap-[15px]">
      <CheckIcon />
      <p
        className="text-[18px] md:text-[20px] text-white leading-[32px]"
        style={{ fontWeight: 400 }}
      >
        {text}
      </p>
    </div>
  );
}

// Benefits list
function BenefitsList({ benefits }: { benefits: Array<{ text?: string }> }) {
  if (benefits.length === 0) return null;
  return (
    <div className="flex flex-col gap-6">
      {benefits.map((benefit, index) => (
        <BenefitItem key={index} text={benefit.text} />
      ))}
    </div>
  );
}

// CTA Button
function HeroCTA({ text, href }: { text: string; href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center w-full md:w-[380px] h-[80px] px-6 bg-[#292929] hover:bg-[#1a1a1a] text-white text-[20px] rounded-[80px] transition-colors"
      style={{ fontWeight: 400 }}
    >
      {text}
    </Link>
  );
}

// Desktop background image
function DesktopBackground({ src }: { src: string }) {
  return (
    <div className="absolute right-0 top-0 bottom-0 w-[60%] max-w-[667px] hidden lg:block">
      <Image
        src={src}
        alt="Tratamiento capilar Choiz"
        fill
        className="object-contain object-right-bottom"
        priority
        sizes="(max-width: 1024px) 0vw, 667px"
      />
    </div>
  );
}

// Mobile background image
function MobileBackground({ src }: { src: string }) {
  return (
    <div className="lg:hidden absolute inset-0 z-0">
      <Image
        src={src}
        alt=""
        fill
        className="object-cover object-right-top opacity-30"
        priority
        sizes="100vw"
      />
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function Hero({
  badge = "+ 10k vieron resultados en 2024",
  headline = "Recupera tu cabello en 180 días",
  benefits = [
    { text: "Fórmulas personalizadas y científicamente comprobadas." },
    { text: "100% en línea y con envío gratuito." },
    { text: "Desde $562/mes." },
  ],
  ctaText = "Ver si soy apto",
  ctaLink = "/quiz",
  backgroundImage = "/images/hero-man.png",
  tinaField,
}: HeroProps) {
  return (
    <section className="relative min-h-[650px] bg-[#7c72b2] overflow-hidden" data-tina-field={tinaField}>
      <DesktopBackground src={backgroundImage} />

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-[72px] pt-[120px] pb-[72px]">
        <div className="flex flex-col gap-12 max-w-[600px]">
          {/* Top section: Badge + Headline */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-[42px]">
              <HeroBadge text={badge} />
              <HeroHeadline headline={headline} />
            </div>
            <BenefitsList benefits={benefits} />
          </div>

          <HeroCTA text={ctaText} href={ctaLink} />
        </div>
      </div>

      <MobileBackground src={backgroundImage} />
    </section>
  );
}
