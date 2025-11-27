import { defineConfig, type Template, type TinaField } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
// Ensure branch name is trimmed to avoid newline issues in build
const branch = (
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main"
).trim();

// Check if we're in local development mode
const isLocalDevelopment = process.env.TINA_PUBLIC_IS_LOCAL === "true";

// ============================================
// CONSTANTES Y LIMITES
// ============================================

const LIMITS = {
  // Textos
  CTA_TEXT_MAX: 30,
  BADGE_MAX: 50,
  HEADLINE_MIN: 10,
  HEADLINE_MAX: 100,
  BENEFIT_MAX: 80,
  META_TITLE_MAX: 60,
  META_DESCRIPTION_MAX: 160,

  // Listas
  MAX_BENEFITS: 5,
  MAX_BADGES: 4,
  MAX_TESTIMONIALS: 12,
  MAX_PRODUCTS: 6,
  MAX_INGREDIENTS: 8,
  MAX_STATS: 5,
  MAX_SCIENCE_CARDS: 6,
  MAX_PHASES: 4,
  MAX_VALUE_PROPS: 4,
  MAX_STEPS: 6,
  MAX_SOCIAL_LINKS: 6,
  MAX_TAGS: 5,
};

// ============================================
// CAMPOS SEO REUTILIZABLES
// ============================================

const seoFields: TinaField[] = [
  {
    type: "object",
    name: "seo",
    label: "SEO y Meta Tags",
    description: "Configuracion para buscadores y redes sociales",
    fields: [
      {
        type: "string",
        name: "metaTitle",
        label: "Meta Title",
        description: `Titulo que aparece en Google (max ${LIMITS.META_TITLE_MAX} caracteres)`,
        ui: {
          validate: (value: string) => {
            if (value && value.length > LIMITS.META_TITLE_MAX) {
              return `El titulo no debe exceder ${LIMITS.META_TITLE_MAX} caracteres (actual: ${value.length})`;
            }
          },
        },
      },
      {
        type: "string",
        name: "metaDescription",
        label: "Meta Description",
        description: `Descripcion para Google (max ${LIMITS.META_DESCRIPTION_MAX} caracteres)`,
        ui: {
          component: "textarea",
          validate: (value: string) => {
            if (value && value.length > LIMITS.META_DESCRIPTION_MAX) {
              return `La descripcion no debe exceder ${LIMITS.META_DESCRIPTION_MAX} caracteres (actual: ${value.length})`;
            }
          },
        },
      },
      {
        type: "string",
        name: "ogImage",
        label: "Imagen para Redes Sociales (og:image)",
        description: "Ruta de imagen (ej: /images/og-image.jpg). 1200x630px recomendado",
      },
      {
        type: "string",
        name: "ogType",
        label: "Tipo de Pagina",
        options: [
          { value: "website", label: "Website (pagina principal)" },
          { value: "product", label: "Producto" },
          { value: "article", label: "Articulo/Blog" },
        ],
      },
      {
        type: "string",
        name: "canonicalUrl",
        label: "URL Canonica",
        description: "URL principal de esta pagina (dejar vacio para usar la URL actual)",
      },
      {
        type: "boolean",
        name: "noIndex",
        label: "Ocultar de buscadores (noindex)",
        description: "Activar para evitar que Google indexe esta pagina",
      },
    ],
  },
];

// ============================================
// CAMPOS CTA REUTILIZABLES
// ============================================

const ctaFields: TinaField[] = [
  {
    type: "string",
    name: "ctaText",
    label: "Texto del Boton",
    description: `Texto del boton de accion (max ${LIMITS.CTA_TEXT_MAX} caracteres)`,
    ui: {
      validate: (value: string) => {
        if (value && value.length > LIMITS.CTA_TEXT_MAX) {
          return `El texto no debe exceder ${LIMITS.CTA_TEXT_MAX} caracteres`;
        }
      },
    },
  },
  {
    type: "string",
    name: "ctaLink",
    label: "Enlace del Boton",
    description: "URL destino (ej: /quiz, /productos, https://...)",
    ui: {
      validate: (value: string) => {
        if (value && !value.startsWith("/") && !value.startsWith("http") && !value.startsWith("#")) {
          return "El enlace debe comenzar con /, # o http";
        }
      },
    },
  },
];

