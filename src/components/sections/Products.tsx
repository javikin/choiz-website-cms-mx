"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel, { type EmblaViewportRefType } from "embla-carousel-react";
import { useCallback, useState } from "react";
import { ChevronRight } from "lucide-react";

// ============================================
// TYPES
// ============================================

interface Product {
  name?: string;
  tags?: Array<{ text?: string }>;
  image?: string;
  selectText?: string;
  moreText?: string;
  link?: string;
}

interface ProductsProps {
  headline?: string;
  items?: Product[];
  tinaField?: string;
}

// ============================================
// SUB-COMPONENTS
// ============================================

// Section Headline
function SectionHeadline({ text }: { text: string }) {
  return (
    <h2 className="text-[40px] leading-[1.2] font-medium text-gray-900 mb-[56px] max-w-[1133px]">
      {text}
    </h2>
  );
}

// Product Name
function ProductName({ name }: { name?: string }) {
  return (
    <h3 className="text-[26px] font-medium text-gray-900 mb-4">
      {name}
    </h3>
  );
}

// Single Product Tag
function ProductTag({ text }: { text?: string }) {
  return (
    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm border border-gray-200 text-gray-700">
      {text}
    </span>
  );
}

// Product Tags List
function ProductTags({ tags }: { tags?: Array<{ text?: string }> }) {
  if (!tags || tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {tags.map((tag, index) => (
        <ProductTag key={index} text={tag.text} />
      ))}
    </div>
  );
}

// Product Header (Name + Tags)
function ProductHeader({ name, tags }: { name?: string; tags?: Array<{ text?: string }> }) {
  return (
    <div className="mb-8">
      <ProductName name={name} />
      <ProductTags tags={tags} />
    </div>
  );
}

// Product Image Placeholder
function ProductImagePlaceholder() {
  return <div className="w-[225px] h-[286px] bg-gray-100 rounded-lg" />;
}

// Product Image
function ProductImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src) return <ProductImagePlaceholder />;
  return (
    <Image
      src={src}
      alt={alt || "Producto"}
      width={225}
      height={286}
      className="object-contain"
    />
  );
}

// Product Image Container
function ProductImageContainer({ image, name }: { image?: string; name?: string }) {
  return (
    <div className="flex-1 relative flex items-center justify-center">
      <ProductImage src={image} alt={name} />
    </div>
  );
}

// Primary Action Button
function PrimaryActionButton({ text, href }: { text: string; href: string }) {
  return (
    <Link
      href={href}
      className="block w-full py-5 text-center bg-violet-700 hover:bg-violet-800 text-white text-base font-medium rounded-full transition-colors"
    >
      {text}
    </Link>
  );
}

// Secondary Action Button
function SecondaryActionButton({ text, href }: { text: string; href: string }) {
  return (
    <Link
      href={href}
      className="block w-full py-5 text-center border-2 border-violet-700 text-violet-700 hover:bg-violet-50 text-base font-medium rounded-full transition-colors"
    >
      {text}
    </Link>
  );
}

// Product Action Buttons
function ProductActions({
  selectText,
  moreText,
  link,
}: {
  selectText?: string;
  moreText?: string;
  link?: string;
}) {
  return (
    <div className="space-y-4 mt-8">
      <PrimaryActionButton text={selectText || "Seleccionar"} href={link || "#"} />
      <SecondaryActionButton text={moreText || "Leer más"} href={link || "#"} />
    </div>
  );
}

// Single Product Card
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex-shrink-0 w-[454px]">
      <div className="bg-white rounded-[24px] p-8 h-[707px] flex flex-col">
        <ProductHeader name={product.name} tags={product.tags} />
        <ProductImageContainer image={product.image} name={product.name} />
        <ProductActions
          selectText={product.selectText}
          moreText={product.moreText}
          link={product.link}
        />
      </div>
    </div>
  );
}

// Navigation Arrow Button
function NavigationArrow({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-end mt-8">
      <button
        onClick={onClick}
        className="w-[72px] h-[72px] rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-violet-700 hover:text-violet-700 transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
}

// Products Carousel
function ProductsCarousel({
  items,
  emblaRef,
  scrollNext,
}: {
  items: Product[];
  emblaRef: EmblaViewportRefType;
  scrollNext: () => void;
}) {
  return (
    <>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-8">
          {items.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
      <NavigationArrow onClick={scrollNext} />
    </>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function Products({
  headline = "Recupera tu cabello y confianza con tratamientos personalizados que se adaptan a tus necesidades",
  items = [
    {
      name: "Dutasterida + Minoxidil + Biotina",
      tags: [{ text: "Cápsula" }, { text: "Más vendido" }],
      image: "/images/product.png",
      selectText: "Seleccionar",
      moreText: "Ver más",
      link: "/productos/capsula"
    },
    {
      name: "Dutasterida + Minoxidil + Biotina",
      tags: [{ text: "Tópico" }, { text: "Más vendido" }],
      image: "/images/product.png",
      selectText: "Seleccionar",
      moreText: "Leer más",
      link: "/productos/gel"
    }
  ],
  tinaField,
}: ProductsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-[96px] bg-violet-50" data-tina-field={tinaField}>
      <div className="max-w-[1280px] mx-auto px-[72px]">
        <SectionHeadline text={headline} />
        <ProductsCarousel
          items={items}
          emblaRef={emblaRef}
          scrollNext={scrollNext}
        />
      </div>
    </section>
  );
}
