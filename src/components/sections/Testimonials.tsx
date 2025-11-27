"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { normalizeImageUrl } from "@/lib/images";

// ============================================
// TYPES
// ============================================

interface TestimonialVideo {
  name?: string;
  backgroundImage?: string;
  videoUrl?: string;
  rating?: number;
  productName?: string;
  productDescription?: string;
  productImage?: string;
}

interface TestimonialsProps {
  headline?: string;
  subheadline?: string;
  videos?: TestimonialVideo[];
  ctaText?: string;
  ctaLink?: string;
  moreText?: string;
  moreLink?: string;
  tinaField?: string;
}

// ============================================
// SUB-COMPONENTS
// ============================================

// Single Star Icon
function StarIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
      <path
        d="M9.5 0L11.6329 7.30729H19L13.1835 11.8854L15.3165 19L9.5 14.4218L3.68346 19L5.81651 11.8854L0 7.30729H7.36712L9.5 0Z"
        fill="#FEDF89"
      />
    </svg>
  );
}

// Star Rating (displays N stars)
function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: rating }).map((_, i) => (
        <StarIcon key={i} />
      ))}
    </div>
  );
}

// User Name Display
function UserName({ name }: { name?: string }) {
  if (!name) return null;
  return (
    <p className="text-[20px] font-medium text-white drop-shadow-lg">
      {name}
    </p>
  );
}

// User Info Block (name + stars)
function UserInfo({ name, rating }: { name?: string; rating?: number }) {
  return (
    <div className="absolute top-[27px] left-[30px] flex items-center gap-[14px]">
      <div className="flex flex-col gap-[12px]">
        <UserName name={name} />
        {rating && <StarRating rating={rating} />}
      </div>
    </div>
  );
}

// Play Button
function PlayButton() {
  return (
    <div className="absolute left-1/2 top-[224px] -translate-x-1/2">
      <div className="w-[83px] h-[83px] rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
        <Play className="w-8 h-8 text-[#292929] ml-1" fill="currentColor" />
      </div>
    </div>
  );
}

// Background Image
function BackgroundImage({ src, alt }: { src?: string; alt?: string }) {
  return (
    <div className="absolute inset-0 bg-[#D9D9D9]">
      {src && (
        <Image
          src={normalizeImageUrl(src)}
          alt={alt || "Testimonio"}
          fill
          className="object-cover"
        />
      )}
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
    </div>
  );
}

