# Choiz Website Documentation

**Última actualización:** 2025-12-09

---

## Estructura de Documentación

```
docs/
├── README.md                                    # Este archivo - índice principal
├── prds/                                        # Product Requirements Documents
│   └── 001-tinacms-production-setup.md         # 🆕 PRD: Setup producción
├── guides/                                      # Guías de usuario y análisis
│   ├── TINACMS_BUSINESS_CASE.md                # Business case para TinaCMS
│   ├── TINACMS_PRODUCTION_RESEARCH.md          # Investigación de producción
│   ├── TINACMS_RESEARCH_SUMMARY.json           # Resumen estructurado (JSON)
│   └── MARKETING_PAGE_BUILDER_GUIDE.md         # Guía para Marketing
└── reference/                                   # Documentación técnica
    ├── PAGE_BUILDER_ARCHITECTURE.md             # Arquitectura completa
    └── BLOCK_IMPLEMENTATION_EXAMPLES.md         # Ejemplos de código
```

---

## PRDs Activos

| # | Nombre | Estado | Descripción |
|---|--------|--------|-------------|
| 001 | [TinaCMS Production Setup](./prds/001-tinacms-production-setup.md) | 🟢 Activo | Preparación del sitio para producción con TinaCMS |

---

## Secciones del Landing Page (Implementadas)

El sitio cuenta con las siguientes secciones completamente implementadas:

| # | Sección | Descripción | Estado |
|---|---------|-------------|--------|
| 1 | Hero | Banner principal con CTA | ✅ |
| 2 | Certifications | Logos COFEPRIS y PROFECO | ✅ |
| 3 | SuccessStories | Testimonios antes/después | ✅ |
| 4 | Formulas | Productos personalizados | ✅ |
| 5 | Activos | Ingredientes con evidencia científica | ✅ |
| 6 | VideoTestimonials | Videos de usuarios | ✅ |
| 7 | HowItWorksNew | Proceso de 4 pasos | ✅ |
| 8 | FinalCtaNew | CTA final con imagen de fondo | ✅ |
| 9 | FAQ | Preguntas frecuentes (acordeón) | ✅ |
| 10 | FooterNew | Footer completo con enlaces | ✅ |

---

## Navegación Rápida

### Para Marketing (No Técnico)

**¿Quieres crear una landing page?**
→ Lee [MARKETING_PAGE_BUILDER_GUIDE.md](./guides/MARKETING_PAGE_BUILDER_GUIDE.md)

