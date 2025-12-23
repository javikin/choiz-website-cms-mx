---
name: block-gallery
description: Galería visual de bloques pre-diseñados para explorar y agregar a landings
status: complete
created: 2025-12-20T00:08:32Z
updated: 2025-12-23T06:05:35Z
---

# PRD: Galería de Bloques Visual

## Executive Summary

Crear una galería visual de bloques pre-diseñados que Marketing pueda explorar y agregar a sus landings. Actualmente el selector de bloques muestra solo nombres, sin preview de cómo se ven.

## Problem Statement

### Problema Actual
- El selector de bloques muestra nombres técnicos sin contexto visual
- Marketing no sabe cómo se ve un bloque antes de agregarlo
- Hay 29 bloques disponibles pero difíciles de explorar
- Las variantes (default, cards, minimal) no se visualizan

### Por qué es importante ahora
- Con 29 bloques, la descubribilidad es un problema
- Marketing pregunta frecuentemente qué hace cada bloque

## User Stories

### Persona: Marketing Manager (María)
**Como** Marketing Manager,
**Quiero** ver previews de los bloques disponibles,
**Para** elegir el mejor para mi landing sin prueba y error.

**Criterios de Aceptación:**
- [x] Veo thumbnails de cada bloque
- [x] Puedo filtrar por categoría
- [x] Veo las variantes disponibles
- [x] Puedo buscar por nombre

## Requirements

### Functional Requirements

#### FR-1: Thumbnails para Cada Bloque
```
public/images/block-previews/
├── hero-default.png
├── hero-video.png
├── testimonials-grid.png
├── stats-cards.png
└── ...
```

#### FR-2: Selector Visual
```typescript
// tina/components/BlockSelector.tsx
export function BlockSelector({ options, onSelect }) {
  return (
    <div className="block-gallery">
      {options.map(block => (
        <div key={block.name} onClick={() => onSelect(block)}>
          <img src={`/images/block-previews/${block.name}.png`} />
          <h4>{block.label}</h4>
          <p>{block.description}</p>
        </div>
      ))}
    </div>
  );
}
```

#### FR-3: Categorías
```typescript
const blockCategories = {
  "Hero": ["hero", "heroVideo"],
  "Social Proof": ["testimonials", "videoTestimonials", "reviews", "beforeAfter"],
  "Trust": ["certifications", "pressLogos", "stats", "guarantee"],
  "Products": ["products", "productComparison", "formulas"],
  "Content": ["howItWorks", "faq", "benefits"],
  "CTAs": ["finalCta", "ctaTimer"]
};
```

## Success Criteria

| Métrica | Actual | Objetivo |
|---------|--------|----------|
| Tiempo para encontrar bloque | ~2 min | 15 seg |
| Bloques usados por landing | 5-7 | 8-12 |
| Preguntas a desarrollo | Frecuentes | Raras |

## Constraints & Assumptions

### Constraints
- Requiere capturar screenshots de ~60 variantes
- TinaCMS custom field components

### Assumptions
- Todos los bloques funcionan correctamente

## Out of Scope

- Live preview del bloque
- Configuración inline desde galería

## Implementation Phases

### Día 1 ✅
- [x] Definir metadata de bloques con categorías
- [x] Crear placeholders SVG para previews

### Día 2 ✅
- [x] Crear página de galería `/block-gallery`
- [x] Implementar filtros por categoría
- [x] Implementar búsqueda por nombre
- [x] Mostrar variantes disponibles

## Implementación Completada

### Archivos Creados
- `src/lib/block-gallery.ts` - Metadata de 28 bloques con categorías y descripciones
- `src/app/block-gallery/page.tsx` - Página de galería
- `src/app/block-gallery/BlockGalleryClient.tsx` - Componente cliente con filtros
- `src/app/block-gallery/BlockGallery.module.css` - Estilos de la galería
- `scripts/generate-block-placeholders.js` - Script para generar placeholders SVG
- `public/images/block-previews/*.svg` - 28 placeholders SVG

### Categorías Implementadas
| Categoría | Bloques |
|-----------|---------|
| Hero | 2 |
| Social Proof | 5 |
| Confianza | 6 |
| Productos | 5 |
| Contenido | 6 |
| CTAs | 3 |
| Footer | 1 |

### Uso
- Acceder a `/block-gallery` para ver todos los bloques
- Usar filtros por categoría o búsqueda por nombre
- Ver variantes disponibles para cada bloque

### Próximos Pasos (Opcionales)
- Capturar screenshots reales de cada bloque con Playwright
- Integrar selector visual directamente en TinaCMS

## Risks

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Screenshots desactualizados | Media | Bajo | Script de regeneración |
| Customization limitada TinaCMS | Baja | Medio | Documentación TinaCMS |