// Product Image
function ProductImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src) return null;
  return (
    <div className="w-[104px] h-[132px] -mt-[52px]">
      <Image
        src={normalizeImageUrl(src)}
        alt={alt || "Producto"}
        width={104}
        height={132}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

// Product Text Info
function ProductText({
  name,
  description,
}: {
  name?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col gap-[12px] pb-2">
      {name && (
        <p className="text-[18px] font-bold text-[#3B3345]">{name}</p>
      )}
      {description && (
        <p className="text-[14px] text-[#645C6F] leading-[1.14]">
          {description}
        </p>
      )}
    </div>
  );
}

// Product Info Card (bottom white section)
function ProductInfoCard({
  productImage,
  productName,
  productDescription,
}: {
  productImage?: string;
  productName?: string;
  productDescription?: string;
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[108px] bg-white rounded-b-[36px]">
      <div className="absolute left-[28px] bottom-[20px] flex items-end gap-4">
        <ProductImage src={productImage} alt={productName} />
        <ProductText name={productName} description={productDescription} />
      </div>
    </div>
  );
}

// Testimonial Card
function TestimonialCard({ video }: { video: TestimonialVideo }) {
  return (
    <div className="flex-shrink-0 w-[363px]">
      <div
        className="relative w-[363px] h-[589px] rounded-[36px] overflow-hidden group cursor-pointer"
        style={{
          boxShadow: "0px 36px 83px 12px rgba(16, 24, 40, 0.08)",
        }}
      >
        <BackgroundImage src={video.backgroundImage} alt={video.name} />
        <PlayButton />
        <UserInfo name={video.name} rating={video.rating} />
        <ProductInfoCard
          productImage={video.productImage}
          productName={video.productName}
          productDescription={video.productDescription}
        />
      </div>
    </div>
  );
}

// More Testimonials Button
function MoreTestimonialsButton({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <div className="flex-shrink-0 flex items-center">
      <Link
        href={href}
        className="h-[84px] px-[48px] py-[24px] rounded-[120px] border-[1.5px] border-[#292929] flex items-center justify-center hover:bg-[#F5F5F5] transition-colors"
      >
        <span className="text-[24px] text-[#292929] whitespace-nowrap">
          {text}
        </span>
      </Link>
    </div>
  );
}

// Navigation Arrow Button
function NavigationArrow({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex justify-end">
      <button
        onClick={onClick}
        disabled={disabled}
        className="w-[72px] h-[72px] rounded-[90px] bg-[#F4F4F4] flex items-center justify-center hover:bg-[#E8E8E8] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Next"
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path
            d="M13.5 9L22.5 18L13.5 27"
            stroke="#7D7D7D"
            strokeWidth="3.38"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

// Section Header with Headline
function SectionHeader({
  headline,
  subheadline,
  ctaText,
  ctaLink,
}: {
  headline: string;
  subheadline?: string;
  ctaText: string;
  ctaLink: string;
}) {
  // Parse headline to highlight second part after comma
  const renderHeadline = () => {
    if (headline.includes(",")) {
      const parts = headline.split(",");
      return (
        <>
          <span className="text-[#3B3345]">{parts[0]},</span>
          <span className="text-[#B8A2F2]">{parts[1]}</span>
        </>
      );
    }
    return <span className="text-[#3B3345]">{headline}</span>;
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-[56px]">
      <div className="flex flex-col gap-8 max-w-[750px]">
        <h2 className="text-[32px] md:text-[40px] font-medium leading-[1.25]">
          {renderHeadline()}
        </h2>
        {subheadline && (
          <p className="text-[20px] md:text-[24px] text-[#645C6F] leading-[1.25] max-w-[627px]">
            {subheadline}
          </p>
        )}
      </div>
      <Link
        href={ctaLink}
        className="hidden lg:inline-flex items-center justify-center h-[81px] px-6 min-w-[389px] bg-[#292929] hover:bg-[#1a1a1a] text-white text-[20px] rounded-[80px] transition-colors"
      >
        {ctaText}
      </Link>
    </div>
  );
}

// Mobile CTA Button
function MobileCTA({ text, href }: { text: string; href: string }) {
  return (
    <div className="lg:hidden mt-8">
      <Link
        href={href}
        className="block w-full py-6 text-center bg-[#292929] hover:bg-[#1a1a1a] text-white text-[20px] rounded-[80px] transition-colors"
      >
        {text}
      </Link>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function Testimonials({
  headline = "Historias reales, resultados reales",
  subheadline = "Descubre cómo nuestros usuarios transformaron su cabello con Choiz.",
  videos = [],
  ctaText = "Comenzar mi tratamiento",
  ctaLink = "/quiz",
  moreText = "Ver más testimonios",
  moreLink = "/testimonios",
  tinaField,
}: TestimonialsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    skipSnaps: false,
  });
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-[72px] bg-white" data-tina-field={tinaField}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-[72px]">
        <SectionHeader
          headline={headline}
          subheadline={subheadline}
          ctaText={ctaText}
          ctaLink={ctaLink}
        />

        {/* Carousel */}
        <div className="flex flex-col gap-[48px]">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-[24px]">
              {videos.map((video, index) => (
                <TestimonialCard key={index} video={video} />
              ))}
              <MoreTestimonialsButton href={moreLink} text={moreText} />
            </div>
          </div>

          <NavigationArrow onClick={scrollNext} disabled={!canScrollNext} />
        </div>

        <MobileCTA text={ctaText} href={ctaLink} />
      </div>
    </section>
  );
}
