"use client";

import Link from "next/link";

// ============================================
// TYPES
// ============================================

interface GuaranteeProps {
  days?: string;
  headline?: string;
  description?: string;
  tinaField?: string;
}

// ============================================
// SUB-COMPONENTS
// ============================================

// Dashed Circle Border (SVG)
function DashedCircleBorder() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 172 172"
      fill="none"
    >
      <circle
        cx="86"
        cy="86"
        r="80"
        stroke="#6042AA"
        strokeWidth="4"
        strokeDasharray="12 8"
      />
    </svg>
  );
}

// Days Number Display
function DaysNumber({ days }: { days: string }) {
  return (
    <span className="text-[29px] font-bold text-violet-700">{days}</span>
  );
}

// Days Label
function DaysLabel() {
  return <span className="text-[12px] text-violet-700">días</span>;
}

// Badge Inner Content
function BadgeInnerContent({ days }: { days: string }) {
  return (
    <div className="absolute inset-[16px] rounded-full bg-white flex flex-col items-center justify-center">
      <DaysNumber days={days} />
      <DaysLabel />
    </div>
  );
}

// Checkmark Icon
function CheckmarkIcon() {
  return (
    <svg
      className="w-5 h-5 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

// Checkmark Badge (corner badge)
function CheckmarkBadge() {
  return (
    <div className="absolute right-[8px] top-[8px] w-[32px] h-[32px] bg-violet-700 rounded-full flex items-center justify-center">
      <CheckmarkIcon />
    </div>
  );
}

// Badge Circle (complete badge)
function BadgeCircle({ days }: { days: string }) {
  return (
    <div className="relative w-[172px] h-[172px] flex-shrink-0">
      <DashedCircleBorder />
      <BadgeInnerContent days={days} />
      <CheckmarkBadge />
    </div>
  );
}

// Guarantee Headline
function GuaranteeHeadline({ text }: { text: string }) {
  return (
    <h2 className="text-[40px] font-medium text-gray-900 mb-2">
      {text}
    </h2>
  );
}

// Terms Link
function TermsLink() {
  return (
    <Link href="/terminos" className="text-gray-500 underline hover:text-violet-700">
      Términos y condiciones
    </Link>
  );
}

// Guarantee Description
function GuaranteeDescription({ description }: { description: string }) {
  // Split description to separate "Términos y condiciones" from the rest
  const mainText = description.split("Términos y condiciones")[0];

  return (
    <p className="text-[17px] text-gray-500">
      {mainText}
      <TermsLink />
    </p>
  );
}

// Text Content
function TextContent({ headline, description }: { headline: string; description: string }) {
  return (
    <div>
      <GuaranteeHeadline text={headline} />
      <GuaranteeDescription description={description} />
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function Guarantee({
  days = "180",
  headline = "Garantía de éxito asegurada",
  description = "Estamos seguros de que recuperarás tu cabello y sino te devolvemos tu dinero. Términos y condiciones",
  tinaField,
}: GuaranteeProps) {
  return (
    <section className="py-[56px] bg-violet-50" data-tina-field={tinaField}>
      <div className="max-w-[1280px] mx-auto px-[72px]">
        <div className="flex items-center gap-[40px]">
          <BadgeCircle days={days} />
          <TextContent headline={headline} description={description} />
        </div>
      </div>
    </section>
  );
}
