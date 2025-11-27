"use client";

import Image from "next/image";
import Link from "next/link";
import { Stethoscope, Truck, User } from "lucide-react";

// ============================================
// TYPES
// ============================================

interface ValueProp {
  title?: string;
  description?: string;
  icon?: string;
}

interface WhyChooseProps {
  headline?: string;
  valueProps?: ValueProp[];
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
    <h2 className="text-[28px] font-medium text-gray-900 mb-[84px]">
      {text}
    </h2>
  );
}

// Icon mapping for default icons
const ICON_COMPONENTS = [Stethoscope, Truck, User];

// Custom Icon (from image)
function CustomIcon({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt=""
      width={69}
      height={60}
      className="object-contain"
    />
  );
}

// Default Icon (from Lucide)
function DefaultIcon({ index }: { index: number }) {
  const IconComponent = ICON_COMPONENTS[index % ICON_COMPONENTS.length];
  return <IconComponent className="w-[60px] h-[60px] text-violet-700 stroke-[1.5]" />;
}

// Value Prop Icon
function ValuePropIcon({ icon, index }: { icon?: string; index: number }) {
  return (
    <div className="mb-8">
      {icon ? <CustomIcon src={icon} /> : <DefaultIcon index={index} />}
    </div>
  );
}

// Value Prop Title
function ValuePropTitle({ title }: { title?: string }) {
  return (
    <h3 className="text-[20px] leading-[1.3] font-medium text-gray-900 mb-4">
      {title}
    </h3>
  );
}

// Value Prop Description
function ValuePropDescription({ description }: { description?: string }) {
  return (
    <p className="text-sm text-gray-500 leading-relaxed">
      {description}
    </p>
  );
}

// Value Prop Card
function ValuePropCard({ prop, index }: { prop: ValueProp; index: number }) {
  return (
    <div className="bg-violet-50 rounded-[16px] p-10 min-h-[272px]">
      <ValuePropIcon icon={prop.icon} index={index} />
      <ValuePropTitle title={prop.title} />
      <ValuePropDescription description={prop.description} />
    </div>
  );
}

// Value Props Grid
function ValuePropsGrid({ valueProps }: { valueProps: ValueProp[] }) {
  return (
    <div className="grid lg:grid-cols-3 gap-8 mb-[56px]">
      {valueProps.map((prop, index) => (
        <ValuePropCard key={index} prop={prop} index={index} />
      ))}
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

export function WhyChoose({
  headline = "¿Por qué elegir Choiz?",
  valueProps = [
    {
      title: "Seguimiento médico online 24/7",
      description: "Atención completa y continua, sin costo extra y desde nuestra app."
    },
    {
      title: "Envío gratis y discreto a tu puerta",
      description: "Recibes tu tratamiento donde tu quieras 100% gratis."
    },
    {
      title: "Tratamiento 100% personalizado",
      description: "Tu fórmula y reabastos, ajustados a tus necesidades personales."
    }
  ],
  ctaText = "Ver tratamientos",
  ctaLink = "/productos",
  tinaField,
}: WhyChooseProps) {
  return (
    <section className="py-[96px] bg-white" data-tina-field={tinaField}>
      <div className="max-w-[1280px] mx-auto px-[72px]">
        <SectionHeadline text={headline} />
        <ValuePropsGrid valueProps={valueProps} />
        <CTAButton text={ctaText} href={ctaLink} />
      </div>
    </section>
  );
}