**¿Necesitas ver qué bloques están disponibles?**
→ Lee [MARKETING_PAGE_BUILDER_GUIDE.md - Catálogo de Bloques](./guides/MARKETING_PAGE_BUILDER_GUIDE.md#catálogo-de-bloques-disponibles)

**¿Tienes dudas sobre cómo usar el editor?**
→ Lee [MARKETING_PAGE_BUILDER_GUIDE.md - Tutorial](./guides/MARKETING_PAGE_BUILDER_GUIDE.md#tutorial-tu-primera-landing-page)

### Para Developers (Técnico)

**¿Necesitas entender la arquitectura?**
→ Lee [PAGE_BUILDER_ARCHITECTURE.md](./reference/PAGE_BUILDER_ARCHITECTURE.md)

**¿Quieres implementar un nuevo bloque?**
→ Lee [BLOCK_IMPLEMENTATION_EXAMPLES.md](./reference/BLOCK_IMPLEMENTATION_EXAMPLES.md)

**¿Buscas el roadmap de implementación?**
→ Lee [PAGE_BUILDER_ARCHITECTURE.md - Roadmap](./reference/PAGE_BUILDER_ARCHITECTURE.md#roadmap-de-implementación)

---

## Documentos Principales

### 🆕 Page Builder System (Nuevo)

#### 1. [PAGE_BUILDER_ARCHITECTURE.md](./reference/PAGE_BUILDER_ARCHITECTURE.md)
**Tipo:** Architecture Design Document
**Estado:** 🟢 Activo - Propuesta
**Última actualización:** 2025-12-09
**Audiencia:** Developers, Product Team

Arquitectura completa del sistema de Page Builder con TinaCMS.

**Contenido:**
- Executive Summary y objetivos
- Análisis del estado actual vs propuesto
- Sistema de bloques (24+ bloques documentados)
- Schema modular de TinaCMS
- Sistema de variantes de componentes
- Estructura de carpetas propuesta
- Ejemplos de código completos
- Flujo de trabajo para Marketing
- Roadmap de implementación (8 semanas)

**Diagramas incluidos:**
- Arquitectura de alto nivel
- Flujo de datos
- Estructura de bloques
- Block Registry

**Highlights:**
- De 2-5 días → 15 minutos para crear landing
- 24+ bloques con múltiples variantes
- Type-safe con TypeScript
- Git-based workflow
- Performance optimizado (SSG + code splitting)

---

#### 2. [MARKETING_PAGE_BUILDER_GUIDE.md](./guides/MARKETING_PAGE_BUILDER_GUIDE.md)
**Tipo:** User Guide (No Técnico)
**Estado:** 🟢 Activo
**Última actualización:** 2025-12-09
**Audiencia:** Marketing Team

Guía paso a paso para que Marketing cree landing pages sin ayuda de desarrollo.

**Contenido:**
- Tutorial: Tu primera landing page (15 min)
- Catálogo completo de bloques disponibles
- Tips de diseño y conversión
- Casos de uso comunes (Black Friday, Facebook Ads, etc.)
- Checklist antes de publicar
- Troubleshooting

**Casos de uso incluidos:**
1. Landing de oferta (Black Friday)
2. Landing de Facebook Ads (tráfico frío)
3. Landing de producto específico

**Bloques documentados:** 24 bloques en 6 categorías
- Hero Blocks (4 variantes)
- Social Proof Blocks (5 variantes)
- CTA Blocks (3 variantes)
- Product Blocks (4 variantes)
- Content Blocks (6 variantes)
- Form Blocks (2 variantes)

---

#### 3. [BLOCK_IMPLEMENTATION_EXAMPLES.md](./reference/BLOCK_IMPLEMENTATION_EXAMPLES.md)
**Tipo:** Code Examples & Best Practices
**Estado:** 🟢 Activo
**Última actualización:** 2025-12-09
**Audiencia:** Developers

Ejemplos completos de implementación de bloques con código real.

**Contenido:**
- Estructura de un bloque completo
- 5 ejemplos detallados con código:
  1. Testimonials Block (carousel, grid, masonry)
  2. FAQ Block (accordion, grid, tabs)
  3. Product Comparison Block (table, cards)
  4. Before/After Block
  5. CTA Timer Block (countdown)
- Best practices (performance, a11y, TypeScript, responsive)
- Patrones de testing

**Código incluido:**
- Schema de TinaCMS con validaciones
- Componentes React con variantes
- TypeScript types
- Utility functions
- Ejemplos de lazy loading

---

### TinaCMS Research & Analysis

#### 1. [TINACMS_BUSINESS_CASE.md](./guides/TINACMS_BUSINESS_CASE.md)
**Tipo:** Business Analysis
**Estado:** 🟢 Activo
**Última actualización:** 2025-11-29

Análisis de negocio para la adopción de TinaCMS en el sitio web de Choiz.

**Contenido:**
- Problem statement y contexto actual
- TinaCMS overview y features
- Comparación con alternativas
- Análisis costo-beneficio
- Recomendaciones de implementación

---

#### 2. [TINACMS_PRODUCTION_RESEARCH.md](./guides/TINACMS_PRODUCTION_RESEARCH.md)
**Tipo:** Technical Research
**Estado:** 🟢 Activo
**Última actualización:** 2025-12-02

Investigación exhaustiva sobre el uso de TinaCMS en producción por empresas y proyectos reales.

**Contenido:**
- 17+ empresas/proyectos usando TinaCMS
- Casos de estudio detallados (Unity, Smashing Magazine, SSW)
- Patrones de uso comunes
- Ventajas reportadas por usuarios
- Limitaciones y problemas comunes
- Comparativa TinaCMS vs Sanity vs Contentful vs Strapi
- Insights de comunidad y expertos
- Recomendaciones de implementación por escenario
- Análisis específico para Choiz website

**Hallazgos Clave:**
- Casos de uso dominantes: Documentation (35%), Marketing websites (30%), Publishing (20%)
- Ventaja principal: Visual editing + Git workflow
- Limitación crítica: Solo React frameworks (Next.js, Gatsby)
- Empresas notables: Unity, Smashing Magazine, bunny.net, Locality Bank
- Mejora reportada: 6× page speed (Smashing Magazine vs WordPress)

---

#### 3. [TINACMS_RESEARCH_SUMMARY.json](./guides/TINACMS_RESEARCH_SUMMARY.json)
**Tipo:** Structured Data
**Estado:** 🟢 Activo
**Última actualización:** 2025-12-02

Resumen estructurado en formato JSON de toda la investigación sobre TinaCMS.

**Estructura:**
```json
{
  "search_summary": {...},
  "repositories": [...],
  "production_users": [...],
  "use_case_distribution": {...},
  "technical_insights": {...},
  "implementation_recommendations": [...],
  "community_insights": {...},
  "advantages_reported": {...},
  "limitations_reported": {...},
  "comparison_matrix": {...},
  "decision_framework": {...},
  "choiz_website_recommendation": {...}
}
```

**Uso:** Machine-readable para análisis, dashboards, o reportes automatizados.

---

## Estadísticas del Page Builder System

### Bloques Disponibles (Propuestos)

| Categoría | Bloques | Variantes Totales | Estado |
|-----------|---------|-------------------|--------|
| Hero | 4 bloques | 11 variantes | Propuesto |
| Social Proof | 5 bloques | 12 variantes | Propuesto |
| CTA | 3 bloques | 7 variantes | Propuesto |
| Product | 4 bloques | 9 variantes | Propuesto |
| Content | 6 bloques | 14 variantes | Propuesto |
| Form | 2 bloques | 4 variantes | Propuesto |
| **TOTAL** | **24 bloques** | **57 variantes** | - |

### Impacto Esperado

| Métrica | Antes | Después (Objetivo) | Mejora |
|---------|-------|-------------------|--------|
| Tiempo creación landing | 2-5 días | 15 minutos | 96% más rápido |
| Costo por landing | $500-1000 | $0 | 100% ahorro |
| Landings por mes | 1-2 | 10+ | 500% aumento |
| Intervenciones dev | 100% | 0% | Autonomía total |
| Time-to-market | 1 semana | Mismo día | 7x más rápido |

### Roadmap de Implementación

**Fase 1: Foundation** (Semana 1-2)
- Reestructurar schema modular
- 3 bloques MVP (Hero, Testimonials, CTA)

**Fase 2: Core Blocks** (Semana 3-4)
- 10 bloques adicionales
- Preview images
- Marketing guide (draft)

**Fase 3: Advanced Features** (Semana 5-6)
- Sistema de temas globales
- Bloques con forms
- A/B testing setup
- Analytics integration

**Fase 4: Documentation & Training** (Semana 7)
- Documentación completa
- Video tutorials
- Training con Marketing

**Fase 5: Launch & Iterate** (Semana 8+)
- Go-live
- 5 nuevas landings
- Feedback loop

---

## Navegación Rápida (TinaCMS Research)

### Por Tipo de Información

**¿Necesitas decidir si usar TinaCMS?**
→ Empieza con [TINACMS_BUSINESS_CASE.md](./guides/TINACMS_BUSINESS_CASE.md)

**¿Quieres ver casos reales de uso?**
→ Lee [TINACMS_PRODUCTION_RESEARCH.md](./guides/TINACMS_PRODUCTION_RESEARCH.md) - Sección 1 y 2

**¿Necesitas comparar con otros CMS?**
→ Lee [TINACMS_PRODUCTION_RESEARCH.md](./guides/TINACMS_PRODUCTION_RESEARCH.md) - Sección 5

**¿Quieres entender limitaciones?**
→ Lee [TINACMS_PRODUCTION_RESEARCH.md](./guides/TINACMS_PRODUCTION_RESEARCH.md) - Sección 4

**¿Buscas recomendación para Choiz?**
→ Lee [TINACMS_PRODUCTION_RESEARCH.md](./guides/TINACMS_PRODUCTION_RESEARCH.md) - Sección 12

**¿Necesitas datos estructurados?**
→ Usa [TINACMS_RESEARCH_SUMMARY.json](./guides/TINACMS_RESEARCH_SUMMARY.json)

---

## Estadísticas de Investigación

- **Fuentes consultadas:** 15+ artículos, case studies, y reviews
- **Empresas analizadas:** 17 proyectos en producción
- **Repositorios revisados:** 3 (tinacms, examples, next-example)
- **Comparativas:** 4 CMS (TinaCMS, Sanity, Contentful, Strapi)
- **Plataformas:** GitHub, TinaCMS.io, Stack Overflow, Product Reviews
- **Fecha de investigación:** 2025-12-02

---

## Key Insights Rápidos

### TinaCMS en Números
- **GitHub Stars:** 12,533
- **npm Downloads/week:** 19,719
- **Usuarios en producción:** 17+ empresas documentadas
- **Industrias:** Tech, Publishing, Gaming, Finance, Events, Creative
- **Rating:** 4.7/5 (228 ratings en SaaSworthy)

### Casos de Éxito Destacados
1. **Unity** - Documentation platform (Pokemon Go, Call of Duty engine)
2. **Smashing Magazine** - 6× page speed improvement vs WordPress
3. **SSW** - "Game-changer" para colaboración dev-marketing
4. **bunny.net** - CDN usando TinaCMS para marketing site

### Comparativa Rápida

| Feature | TinaCMS | Sanity | Contentful | Strapi |
|---------|---------|--------|------------|--------|
| Visual Editing | ✅✅✅ | ❌ | ❌ | ❌ |
| Git-Based | ✅✅✅ | ❌ | ❌ | ❌ |
| Framework Support | ❌ React only | ✅✅ Agnostic | ✅✅ Agnostic | ✅✅ Agnostic |
| Pricing (Entry) | $29/mo | $0 | $0 | $0 |
| Community Size | Small | Large | Large | Large |

---

## Recomendación para Choiz

**Decisión:** ✅ **USAR TinaCMS** (con monitoreo)

**Rationale:**
- Marketing team necesita visual editing → TinaCMS es best-in-class
- Ya usamos Next.js Pages Router → Integración nativa
- Equipo pequeño (2-5 editors) → Pricing adecuado ($29/mo)
- Contenido markdown → Portable si necesitamos migrar
- Git workflow → Developers ya están cómodos

**Plan:**
1. Implementar TinaCMS en Pages Router actual
2. Monitorear soporte de App Router trimestralmente
3. Evaluar si cubre necesidades cada 3 meses
4. Tener plan de migración a Sanity como backup

**Riesgos Mitigados:**
- Contenido portable (markdown)
- Bajo costo inicial ($29/mo)
- Evaluación periódica antes de commit largo plazo

---

## Mantenimiento de Documentación

### Última Revisión
- **TINACMS_BUSINESS_CASE.md:** 2025-11-29
- **TINACMS_PRODUCTION_RESEARCH.md:** 2025-12-02
- **TINACMS_RESEARCH_SUMMARY.json:** 2025-12-02

### Próximas Actualizaciones Sugeridas
- **Q1 2026:** Revisar soporte de Next.js App Router
- **Q1 2026:** Actualizar comparativa de precios
- **Q2 2026:** Re-evaluar casos de uso en producción
- **Q2 2026:** Verificar roadmap de TinaCMS 2.x

### Contribuir
Si encuentras información desactualizada o quieres agregar nuevos casos de uso:
1. Actualiza el documento relevante
2. Actualiza la fecha de "Última actualización"
3. Agrega entry en sección de mantenimiento
4. Actualiza este README si es necesario

---

## Enlaces Externos Importantes

### TinaCMS Official
- Website: https://tina.io
- Docs: https://tina.io/docs
- Showcase: https://tina.io/showcase
- GitHub: https://github.com/tinacms/tinacms

### Case Studies
- [Smashing Magazine Case Study](https://www.smashingmagazine.com/2023/09/smashing-magazine-tinacms-manage-editorial-workflow/)
- [Unity Documentation](https://unity.com)
- [SSW Rules (using TinaCMS)](https://www.ssw.com.au/rules/rules-to-better-tinacms/)

### Comparisons
- [TinaCMS vs Strapi](https://tina.io/tinacms-strapi-comparison)
- [TinaCMS Review - Bejamas](https://bejamas.com/hub/headless-cms/tina)
- [Headless CMS Comparisons](https://jamstacky.com/comparision/sanity-vs-tinacms/)

---

**Creado:** 2025-12-02
**Mantenedor:** Development Team