// Campos de enlace reutilizables
const linkFields: TinaField[] = [
  {
    type: "string",
    name: "text",
    label: "Texto del Enlace",
    required: true,
  },
  {
    type: "string",
    name: "url",
    label: "URL",
    required: true,
    ui: {
      validate: (value: string) => {
        if (value && !value.startsWith("/") && !value.startsWith("http")) {
          return "La URL debe comenzar con / o http";
        }
      },
    },
  },
];

// ============================================
// TEMPLATES DE BLOQUES REUTILIZABLES
// ============================================

// Template: Video Testimonial
const testimonialVideoTemplate: Template = {
  name: "testimonialVideo",
  label: "Video Testimonial",
  ui: {
    defaultItem: {
      rating: 5,
      productName: "Kit Choiz",
    },
  },
  fields: [
    {
      type: "string",
      name: "name",
      label: "Nombre del Cliente",
      required: true,
      description: "Nombre que aparecera debajo del video",
      ui: {
        validate: (value: string) => {
          if (!value || value.length < 2) {
            return "El nombre es requerido (min 2 caracteres)";
          }
          if (value.length > 50) {
            return "El nombre no debe exceder 50 caracteres";
          }
        },
      },
    },
    {
      type: "string",
      name: "backgroundImage",
      label: "Foto del Cliente",
      description: "Ruta de imagen (ej: /images/testimonial.jpg). 363x589px recomendado",
    },
    {
      type: "string",
      name: "videoUrl",
      label: "URL del Video",
      description: "Link de YouTube, Vimeo o video directo",
      ui: {
        validate: (value: string) => {
          if (value && !value.includes("youtube") && !value.includes("vimeo") && !value.includes("youtu.be") && !value.startsWith("http")) {
            return "Ingresa una URL valida de video";
          }
        },
      },
    },
    {
      type: "number",
      name: "rating",
      label: "Calificacion (1-5 estrellas)",
      ui: {
        validate: (value: number) => {
          if (value !== undefined && (value < 1 || value > 5)) {
            return "La calificacion debe ser entre 1 y 5";
          }
        },
      },
    },
    {
      type: "string",
      name: "productName",
      label: "Nombre del Producto",
      description: "Producto que uso el cliente",
    },
    {
      type: "string",
      name: "productDescription",
      label: "Descripcion del Producto",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      name: "productImage",
      label: "Imagen del Producto",
      description: "Ruta de imagen (ej: /images/product.png)",
    },
  ],
};

// Template: Producto
const productTemplate: Template = {
  name: "product",
  label: "Producto",
  ui: {
    defaultItem: {
      selectText: "Seleccionar",
      moreText: "Ver mas",
    },
  },
  fields: [
    {
      type: "string",
      name: "name",
      label: "Nombre del Producto",
      required: true,
      ui: {
        validate: (value: string) => {
          if (!value) return "El nombre es requerido";
          if (value.length > 60) return "Max 60 caracteres";
        },
      },
    },
    {
      type: "object",
      name: "tags",
      label: "Etiquetas",
      description: "Tags como 'Mas vendido', 'Nuevo', etc.",
      list: true,
      ui: {
        itemProps: (item: { text?: string }) => ({
          label: item?.text || "Nueva etiqueta",
        }),
        max: LIMITS.MAX_TAGS,
      },
      fields: [
        {
          type: "string",
          name: "text",
          label: "Texto",
          options: [
            { value: "Mas vendido", label: "Mas vendido" },
            { value: "Nuevo", label: "Nuevo" },
            { value: "Oferta", label: "Oferta" },
            { value: "Recomendado", label: "Recomendado" },
            { value: "Edicion limitada", label: "Edicion limitada" },
          ],
        },
      ],
    },
    {
      type: "string",
      name: "image",
      label: "Imagen del Producto",
      description: "Ruta de imagen (ej: /images/product.png). 500x500px recomendado",
    },
    {
      type: "string",
      name: "selectText",
      label: "Texto Boton Seleccionar",
    },
    {
      type: "string",
      name: "moreText",
      label: "Texto Boton Ver Mas",
    },
    {
      type: "string",
      name: "link",
      label: "Enlace del Producto",
      ui: {
        validate: (value: string) => {
          if (value && !value.startsWith("/") && !value.startsWith("http")) {
            return "Debe comenzar con / o http";
          }
        },
      },
    },
  ],
};

