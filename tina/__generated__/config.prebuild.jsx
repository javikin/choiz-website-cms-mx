// tina/config.ts
import { defineConfig } from "tinacms";
var branch = (process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main").trim();
var isLocalDevelopment = process.env.TINA_PUBLIC_IS_LOCAL === "true";
var LIMITS = {
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
  MAX_TAGS: 5
};
var seoFields = [
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
          validate: (value) => {
            if (value && value.length > LIMITS.META_TITLE_MAX) {
              return `El titulo no debe exceder ${LIMITS.META_TITLE_MAX} caracteres (actual: ${value.length})`;
            }
          }
        }
      },
      {
        type: "string",
        name: "metaDescription",
        label: "Meta Description",
        description: `Descripcion para Google (max ${LIMITS.META_DESCRIPTION_MAX} caracteres)`,
        ui: {
          component: "textarea",
          validate: (value) => {
            if (value && value.length > LIMITS.META_DESCRIPTION_MAX) {
              return `La descripcion no debe exceder ${LIMITS.META_DESCRIPTION_MAX} caracteres (actual: ${value.length})`;
            }
          }
        }
      },
      {
        type: "string",
        name: "ogImage",
        label: "Imagen para Redes Sociales (og:image)",
        description: "Ruta de imagen (ej: /images/og-image.jpg). 1200x630px recomendado"
      },
      {
        type: "string",
        name: "ogType",
        label: "Tipo de Pagina",
        options: [
          { value: "website", label: "Website (pagina principal)" },
          { value: "product", label: "Producto" },
          { value: "article", label: "Articulo/Blog" }
        ]
      },
      {
        type: "string",
        name: "canonicalUrl",
        label: "URL Canonica",
        description: "URL principal de esta pagina (dejar vacio para usar la URL actual)"
      },
      {
        type: "boolean",
        name: "noIndex",
        label: "Ocultar de buscadores (noindex)",
        description: "Activar para evitar que Google indexe esta pagina"
      }
    ]
  }
];
var ctaFields = [
  {
    type: "string",
    name: "ctaText",
    label: "Texto del Boton",
    description: `Texto del boton de accion (max ${LIMITS.CTA_TEXT_MAX} caracteres)`,
    ui: {
      validate: (value) => {
        if (value && value.length > LIMITS.CTA_TEXT_MAX) {
          return `El texto no debe exceder ${LIMITS.CTA_TEXT_MAX} caracteres`;
        }
      }
    }
  },
  {
    type: "string",
    name: "ctaLink",
    label: "Enlace del Boton",
    description: "URL destino (ej: /quiz, /productos, https://...)",
    ui: {
      validate: (value) => {
        if (value && !value.startsWith("/") && !value.startsWith("http") && !value.startsWith("#")) {
          return "El enlace debe comenzar con /, # o http";
        }
      }
    }
  }
];
var linkFields = [
  {
    type: "string",
    name: "text",
    label: "Texto del Enlace",
    required: true
  },
  {
    type: "string",
    name: "url",
    label: "URL",
    required: true,
    ui: {
      validate: (value) => {
        if (value && !value.startsWith("/") && !value.startsWith("http")) {
          return "La URL debe comenzar con / o http";
        }
      }
    }
  }
];
var testimonialVideoTemplate = {
  name: "testimonialVideo",
  label: "Video Testimonial",
  ui: {
    defaultItem: {
      rating: 5,
      productName: "Kit Choiz"
    }
  },
  fields: [
    {
      type: "string",
      name: "name",
      label: "Nombre del Cliente",
      required: true,
      description: "Nombre que aparecera debajo del video",
      ui: {
        validate: (value) => {
          if (!value || value.length < 2) {
            return "El nombre es requerido (min 2 caracteres)";
          }
          if (value.length > 50) {
            return "El nombre no debe exceder 50 caracteres";
          }
        }
      }
    },
    {
      type: "string",
      name: "backgroundImage",
      label: "Foto del Cliente",
      description: "Ruta de imagen (ej: /images/testimonial.jpg). 363x589px recomendado"
    },
    {
      type: "string",
      name: "videoUrl",
      label: "URL del Video",
      description: "Link de YouTube, Vimeo o video directo",
      ui: {
        validate: (value) => {
          if (value && !value.includes("youtube") && !value.includes("vimeo") && !value.includes("youtu.be") && !value.startsWith("http")) {
            return "Ingresa una URL valida de video";
          }
        }
      }
    },
    {
      type: "number",
      name: "rating",
      label: "Calificacion (1-5 estrellas)",
      ui: {
        validate: (value) => {
          if (value !== void 0 && (value < 1 || value > 5)) {
            return "La calificacion debe ser entre 1 y 5";
          }
        }
      }
    },
    {
      type: "string",
      name: "productName",
      label: "Nombre del Producto",
      description: "Producto que uso el cliente"
    },
    {
      type: "string",
      name: "productDescription",
      label: "Descripcion del Producto",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "string",
      name: "productImage",
      label: "Imagen del Producto",
      description: "Ruta de imagen (ej: /images/product.png)"
    }
  ]
};
var productTemplate = {
  name: "product",
  label: "Producto",
  ui: {
    defaultItem: {
      selectText: "Seleccionar",
      moreText: "Ver mas"
    }
  },
  fields: [
    {
      type: "string",
      name: "name",
      label: "Nombre del Producto",
      required: true,
      ui: {
        validate: (value) => {
          if (!value) return "El nombre es requerido";
          if (value.length > 60) return "Max 60 caracteres";
        }
      }
    },
    {
      type: "object",
      name: "tags",
      label: "Etiquetas",
      description: "Tags como 'Mas vendido', 'Nuevo', etc.",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.text || "Nueva etiqueta"
        }),
        max: LIMITS.MAX_TAGS
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
            { value: "Edicion limitada", label: "Edicion limitada" }
          ]
        }
      ]
    },
    {
      type: "string",
      name: "image",
      label: "Imagen del Producto",
      description: "Ruta de imagen (ej: /images/product.png). 500x500px recomendado"
    },
    {
      type: "string",
      name: "selectText",
      label: "Texto Boton Seleccionar"
    },
    {
      type: "string",
      name: "moreText",
      label: "Texto Boton Ver Mas"
    },
    {
      type: "string",
      name: "link",
      label: "Enlace del Producto",
      ui: {
        validate: (value) => {
          if (value && !value.startsWith("/") && !value.startsWith("http")) {
            return "Debe comenzar con / o http";
          }
        }
      }
    }
  ]
};
var ingredientTemplate = {
  name: "ingredient",
  label: "Ingrediente",
  fields: [
    {
      type: "string",
      name: "name",
      label: "Nombre del Ingrediente",
      required: true
    },
    {
      type: "string",
      name: "description",
      label: "Descripcion",
      description: "Beneficios y funcion del ingrediente",
      ui: {
        component: "textarea",
        validate: (value) => {
          if (value && value.length > 300) {
            return "Max 300 caracteres";
          }
        }
      }
    },
    {
      type: "string",
      name: "image",
      label: "Imagen",
      description: "Ruta de imagen (ej: /images/ingredients/minoxidil.jpg)"
    }
  ]
};
var stepTemplate = {
  name: "step",
  label: "Paso",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Titulo del Paso",
      required: true,
      ui: {
        validate: (value) => {
          if (value && value.length > 50) {
            return "Max 50 caracteres";
          }
        }
      }
    },
    {
      type: "string",
      name: "description",
      label: "Descripcion",
      ui: {
        component: "textarea",
        validate: (value) => {
          if (value && value.length > 200) {
            return "Max 200 caracteres";
          }
        }
      }
    },
    {
      type: "string",
      name: "icon",
      label: "Icono",
      description: "Ruta de icono (ej: /images/icons/step.svg)"
    }
  ]
};
var valuePropTemplate = {
  name: "valueProp",
  label: "Propuesta de Valor",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Titulo",
      required: true,
      ui: {
        validate: (value) => {
          if (value && value.length > 40) {
            return "Max 40 caracteres";
          }
        }
      }
    },
    {
      type: "string",
      name: "description",
      label: "Descripcion",
      ui: {
        component: "textarea",
        validate: (value) => {
          if (value && value.length > 150) {
            return "Max 150 caracteres";
          }
        }
      }
    },
    {
      type: "string",
      name: "icon",
      label: "Icono",
      description: "Ruta de icono (ej: /images/icons/icon.svg)"
    }
  ]
};
var heroBlock = {
  name: "heroBlock",
  label: "Hero con Imagen",
  ui: {
    defaultItem: {
      badge: "+ 10,000 personas vieron resultados",
      headline: "Recupera tu cabello con ciencia",
      ctaText: "Comenzar ahora",
      ctaLink: "/quiz"
    }
  },
  fields: [
    {
      type: "string",
      name: "badge",
      label: "Badge Superior",
      description: "Texto pequeno arriba del titulo",
      ui: {
        validate: (value) => {
          if (value && value.length > LIMITS.BADGE_MAX) {
            return `Max ${LIMITS.BADGE_MAX} caracteres`;
          }
        }
      }
    },
    {
      type: "string",
      name: "headline",
      label: "Titulo Principal",
      ui: {
        component: "textarea",
        validate: (value) => {
          if (value && value.length < LIMITS.HEADLINE_MIN) {
            return `Min ${LIMITS.HEADLINE_MIN} caracteres`;
          }
          if (value && value.length > LIMITS.HEADLINE_MAX) {
            return `Max ${LIMITS.HEADLINE_MAX} caracteres`;
          }
        }
      }
    },
    {
      type: "object",
      name: "benefits",
      label: "Lista de Beneficios",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.text || "Nuevo beneficio"
        }),
        max: LIMITS.MAX_BENEFITS
      },
      fields: [
        {
          type: "string",
          name: "text",
          label: "Texto",
          required: true,
          ui: {
            validate: (value) => {
              if (value && value.length > LIMITS.BENEFIT_MAX) {
                return `Max ${LIMITS.BENEFIT_MAX} caracteres`;
              }
            }
          }
        }
      ]
    },
    ...ctaFields,
    {
      type: "string",
      name: "backgroundImage",
      label: "Imagen de Fondo (Desktop)",
      description: "Ruta de imagen desktop (ej: /images/bg-hero-desk.png). 1440x645px recomendado"
    },
    {
      type: "string",
      name: "backgroundImageMobile",
      label: "Imagen de Fondo (Mobile)",
      description: "Ruta de imagen mobile (ej: /images/bg-hero-mobile.png). 375x820px recomendado"
    }
  ]
};
var testimonialsBlock = {
  name: "testimonialsBlock",
  label: "Seccion de Testimoniales",
  ui: {
    defaultItem: {
      headline: "Resultados reales, personas reales",
      ctaText: "Ver todos los testimonios"
    }
  },
  fields: [
    {
      type: "string",
      name: "headline",
      label: "Titulo"
    },
    {
      type: "string",
      name: "subheadline",
      label: "Subtitulo",
      ui: { component: "textarea" }
    },
    {
      type: "object",
      name: "videos",
      label: "Videos",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.name || "Nuevo testimonio"
        }),
        max: LIMITS.MAX_TESTIMONIALS
      },
      fields: testimonialVideoTemplate.fields
    },
    ...ctaFields,
    {
      type: "string",
      name: "moreText",
      label: "Texto Ver Mas"
    },
    {
      type: "string",
      name: "moreLink",
      label: "Enlace Ver Mas"
    }
  ]
};
var ctaBlock = {
  name: "ctaBlock",
  label: "Llamada a la Accion (CTA)",
  ui: {
    defaultItem: {
      headline: "Comienza tu tratamiento hoy",
      subheadline: "Miles de personas ya recuperaron su cabello",
      ctaText: "Iniciar ahora",
      ctaLink: "/quiz"
    }
  },
  fields: [
    {
      type: "string",
      name: "headline",
      label: "Titulo"
    },
    {
      type: "string",
      name: "subheadline",
      label: "Subtitulo",
      ui: { component: "textarea" }
    },
    ...ctaFields,
    {
      type: "string",
      name: "variant",
      label: "Estilo",
      options: [
        { value: "default", label: "Normal" },
        { value: "highlight", label: "Destacado (fondo color)" },
        { value: "minimal", label: "Minimalista" }
      ]
    }
  ]
};
var guaranteeBlock = {
  name: "guaranteeBlock",
  label: "Seccion de Garantia",
  ui: {
    defaultItem: {
      days: "180",
      headline: "Garantia de satisfaccion",
      description: "Si no ves resultados, te devolvemos tu dinero"
    }
  },
  fields: [
    {
      type: "string",
      name: "days",
      label: "Dias de Garantia",
      ui: {
        validate: (value) => {
          if (value && isNaN(Number(value))) {
            return "Debe ser un numero";
          }
        }
      }
    },
    {
      type: "string",
      name: "headline",
      label: "Titulo"
    },
    {
      type: "string",
      name: "description",
      label: "Descripcion",
      ui: { component: "textarea" }
    }
  ]
};
var config_default = defineConfig({
  branch,
  clientId: isLocalDevelopment ? "" : process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: isLocalDevelopment ? "" : process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  contentApiUrlOverride: isLocalDevelopment ? "/api/tina/gql" : void 0,
  // Media Library - deshabilitado para usar imágenes del repositorio directamente
  // Las imágenes se referencian con rutas absolutas como /images/...
  // No usar media.tina para evitar transformación de URLs a assets.tina.io
  // Admin configuration for draft mode
  admin: {
    auth: {
      onLogin: async () => {
        window.location.href = `/api/draft?slug=/`;
      },
      onLogout: async () => {
        window.location.href = `/api/draft/disable?slug=/`;
      }
    }
  },
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
            delete: false
          },
          router: () => "/"
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
                ctaLink: "/quiz"
              }
            },
            fields: [
              {
                type: "string",
                name: "logo",
                label: "Logo",
                description: "Ruta del logo (ej: /images/logo.svg)"
              },
              ...ctaFields
            ]
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
                    badge: "+20,000 personas ya vieron resultados",
                    headline: "El tratamiento mas efectivo de Mexico para la caida del cabello",
                    ctaText: "Comienza hoy",
                    ctaLink: "/quiz",
                    priceText: "Desde $467/mes"
                  }
                },
                fields: [
                  {
                    type: "string",
                    name: "badge",
                    label: "Badge Superior",
                    description: "Texto que aparece en el badge (ej: +20,000 personas ya vieron resultados)"
                  },
                  {
                    type: "string",
                    name: "headline",
                    label: "Titulo Principal",
                    ui: { component: "textarea" },
                    description: "Titulo principal del hero (max 100 caracteres recomendado)"
                  },
                  {
                    type: "object",
                    name: "benefits",
                    label: "Lista de Beneficios",
                    list: true,
                    ui: {
                      itemProps: (item) => ({
                        label: item?.text || "Nuevo beneficio"
                      }),
                      max: LIMITS.MAX_BENEFITS
                    },
                    fields: [
                      {
                        type: "string",
                        name: "text",
                        label: "Texto"
                      }
                    ]
                  },
                  ...ctaFields,
                  {
                    type: "string",
                    name: "priceText",
                    label: "Texto de Precio",
                    description: "Texto que aparece junto al boton (ej: Desde $467/mes)"
                  },
                  {
                    type: "string",
                    name: "backgroundImage",
                    label: "Imagen de Fondo",
                    description: "Ruta de imagen (ej: /images/hero-background.jpg)"
                  }
                ]
              },
              // CERTIFICACIONES
              {
                name: "certifications",
                label: "Certificaciones",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Titulo"
                  },
                  {
                    type: "object",
                    name: "badges",
                    label: "Badges",
                    list: true,
                    ui: {
                      itemProps: (item) => ({
                        label: item?.label || "Nuevo badge"
                      }),
                      max: LIMITS.MAX_BADGES
                    },
                    fields: [
                      { type: "string", name: "logo", label: "Logo", description: "Ruta de imagen (ej: /images/logo.png)" },
                      { type: "string", name: "label", label: "Texto/Licencia" }
                    ]
                  }
                ]
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
                      itemProps: (item) => ({
                        label: item?.name || "Nuevo testimonio"
                      }),
                      max: LIMITS.MAX_TESTIMONIALS
                    },
                    fields: testimonialVideoTemplate.fields
                  },
                  ...ctaFields,
                  { type: "string", name: "moreText", label: "Texto Ver Mas" },
                  { type: "string", name: "moreLink", label: "Enlace Ver Mas" }
                ]
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
                      itemProps: (item) => ({
                        label: item?.name || "Nuevo tipo"
                      }),
                      max: 4
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
                          { value: "Difusa", label: "Difusa" }
                        ]
                      },
                      { type: "string", name: "icon", label: "Icono", description: "Ruta de icono (ej: /images/icons/icon.svg)" }
                    ]
                  }
                ]
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
                      itemProps: (item) => ({
                        label: item?.name || "Nuevo producto"
                      }),
                      max: LIMITS.MAX_PRODUCTS
                    },
                    fields: productTemplate.fields
                  }
                ]
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
                      itemProps: (item) => ({
                        label: item?.name || "Nuevo ingrediente"
                      }),
                      max: LIMITS.MAX_INGREDIENTS
                    },
                    fields: ingredientTemplate.fields
                  },
                  ...ctaFields
                ]
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
                      itemProps: (item) => ({
                        label: item?.label ? `${item.label}: ${item.percentage}%` : "Nueva estadistica"
                      }),
                      max: LIMITS.MAX_STATS
                    },
                    fields: [
                      { type: "string", name: "label", label: "Etiqueta" },
                      { type: "number", name: "percentage", label: "Porcentaje (0-100)" }
                    ]
                  },
                  { type: "string", name: "conclusion", label: "Conclusion", ui: { component: "textarea" } },
                  { type: "string", name: "sourcesTitle", label: "Titulo de Fuentes" },
                  { type: "string", name: "sources", label: "Fuentes/Referencias", ui: { component: "textarea" } },
                  ...ctaFields
                ]
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
                      itemProps: (item) => ({
                        label: item?.title || "Nueva propuesta"
                      }),
                      max: LIMITS.MAX_VALUE_PROPS
                    },
                    fields: valuePropTemplate.fields
                  },
                  ...ctaFields
                ]
              },
              // GARANTIA
              {
                name: "guarantee",
                label: "Garantia",
                fields: [
                  { type: "string", name: "days", label: "Dias de Garantia" },
                  { type: "string", name: "headline", label: "Titulo" },
                  { type: "string", name: "description", label: "Descripcion", ui: { component: "textarea" } }
                ]
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
                      itemProps: (item) => ({
                        label: item?.title || "Nuevo paso"
                      }),
                      max: LIMITS.MAX_STEPS
                    },
                    fields: stepTemplate.fields
                  },
                  ...ctaFields
                ]
              },
              // CTA FINAL
              {
                name: "finalCta",
                label: "CTA Final",
                fields: [
                  { type: "string", name: "headline", label: "Titulo" },
                  { type: "string", name: "subheadline", label: "Subtitulo", ui: { component: "textarea" } },
                  ...ctaFields
                ]
              },
              // ACTIVOS (INGREDIENTES CIENTIFICOS)
              {
                name: "activos",
                label: "Activos Cientificos",
                ui: {
                  defaultItem: {
                    headline: "Utilizamos activos de calidad y con",
                    highlightText: "evidencia cient\xEDfica",
                    ctaText: "Encontrar mi f\xF3rmula personalizada",
                    ctaLink: "/quiz"
                  }
                },
                fields: [
                  { type: "string", name: "headline", label: "Titulo (parte 1)", description: "Primera parte del titulo" },
                  { type: "string", name: "highlightText", label: "Texto Destacado", description: "Texto en morado (ej: evidencia cient\xEDfica)" },
                  { type: "string", name: "ctaText", label: "Texto del Boton" },
                  { type: "string", name: "ctaLink", label: "Enlace del Boton" },
                  {
                    type: "object",
                    name: "activos",
                    label: "Activos",
                    list: true,
                    ui: {
                      itemProps: (item) => ({
                        label: item?.name || "Nuevo activo"
                      }),
                      max: 6
                    },
                    fields: [
                      { type: "string", name: "name", label: "Nombre del Activo", required: true },
                      { type: "string", name: "description", label: "Descripcion", ui: { component: "textarea" } },
                      { type: "string", name: "image", label: "Imagen", description: "Ruta de imagen (ej: /images/activos/dutasterida.png)" }
                    ]
                  }
                ]
              },
              // FORMULAS PERSONALIZADAS
              {
                name: "formulas",
                label: "Formulas Personalizadas",
                ui: {
                  defaultItem: {
                    headline: "Creamos",
                    highlightText: "f\xF3rmulas personalizadas"
                  }
                },
                fields: [
                  { type: "string", name: "headline", label: "Titulo (parte 1)", description: "Primera parte del titulo (ej: Creamos)" },
                  { type: "string", name: "highlightText", label: "Texto Destacado", description: "Texto en morado (ej: f\xF3rmulas personalizadas)" },
                  {
                    type: "object",
                    name: "formulas",
                    label: "Formulas",
                    list: true,
                    ui: {
                      itemProps: (item) => ({
                        label: item?.name || "Nueva formula"
                      }),
                      max: 6
                    },
                    fields: [
                      { type: "string", name: "name", label: "Nombre de la Formula", required: true, ui: { component: "textarea" } },
                      { type: "string", name: "image", label: "Imagen del Producto", description: "Ruta de imagen (ej: /images/products/capsulas.png)" },
                      {
                        type: "object",
                        name: "tags",
                        label: "Etiquetas",
                        list: true,
                        ui: {
                          itemProps: (item) => ({
                            label: item?.text || "Nueva etiqueta"
                          }),
                          max: 3
                        },
                        fields: [
                          { type: "string", name: "text", label: "Texto de la Etiqueta" },
                          {
                            type: "string",
                            name: "variant",
                            label: "Variante de Color",
                            options: [
                              { value: "purple", label: "Morado (tipo de producto)" },
                              { value: "blue", label: "Azul (beneficio)" }
                            ]
                          }
                        ]
                      },
                      { type: "string", name: "ctaText", label: "Texto del Boton" },
                      { type: "string", name: "ctaLink", label: "Enlace del Boton" }
                    ]
                  }
                ]
              },
              // CASOS DE EXITO (Before/After)
              {
                name: "successStories",
                label: "Casos de Exito (Before/After)",
                ui: {
                  defaultItem: {
                    highlightText: "+20.000 personas",
                    normalText: "ya obtuvieron resultados",
                    ctaPrimaryText: "Comienza hoy",
                    ctaPrimaryLink: "/quiz",
                    ctaSecondaryText: "Ver mas casos de exito",
                    ctaSecondaryLink: "/casos-exito"
                  }
                },
                fields: [
                  { type: "string", name: "highlightText", label: "Texto Destacado (ej: +20.000 personas)" },
                  { type: "string", name: "normalText", label: "Texto Normal (ej: ya obtuvieron resultados)" },
                  { type: "string", name: "ctaPrimaryText", label: "Texto CTA Primario" },
                  { type: "string", name: "ctaPrimaryLink", label: "Enlace CTA Primario" },
                  { type: "string", name: "ctaSecondaryText", label: "Texto CTA Secundario" },
                  { type: "string", name: "ctaSecondaryLink", label: "Enlace CTA Secundario" },
                  {
                    type: "object",
                    name: "testimonials",
                    label: "Testimonios (Before/After)",
                    list: true,
                    ui: {
                      itemProps: (item) => ({
                        label: item?.name || "Nuevo testimonio"
                      }),
                      max: LIMITS.MAX_TESTIMONIALS
                    },
                    fields: [
                      { type: "string", name: "name", label: "Nombre", required: true },
                      { type: "number", name: "age", label: "Edad" },
                      { type: "string", name: "quote", label: "Testimonio/Cita", ui: { component: "textarea" } },
                      { type: "string", name: "beforeImage", label: "Imagen Antes", description: "Ruta de imagen (ej: /images/testimonials/nombre-before.jpg)" },
                      { type: "string", name: "afterImage", label: "Imagen Despues", description: "Ruta de imagen (ej: /images/testimonials/nombre-after.jpg)" },
                      { type: "number", name: "monthsBefore", label: "Meses Antes (generalmente 0)" },
                      { type: "number", name: "monthsAfter", label: "Meses Despues (duracion del tratamiento)" }
                    ]
                  }
                ]
              },
              // VIDEO TESTIMONIOS (nuestros usuarios)
              {
                name: "videoTestimonials",
                label: "Video Testimonios (Nuestros Usuarios)",
                ui: {
                  defaultItem: {
                    headline: "No lo decimos nosotros, lo dicen",
                    highlightText: "nuestros usuarios",
                    ctaText: "Comienza hoy",
                    ctaLink: "/quiz"
                  }
                },
                fields: [
                  { type: "string", name: "headline", label: "Titulo (parte 1)", description: "Primera parte del titulo" },
                  { type: "string", name: "highlightText", label: "Texto Destacado", description: "Texto en morado (ej: nuestros usuarios)" },
                  { type: "string", name: "ctaText", label: "Texto del Boton (Mobile)" },
                  { type: "string", name: "ctaLink", label: "Enlace del Boton" },
                  {
                    type: "object",
                    name: "videos",
                    label: "Videos",
                    list: true,
                    ui: {
                      itemProps: (item) => ({
                        label: item?.name || "Nuevo video"
                      }),
                      max: 6
                    },
                    fields: [
                      { type: "string", name: "name", label: "Nombre del Usuario", required: true },
                      { type: "string", name: "backgroundImage", label: "Imagen de Fondo", description: "Ruta de imagen (ej: /images/testimonials/video-1.jpg)" },
                      { type: "string", name: "videoUrl", label: "URL del Video", description: "Link de YouTube, Vimeo o video directo" }
                    ]
                  }
                ]
              },
              // COMO FUNCIONA CHOIZ (nuevo diseño con phone mockups)
              {
                name: "howItWorksNew",
                label: "Como Funciona Choiz (Nuevo)",
                ui: {
                  defaultItem: {
                    headline: "C\xF3mo funciona Choiz",
                    ctaText: "Comenzar hoy",
                    ctaLink: "/quiz"
                  }
                },
                fields: [
                  { type: "string", name: "headline", label: "Titulo", description: "Titulo de la seccion (ej: C\xF3mo funciona Choiz)" },
                  { type: "string", name: "ctaText", label: "Texto del Boton" },
                  { type: "string", name: "ctaLink", label: "Enlace del Boton" },
                  {
                    type: "object",
                    name: "steps",
                    label: "Pasos",
                    list: true,
                    ui: {
                      itemProps: (item) => ({
                        label: item?.title || "Nuevo paso"
                      }),
                      max: 6
                    },
                    fields: [
                      { type: "string", name: "title", label: "Titulo del Paso", required: true },
                      { type: "string", name: "description", label: "Descripcion", ui: { component: "textarea" } },
                      { type: "string", name: "image", label: "Imagen del Mockup", description: "Ruta de imagen del mockup del telefono (ej: /images/how-it-works/step-1.png)" }
                    ]
                  }
                ]
              },
              // CTA FINAL NUEVO (con imagen de fondo)
              {
                name: "finalCtaNew",
                label: "CTA Final (Nuevo con Imagen)",
                ui: {
                  defaultItem: {
                    headline: "Recupera tu cabello y tu confianza con Choiz",
                    ctaText: "Comienza hoy",
                    ctaLink: "/quiz"
                  }
                },
                fields: [
                  { type: "string", name: "headline", label: "Titulo", description: "Titulo principal (ej: Recupera tu cabello y tu confianza con Choiz)" },
                  { type: "string", name: "ctaText", label: "Texto del Boton" },
                  { type: "string", name: "ctaLink", label: "Enlace del Boton" },
                  { type: "string", name: "backgroundImage", label: "Imagen de Fondo", description: "Ruta de imagen (ej: /images/final-cta-bg.jpg). 1024x318px recomendado para desktop" }
                ]
              },
              // FAQ - PREGUNTAS FRECUENTES
              {
                name: "faq",
                label: "Preguntas Frecuentes (FAQ)",
                ui: {
                  defaultItem: {
                    headline: "\xBFTienes preguntas? Aqu\xED te dejamos",
                    highlightText: "respuestas"
                  }
                },
                fields: [
                  { type: "string", name: "headline", label: "Titulo", description: "Texto antes de la palabra resaltada" },
                  { type: "string", name: "highlightText", label: "Texto Resaltado", description: "Palabra en color morado (ej: respuestas)" },
                  {
                    type: "object",
                    name: "items",
                    label: "Preguntas",
                    list: true,
                    ui: {
                      itemProps: (item) => ({
                        label: item?.question || "Nueva pregunta"
                      })
                    },
                    fields: [
                      { type: "string", name: "question", label: "Pregunta" },
                      { type: "string", name: "answer", label: "Respuesta", ui: { component: "textarea" } }
                    ]
                  }
                ]
              },
              // FOOTER NUEVO
              {
                name: "footerNew",
                label: "Footer (Nuevo)",
                ui: {
                  defaultItem: {
                    appTitle: "Tu salud en un solo lugar",
                    appSubtitle: "Descarga la app",
                    phone: "+52 1 55 9225 6335",
                    email: "hola@choiz.com.mx",
                    hoursLabel: "Lunes a Viernes",
                    hoursValue: "07 a 22 hs",
                    cofeprisCode: "COFEPRIS 2421055036X00214",
                    copyright: "\xA9 CHOIZ XCALE HEALTH S.A de C.V.. Todos los derechos reservados."
                  }
                },
                fields: [
                  // App Promo
                  { type: "string", name: "appTitle", label: "Titulo App" },
                  { type: "string", name: "appSubtitle", label: "Subtitulo App" },
                  { type: "string", name: "appImage", label: "Imagen App", description: "Mockup del telefono" },
                  // Company Links
                  {
                    type: "object",
                    name: "companyLinks",
                    label: "Links Compa\xF1ia",
                    list: true,
                    fields: [
                      { type: "string", name: "text", label: "Texto" },
                      { type: "string", name: "url", label: "URL" }
                    ]
                  },
                  // Founders
                  {
                    type: "object",
                    name: "founders",
                    label: "Fundadores",
                    list: true,
                    fields: [
                      { type: "string", name: "name", label: "Nombre" }
                    ]
                  },
                  // Resource Links
                  {
                    type: "object",
                    name: "resourceLinks",
                    label: "Links Recursos",
                    list: true,
                    fields: [
                      { type: "string", name: "text", label: "Texto" },
                      { type: "string", name: "url", label: "URL" }
                    ]
                  },
                  // Contact
                  { type: "string", name: "phone", label: "Telefono" },
                  { type: "string", name: "email", label: "Email" },
                  // Hours
                  { type: "string", name: "hoursLabel", label: "Dias Atencion" },
                  { type: "string", name: "hoursValue", label: "Horario" },
                  // Treatment Links
                  {
                    type: "object",
                    name: "treatmentLinks",
                    label: "Links Tratamientos",
                    list: true,
                    fields: [
                      { type: "string", name: "text", label: "Texto" },
                      { type: "string", name: "url", label: "URL" }
                    ]
                  },
                  // Legal Links
                  {
                    type: "object",
                    name: "legalLinks",
                    label: "Links Legales",
                    list: true,
                    fields: [
                      { type: "string", name: "text", label: "Texto" },
                      { type: "string", name: "url", label: "URL" }
                    ]
                  },
                  { type: "string", name: "cofeprisCode", label: "Codigo COFEPRIS" },
                  // Social Links
                  {
                    type: "object",
                    name: "socialLinks",
                    label: "Redes Sociales",
                    list: true,
                    fields: [
                      { type: "string", name: "platform", label: "Plataforma", options: ["instagram", "facebook", "tiktok", "linkedin"] },
                      { type: "string", name: "url", label: "URL" }
                    ]
                  },
                  { type: "string", name: "copyright", label: "Copyright" },
                  { type: "string", name: "logoImage", label: "Imagen Logo Footer", description: "Logo grande al final del footer" }
                ]
              }
            ]
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
                  itemProps: (item) => ({
                    label: item?.platform || "Nueva red"
                  }),
                  max: LIMITS.MAX_SOCIAL_LINKS
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
                      { value: "Twitter", label: "Twitter/X" }
                    ]
                  },
                  {
                    type: "string",
                    name: "url",
                    label: "URL"
                  }
                ]
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
                  { type: "string", name: "label", label: "Etiqueta" }
                ]
              },
              {
                type: "object",
                name: "legalLinks",
                label: "Enlaces Legales",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.text || "Nuevo enlace"
                  })
                },
                fields: linkFields
              },
              {
                type: "object",
                name: "resourceLinks",
                label: "Recursos",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.text || "Nuevo recurso"
                  })
                },
                fields: linkFields
              },
              {
                type: "object",
                name: "founders",
                label: "Fundadores",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.name || "Nuevo fundador"
                  })
                },
                fields: [
                  { type: "string", name: "name", label: "Nombre" }
                ]
              },
              {
                type: "object",
                name: "contact",
                label: "Contacto",
                fields: [
                  { type: "string", name: "phone", label: "Telefono" },
                  { type: "string", name: "email", label: "Email" },
                  { type: "string", name: "hours", label: "Horario" }
                ]
              },
              {
                type: "object",
                name: "companyLinks",
                label: "Enlaces Empresa",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.text || "Nuevo enlace"
                  })
                },
                fields: linkFields
              }
            ]
          }
        ]
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
            delete: true
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Nombre del Bloque",
            required: true,
            description: "Nombre interno para identificar este bloque"
          },
          {
            type: "object",
            name: "sections",
            label: "Secciones",
            list: true,
            templates: [heroBlock, testimonialsBlock, ctaBlock, guaranteeBlock]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
