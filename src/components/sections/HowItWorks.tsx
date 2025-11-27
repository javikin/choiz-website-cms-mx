"use client";

import Image from "next/image";
import Link from "next/link";
import { FileText, UserCheck, Truck, MessageCircle } from "lucide-react";
import { normalizeImageUrl } from "@/lib/images";

// ============================================
// TYPES
// ============================================

interface Step {
  title?: string;
  description?: string;
  icon?: string;
}

interface HowItWorksProps {
  headline?: string;
  steps?: Step[];
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
    <h2 className="text-[28px] font-medium text-gray-900">
      {text}
    </h2>
  );
}

// Desktop CTA Button
function DesktopCTA({ text, href }: { text: string; href: string }) {
  return (
    <Link
      href={href}
      className="hidden lg:inline-flex items-center justify-center h-[56px] px-10 bg-violet-700 hover:bg-violet-800 text-white text-base font-medium rounded-full transition-colors"
    >
      {text}
    </Link>
  );
}

// Mobile CTA Button
function MobileCTA({ text, href }: { text: string; href: string }) {
  return (
    <div className="lg:hidden mt-10">
      <Link
        href={href}
        className="block w-full py-4 text-center bg-violet-700 hover:bg-violet-800 text-white rounded-full font-medium transition-colors"
      >
        {text}
      </Link>
    </div>
  );
}

// Section Header
function SectionHeader({
  headline,
  ctaText,
  ctaLink,
}: {
  headline: string;
  ctaText: string;
  ctaLink: string;
}) {
  return (
    <div className="flex items-center justify-between mb-[64px]">
      <SectionHeadline text={headline} />
      <DesktopCTA text={ctaText} href={ctaLink} />
    </div>
  );
}

// Icon mapping
const ICON_COMPONENTS = [FileText, UserCheck, Truck, MessageCircle];

// Custom Icon (from image)
function CustomIcon({ src }: { src: string }) {
  return (
    <Image
      src={normalizeImageUrl(src)}
      alt=""
      width={28}
      height={28}
      className="w-7 h-7"
    />
  );
}

// Default Icon (from Lucide)
function DefaultIcon({ index }: { index: number }) {
  const IconComponent = ICON_COMPONENTS[index % ICON_COMPONENTS.length];
  return <IconComponent className="w-7 h-7 text-violet-700" />;
}

// Step Icon Circle
function StepIconCircle({ icon, index }: { icon?: string; index: number }) {
  return (
    <div className="relative z-10 w-[64px] h-[64px] rounded-full bg-violet-50 border border-violet-100 flex items-center justify-center mb-8">
      {icon ? <CustomIcon src={icon} /> : <DefaultIcon index={index} />}
    </div>
  );
}

// Step Title
function StepTitle({ title }: { title?: string }) {
  return (
    <h3 className="text-[13px] font-medium text-gray-900 mb-3">
      {title}
    </h3>
  );
}

// Step Description
function StepDescription({ description }: { description?: string }) {
  return (
    <p className="text-sm text-gray-500 leading-relaxed max-w-[193px]">
      {description}
    </p>
  );
}

// Single Step Card
function StepCard({ step, index }: { step: Step; index: number }) {
  return (
    <div className="relative">
      <StepIconCircle icon={step.icon} index={index} />
      <StepTitle title={step.title} />
      <StepDescription description={step.description} />
    </div>
  );
}

// Horizontal Connection Line
function HorizontalLine() {
  return (
    <div className="absolute top-[32px] left-[32px] right-[32px] h-[1px] bg-gray-200" />
  );
}

// Steps Grid
function StepsGrid({ steps }: { steps: Step[] }) {
  return (
    <div className="grid grid-cols-4 gap-[35px] relative">
      <HorizontalLine />
      {steps.map((step, index) => (
        <StepCard key={index} step={step} index={index} />
      ))}
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function HowItWorks({
  headline = "Cómo funciona",
  steps = [
    {
      title: "Completa el formulario",
      description: "Obtén una recomendación médica respondiendo algunas preguntas sobre tu rutina de cabello e historial médico."
    },
    {
      title: "Aprobación médica",
      description: "Obtén una recomendación médica respondiendo algunas preguntas sobre tu rutina de cabello e historial médico."
    },
    {
      title: "Envío del tratamiento",
      description: "Cuando tu tratamiento esté listo, lo enviaremos a tu casa de manera rápida, segura y gratuita."
    },
    {
      title: "Soporte constante",
      description: "A través de nuestra plataforma obtendrás acompañamiento médico constante y estaremos disponibles siempre que lo necesites."
    }
  ],
  ctaText = "Comenzar ahora",
  ctaLink = "/quiz",
  tinaField,
}: HowItWorksProps) {
  return (
    <section className="py-[96px] bg-white" data-tina-field={tinaField}>
      <div className="max-w-[1280px] mx-auto px-[72px]">
        <SectionHeader headline={headline} ctaText={ctaText} ctaLink={ctaLink} />
        <StepsGrid steps={steps} />
        <MobileCTA text={ctaText} href={ctaLink} />
      </div>
    </section>
  );
}