// Template: Ingrediente
const ingredientTemplate: Template = {
  name: "ingredient",
  label: "Ingrediente",
  fields: [
    {
      type: "string",
      name: "name",
      label: "Nombre del Ingrediente",
      required: true,
    },
    {
      type: "string",
      name: "description",
      label: "Descripcion",
      description: "Beneficios y funcion del ingrediente",
      ui: {
        component: "textarea",
        validate: (value: string) => {
          if (value && value.length > 300) {
            return "Max 300 caracteres";
          }
        },
      },
    },
    {
      type: "string",
      name: "image",
      label: "Imagen",
      description: "Ruta de imagen (ej: /images/ingredients/minoxidil.jpg)",
    },
  ],
};

// Template: Tarjeta de Ciencia
const scienceCardTemplate: Template = {
  name: "scienceCard",
  label: "Tarjeta de Ciencia",
  fields: [
    {
      type: "string",
      name: "ingredient",
      label: "Nombre del Activo",
      required: true,
    },
    {
      type: "string",
      name: "description",
      label: "Como Funciona",
      description: "Explicacion cientifica breve",
      ui: {
        component: "textarea",
        validate: (value: string) => {
          if (value && value.length > 400) {
            return "Max 400 caracteres";
          }
        },
      },
    },
    {
      type: "string",
      name: "illustration",
      label: "Ilustracion",
      description: "Ruta de imagen (ej: /images/illustration.svg)",
    },
  ],
};

// Template: Paso
const stepTemplate: Template = {
  name: "step",
  label: "Paso",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Titulo del Paso",
      required: true,
      ui: {
        validate: (value: string) => {
          if (value && value.length > 50) {
            return "Max 50 caracteres";
          }
        },
      },
    },
    {
      type: "string",
      name: "description",
      label: "Descripcion",
      ui: {
        component: "textarea",
        validate: (value: string) => {
          if (value && value.length > 200) {
            return "Max 200 caracteres";
          }
        },
      },
    },
    {
      type: "string",
      name: "icon",
      label: "Icono",
      description: "Ruta de icono (ej: /images/icons/step.svg)",
    },
  ],
};

// Template: Propuesta de Valor
const valuePropTemplate: Template = {
  name: "valueProp",
  label: "Propuesta de Valor",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Titulo",
      required: true,
      ui: {
        validate: (value: string) => {
          if (value && value.length > 40) {
            return "Max 40 caracteres";
          }
        },
      },
    },
    {
      type: "string",
      name: "description",
      label: "Descripcion",
      ui: {
        component: "textarea",
        validate: (value: string) => {
          if (value && value.length > 150) {
            return "Max 150 caracteres";
          }
        },
      },
    },
    {
      type: "string",
      name: "icon",
      label: "Icono",
      description: "Ruta de icono (ej: /images/icons/icon.svg)",
    },
  ],
};

// ============================================
// BLOQUES DE SECCION (para reordenar)
// ============================================

// Bloque: Hero con Imagen
const heroBlock: Template = {
  name: "heroBlock",
  label: "Hero con Imagen",
  ui: {
    defaultItem: {
      badge: "+ 10,000 personas vieron resultados",
      headline: "Recupera tu cabello con ciencia",
      ctaText: "Comenzar ahora",
      ctaLink: "/quiz",
    },
  },
  fields: [
    {
      type: "string",
      name: "badge",
      label: "Badge Superior",
      description: "Texto pequeno arriba del titulo",
      ui: {
        validate: (value: string) => {
          if (value && value.length > LIMITS.BADGE_MAX) {
            return `Max ${LIMITS.BADGE_MAX} caracteres`;
          }
        },
      },
    },
    {
      type: "string",
      name: "headline",
      label: "Titulo Principal",
      ui: {
        component: "textarea",
        validate: (value: string) => {
          if (value && value.length < LIMITS.HEADLINE_MIN) {
            return `Min ${LIMITS.HEADLINE_MIN} caracteres`;
          }
          if (value && value.length > LIMITS.HEADLINE_MAX) {
            return `Max ${LIMITS.HEADLINE_MAX} caracteres`;
          }
        },
      },
    },
    {
      type: "object",
      name: "benefits",
      label: "Lista de Beneficios",
      list: true,
      ui: {
        itemProps: (item: { text?: string }) => ({
          label: item?.text || "Nuevo beneficio",
        }),
        max: LIMITS.MAX_BENEFITS,
      },
      fields: [
        {
          type: "string",
          name: "text",
          label: "Texto",
          required: true,
          ui: {
            validate: (value: string) => {
              if (value && value.length > LIMITS.BENEFIT_MAX) {
                return `Max ${LIMITS.BENEFIT_MAX} caracteres`;
              }
            },
          },
        },
      ],
    },
    ...ctaFields,
    {
      type: "string",
      name: "backgroundImage",
      label: "Imagen de Fondo",
      description: "Ruta de imagen (ej: /images/hero-bg.jpg). 1200x800px recomendado",
    },
  ],
};

