"use client";

import Link from "next/link";

// ============================================
// TYPES
// ============================================

interface Stat {
  label?: string;
  percentage?: number;
}

interface EffectivenessProps {
  headline?: string;
  chartTitle?: string;
  stats?: Stat[];
  conclusion?: string;
  sourcesTitle?: string;
  sources?: string;
  ctaText?: string;
  ctaLink?: string;
  tinaField?: string;
}

// ============================================
// SUB-COMPONENTS
// ============================================

// Section Headline
function SectionHeadline({ text }: { text: string }) {
  return (
    <h2 className="text-[40px] leading-[1.2] font-medium text-gray-900 mb-[56px]">
      {text}
    </h2>
  );
}

// Chart Title
function ChartTitle({ text }: { text: string }) {
  return <p className="text-[13px] text-gray-500 mb-8">{text}</p>;
}

// Percentage Label
function PercentageLabel({ percentage, showPlus }: { percentage?: number; showPlus: boolean }) {
  return (
    <span className="text-[31px] font-medium text-gray-900">
      {showPlus ? "+" : ""}{percentage}%
    </span>
  );
}

// Stat Label
function StatLabel({ label }: { label?: string }) {
  return (
    <span className="text-sm text-gray-600 text-center whitespace-pre-line h-[34px]">
      {label}
    </span>
  );
}

// Single Bar
function Bar({ height, color }: { height: number; color: string }) {
  return (
    <div
      className="w-[99px] rounded-t-lg transition-all duration-500"
      style={{ height: `${height}px`, backgroundColor: color }}
    />
  );
}

// Bar colors
const BAR_COLORS = ["#6042AA", "#9B76FA", "#D4C5FF"];

// Single Stat Bar Item
function StatBarItem({ stat, index }: { stat: Stat; index: number }) {
  const height = ((stat.percentage || 0) / 100) * 370;
  const color = BAR_COLORS[index % BAR_COLORS.length];

  return (
    <div className="flex flex-col items-center gap-3">
      <PercentageLabel percentage={stat.percentage} showPlus={index === 0} />
      <StatLabel label={stat.label} />
      <Bar height={height} color={color} />
    </div>
  );
}

// Bar Chart
function BarChart({ stats }: { stats: Stat[] }) {
  return (
    <div className="relative h-[438px] flex items-end gap-16">
      {stats.map((stat, index) => (
        <StatBarItem key={index} stat={stat} index={index} />
      ))}
    </div>
  );
}

// Chart Section
function ChartSection({ chartTitle, stats }: { chartTitle: string; stats: Stat[] }) {
  return (
    <div>
      <ChartTitle text={chartTitle} />
      <BarChart stats={stats} />
    </div>
  );
}

// Conclusion Text
function ConclusionText({ text }: { text: string }) {
  return (
    <p className="text-[40px] leading-[1.3] font-medium text-gray-900 mb-16">
      {text}
    </p>
  );
}

// Sources Section
function SourcesSection({ title, sources }: { title: string; sources?: string }) {
  if (!sources) return null;
  return (
    <div>
      <p className="text-[13px] text-gray-500 mb-4">{title}</p>
      <p className="text-sm text-gray-400 leading-relaxed">{sources}</p>
    </div>
  );
}

// Text Content Section
function TextContentSection({
  conclusion,
  sourcesTitle,
  sources,
}: {
  conclusion: string;
  sourcesTitle: string;
  sources?: string;
}) {
  return (
    <div className="flex flex-col justify-center">
      <ConclusionText text={conclusion} />
      <SourcesSection title={sourcesTitle} sources={sources} />
    </div>
  );
}

// Main Content Card
function MainContentCard({
  chartTitle,
  stats,
  conclusion,
  sourcesTitle,
  sources,
}: {
  chartTitle: string;
  stats: Stat[];
  conclusion: string;
  sourcesTitle: string;
  sources?: string;
}) {
  return (
    <div className="bg-violet-50 rounded-[24px] p-12 mb-8">
      <div className="grid lg:grid-cols-2 gap-16">
        <ChartSection chartTitle={chartTitle} stats={stats} />
        <TextContentSection
          conclusion={conclusion}
          sourcesTitle={sourcesTitle}
          sources={sources}
        />
      </div>
    </div>
  );
}

// CTA Button
function CTAButton({ text, href }: { text: string; href: string }) {
  return (
    <div className="flex justify-center">
      <Link
        href={href}
        className="inline-flex items-center justify-center h-[56px] px-10 bg-violet-700 hover:bg-violet-800 text-white text-base font-medium rounded-full transition-colors"
      >
        {text}
      </Link>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function Effectiveness({
  headline = "Fórmulas clínicamente comprobadas en la recuperación del cabello",
  chartTitle = "Efectividad de los tratamientos",
  stats = [
    { label: "Combinados¹", percentage: 94 },
    { label: "Finasterida/\nDutasterida²", percentage: 90 },
    { label: "Minoxidil", percentage: 73 },
  ],
  conclusion = "94% de los usuarios que combinaron Dutasterida/Finasterida y Minoxidil obtuvieron resultados.",
  sourcesTitle = "Estudios citados",
  sources = "¹ PubMed Central, Opciones de tratamiento para la alopecia androgénica, 2021. ²American Hair Loss Association, Duasteride, 2024.",
  ctaText = "Ver tratamientos",
  ctaLink = "/productos",
  tinaField,
}: EffectivenessProps) {
  return (
    <section className="py-[96px] bg-white" data-tina-field={tinaField}>
      <div className="max-w-[1280px] mx-auto px-[72px]">
        <SectionHeadline text={headline} />
        <MainContentCard
          chartTitle={chartTitle}
          stats={stats}
          conclusion={conclusion}
          sourcesTitle={sourcesTitle}
          sources={sources}
        />
        <CTAButton text={ctaText} href={ctaLink} />
      </div>
    </section>
  );
}
