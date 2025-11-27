"use client";

import Image from "next/image";
import { ChevronUp } from "lucide-react";

// ============================================
// TYPES
// ============================================

interface HairLossType {
  name?: string;
  icon?: string;
}

interface ProblemProps {
  headline?: string;
  stat?: string;
  statDescription?: string;
  explanation?: string;
  illustration?: string;
  hairLossTypes?: HairLossType[];
  tinaField?: string;
}

// ============================================
// SUB-COMPONENTS
// ============================================

// Section Headline with highlighted word
function SectionHeadline({ text }: { text: string }) {
  const renderHeadline = () => {
    if (text.includes("cabello")) {
      const parts = text.split("cabello");
      return (
        <>
          <span className="text-[#3B3345]">{parts[0]}</span>
          <span className="text-[#B8A2F2]">cabello</span>
          <span className="text-[#3B3345]">{parts[1]}</span>
        </>
      );
    }
    return <span className="text-[#3B3345]">{text}</span>;
  };

  return (
    <h2 className="text-[40px] font-medium text-center leading-[50px] tracking-[-0.8px]">
      {renderHeadline()}
    </h2>
  );
}

// Hair Follicle SVG Illustration
function HairFollicleSVG() {
  return (
    <svg
      width="400"
      height="280"
      viewBox="0 0 400 280"
      fill="none"
      className="absolute top-0 left-1/2 -translate-x-1/2"
    >
      {/* Hair strand 1 - left */}
      <path
        d="M120 220 C120 180 115 140 125 100 C135 60 150 30 170 15"
        stroke="#42307D"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />

      {/* Hair strand 2 - middle (tallest) */}
      <path
        d="M200 220 C200 170 195 120 205 70 C215 30 235 5 260 0"
        stroke="#42307D"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />

      {/* Hair strand 3 - right (shorter, curving) */}
      <path
        d="M280 220 C285 190 295 160 315 130 C335 100 360 80 385 70"
        stroke="#42307D"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// Scalp Background Area
function ScalpBackground() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-[140px] bg-[#E8E8E8]"
      style={{ opacity: 0.4, borderBottomLeftRadius: '40px', borderBottomRightRadius: '40px' }}
    />
  );
}

// DHT Badge Circle
function DHTBadge() {
  return (
    <div className="absolute left-[40px] bottom-[45px] w-[57px] h-[57px] rounded-full bg-[#352662] flex items-center justify-center">
      <span className="text-[12px] font-bold text-white tracking-[2px]">DHT</span>
    </div>
  );
}

// Arrow Icon SVG
function ArrowIcon() {
  return (
    <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
      <path
        d="M0 8H28M28 8L21 1M28 8L21 15"
        stroke="#B8A2F2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Arrows Row
function ArrowsRow() {
  return (
    <div className="absolute left-[110px] bottom-[52px] flex gap-[16px] items-center">
      <ArrowIcon />
      <ArrowIcon />
      <ArrowIcon />
    </div>
  );
}

// Illustration Card with DHT visualization
function IllustrationCard({ illustration }: { illustration?: string }) {
  return (
    <div className="relative w-[480px] h-[340px] bg-white border border-[#F0F0F0] rounded-[32px] overflow-hidden flex-shrink-0">
      {illustration ? (
        <Image
          src={illustration}
          alt="Ilustración de pérdida de cabello por DHT"
          fill
          className="object-contain"
        />
      ) : (
        <>
          <ScalpBackground />
          <HairFollicleSVG />
          <DHTBadge />
          <ArrowsRow />
        </>
      )}
    </div>
  );
}

// Stat Description Text (Bold purple title with Recoleta font)
function StatDescriptionText({ text }: { text: string }) {
  return (
    <h3
      className="text-[40px] leading-[48px] font-bold text-[#42307D]"
      style={{ fontFamily: "'Recoleta Alt', serif" }}
    >
      {text}
    </h3>
  );
}

// Explanation Text
function ExplanationText({ text }: { text: string }) {
  return (
    <p className="text-[18px] leading-[28px] text-[#645C6F]">
      {text}
    </p>
  );
}

// Text Content Section
function TextContent({
  statDescription,
  explanation,
}: {
  statDescription: string;
  explanation: string;
}) {
  return (
    <div className="flex flex-col gap-[24px] flex-1">
      <StatDescriptionText text={statDescription} />
      <ExplanationText text={explanation} />
    </div>
  );
}

// Main Content Grid (Illustration + Text)
function MainContentGrid({
  illustration,
  statDescription,
  explanation,
}: {
  illustration?: string;
  statDescription: string;
  explanation: string;
}) {
  return (
    <div className="flex gap-[48px] items-center w-full">
      <IllustrationCard illustration={illustration} />
      <TextContent statDescription={statDescription} explanation={explanation} />
    </div>
  );
}

// FAQ Accordion Button with Chevron
function FAQAccordionButton() {
  return (
    <div className="flex items-center justify-between w-full">
      <p className="text-[18px] leading-[24px] text-[#3B3345]">
        ¿Qué tipos de Alopecia tratamos?
      </p>
      <ChevronUp className="w-5 h-5 text-[#7D7D7D]" strokeWidth={2} />
    </div>
  );
}

// Hair Loss Type Icon - Entradas y Coronilla (receding hairline + crown)
function IconEntradasCoronilla() {
  return (
    <svg width="56" height="72" viewBox="0 0 56 72" fill="none">
      {/* Face outline */}
      <ellipse cx="28" cy="42" rx="24" ry="28" stroke="#1D1D1B" strokeWidth="1.5" fill="none" />
      {/* Hair - receding at temples and thin on crown */}
      <path
        d="M8 35 L8 22 Q8 8 28 8 Q48 8 48 22 L48 35"
        fill="#1D1D1B"
      />
      {/* Receding temple left */}
      <path d="M8 35 Q12 30 18 28" fill="white" />
      {/* Receding temple right */}
      <path d="M48 35 Q44 30 38 28" fill="white" />
      {/* Ears */}
      <ellipse cx="4" cy="42" rx="4" ry="6" stroke="#1D1D1B" strokeWidth="1.5" fill="none" />
      <ellipse cx="52" cy="42" rx="4" ry="6" stroke="#1D1D1B" strokeWidth="1.5" fill="none" />
      {/* Eyebrows */}
      <path d="M16 38 Q20 36 24 38" stroke="#1D1D1B" strokeWidth="1.2" fill="none" />
      <path d="M32 38 Q36 36 40 38" stroke="#1D1D1B" strokeWidth="1.2" fill="none" />
      {/* Eyes */}
      <circle cx="20" cy="44" r="1.5" fill="#1D1D1B" />
      <circle cx="36" cy="44" r="1.5" fill="#1D1D1B" />
      {/* Nose */}
      <path d="M28 46 L28 52" stroke="#1D1D1B" strokeWidth="1.2" fill="none" />
      {/* Mouth */}
      <path d="M24 58 Q28 61 32 58" stroke="#1D1D1B" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

// Hair Loss Type Icon - Coronilla (crown only)
function IconCoronilla() {
  return (
    <svg width="56" height="72" viewBox="0 0 56 72" fill="none">
      {/* Face outline */}
      <ellipse cx="28" cy="42" rx="24" ry="28" stroke="#1D1D1B" strokeWidth="1.5" fill="none" />
      {/* Hair - full at front, bald at crown */}
      <path
        d="M4 35 L4 20 Q4 6 28 6 Q52 6 52 20 L52 35 Q52 28 40 25 L16 25 Q4 28 4 35"
        fill="#1D1D1B"
      />
      {/* Ears */}
      <ellipse cx="4" cy="42" rx="4" ry="6" stroke="#1D1D1B" strokeWidth="1.5" fill="none" />
      <ellipse cx="52" cy="42" rx="4" ry="6" stroke="#1D1D1B" strokeWidth="1.5" fill="none" />
      {/* Eyebrows */}
      <path d="M16 38 Q20 36 24 38" stroke="#1D1D1B" strokeWidth="1.2" fill="none" />
      <path d="M32 38 Q36 36 40 38" stroke="#1D1D1B" strokeWidth="1.2" fill="none" />
      {/* Eyes */}
      <circle cx="20" cy="44" r="1.5" fill="#1D1D1B" />
      <circle cx="36" cy="44" r="1.5" fill="#1D1D1B" />
      {/* Nose */}
      <path d="M28 46 L28 52" stroke="#1D1D1B" strokeWidth="1.2" fill="none" />
      {/* Mouth */}
      <path d="M24 58 Q28 61 32 58" stroke="#1D1D1B" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

// Hair Loss Type Icon - Entradas (receding hairline only)
function IconEntradas() {
  return (
    <svg width="56" height="72" viewBox="0 0 56 72" fill="none">
      {/* Face outline */}
      <ellipse cx="28" cy="42" rx="24" ry="28" stroke="#1D1D1B" strokeWidth="1.5" fill="none" />
      {/* Hair - full on top with receding temples */}
      <path
        d="M4 35 L4 18 Q4 4 28 4 Q52 4 52 18 L52 35"
        fill="#1D1D1B"
      />
      {/* Receding temple left - more pronounced */}
      <path d="M4 35 Q10 28 20 26 L4 26 Z" fill="white" />
      {/* Receding temple right - more pronounced */}
      <path d="M52 35 Q46 28 36 26 L52 26 Z" fill="white" />
      {/* Ears */}
      <ellipse cx="4" cy="42" rx="4" ry="6" stroke="#1D1D1B" strokeWidth="1.5" fill="none" />
      <ellipse cx="52" cy="42" rx="4" ry="6" stroke="#1D1D1B" strokeWidth="1.5" fill="none" />
      {/* Eyebrows */}
      <path d="M16 38 Q20 36 24 38" stroke="#1D1D1B" strokeWidth="1.2" fill="none" />
      <path d="M32 38 Q36 36 40 38" stroke="#1D1D1B" strokeWidth="1.2" fill="none" />
      {/* Eyes */}
      <circle cx="20" cy="44" r="1.5" fill="#1D1D1B" />
      <circle cx="36" cy="44" r="1.5" fill="#1D1D1B" />
      {/* Nose */}
      <path d="M28 46 L28 52" stroke="#1D1D1B" strokeWidth="1.2" fill="none" />
      {/* Mouth */}
      <path d="M24 58 Q28 61 32 58" stroke="#1D1D1B" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

// Hair Loss Type Icon based on type name
function HairLossTypeIcon({ icon, name }: { icon?: string; name?: string }) {
  if (icon) {
    return (
      <div className="w-[72px] h-[110px] flex items-center justify-center flex-shrink-0">
        <Image
          src={icon}
          alt={name || "Tipo de alopecia"}
          width={72}
          height={110}
          className="object-contain"
        />
      </div>
    );
  }

  // Return appropriate icon based on name
  return (
    <div className="w-[72px] h-[110px] flex items-center justify-center flex-shrink-0">
      {name === "Entradas y coronilla" && <IconEntradasCoronilla />}
      {name === "Coronilla" && <IconCoronilla />}
      {name === "Entradas" && <IconEntradas />}
      {!name && <IconEntradasCoronilla />}
    </div>
  );
}

// Single Hair Loss Type Card
function HairLossTypeCard({ type }: { type: HairLossType }) {
  return (
    <div className="flex-1 flex gap-[32px] items-center p-[32px] bg-white border-[1.5px] border-[#E8E8E8] rounded-[32px]">
      <HairLossTypeIcon icon={type.icon} name={type.name} />
      <p className="text-[20px] text-[#3B3345]">{type.name}</p>
    </div>
  );
}

// Hair Loss Types Grid
function HairLossTypesGrid({ types }: { types: HairLossType[] }) {
  return (
    <div className="flex gap-[24px] justify-center w-full">
      {types.map((type, index) => (
        <HairLossTypeCard key={index} type={type} />
      ))}
    </div>
  );
}

// Hair Loss Types FAQ Section
function HairLossTypesSection({ types }: { types: HairLossType[] }) {
  return (
    <div className="flex flex-col gap-[34px] w-full">
      <div className="flex flex-col gap-[16px]">
        <FAQAccordionButton />
      </div>
      <HairLossTypesGrid types={types} />
    </div>
  );
}

// Bottom Divider
function BottomDivider() {
  return <div className="w-full h-0 border-[1.5px] border-[#E8E8E8]" style={{ borderStyle: 'solid', marginTop: '0' }} />;
}

// ============================================
// MAIN COMPONENT
// ============================================

export function Problem({
  headline = "¿Por qué perdemos el cabello?",
  stat = "50%",
  statDescription = "El 50% de los mexicanos sufren de Alopecia por herencia o genética.",
  explanation = "La DHT (una hormona masculina) encoge los folículos pilosos, provocando la caída del cabello y, finalmente, la calvicie.",
  illustration,
  hairLossTypes = [
    { name: "Entradas y coronilla" },
    { name: "Coronilla" },
    { name: "Entradas" },
  ],
  tinaField,
}: ProblemProps) {
  return (
    <section className="py-[72px] bg-white" data-tina-field={tinaField}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-[72px]">
        <div className="flex flex-col gap-[56px] items-center w-full">
          <SectionHeadline text={headline} />
          <MainContentGrid
            illustration={illustration}
            statDescription={statDescription}
            explanation={explanation}
          />
          <HairLossTypesSection types={hairLossTypes} />
          <BottomDivider />
        </div>
      </div>
    </section>
  );
}
