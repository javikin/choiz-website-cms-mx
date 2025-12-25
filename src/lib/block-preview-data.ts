/**
 * Sample data for block previews in the gallery
 * Each block has default values to show a meaningful preview
 */

export const blockPreviewData: Record<string, Record<string, unknown>> = {
  hero: {
    badge: "+30,000 personas ya vieron resultados",
    headline: "El tratamiento mas efectivo de Mexico para la caida del cabello",
    benefits: [
      { text: "Resultados en 90 - 180 dias" },
      { text: "Cientificamente comprobado" },
      { text: "100% en linea, con envio gratis" },
    ],
    ctaText: "Comienza hoy",
    ctaLink: "/quiz",
    priceText: "Desde $467/mes",
    backgroundImage: "/images/bg-hero-desk.webp",
  },

  heroVideo: {
    variant: "background",
    badge: "Nuevo tratamiento 2024",
    headline: "Recupera tu cabello con ciencia",
    subheadline: "Tratamientos personalizados con resultados comprobados",
    ctaText: "Ver video",
    ctaLink: "/quiz",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    posterImage: "/images/hero-man-optimized.jpg",
  },

  certifications: {
    title: "Aprobados y certificados por",
    badges: [
      { logo: "/images/cofepris-logo.png", label: "Lic. 2421055036X00214" },
      { logo: "/images/profeco-logo.png", label: "Folio DA24MT62411053" },
    ],
  },

  testimonials: {
    headline: "Resultados reales de nuestros clientes",
    subheadline: "Miles de personas ya recuperaron su confianza",
    videos: [
      {
        name: "Carlos M.",
        backgroundImage: "/images/testimonials/video-1.jpg",
        videoUrl: "#",
        rating: 5,
        productName: "Kit Completo",
      },
      {
        name: "Roberto G.",
        backgroundImage: "/images/testimonials/video-2.jpg",
        videoUrl: "#",
        rating: 5,
        productName: "Formula Topica",
      },
    ],
    ctaText: "Ver mas testimonios",
    ctaLink: "/testimonios",
  },

  successStories: {
    highlightText: "+20,000 personas",
    normalText: "ya obtuvieron resultados",
    ctaPrimaryText: "Comienza hoy",
    ctaPrimaryLink: "/quiz",
    ctaSecondaryText: "Ver mas casos",
    ctaSecondaryLink: "/casos",
    testimonials: [
      {
        name: "Roberto",
        age: 26,
        quote: "Llevo 3 meses y ya veo avances increibles.",
        beforeImage: "/images/testimonials/roberto-before.jpg",
        afterImage: "/images/testimonials/roberto-after.jpg",
        monthsBefore: 0,
        monthsAfter: 3,
      },
    ],
  },

  formulas: {
    headline: "Creamos",
    highlightText: "formulas personalizadas",
    formulas: [
      {
        name: "Dutasteride 0.5mg + Minoxidil",
        image: "/images/products/capsulas-1.png",
        tags: [
          { text: "Capsulas", variant: "purple" },
          { text: "Facil adopcion", variant: "blue" },
        ],
        ctaText: "Ver si soy apto",
        ctaLink: "/quiz",
      },
    ],
  },

  activos: {
    headline: "Utilizamos activos de calidad y con",
    highlightText: "evidencia cientifica",
    ctaText: "Encontrar mi formula",
    ctaLink: "/quiz",
    activos: [
      {
        name: "Dutasterida",
        description: "Detiene la caida y promueve el crecimiento",
        image: "/images/activos/dutasterida.png",
      },
      {
        name: "Minoxidil",
        description: "Reactiva los foliculos danados",
        image: "/images/activos/minoxidil.png",
      },
    ],
  },

  videoTestimonials: {
    headline: "No lo decimos nosotros, lo dicen",
    highlightText: "nuestros usuarios",
    ctaText: "Comienza hoy",
    ctaLink: "/quiz",
    videos: [
      { name: "Usuario 1", backgroundImage: "/images/testimonials/video-1.jpg", videoUrl: "#" },
      { name: "Usuario 2", backgroundImage: "/images/testimonials/video-2.jpg", videoUrl: "#" },
    ],
  },

  howItWorks: {
    headline: "Como funciona el tratamiento",
    steps: [
      { title: "Completa el cuestionario", description: "5 minutos para conocerte", icon: "" },
      { title: "Recibe tu diagnostico", description: "Un doctor evalua tu caso", icon: "" },
      { title: "Enviamos tu tratamiento", description: "Directo a tu puerta", icon: "" },
    ],
    ctaText: "Comenzar",
    ctaLink: "/quiz",
  },

  howItWorksNew: {
    headline: "Como funciona Choiz",
    ctaText: "Comenzar hoy",
    ctaLink: "/quiz",
    steps: [
      {
        title: "Completa el cuestionario",
        description: "Te tomara 5 minutos",
        image: "/images/how-it-works/step-1.png",
      },
      {
        title: "Recibe tu diagnostico",
        description: "Un doctor evalua tu caso",
        image: "/images/how-it-works/step-2.png",
      },
    ],
  },

  faq: {
    headline: "Tienes preguntas? Aqui te dejamos",
    highlightText: "respuestas",
    items: [
      {
        question: "Que es la Alopecia Androgenica?",
        answer: "Es una condicion genetica que causa perdida progresiva del cabello.",
      },
      {
        question: "Cuanto tiempo tarda en hacer efecto?",
        answer: "Los resultados se ven entre 3 y 6 meses de uso constante.",
      },
    ],
  },

  finalCta: {
    headline: "Recupera tu cabello hoy",
    subheadline: "Miles de personas ya lo lograron",
    ctaText: "Comenzar",
    ctaLink: "/quiz",
  },

  finalCtaNew: {
    headline: "Recupera tu cabello y tu confianza con Choiz",
    ctaText: "Comienza hoy",
    ctaLink: "/quiz",
    backgroundImage: "/images/hero-man-optimized.jpg",
  },

  footerNew: {
    appTitle: "Tu salud en un solo lugar",
    appSubtitle: "Descarga la app",
    appImage: "/images/app-mockup.png",
    companyLinks: [{ text: "Sobre nosotros", url: "/nosotros" }],
    founders: [{ name: "Franco Lacrampette" }],
    resourceLinks: [{ text: "Blog", url: "/blog" }],
    phone: "+52 1 55 9225 6335",
    email: "hola@choiz.com.mx",
    hoursLabel: "Lunes a Viernes",
    hoursValue: "07 a 22 hs",
    treatmentLinks: [{ text: "Alopecia", url: "/alopecia" }],
    legalLinks: [{ text: "Privacidad", url: "/privacidad" }],
    cofeprisCode: "COFEPRIS 2421055036X00214",
    socialLinks: [{ platform: "instagram", url: "#" }],
    copyright: "© CHOIZ. Todos los derechos reservados.",
    logoImage: "/images/choiz-logo-gray.svg",
  },

  stats: {
    headline: "Nuestros resultados hablan",
    variant: "default",
    stats: [
      { value: "+30,000", label: "Clientes satisfechos" },
      { value: "94%", label: "Ven resultados" },
      { value: "180", label: "Dias de garantia" },
    ],
  },

  ctaTimer: {
    variant: "countdown",
    headline: "Oferta por tiempo limitado",
    subheadline: "No te quedes sin tu descuento",
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    ctaText: "Aprovechar ahora",
    ctaLink: "/quiz",
    limitedText: "Solo 10 lugares disponibles",
  },

  pressLogos: {
    headline: "Como se ha visto en",
    variant: "static",
    logos: [
      { image: "/images/cofepris-logo.png", name: "COFEPRIS", url: "#" },
      { image: "/images/profeco-logo.png", name: "PROFECO", url: "#" },
    ],
  },

  productComparison: {
    headline: "Compara nuestros kits",
    variant: "table",
    products: [
      { name: "Kit Basico", price: "$467", priceNote: "/mes", ctaText: "Elegir", ctaLink: "/quiz" },
      { name: "Kit Completo", price: "$697", priceNote: "/mes", ctaText: "Elegir", ctaLink: "/quiz", isRecommended: true },
    ],
    features: [
      { name: "Capsulas", included: [{ value: true }, { value: true }] },
      { name: "Locion", included: [{ value: false }, { value: true }] },
    ],
  },

  beforeAfter: {
    headline: "Resultados reales de clientes",
    subheadline: "Desliza para comparar",
    variant: "slider",
    cases: [
      {
        beforeImage: "/images/testimonials/roberto-before.jpg",
        afterImage: "/images/testimonials/roberto-after.jpg",
        name: "Roberto",
        duration: "3 meses",
        product: "Kit Completo",
      },
    ],
  },

  benefits: {
    headline: "Por que elegir Choiz?",
    subheadline: "Lo que nos hace diferentes",
    variant: "default",
    benefits: [
      { title: "Formulas personalizadas", description: "Adaptadas a tu tipo de cabello" },
      { title: "Envio gratis", description: "A toda la republica" },
      { title: "Garantia 180 dias", description: "O te devolvemos tu dinero" },
    ],
  },

  guarantee: {
    days: "180",
    headline: "Garantia de satisfaccion",
    description: "Si no ves resultados, te devolvemos tu dinero",
  },

  guaranteeNew: {
    days: "180",
    headline: "Garantia de exito asegurada",
    description: "Si no ves resultados, te devolvemos el 100%",
    variant: "default",
    ctaText: "Ver terminos",
    ctaLink: "/terminos",
  },

  reviews: {
    headline: "Lo que dicen nuestros clientes",
    variant: "stats",
    averageRating: 4.8,
    totalReviews: 1247,
    breakdown: [
      { stars: 5, percentage: 85 },
      { stars: 4, percentage: 10 },
      { stars: 3, percentage: 3 },
    ],
    reviews: [
      { name: "Carlos M.", date: "Hace 2 dias", rating: 5, text: "Excelente producto!" },
    ],
  },

  problem: {
    headline: "Por que perdemos cabello?",
    stat: "50%",
    statDescription: "de los hombres sufren alopecia",
    explanation: "La DHT es la hormona responsable de la miniaturizacion del foliculo.",
    illustration: "",
    hairLossTypes: [
      { name: "Entradas y coronilla", icon: "" },
      { name: "Coronilla", icon: "" },
    ],
  },

  products: {
    headline: "Nuestros productos",
    items: [
      { name: "Kit Completo", image: "/images/products/capsulas-1.png", selectText: "Elegir", link: "/quiz" },
    ],
  },

  ingredients: {
    headline: "Ingredientes activos",
    items: [
      { name: "Minoxidil", description: "Estimula el crecimiento capilar" },
      { name: "Finasterida", description: "Bloquea la DHT" },
    ],
    ctaText: "Ver todos",
    ctaLink: "/ingredientes",
  },

  effectiveness: {
    headline: "Efectividad comprobada",
    chartTitle: "Resultados en 6 meses",
    stats: [
      { label: "Detienen caida", percentage: 94 },
      { label: "Nuevo crecimiento", percentage: 67 },
    ],
    conclusion: "La mayoria de usuarios ven resultados significativos.",
    ctaText: "Comenzar",
    ctaLink: "/quiz",
  },

  whyChoose: {
    headline: "Por que elegirnos",
    valueProps: [
      { title: "Formulas personalizadas", description: "Adaptadas a ti" },
      { title: "Doctores expertos", description: "Supervision medica" },
    ],
    ctaText: "Conocer mas",
    ctaLink: "/nosotros",
  },
};

export function getPreviewData(blockId: string): Record<string, unknown> {
  return blockPreviewData[blockId] || {};
}
