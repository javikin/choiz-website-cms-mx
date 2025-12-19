# Ejemplos de Implementación de Bloques

**Estado:** 🟢 Activo - Referencia Técnica
**Última actualización:** 2025-12-09
**Audiencia:** Desarrolladores

---

## Índice

1. [Estructura de un Bloque Completo](#estructura-de-un-bloque-completo)
2. [Ejemplo 1: Testimonials Block](#ejemplo-1-testimonials-block)
3. [Ejemplo 2: FAQ Block](#ejemplo-2-faq-block)
4. [Ejemplo 3: Product Comparison Block](#ejemplo-3-product-comparison-block)
5. [Ejemplo 4: Before/After Block](#ejemplo-4-beforeafter-block)
6. [Ejemplo 5: CTA Timer Block](#ejemplo-5-cta-timer-block)
7. [Best Practices](#best-practices)

---

## Estructura de un Bloque Completo

Todo bloque sigue esta estructura:

```
my-block/
├── schema.ts          # Definición de TinaCMS
├── component.tsx      # Componente React
├── types.ts           # TypeScript types
├── variants/          # Sub-componentes de variantes
│   ├── Default.tsx
│   ├── Centered.tsx
│   └── Minimal.tsx
└── index.ts           # Exports
```

### Checklist de Implementación

- [ ] Schema de Tina con validaciones
- [ ] TypeScript types generados
- [ ] Componente React con todas las variantes
- [ ] Responsive design (mobile-first)
- [ ] Accessibility (a11y)
- [ ] Performance (lazy loading, image optimization)
- [ ] Preview image para TinaCMS
- [ ] Tests (opcional pero recomendado)
- [ ] Documentación

---

## Ejemplo 1: Testimonials Block

### 1.1 Schema de TinaCMS

```typescript
// tina/schema/blocks/social/TestimonialsBlock.ts

import { Template } from "tinacms";
import { testimonialTemplate } from "../../templates/testimonial";

export const TestimonialsBlock: Template = {
  name: "testimonialsBlock",
  label: "Testimonios",
  ui: {
    defaultItem: {
      variant: "carousel",
      headline: "Lo que dicen nuestros clientes",
      subheadline: "Más de 10,000 personas ya vieron resultados",
      testimonials: [],
      showRatings: true,
    },
    previewSrc: "/admin/previews/testimonials-block.png",
    itemProps: (item) => ({
      label: `Testimonios - ${item?.variant || "carousel"} (${item?.testimonials?.length || 0} items)`,
    }),
  },
  fields: [
    // ========================================
    // VARIANTE
    // ========================================
    {
      type: "string",
      name: "variant",
      label: "Estilo de Testimonios",
      description: "Controla cómo se muestran los testimonios",
      options: [
        {
          value: "carousel",
          label: "Carousel (deslizable)",
        },
        {
          value: "grid",
          label: "Grid (cuadrícula)",
        },
        {
          value: "masonry",
          label: "Masonry (Pinterest style)",
        },
      ],
      ui: {
        component: "button-toggle",
      },
    },

    // ========================================
    // CONTENIDO
    // ========================================
    {
      type: "string",
      name: "headline",
      label: "Título de la Sección",
      ui: {
        validate: (value: string) => {
          if (value && value.length > 60) {
            return "Máximo 60 caracteres";
          }
        },
      },
    },
    {
      type: "string",
      name: "subheadline",
      label: "Subtítulo",
      ui: {
        component: "textarea",
        validate: (value: string) => {
          if (value && value.length > 150) {
            return "Máximo 150 caracteres";
          }
        },
      },
    },

    // ========================================
    // TESTIMONIOS
    // ========================================
    {
      type: "object",
      name: "testimonials",
      label: "Lista de Testimonios",
      description: "Agrega testimonios de clientes",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.name || "Nuevo testimonio",
        }),
        min: 1,
        max: 12,
        validate: (value: any[]) => {
          if (!value || value.length === 0) {
            return "Debes agregar al menos 1 testimonio";
          }
        },
      },
      templates: [
        {
          name: "testimonial",
          label: "Testimonio",
          ui: {
            defaultItem: {
              rating: 5,
              verified: true,
            },
          },
          fields: [
            {
              type: "string",
              name: "name",
              label: "Nombre del Cliente",
              required: true,
              ui: {
                validate: (value: string) => {
                  if (!value) return "El nombre es requerido";
                  if (value.length < 2) return "Mínimo 2 caracteres";
                  if (value.length > 50) return "Máximo 50 caracteres";
                },
              },
            },
            {
              type: "string",
              name: "image",
              label: "Foto del Cliente",
              description: "Ruta de imagen (ej: /images/testimonials/juan.jpg)",
            },
            {
              type: "string",
              name: "quote",
              label: "Testimonio",
              required: true,
              ui: {
                component: "textarea",
                validate: (value: string) => {
                  if (!value) return "El testimonio es requerido";
                  if (value.length < 20) return "Mínimo 20 caracteres";
                  if (value.length > 300) return "Máximo 300 caracteres";
                },
              },
            },
            {
              type: "number",
              name: "rating",
              label: "Calificación (1-5 estrellas)",
              ui: {
                component: "number",
                step: 0.5,
                validate: (value: number) => {
                  if (value < 1 || value > 5) {
                    return "La calificación debe estar entre 1 y 5";
                  }
                },
              },
            },
            {
              type: "boolean",
              name: "verified",
              label: "Compra Verificada",
              description: "Muestra badge de 'Compra Verificada'",
            },
            {
              type: "string",
              name: "productName",
              label: "Producto Usado",
              description: "Ej: 'Kit Choiz Premium'",
            },
            {
              type: "string",
              name: "videoUrl",
              label: "URL de Video (opcional)",
              description: "YouTube, Vimeo o link directo",
              ui: {
                validate: (value: string) => {
                  if (value && !value.includes("youtube") && !value.includes("vimeo") && !value.startsWith("http")) {
                    return "Debe ser una URL válida de video";
                  }
                },
              },
            },
            {
              type: "datetime",
              name: "date",
              label: "Fecha del Testimonio",
              description: "Opcional - muestra 'hace X tiempo'",
            },
          ],
        },
      ],
    },

    // ========================================
    // OPCIONES
    // ========================================
    {
      type: "boolean",
      name: "showRatings",
      label: "Mostrar Calificaciones",
      description: "Muestra las estrellas de rating",
    },
    {
      type: "boolean",
      name: "showDates",
      label: "Mostrar Fechas",
      description: "Muestra cuándo fue el testimonio",
    },
    {
      type: "boolean",
      name: "autoplay",
      label: "Auto-play (solo carousel)",
      description: "Rota automáticamente los testimonios",
      ui: {
        component: "toggle",
      },
    },

    // ========================================
    // CTA OPCIONAL
    // ========================================
    {
      type: "string",
      name: "ctaText",
      label: "Texto del Botón (opcional)",
      description: "Ej: 'Ver todos los testimonios'",
    },
    {
      type: "string",
      name: "ctaLink",
      label: "Enlace del Botón",
    },
  ],
};
```

### 1.2 Types

```typescript
// src/types/blocks/testimonials.ts

export interface Testimonial {
  name: string;
  image?: string;
  quote: string;
  rating: number;
  verified?: boolean;
  productName?: string;
  videoUrl?: string;
  date?: string;
}

export interface TestimonialsBlockProps {
  variant?: "carousel" | "grid" | "masonry";
  headline?: string;
  subheadline?: string;
  testimonials: Testimonial[];
  showRatings?: boolean;
  showDates?: boolean;
  autoplay?: boolean;
  ctaText?: string;
  ctaLink?: string;
}
```

### 1.3 Componente React

```typescript
// src/components/blocks/social/TestimonialsBlock.tsx

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { TestimonialsBlockProps, Testimonial } from "@/types/blocks/testimonials";
import useEmblaCarousel from "embla-carousel-react";

// ============================================
// MAIN COMPONENT
// ============================================

export function TestimonialsBlock({
  variant = "carousel",
  headline,
  subheadline,
  testimonials,
  showRatings = true,
  showDates = false,
  autoplay = false,
  ctaText,
  ctaLink,
}: TestimonialsBlockProps) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        {/* Header */}
        {(headline || subheadline) && (
          <div className="text-center mb-12 max-w-3xl mx-auto">
            {headline && (
              <h2 className="text-4xl md:text-5xl font-medium mb-4">{headline}</h2>
            )}
            {subheadline && (
              <p className="text-xl text-gray-600">{subheadline}</p>
            )}
          </div>
        )}

        {/* Testimonials */}
        {variant === "carousel" && (
          <CarouselVariant
            testimonials={testimonials}
            showRatings={showRatings}
            showDates={showDates}
            autoplay={autoplay}
          />
        )}

        {variant === "grid" && (
          <GridVariant
            testimonials={testimonials}
            showRatings={showRatings}
            showDates={showDates}
          />
        )}

        {variant === "masonry" && (
          <MasonryVariant
            testimonials={testimonials}
            showRatings={showRatings}
            showDates={showDates}
          />
        )}

        {/* CTA */}
        {ctaText && ctaLink && (
          <div className="text-center mt-12">
            <Button href={ctaLink} variant="outline">
              {ctaText}
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}

// ============================================
// CAROUSEL VARIANT
// ============================================

function CarouselVariant({
  testimonials,
  showRatings,
  showDates,
  autoplay,
}: {
  testimonials: Testimonial[];
  showRatings: boolean;
  showDates: boolean;
  autoplay: boolean;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Autoplay
  useEffect(() => {
    if (!emblaApi || !autoplay) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [emblaApi, autoplay]);

  // Track selected index
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
              <TestimonialCard
                testimonial={testimonial}
                showRatings={showRatings}
                showDates={showDates}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              selectedIndex === index ? "bg-[#7c72b2] w-8" : "bg-gray-300"
            )}
            aria-label={`Ir a testimonio ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================
// GRID VARIANT
// ============================================

function GridVariant({
  testimonials,
  showRatings,
  showDates,
}: {
  testimonials: Testimonial[];
  showRatings: boolean;
  showDates: boolean;
}) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard
          key={index}
          testimonial={testimonial}
          showRatings={showRatings}
          showDates={showDates}
        />
      ))}
    </div>
  );
}

// ============================================
// MASONRY VARIANT
// ============================================

function MasonryVariant({
  testimonials,
  showRatings,
  showDates,
}: {
  testimonials: Testimonial[];
  showRatings: boolean;
  showDates: boolean;
}) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="break-inside-avoid">
          <TestimonialCard
            testimonial={testimonial}
            showRatings={showRatings}
            showDates={showDates}
          />
        </div>
      ))}
    </div>
  );
}

