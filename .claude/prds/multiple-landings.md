---
name: multiple-landings
description: Permitir crear múltiples landing pages desde TinaCMS sin intervención de desarrollo
status: backlog
created: 2025-12-20T00:08:32Z
---

# PRD: Múltiples Landing Pages

## Executive Summary

Permitir que el equipo de Marketing cree nuevas landing pages directamente desde TinaCMS sin intervención de desarrollo. Actualmente solo existe una landing (`/`), lo que limita la capacidad de crear campañas independientes.

## Problem Statement

### Problema Actual
- Marketing depende de desarrollo para crear cada nueva landing
- No hay forma de crear páginas para campañas específicas (Black Friday, San Valentín, etc.)
- Las landings de ads requieren URLs únicas que no existen
- El tiempo de lanzamiento de campañas es de días en lugar de minutos

### Por qué es importante ahora
- El sistema de bloques está listo (29 bloques disponibles)
- TinaCMS está configurado y funcionando
- Marketing necesita autonomía para campañas Q1 2025

## User Stories

### Persona: Marketing Manager (María)
**Como** Marketing Manager de Choiz,
**Quiero** poder crear nuevas landing pages desde TinaCMS,
**Para** lanzar campañas de ads con URLs únicas sin esperar a desarrollo.

**Criterios de Aceptación:**
- [ ] Puedo crear una nueva página desde TinaCMS
- [ ] El sistema genera el slug automáticamente del título
- [ ] Puedo agregar cualquier bloque existente a la página
- [ ] La página se publica en la URL que definí

### Persona: Performance Marketer (Carlos)
**Como** especialista en ads,
**Quiero** URLs únicas para cada campaña,
**Para** trackear conversiones por fuente de tráfico.

**Criterios de Aceptación:**
- [ ] Cada landing tiene URL única (ej: `/black-friday-2025`)
- [ ] Puedo crear variantes de la misma campaña
- [ ] Las páginas tienen SEO configurables individualmente

## Requirements

### Functional Requirements

#### FR-1: Colección de Páginas en TinaCMS
```typescript
// tina/config.ts
{
  name: "page",
  label: "Landing Pages",
  path: "content/pages",
  format: "json",
  ui: {
    filename: {
      slugify: (values) => values?.title?.toLowerCase().replace(/ /g, '-'),
    },
    router: ({ document }) => `/${document._sys.filename}`,
  },
  fields: [
    { type: "string", name: "title", label: "Título", required: true },
    { type: "string", name: "status", options: ["draft", "published"] },
    { type: "object", name: "seo", fields: [...seoFields] },
    { type: "object", name: "sections", list: true, templates: [...] }
  ]
}
```

#### FR-2: Routing Dinámico
```typescript
// app/[slug]/page.tsx
export async function generateStaticParams() {
  const pages = await client.queries.pageConnection();
  return pages.data.pageConnection.edges
    ?.filter(edge => edge?.node?.status === 'published')
    .map(edge => ({ slug: edge?.node?._sys.filename }));
}
```

#### FR-3: PageRenderer Reutilizable
Extraer lógica de renderizado del home a componente compartido.

### Non-Functional Requirements

#### NFR-1: SEO
- Cada página con meta title/description propios
- Sitemap dinámico con todas las páginas
- Canonical URLs automáticas

#### NFR-2: Performance
- ISR para actualizaciones rápidas
- Lazy loading de secciones

#### NFR-3: Seguridad
- Páginas draft no accesibles públicamente
- Preview solo para usuarios autenticados

## Success Criteria

| Métrica | Actual | Objetivo |
|---------|--------|----------|
| Tiempo para crear landing | 2-3 días | 30 minutos |
| Landings activas | 1 | Ilimitadas |
| Dependencia de desarrollo | 100% | 0% |

## Constraints & Assumptions

### Constraints
- Requiere migración del home actual al nuevo sistema
- Las URLs existentes deben seguir funcionando

### Assumptions
- TinaCMS Cloud ya está configurado
- Los 29 bloques existentes funcionan correctamente

## Out of Scope

- Internacionalización / multi-idioma
- Páginas con autenticación de usuario
- E-commerce / checkout
- Blog (será PRD separado)

## Dependencies

### Internas
- PRD tinacms-production-setup (completado)
- Bloques de secciones funcionando (✅)

### Externas
- TinaCMS configurado (✅)

## Implementation Phases

### Fase 1: Schema y Routing (1 día)
- [ ] Crear colección `page` en TinaCMS
- [ ] Crear `app/[slug]/page.tsx`
- [ ] Extraer `PageRenderer` del home

### Fase 2: Migración (0.5 día)
- [ ] Migrar home a usar PageRenderer
- [ ] Verificar backwards compatibility

### Fase 3: Testing (0.5 día)
- [ ] Crear página de prueba
- [ ] Verificar todos los bloques
- [ ] Documentación para Marketing

## Risks

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| URLs duplicadas | Baja | Medio | Validación de slug único |
| Performance con muchas páginas | Baja | Bajo | ISR + lazy loading |
| SEO duplicado | Media | Medio | Canonical URLs automáticas |
