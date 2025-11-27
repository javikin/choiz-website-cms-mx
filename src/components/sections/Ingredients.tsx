"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel, { type EmblaViewportRefType } from "embla-carousel-react";

// ============================================
// TYPES
// ============================================

interface Ingredient {
  name?: string;
  description?: string;
  image?: string;
}

interface IngredientsProps {
  headline?: string;
  items?: Ingredient[];
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
    <h2 className="text-[40px] leading-[1.2] font-medium text-gray-900 max-w-[750px]">
      {text}
    </h2>
  );
}

// Desktop CTA Button
function DesktopCTA({ text, href }: { text: string; href: string }) {
  return (
    <Link
      href={href}
      className="hidden lg:inline-flex items-center justify-center h-[56px] px-10 bg-violet-700 hover:bg-violet-800 text-white text-base font-medium rounded-full transition-colors mt-4 lg:mt-0"
    >
      {text}
    </Link>
  );
}

// Mobile CTA Button
function MobileCTA({ text, href }: { text: string; href: string }) {
  return (
    <div className="lg:hidden mt-8">
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
    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-[64px]">
      <SectionHeadline text={headline} />
      <DesktopCTA text={ctaText} href={ctaLink} />
    </div>
  );
}

// Ingredient Name
function IngredientName({ name }: { name?: string }) {
  return (
    <h3 className="text-[17px] font-medium text-gray-900 mb-2">
      {name}
    </h3>
  );
}

// Ingredient Description
function IngredientDescription({ description }: { description?: string }) {
  return (
    <p className="text-sm text-gray-600 leading-relaxed">
      {description}
    </p>
  );
}

// Ingredient Image Placeholder
function IngredientImagePlaceholder() {
  return <div className="w-[176px] h-[100px] bg-violet-100 rounded-lg" />;
}

// Ingredient Image
function IngredientImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src) return <IngredientImagePlaceholder />;
  return (
    <Image
      src={src}
      alt={alt || "Ingrediente"}
      width={176}
      height={129}
      className="object-contain"
    />
  );
}

// Ingredient Image Container
function IngredientImageContainer({ image, name }: { image?: string; name?: string }) {
  return (
    <div className="flex-1 flex items-end justify-center">
      <IngredientImage src={image} alt={name} />
    </div>
  );
}

// Ingredient Card
function IngredientCard({ ingredient }: { ingredient: Ingredient }) {
  return (
    <div className="flex-shrink-0 w-[260px]">
      <div className="bg-violet-50 rounded-[16px] p-9 h-[280px] flex flex-col">
        <IngredientName name={ingredient.name} />
        <IngredientDescription description={ingredient.description} />
        <IngredientImageContainer image={ingredient.image} name={ingredient.name} />
      </div>
    </div>
  );
}

// Ingredients Carousel
function IngredientsCarousel({
  items,
  emblaRef,
}: {
  items: Ingredient[];
  emblaRef: EmblaViewportRefType;
}) {
  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-8">
        {items.map((ingredient, index) => (
          <IngredientCard key={index} ingredient={ingredient} />
        ))}
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function Ingredients({
  headline = "El secreto del éxito: nuestros ingredientes de alta calidad",
  items = [
    { name: "Minoxidil", description: "Reactiva los folículos dañados y favorece la circulación sanguínea" },
    { name: "Biotina", description: "Mejora el grosor y la textura del cabello" },
    { name: "Tretinoína", description: "Mejora la absorción del Minoxidil" },
    { name: "Finasterida", description: "Detiene la caída y promueve el crecimiento del folículo" },
    { name: "Hidrocortisona", description: "Disminuye la inflamación del cuero cabelludo durante el tratamiento" },
  ],
  ctaText = "Ver tratamientos",
  ctaLink = "/productos",
  tinaField,
}: IngredientsProps) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  return (
    <section className="py-[96px] bg-white" data-tina-field={tinaField}>
      <div className="max-w-[1280px] mx-auto px-[72px]">
        <SectionHeader headline={headline} ctaText={ctaText} ctaLink={ctaLink} />
        <IngredientsCarousel items={items} emblaRef={emblaRef} />
        <MobileCTA text={ctaText} href={ctaLink} />
      </div>
    </section>
  );
}