// ============================================
// TESTIMONIAL CARD
// ============================================

function TestimonialCard({
  testimonial,
  showRatings,
  showDates,
}: {
  testimonial: Testimonial;
  showRatings: boolean;
  showDates: boolean;
}) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        {testimonial.image ? (
          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-[#7c72b2] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-medium text-lg">
              {testimonial.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Name & Rating */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-medium truncate">{testimonial.name}</h3>
            {testimonial.verified && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded flex-shrink-0">
                Verificado
              </span>
            )}
          </div>

          {showRatings && (
            <div className="flex items-center gap-1 mt-1">
              <Stars rating={testimonial.rating} />
            </div>
          )}

          {showDates && testimonial.date && (
            <p className="text-xs text-gray-500 mt-1">
              {formatDate(testimonial.date)}
            </p>
          )}
        </div>
      </div>

      {/* Quote */}
      <blockquote className="text-gray-700 leading-relaxed flex-1">
        "{testimonial.quote}"
      </blockquote>

      {/* Product */}
      {testimonial.productName && (
        <p className="text-sm text-gray-500 mt-4">
          Producto: <span className="font-medium">{testimonial.productName}</span>
        </p>
      )}

      {/* Video thumbnail */}
      {testimonial.videoUrl && (
        <button
          onClick={() => window.open(testimonial.videoUrl, "_blank")}
          className="mt-4 text-[#7c72b2] text-sm font-medium hover:underline flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
          </svg>
          Ver video testimonio
        </button>
      )}
    </div>
  );
}

// ============================================
// UTILITY COMPONENTS
// ============================================

function Stars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          return <StarIcon key={index} filled />;
        }
        if (index === fullStars && hasHalfStar) {
          return <StarIcon key={index} half />;
        }
        return <StarIcon key={index} />;
      })}
      <span className="text-sm text-gray-600 ml-1">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function StarIcon({ filled = false, half = false }: { filled?: boolean; half?: boolean }) {
  return (
    <svg
      className={cn("w-5 h-5", filled || half ? "text-yellow-400" : "text-gray-300")}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      {half ? (
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="#d1d5db" stopOpacity="1" />
          </linearGradient>
        </defs>
      ) : null}
      <path
        fill={half ? "url(#half)" : "currentColor"}
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
      />
    </svg>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hoy";
  if (diffDays === 1) return "Ayer";
  if (diffDays < 7) return `Hace ${diffDays} días`;
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
  if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`;
  return `Hace ${Math.floor(diffDays / 365)} años`;
}
```

### 1.4 Registro en Block Registry

```typescript
// tina/schema/blocks/social/index.ts

import { TestimonialsBlock } from "./TestimonialsBlock";
import { ReviewsBlock } from "./ReviewsBlock";
import { BeforeAfterBlock } from "./BeforeAfterBlock";

export const socialBlocks = [
  TestimonialsBlock,
  ReviewsBlock,
  BeforeAfterBlock,
];
```

---

## Ejemplo 2: FAQ Block

### 2.1 Schema

```typescript
// tina/schema/blocks/content/FAQBlock.ts

import { Template } from "tinacms";

export const FAQBlock: Template = {
  name: "faqBlock",
  label: "Preguntas Frecuentes",
  ui: {
    defaultItem: {
      variant: "accordion",
      headline: "Preguntas Frecuentes",
      faqs: [
        {
          question: "¿Cuánto tiempo toma ver resultados?",
          answer: "Los primeros resultados visibles suelen aparecer entre 3-6 meses.",
          category: "general",
        },
      ],
    },
  },
  fields: [
    {
      type: "string",
      name: "variant",
      label: "Estilo",
      options: [
        { value: "accordion", label: "Accordion" },
        { value: "grid", label: "Grid" },
        { value: "tabs", label: "Tabs por categoría" },
      ],
    },
    {
      type: "string",
      name: "headline",
      label: "Título",
    },
    {
      type: "object",
      name: "faqs",
      label: "Preguntas",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.question || "Nueva pregunta",
        }),
        max: 20,
      },
      fields: [
        {
          type: "string",
          name: "question",
          label: "Pregunta",
          required: true,
        },
        {
          type: "string",
          name: "answer",
          label: "Respuesta",
          required: true,
          ui: { component: "textarea" },
        },
        {
          type: "string",
          name: "category",
          label: "Categoría",
          options: [
            { value: "general", label: "General" },
            { value: "producto", label: "Producto" },
            { value: "envio", label: "Envío" },
            { value: "pago", label: "Pago" },
          ],
        },
      ],
    },
  ],
};
```

### 2.2 Componente (Accordion Variant)

```typescript
// src/components/blocks/content/FAQBlock.tsx

"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

interface FAQBlockProps {
  variant?: "accordion" | "grid" | "tabs";
  headline?: string;
  faqs: FAQ[];
}

export function FAQBlock({ variant = "accordion", headline, faqs }: FAQBlockProps) {
  if (variant === "accordion") {
    return <AccordionVariant headline={headline} faqs={faqs} />;
  }

  return null;
}

function AccordionVariant({ headline, faqs }: { headline?: string; faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <Container>
        {headline && (
          <h2 className="text-4xl font-medium text-center mb-12">{headline}</h2>
        )}

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-lg pr-4">{faq.question}</span>
                <ChevronIcon isOpen={openIndex === index} />
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-200 ease-in-out",
                  openIndex === index ? "max-h-96" : "max-h-0"
                )}
              >
                <div className="px-6 pb-4 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={cn(
        "w-5 h-5 transition-transform flex-shrink-0",
        isOpen && "rotate-180"
      )}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}
```

---

## Ejemplo 3: Product Comparison Block

### 3.1 Schema

```typescript
// tina/schema/blocks/product/ProductComparisonBlock.ts

import { Template } from "tinacms";

export const ProductComparisonBlock: Template = {
  name: "productComparisonBlock",
  label: "Comparación de Productos",
  ui: {
    defaultItem: {
      variant: "table",
      headline: "Elige el kit perfecto para ti",
    },
  },
  fields: [
    {
      type: "string",
      name: "variant",
      label: "Estilo",
      options: [
        { value: "table", label: "Tabla" },
        { value: "cards", label: "Tarjetas" },
      ],
    },
    {
      type: "string",
      name: "headline",
      label: "Título",
    },
    {
      type: "object",
      name: "products",
      label: "Productos a Comparar",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.name || "Nuevo producto",
        }),
        min: 2,
        max: 4,
      },
      fields: [
        { type: "string", name: "name", label: "Nombre", required: true },
        { type: "string", name: "price", label: "Precio", required: true },
        { type: "string", name: "image", label: "Imagen" },
        { type: "boolean", name: "featured", label: "Destacado" },
        {
          type: "object",
          name: "features",
          label: "Características",
          list: true,
          fields: [
            { type: "string", name: "name", label: "Característica" },
            {
              type: "string",
              name: "value",
              label: "Valor",
              description: "Ej: 'Incluido', 'No incluido', '3 consultas', etc.",
            },
          ],
        },
        { type: "string", name: "ctaText", label: "Texto del Botón" },
        { type: "string", name: "ctaLink", label: "Link del Botón" },
      ],
    },
  ],
};
```

### 3.2 Componente

```typescript
// src/components/blocks/product/ProductComparisonBlock.tsx

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface Product {
  name: string;
  price: string;
  image?: string;
  featured?: boolean;
  features: Array<{ name: string; value: string }>;
  ctaText?: string;
  ctaLink?: string;
}

interface ProductComparisonBlockProps {
  variant?: "table" | "cards";
  headline?: string;
  products: Product[];
}

export function ProductComparisonBlock({
  variant = "table",
  headline,
  products,
}: ProductComparisonBlockProps) {
  if (variant === "cards") {
    return <CardsVariant headline={headline} products={products} />;
  }

  return <TableVariant headline={headline} products={products} />;
}

function CardsVariant({ headline, products }: { headline?: string; products: Product[] }) {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        {headline && (
          <h2 className="text-4xl font-medium text-center mb-12">{headline}</h2>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <div
              key={index}
              className={cn(
                "bg-white rounded-lg p-6 shadow-sm relative",
                product.featured && "ring-2 ring-[#7c72b2] shadow-lg"
              )}
            >
              {product.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#7c72b2] text-white px-4 py-1 rounded-full text-sm">
                  Más popular
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-6">
                {product.image && (
                  <img src={product.image} alt={product.name} className="h-24 mx-auto mb-4" />
                )}
                <h3 className="text-2xl font-medium mb-2">{product.name}</h3>
                <p className="text-3xl font-bold">{product.price}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {product.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-2">
                    {feature.value === "Incluido" || feature.value === "true" ? (
                      <CheckIcon className="text-green-500" />
                    ) : feature.value === "No incluido" || feature.value === "false" ? (
                      <XIcon className="text-gray-300" />
                    ) : (
                      <span className="w-5 h-5 flex-shrink-0" />
                    )}
                    <span className="text-sm">
                      {feature.name}: <strong>{feature.value}</strong>
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {product.ctaText && product.ctaLink && (
                <Button
                  href={product.ctaLink}
                  className={cn(
                    "w-full",
                    product.featured
                      ? "bg-[#7c72b2] hover:bg-[#6a62a0] text-white"
                      : "bg-gray-900 hover:bg-gray-800 text-white"
                  )}
                >
                  {product.ctaText}
                </Button>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TableVariant({ headline, products }: { headline?: string; products: Product[] }) {
  // Get all unique features
  const allFeatures = Array.from(
    new Set(products.flatMap((p) => p.features.map((f) => f.name)))
  );

  return (
    <section className="py-20 bg-white">
      <Container>
        {headline && (
          <h2 className="text-4xl font-medium text-center mb-12">{headline}</h2>
        )}

        <div className="overflow-x-auto">
          <table className="w-full max-w-5xl mx-auto">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 font-medium">Característica</th>
                {products.map((product, index) => (
                  <th key={index} className="text-center py-4 px-4">
                    <div className="font-medium text-lg">{product.name}</div>
                    <div className="text-2xl font-bold mt-1">{product.price}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allFeatures.map((featureName, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium">{featureName}</td>
                  {products.map((product, pIndex) => {
                    const feature = product.features.find((f) => f.name === featureName);
                    return (
                      <td key={pIndex} className="text-center py-4 px-4">
                        {feature ? (
                          feature.value === "Incluido" || feature.value === "true" ? (
                            <CheckIcon className="text-green-500 mx-auto" />
                          ) : feature.value === "No incluido" || feature.value === "false" ? (
                            <XIcon className="text-gray-300 mx-auto" />
                          ) : (
                            <span>{feature.value}</span>
                          )
                        ) : (
                          <span className="text-gray-300">-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* CTA Row */}
              <tr>
                <td className="py-4 px-4"></td>
                {products.map((product, index) => (
                  <td key={index} className="text-center py-4 px-4">
                    {product.ctaText && product.ctaLink && (
                      <Button href={product.ctaLink} size="sm">
                        {product.ctaText}
                      </Button>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("w-5 h-5", className)} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("w-5 h-5", className)} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}
```

---

## Best Practices

### 1. Performance

```typescript
// Lazy load bloques pesados
const HeavyBlock = dynamic(
  () => import("./HeavyBlock").then((mod) => mod.HeavyBlock),
  {
    loading: () => <BlockSkeleton />,
    ssr: true, // Mantener SSR para SEO
  }
);

// Optimizar imágenes
<Image
  src={image}
  alt={alt}
  width={500}
  height={500}
  loading="lazy"
  placeholder="blur"
/>
```

### 2. Accessibility

```typescript
// Siempre incluir labels y aria attributes
<button
  onClick={toggle}
  aria-expanded={isOpen}
  aria-label={`${isOpen ? "Cerrar" : "Abrir"} ${question}`}
>
  {question}
</button>

// Focus states
className="focus:outline-none focus:ring-2 focus:ring-[#7c72b2]"
```

### 3. TypeScript

```typescript
// Usar tipos estrictos
interface BlockProps {
  variant: "default" | "centered"; // No string genérico
  headline: string; // Requerido
  subheadline?: string; // Opcional explícito
}

// Validar en tiempo de compilación
const validVariants = ["default", "centered"] as const;
type Variant = typeof validVariants[number];
```

### 4. Responsive

```typescript
// Mobile-first approach
<div className="
  grid
  grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
  gap-4
  md:gap-6
  lg:gap-8
">
```

### 5. Testing

```typescript
// Test básico
describe("TestimonialsBlock", () => {
  it("renderiza todos los testimonios", () => {
    const testimonials = [
      { name: "Juan", quote: "Excelente", rating: 5 },
      { name: "María", quote: "Muy bueno", rating: 4 },
    ];

    render(<TestimonialsBlock testimonials={testimonials} />);

    expect(screen.getByText("Juan")).toBeInTheDocument();
    expect(screen.getByText("María")).toBeInTheDocument();
  });
});
```

---

**Creado:** 2025-12-09
**Autor:** Development Team