// Bloque: Testimoniales
const testimonialsBlock: Template = {
  name: "testimonialsBlock",
  label: "Seccion de Testimoniales",
  ui: {
    defaultItem: {
      headline: "Resultados reales, personas reales",
      ctaText: "Ver todos los testimonios",
    },
  },
  fields: [
    {
      type: "string",
      name: "headline",
      label: "Titulo",
    },
    {
      type: "string",
      name: "subheadline",
      label: "Subtitulo",
      ui: { component: "textarea" },
    },
    {
      type: "object",
      name: "videos",
      label: "Videos",
      list: true,
      ui: {
        itemProps: (item: { name?: string }) => ({
          label: item?.name || "Nuevo testimonio",
        }),
        max: LIMITS.MAX_TESTIMONIALS,
      },
      fields: testimonialVideoTemplate.fields,
    },
    ...ctaFields,
    {
      type: "string",
      name: "moreText",
      label: "Texto Ver Mas",
    },
    {
      type: "string",
      name: "moreLink",
      label: "Enlace Ver Mas",
    },
  ],
};

// Bloque: CTA Simple
const ctaBlock: Template = {
  name: "ctaBlock",
  label: "Llamada a la Accion (CTA)",
  ui: {
    defaultItem: {
      headline: "Comienza tu tratamiento hoy",
      subheadline: "Miles de personas ya recuperaron su cabello",
      ctaText: "Iniciar ahora",
      ctaLink: "/quiz",
    },
  },
  fields: [
    {
      type: "string",
      name: "headline",
      label: "Titulo",
    },
    {
      type: "string",
      name: "subheadline",
      label: "Subtitulo",
      ui: { component: "textarea" },
    },
    ...ctaFields,
    {
      type: "string",
      name: "variant",
      label: "Estilo",
      options: [
        { value: "default", label: "Normal" },
        { value: "highlight", label: "Destacado (fondo color)" },
        { value: "minimal", label: "Minimalista" },
      ],
    },
  ],
};

// Bloque: Garantia
const guaranteeBlock: Template = {
  name: "guaranteeBlock",
  label: "Seccion de Garantia",
  ui: {
    defaultItem: {
      days: "180",
      headline: "Garantia de satisfaccion",
      description: "Si no ves resultados, te devolvemos tu dinero",
    },
  },
  fields: [
    {
      type: "string",
      name: "days",
      label: "Dias de Garantia",
      ui: {
        validate: (value: string) => {
          if (value && isNaN(Number(value))) {
            return "Debe ser un numero";
          }
        },
      },
    },
    {
      type: "string",
      name: "headline",
      label: "Titulo",
    },
    {
      type: "string",
      name: "description",
      label: "Descripcion",
      ui: { component: "textarea" },
    },
  ],
};

// ============================================
// CONFIGURACION PRINCIPAL
// ============================================

