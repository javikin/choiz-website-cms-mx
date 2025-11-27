"use client";

import Image from "next/image";

// ============================================
// TYPES
// ============================================

interface CertificationsProps {
  title?: string;
  badges?: Array<{
    logo?: string;
    label?: string;
  }>;
  tinaField?: string;
}

// ============================================
// SUB-COMPONENTS
// ============================================

// Section Title
function SectionTitle({ text }: { text: string }) {
  return (
    <p className="text-[20px] text-[#7D7D7D] text-center leading-[50px]">
      {text}
    </p>
  );
}

// COFEPRIS Logo (from image)
function CofeprisLogo({ src }: { src: string }) {
  return (
    <div className="h-[54px] flex items-center">
      <Image
        src={src}
        alt="COFEPRIS - Comisión Federal para la Protección contra Riesgos Sanitarios"
        width={234}
        height={54}
        className="h-[54px] w-auto object-contain"
      />
    </div>
  );
}

// PROFECO Logo (text-based)
function ProfecoLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col">
        <span className="text-[#8B1538] text-[24px] font-bold tracking-tight leading-none">
          PROFECO
        </span>
        <span className="text-[#7D7D7D] text-[8px] leading-tight">
          PROCURADURÍA FEDERAL
        </span>
        <span className="text-[#7D7D7D] text-[8px] leading-tight">
          DEL CONSUMIDOR
        </span>
      </div>
    </div>
  );
}

// Distintivo Digital Checkmark Icon
function DistintivoCheckIcon() {
  return (
    <div className="relative w-[40px] h-[40px]">
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <circle cx="20" cy="20" r="18" stroke="#8B8B00" strokeWidth="2" fill="none" />
        <path
          d="M12 20L17 25L28 14"
          stroke="#8B8B00"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

// Distintivo Digital Logo (text-based with icon)
function DistintivoDigitalLogo() {
  return (
    <div className="flex items-center gap-2">
      <DistintivoCheckIcon />
      <div className="flex flex-col">
        <span className="text-[#7D7D7D] text-[10px] leading-tight">DISTINTIVO</span>
        <span className="text-[#1D1D1B] text-[18px] font-bold leading-tight tracking-tight">
          DIGITAL
        </span>
      </div>
    </div>
  );
}

// Vertical Separator Line
function VerticalSeparator() {
  return (
    <div className="hidden md:block w-px h-[50px] bg-[#E8E8E8]" />
  );
}

// Logos Container
function LogosContainer({ cofeprisLogo }: { cofeprisLogo: string }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
      <CofeprisLogo src={cofeprisLogo} />
      <VerticalSeparator />
      <ProfecoLogo />
      <VerticalSeparator />
      <DistintivoDigitalLogo />
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function Certifications({
  title = "Aprobados y certificados por",
  badges = [],
  tinaField,
}: CertificationsProps) {
  const cofeprisLogo = badges.find(b => b.logo?.includes('cofepris'))?.logo || "/images/cofepris-logo.png";

  return (
    <section className="py-[34px] bg-white" data-tina-field={tinaField}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-[72px]">
        <div className="flex flex-col items-center gap-[34px]">
          <SectionTitle text={title} />
          <LogosContainer cofeprisLogo={cofeprisLogo} />
        </div>
      </div>
    </section>
  );
}
