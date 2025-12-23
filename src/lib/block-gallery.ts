/**
 * Block Gallery Configuration
 * Metadata for all available TinaCMS blocks with categories and descriptions
 */

export interface BlockInfo {
  id: string;
  name: string;
  description: string;
  category: BlockCategory;
  variants?: string[];
  preview: string; // Path to preview image
}

export type BlockCategory =
  | "hero"
  | "social-proof"
  | "trust"
  | "products"
  | "content"
  | "cta"
  | "footer";

export const categoryLabels: Record<BlockCategory, string> = {
  hero: "Hero",
  "social-proof": "Social Proof",
  trust: "Confianza",
  products: "Productos",
  content: "Contenido",
  cta: "Llamadas a la Accion",
  footer: "Footer",
};

export const categoryDescriptions: Record<BlockCategory, string> = {
  hero: "Secciones principales para captar atencion",
  "social-proof": "Testimonios, reviews y casos de exito",
  trust: "Certificaciones, estadisticas y garantias",
  products: "Productos, formulas e ingredientes",
  content: "Informacion, pasos y preguntas frecuentes",
  cta: "Botones de accion y ofertas con temporizador",
  footer: "Pie de pagina con enlaces y contacto",
};

export const blocks: BlockInfo[] = [
  // === HERO ===
  {
    id: "hero",
    name: "Hero con Imagen",
    description:
      "Seccion principal con titulo, beneficios y CTA. Fondo con imagen responsive.",
    category: "hero",
    preview: "/images/block-previews/hero.svg",
  },
  {
    id: "heroVideo",
    name: "Hero con Video",
    description:
      "Hero con video de fondo o embebido. Ideal para demos o testimonios.",
    category: "hero",
    variants: ["background", "embedded"],
    preview: "/images/block-previews/hero-video.svg",
  },

  // === SOCIAL PROOF ===
  {
    id: "testimonials",
    name: "Testimonios en Video",
    description: "Grid de videos de testimonios con reproductor integrado.",
    category: "social-proof",
    preview: "/images/block-previews/testimonials.svg",
  },
  {
    id: "videoTestimonials",
    name: "Carrusel de Video Testimonios",
    description: "Carrusel horizontal de testimonios en video.",
    category: "social-proof",
    preview: "/images/block-previews/video-testimonials.svg",
  },
  {
    id: "successStories",
    name: "Historias de Exito",
    description:
      "Antes/despues con fotos, nombre, edad y duracion del tratamiento.",
    category: "social-proof",
    preview: "/images/block-previews/success-stories.svg",
  },
  {
    id: "beforeAfter",
    name: "Antes y Despues",
    description: "Comparacion visual con slider interactivo.",
    category: "social-proof",
    variants: ["slider", "grid", "carousel"],
    preview: "/images/block-previews/before-after.svg",
  },
  {
    id: "reviews",
    name: "Reviews de Clientes",
    description:
      "Rating promedio, desglose de estrellas y reviews individuales.",
    category: "social-proof",
    variants: ["default", "compact", "detailed"],
    preview: "/images/block-previews/reviews.svg",
  },

  // === TRUST ===
  {
    id: "certifications",
    name: "Certificaciones",
    description: "Logos de certificaciones, avales medicos y reconocimientos.",
    category: "trust",
    preview: "/images/block-previews/certifications.svg",
  },
  {
    id: "pressLogos",
    name: "Logos de Prensa",
    description: "Medios que han mencionado la marca.",
    category: "trust",
    variants: ["default", "carousel"],
    preview: "/images/block-previews/press-logos.svg",
  },
  {
    id: "stats",
    name: "Estadisticas",
    description: "Numeros destacados con iconos y descripciones.",
    category: "trust",
    variants: ["default", "cards", "minimal"],
    preview: "/images/block-previews/stats.svg",
  },
  {
    id: "guarantee",
    name: "Garantia",
    description: "Garantia de satisfaccion con dias y descripcion.",
    category: "trust",
    preview: "/images/block-previews/guarantee.svg",
  },
  {
    id: "guaranteeNew",
    name: "Garantia (Nueva)",
    description: "Version mejorada con variantes de diseno y CTA.",
    category: "trust",
    variants: ["default", "compact", "featured"],
    preview: "/images/block-previews/guarantee-new.svg",
  },
  {
    id: "effectiveness",
    name: "Efectividad",
    description: "Grafico de efectividad con estadisticas y fuentes.",
    category: "trust",
    preview: "/images/block-previews/effectiveness.svg",
  },

  // === PRODUCTS ===
  {
    id: "products",
    name: "Productos",
    description: "Grid de productos con imagen, nombre y descripcion.",
    category: "products",
    preview: "/images/block-previews/products.svg",
  },
  {
    id: "productComparison",
    name: "Comparacion de Productos",
    description: "Tabla comparativa con precios y caracteristicas.",
    category: "products",
    variants: ["default", "pricing"],
    preview: "/images/block-previews/product-comparison.svg",
  },
  {
    id: "formulas",
    name: "Formulas",
    description: "Cards de formulas con ingredientes y beneficios.",
    category: "products",
    preview: "/images/block-previews/formulas.svg",
  },
  {
    id: "activos",
    name: "Activos/Ingredientes",
    description: "Ingredientes activos con imagenes y descripciones.",
    category: "products",
    preview: "/images/block-previews/activos.svg",
  },
  {
    id: "ingredients",
    name: "Ingredientes",
    description: "Lista de ingredientes con iconos y explicaciones.",
    category: "products",
    preview: "/images/block-previews/ingredients.svg",
  },

  // === CONTENT ===
  {
    id: "problem",
    name: "Problema",
    description: "Explicacion del problema con estadisticas y ciencia.",
    category: "content",
    preview: "/images/block-previews/problem.svg",
  },
  {
    id: "whyChoose",
    name: "Por que Elegirnos",
    description: "Propuestas de valor con iconos y descripciones.",
    category: "content",
    preview: "/images/block-previews/why-choose.svg",
  },
  {
    id: "benefits",
    name: "Beneficios",
    description: "Lista de beneficios con opcion de comparativa.",
    category: "content",
    variants: ["default", "grid", "comparison"],
    preview: "/images/block-previews/benefits.svg",
  },
  {
    id: "howItWorks",
    name: "Como Funciona",
    description: "Pasos numerados con descripciones.",
    category: "content",
    preview: "/images/block-previews/how-it-works.svg",
  },
  {
    id: "howItWorksNew",
    name: "Como Funciona (Nuevo)",
    description: "Version con mockups de celular para cada paso.",
    category: "content",
    preview: "/images/block-previews/how-it-works-new.svg",
  },
  {
    id: "faq",
    name: "Preguntas Frecuentes",
    description: "Acordeon de preguntas y respuestas.",
    category: "content",
    preview: "/images/block-previews/faq.svg",
  },

  // === CTA ===
  {
    id: "finalCta",
    name: "CTA Final",
    description: "Llamada a la accion con titulo y boton.",
    category: "cta",
    preview: "/images/block-previews/final-cta.svg",
  },
  {
    id: "finalCtaNew",
    name: "CTA Final (Nuevo)",
    description: "CTA con imagen de fondo personalizable.",
    category: "cta",
    preview: "/images/block-previews/final-cta-new.svg",
  },
  {
    id: "ctaTimer",
    name: "CTA con Temporizador",
    description: "Oferta con cuenta regresiva y stock limitado.",
    category: "cta",
    variants: ["default", "urgent", "limited"],
    preview: "/images/block-previews/cta-timer.svg",
  },

  // === FOOTER ===
  {
    id: "footerNew",
    name: "Footer Completo",
    description:
      "Footer con app, enlaces, contacto, redes sociales y legal.",
    category: "footer",
    preview: "/images/block-previews/footer-new.svg",
  },
];

/**
 * Get blocks grouped by category
 */
export function getBlocksByCategory(): Record<BlockCategory, BlockInfo[]> {
  const grouped = {} as Record<BlockCategory, BlockInfo[]>;

  for (const category of Object.keys(categoryLabels) as BlockCategory[]) {
    grouped[category] = blocks.filter((block) => block.category === category);
  }

  return grouped;
}

/**
 * Get a single block by ID
 */
export function getBlockById(id: string): BlockInfo | undefined {
  return blocks.find((block) => block.id === id);
}

/**
 * Search blocks by name or description
 */
export function searchBlocks(query: string): BlockInfo[] {
  const lowerQuery = query.toLowerCase();
  return blocks.filter(
    (block) =>
      block.name.toLowerCase().includes(lowerQuery) ||
      block.description.toLowerCase().includes(lowerQuery)
  );
}