export default defineConfig({
  branch,

  clientId: isLocalDevelopment ? "" : process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: isLocalDevelopment ? "" : process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  contentApiUrlOverride: isLocalDevelopment ? "/api/tina/gql" : undefined,

  // Media Library - deshabilitado para usar imágenes del repositorio directamente
  // Las imágenes se referencian con rutas absolutas como /images/...
  // No usar media.tina para evitar transformación de URLs a assets.tina.io

  schema: {
    collections: [
      // ========================================
      // LANDING PAGE PRINCIPAL (con bloques reordenables)
      // ========================================
      {
        name: "landing",
        label: "Landing Page",
        path: "content/landing",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/",
        },
        fields: [
          // SEO
          ...seoFields,

          // ----------------------------------------
          // NAVEGACION (fija, no reordenable)
          // ----------------------------------------
          {
            type: "object",
            name: "navbar",
            label: "Navegacion",
            description: "Barra de navegacion superior",
            ui: {
              defaultItem: {
                ctaText: "Comenzar",
                ctaLink: "/quiz",
              },
            },
            fields: [
              {
                type: "string",
                name: "logo",
                label: "Logo",
                description: "Ruta del logo (ej: /images/logo.svg)",
              },
              ...ctaFields,
            ],
          },

          // ----------------------------------------
          // SECCIONES REORDENABLES (drag and drop)
          // ----------------------------------------
          {
            type: "object",
            name: "sections",
            label: "Secciones de la Pagina",
            description: "Arrastra para reordenar las secciones",
            list: true,
            templates: [
              // HERO
              {
                name: "hero",
                label: "Hero Section",
                ui: {
                  defaultItem: {
                    badge: "+ 10k vieron resultados",
                    headline: "Recupera tu cabello en 180 dias",
                    ctaText: "Ver si soy apto",
                    ctaLink: "/quiz",
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "badge",
                    label: "Badge Superior",
                  },
                  {
                    type: "string",
                    name: "headline",
                    label: "Titulo Principal",
                    ui: { component: "textarea" },
                  },
                  {
                    type: "object",
                    name: "benefits",
                    label: "Lista de Beneficios",
                    list: true,
                    ui: {
                      itemProps: (item: { text?: string }) => ({
                        label: item?.text || "Nuevo beneficio",
                      }),
                      max: LIMITS.MAX_BENEFITS,
                    },
                    fields: [
                      {
                        type: "string",
                        name: "text",
                        label: "Texto",
                      },
                    ],
                  },
                  ...ctaFields,
                  {
                    type: "string",
                    name: "backgroundImage",
                    label: "Imagen de Fondo",
                    description: "Ruta de imagen (ej: /images/hero-bg.jpg)",
                  },
                ],
              },
              // CERTIFICACIONES
              {
                name: "certifications",
                label: "Certificaciones",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Titulo",
                  },
                  {
                    type: "object",
                    name: "badges",
                    label: "Badges",
                    list: true,
                    ui: {
                      itemProps: (item: { label?: string }) => ({
                        label: item?.label || "Nuevo badge",
                      }),
                      max: LIMITS.MAX_BADGES,
                    },
                    fields: [
                      { type: "string", name: "logo", label: "Logo", description: "Ruta de imagen (ej: /images/logo.png)" },
                      { type: "string", name: "label", label: "Texto/Licencia" },
                    ],
                  },
                ],
              },
              // TESTIMONIALES
              {
                name: "testimonials",
                label: "Testimoniales",
                fields: [
                  { type: "string", name: "headline", label: "Titulo" },
                  { type: "string", name: "subheadline", label: "Subtitulo", ui: { component: "textarea" } },
                  {
                    type: "object",
                    name: "videos",
                    label: "Videos",
                    list: true,
                    ui: {
                      itemProps: (item: { name?: string }) => ({
                        label: item?.name || "Nuevo testimonio",
                      }),
                      max: LIMITS.MAX_TESTIMONIALS,
                    },
                    fields: testimonialVideoTemplate.fields,
                  },
                  ...ctaFields,
                  { type: "string", name: "moreText", label: "Texto Ver Mas" },
                  { type: "string", name: "moreLink", label: "Enlace Ver Mas" },
                ],
              },
              // PROBLEMA
              {
                name: "problem",
                label: "Problema (Por que perdemos cabello)",
                fields: [
                  { type: "string", name: "headline", label: "Titulo" },
                  { type: "string", name: "stat", label: "Estadistica Principal" },
                  { type: "string", name: "statDescription", label: "Descripcion de la Estadistica", ui: { component: "textarea" } },
                  { type: "string", name: "explanation", label: "Explicacion Cientifica", ui: { component: "textarea" } },
                  { type: "string", name: "illustration", label: "Ilustracion DHT", description: "Ruta de imagen (ej: /images/dht.svg)" },
                  {
                    type: "object",
                    name: "hairLossTypes",
                    label: "Tipos de Alopecia",
                    list: true,
                    ui: {
                      itemProps: (item: { name?: string }) => ({
                        label: item?.name || "Nuevo tipo",
                      }),
                      max: 4,
                    },
                    fields: [
                      {
                        type: "string",
                        name: "name",
                        label: "Tipo",
                        options: [
                          { value: "Entradas y coronilla", label: "Entradas y coronilla" },
                          { value: "Coronilla", label: "Coronilla" },
                          { value: "Entradas", label: "Entradas" },
                          { value: "Difusa", label: "Difusa" },
                        ],
                      },
                      { type: "string", name: "icon", label: "Icono", description: "Ruta de icono (ej: /images/icons/icon.svg)" },
                    ],
                  },
                ],
              },
              // PRODUCTOS
              {
                name: "products",
                label: "Productos",
                fields: [
                  { type: "string", name: "headline", label: "Titulo", ui: { component: "textarea" } },
                  {
                    type: "object",
                    name: "items",
                    label: "Lista de Productos",
                    list: true,
                    ui: {
                      itemProps: (item: { name?: string }) => ({
                        label: item?.name || "Nuevo producto",
                      }),
                      max: LIMITS.MAX_PRODUCTS,
                    },
                    fields: productTemplate.fields,
                  },
                ],
              },
              // INGREDIENTES
              {
                name: "ingredients",
                label: "Ingredientes",
                fields: [
                  { type: "string", name: "headline", label: "Titulo" },
                  {
                    type: "object",
                    name: "items",
                    label: "Lista de Ingredientes",
                    list: true,
                    ui: {
                      itemProps: (item: { name?: string }) => ({
                        label: item?.name || "Nuevo ingrediente",
                      }),
                      max: LIMITS.MAX_INGREDIENTS,
                    },
                    fields: ingredientTemplate.fields,
                  },
                  ...ctaFields,
                ],
              },
              // EFECTIVIDAD
              {
                name: "effectiveness",
                label: "Efectividad",
                fields: [
                  { type: "string", name: "headline", label: "Titulo", ui: { component: "textarea" } },
                  { type: "string", name: "chartTitle", label: "Titulo del Grafico" },
                  {
                    type: "object",
                    name: "stats",
                    label: "Estadisticas",
                    list: true,
                    ui: {
                      itemProps: (item: { label?: string; percentage?: number }) => ({
                        label: item?.label ? `${item.label}: ${item.percentage}%` : "Nueva estadistica",
                      }),
                      max: LIMITS.MAX_STATS,
                    },
                    fields: [
                      { type: "string", name: "label", label: "Etiqueta" },
                      { type: "number", name: "percentage", label: "Porcentaje (0-100)" },
                    ],
                  },
                  { type: "string", name: "conclusion", label: "Conclusion", ui: { component: "textarea" } },
                  { type: "string", name: "sourcesTitle", label: "Titulo de Fuentes" },
                  { type: "string", name: "sources", label: "Fuentes/Referencias", ui: { component: "textarea" } },
                  ...ctaFields,
                ],
              },
              // POR QUE ELEGIRNOS
              {
                name: "whyChoose",
                label: "Por Que Elegirnos",
                fields: [
                  { type: "string", name: "headline", label: "Titulo" },
                  {
                    type: "object",
                    name: "valueProps",
                    label: "Propuestas de Valor",
                    list: true,
                    ui: {
                      itemProps: (item: { title?: string }) => ({
                        label: item?.title || "Nueva propuesta",
                      }),
                      max: LIMITS.MAX_VALUE_PROPS,
                    },
                    fields: valuePropTemplate.fields,
                  },
                  ...ctaFields,
                ],
              },
              // GARANTIA
              {
                name: "guarantee",
                label: "Garantia",
                fields: [
                  { type: "string", name: "days", label: "Dias de Garantia" },
                  { type: "string", name: "headline", label: "Titulo" },
                  { type: "string", name: "description", label: "Descripcion", ui: { component: "textarea" } },
                ],
              },
              // COMO FUNCIONA
              {
                name: "howItWorks",
                label: "Como Funciona",
                fields: [
                  { type: "string", name: "headline", label: "Titulo" },
                  {
                    type: "object",
                    name: "steps",
                    label: "Pasos",
                    list: true,
                    ui: {
                      itemProps: (item: { title?: string }) => ({
                        label: item?.title || "Nuevo paso",
                      }),
                      max: LIMITS.MAX_STEPS,
                    },
                    fields: stepTemplate.fields,
                  },
                  ...ctaFields,
                ],
              },
              // CTA FINAL
              {
                name: "finalCta",
                label: "CTA Final",
                fields: [
                  { type: "string", name: "headline", label: "Titulo" },
                  { type: "string", name: "subheadline", label: "Subtitulo", ui: { component: "textarea" } },
                  ...ctaFields,
                ],
              },
            ],
          },

          // ----------------------------------------
          // FOOTER (fijo, no reordenable)
          // ----------------------------------------
          {
            type: "object",
            name: "footer",
            label: "Footer",
            description: "Pie de pagina con links y contacto",
            fields: [
              {
                type: "object",
                name: "socialLinks",
                label: "Redes Sociales",
                list: true,
                ui: {
                  itemProps: (item: { platform?: string }) => ({
                    label: item?.platform || "Nueva red",
                  }),
                  max: LIMITS.MAX_SOCIAL_LINKS,
                },
                fields: [
                  {
                    type: "string",
                    name: "platform",
                    label: "Plataforma",
                    options: [
                      { value: "Facebook", label: "Facebook" },
                      { value: "Instagram", label: "Instagram" },
                      { value: "TikTok", label: "TikTok" },
                      { value: "YouTube", label: "YouTube" },
                      { value: "LinkedIn", label: "LinkedIn" },
                      { value: "Twitter", label: "Twitter/X" },
                    ],
                  },
                  {
                    type: "string",
                    name: "url",
                    label: "URL",
                  },
                ],
              },
              { type: "string", name: "logo", label: "Logo", description: "Ruta del logo (ej: /images/logo-white.svg)" },
              { type: "string", name: "copyright", label: "Copyright" },
              {
                type: "object",
                name: "certifications",
                label: "Certificaciones",
                list: true,
                fields: [
                  { type: "string", name: "logo", label: "Logo", description: "Ruta de imagen (ej: /images/cert-logo.png)" },
                  { type: "string", name: "label", label: "Etiqueta" },
                ],
              },
              {
                type: "object",
                name: "legalLinks",
                label: "Enlaces Legales",
                list: true,
                ui: {
                  itemProps: (item: { text?: string }) => ({
                    label: item?.text || "Nuevo enlace",
                  }),
                },
                fields: linkFields,
              },
              {
                type: "object",
                name: "resourceLinks",
                label: "Recursos",
                list: true,
                ui: {
                  itemProps: (item: { text?: string }) => ({
                    label: item?.text || "Nuevo recurso",
                  }),
                },
                fields: linkFields,
              },
              {
                type: "object",
                name: "founders",
                label: "Fundadores",
                list: true,
                ui: {
                  itemProps: (item: { name?: string }) => ({
                    label: item?.name || "Nuevo fundador",
                  }),
                },
                fields: [
                  { type: "string", name: "name", label: "Nombre" },
                ],
              },
              {
                type: "object",
                name: "contact",
                label: "Contacto",
                fields: [
                  { type: "string", name: "phone", label: "Telefono" },
                  { type: "string", name: "email", label: "Email" },
                  { type: "string", name: "hours", label: "Horario" },
                ],
              },
              {
                type: "object",
                name: "companyLinks",
                label: "Enlaces Empresa",
                list: true,
                ui: {
                  itemProps: (item: { text?: string }) => ({
                    label: item?.text || "Nuevo enlace",
                  }),
                },
                fields: linkFields,
              },
            ],
          },
        ],
      },

      // ========================================
      // BLOQUES REUTILIZABLES (para nuevas paginas)
      // ========================================
      {
        name: "blocks",
        label: "Bloques Reutilizables",
        path: "content/blocks",
        format: "json",
        ui: {
          allowedActions: {
            create: true,
            delete: true,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Nombre del Bloque",
            required: true,
            description: "Nombre interno para identificar este bloque",
          },
          {
            type: "object",
            name: "sections",
            label: "Secciones",
            list: true,
            templates: [heroBlock, testimonialsBlock, ctaBlock, guaranteeBlock],
          },
        ],
      },
    ],
  },
});
