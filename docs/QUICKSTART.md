# Page Builder - Quick Start

**Última actualización:** 2025-12-09

---

## Para Marketing: Crear una Landing Page en 15 minutos

### 1. Acceder al Editor
```
URL: https://choiz.mx/admin
Login: [tus credenciales de TinaCMS]
```

### 2. Crear Nueva Página
1. Click en "Páginas"
2. Click en "Create New Page"
3. Título: "Black Friday 2025"
4. Estado: "Borrador"

### 3. Configurar SEO
- **Meta Title:** "Black Friday Choiz - 50% OFF" (max 60 chars)
- **Meta Description:** "Aprovecha 50% de descuento..." (max 160 chars)
- **OG Image:** `/images/og/black-friday.jpg`

### 4. Agregar Bloques
1. Click "+ Add Block"
2. Selecciona "Hero Section"
3. Configura contenido
4. Repite para más bloques

### 5. Preview y Publicar
1. Click "Preview" para ver resultado
2. Cambia Estado a "Publicada"
3. Click "Save"
4. Espera 2-3 minutos (deploy automático)
5. Visita `https://choiz.mx/black-friday-2025`

**Guía completa:** [docs/guides/MARKETING_PAGE_BUILDER_GUIDE.md](/Users/srjavi/Documents/projects/choiz/choiz-website-crm-mx/docs/guides/MARKETING_PAGE_BUILDER_GUIDE.md)

---

## Para Developers: Implementar el Sistema

### Estado Actual
- TinaCMS ya integrado
- 10+ componentes de sección existentes
- Schema monolítico (1200 líneas)
- Solo 1 página dinámica (home)

### Arquitectura Propuesta

```
Modularizar Schema → Crear Block Registry → Páginas Dinámicas
```

### Roadmap (8 semanas)

**Semana 1-2: Foundation**
- Reestructurar schema modular
- Block Registry centralizado
- Catch-all route `[...slug]/page.tsx`
- 3 bloques MVP

**Semana 3-4: Core Blocks**
- 10 bloques adicionales
- Preview images
- Testing

**Semana 5-6: Advanced**
- Temas globales
- Forms integration
- A/B testing
- Analytics

**Semana 7: Documentation**
- Docs completa
- Video tutorials
- Training Marketing

**Semana 8+: Launch**
- Go-live
- Crear 5 landings
- Iterar

### Archivos Clave a Crear

```typescript
// 1. Block Registry
tina/schema/blocks/index.ts
tina/schema/blocks/hero/HeroBlock.ts
tina/schema/blocks/social/TestimonialsBlock.ts
// ... 24 bloques más

// 2. Page Collection
tina/schema/collections/pages.ts

// 3. Catch-all Route
src/app/[...slug]/page.tsx

// 4. Block Renderer
src/components/blocks/BlockRenderer.tsx
```

**Arquitectura completa:** [docs/reference/PAGE_BUILDER_ARCHITECTURE.md](/Users/srjavi/Documents/projects/choiz/choiz-website-crm-mx/docs/reference/PAGE_BUILDER_ARCHITECTURE.md)

**Ejemplos de código:** [docs/reference/BLOCK_IMPLEMENTATION_EXAMPLES.md](/Users/srjavi/Documents/projects/choiz/choiz-website-crm-mx/docs/reference/BLOCK_IMPLEMENTATION_EXAMPLES.md)

---

## Bloques Disponibles (Propuestos)

### Hero Blocks (4)
- HeroBlock (default, centered, split, minimal)
- HeroVideoBlock (fullscreen, background, inline)
- HeroFormBlock (left, right, centered)
- HeroAnnouncementBlock (banner, modal, inline)

### Social Proof (5)
- TestimonialsBlock (grid, carousel, masonry)
- ReviewsBlock (compact, detailed, stats)
- BeforeAfterBlock (slider, sideBySide, grid)
- TrustBadgesBlock (horizontal, grid, minimal)
- StatsBlock (minimal, highlighted, cards)

### CTA Blocks (3)
- CTABlock (default, highlight, minimal)
- CTAFormBlock (inline, modal, sidebar)
- CTATimerBlock (countdown, urgency, limited)

### Product Blocks (4)
- ProductsBlock (grid, carousel, list)
- ProductComparisonBlock (table, cards, sideBySide)
- ProductIngredientsBlock (grid, tabs, accordion)
- ProductBenefitsBlock (icons, images, numbered)

### Content Blocks (6)
- RichTextBlock (default, centered, wide)
- ImageTextBlock (left, right, alternating)
- TimelineBlock (vertical, horizontal, centered)
- StepsBlock (numbered, icons, cards)
- FAQBlock (accordion, grid, tabs)
- VideoBlock (youtube, vimeo, native)

### Form Blocks (2)
- LeadCaptureBlock (minimal, detailed, quiz)
- QuizBlock (inline, fullscreen, stepped)

**Total: 24 bloques, 57 variantes**

---

## KPIs Esperados

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| Tiempo creación | 2-5 días | 15 min | **96% más rápido** |
| Costo por landing | $500-1000 | $0 | **100% ahorro** |
| Landings/mes | 1-2 | 10+ | **500% aumento** |
| Intervención dev | 100% | 0% | **Autonomía total** |

---

## Recursos

### Documentación
- [Arquitectura Completa](./reference/PAGE_BUILDER_ARCHITECTURE.md)
- [Guía de Marketing](./guides/MARKETING_PAGE_BUILDER_GUIDE.md)
- [Ejemplos de Código](./reference/BLOCK_IMPLEMENTATION_EXAMPLES.md)
- [Índice Principal](./README.md)

### Soporte
- Slack: #marketing-web
- Email: dev@choiz.mx

---

**Creado:** 2025-12-09
**Mantenedor:** Development Team
