"use client";

import Link from "next/link";

// ============================================
// TYPES
// ============================================

interface FinalCtaProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaLink?: string;
  tinaField?: string;
}

// ============================================
// SUB-COMPONENTS
// ============================================

// CTA Headline
function CTAHeadline({ text }: { text: string }) {
  return (
    <h2 className="text-[28px] font-medium text-gray-900 mb-4">
      {text}
    </h2>
  );
}

// CTA Subheadline
function CTASubheadline({ text }: { text: string }) {
  return (
    <p className="text-sm text-gray-500 mb-[32px]">{text}</p>
  );
}

// CTA Button
function CTAButton({ text, href }: { text: string; href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center h-[80px] px-[72px] bg-violet-700 hover:bg-violet-800 text-white text-lg font-medium rounded-full transition-colors shadow-lg"
    >
      {text}
    </Link>
  );
}

// Content Container
function ContentContainer({
  headline,
  subheadline,
  ctaText,
  ctaLink,
}: {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
}) {
  return (
    <div className="text-center max-w-[1155px] mx-auto">
      <CTAHeadline text={headline} />
      <CTASubheadline text={subheadline} />
      <CTAButton text={ctaText} href={ctaLink} />
    </div>
  );
}

// Card Container
function CardContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-violet-50 rounded-[24px] py-[76px] px-[60px]">
      {children}
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function FinalCta({
  headline = "Recuperar tu cabello es una realidad con Choiz",
  subheadline = "Inicia el formulario y comienza a ver resultados, sino te devolvemos tu dinero.",
  ctaText = "Comenzar ahora",
  ctaLink = "/quiz",
  tinaField,
}: FinalCtaProps) {
  return (
    <section className="py-[76px]" data-tina-field={tinaField}>
      <div className="max-w-[1276px] mx-auto px-[60px]">
        <CardContainer>
          <ContentContainer
            headline={headline}
            subheadline={subheadline}
            ctaText={ctaText}
            ctaLink={ctaLink}
          />
        </CardContainer>
      </div>
    </section>
  );
}
