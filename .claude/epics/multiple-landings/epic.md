---
name: multiple-landings
status: backlog
created: 2025-12-23T04:44:40Z
progress: 0%
prd: .claude/prds/multiple-landings.md
github: https://github.com/javikin/choiz-website-cms-mx/issues/12
---

# Epic: multiple-landings

## Overview

Habilitar la creación de múltiples landing pages desde TinaCMS reutilizando la infraestructura existente. La implementación es directa porque:

1. **Ya existe** una colección `landing` con todos los bloques configurados
2. **Ya existe** `LandingPageClient` que maneja el visual editing
3. **Solo necesitamos** crear una nueva colección `page` y routing dinámico

El enfoque es **reutilizar al máximo** el código existente en lugar de crear nueva infraestructura.

## Architecture Decisions

### 1. Reutilizar Templates Existentes
- La colección `landing` ya tiene ~29 templates de bloques
- Extraeremos los templates a constantes reutilizables
- La nueva colección `page` usará los mismos templates

### 2. Mantener el Home Intacto
- El home (`/`) sigue funcionando con la colección `landing`
- Las nuevas páginas usan la colección `page` con routing `[slug]`
- Sin migración, sin riesgo de romper producción

### 3. Reutilizar LandingPageClient
- El componente `LandingPageClient` ya maneja visual editing
- Solo necesitamos adaptarlo para recibir diferentes queries
- El query de GraphQL es casi idéntico

## Technical Approach

### Cambios en TinaCMS Config

```typescript
// tina/config.ts

// 1. Extraer templates a constante reutilizable
const sectionTemplates = [
  heroTemplate,
  certificationsTemplate,
  // ... todos los templates existentes
];

// 2. Nueva colección para páginas
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
    {
      type: "string",
      name: "status",
      label: "Estado",
      options: ["draft", "published"],
      ui: { defaultItem: "draft" }
    },
    ...seoFields,
    // Navbar (igual que landing)
    { type: "object", name: "navbar", ... },
    // Secciones (reutiliza templates)
    {
      type: "object",
      name: "sections",
      list: true,
      templates: sectionTemplates,
    },
  ],
}
```

### Nuevo Routing Dinámico

```typescript
// src/app/[slug]/page.tsx
import client from "@/tina/__generated__/client";
import { LandingPageClient } from "@/components/LandingPageClient";

// Query similar al de home, pero para colección 'page'
const pageQuery = `query page($relativePath: String!) {
  page(relativePath: $relativePath) {
    title
    status
    seo { ... }
    navbar { ... }
    sections { ... }  // Mismo fragmento que landing
  }
}`;

export async function generateStaticParams() {
  const pages = await client.queries.pageConnection();
  return pages.data.pageConnection.edges
    ?.filter(edge => edge?.node?.status === 'published')
    .map(edge => ({ slug: edge?.node?._sys.filename })) || [];
}

export default async function Page({ params }) {
  const { slug } = params;
  const result = await client.queries.page({
    relativePath: `${slug}.json`
  });

  // Reutilizar LandingPageClient
  return (
    <LandingPageClient
      query={pageQuery}
      variables={{ relativePath: `${slug}.json` }}
      data={result.data}
    />
  );
}
```

### Manejo de Páginas Draft

```typescript
// src/app/[slug]/page.tsx
export default async function Page({ params }) {
  const result = await client.queries.page({ ... });

  // Si está en draft y no es preview, mostrar 404
  if (result.data.page.status === 'draft') {
    notFound();
  }

  return <LandingPageClient ... />;
}
```

## Implementation Strategy

### Enfoque Minimalista
1. **No migrar el home** - mantenerlo funcionando como está
2. **Reutilizar todo** - templates, componentes, estilos
3. **Cambios quirúrgicos** - solo agregar lo necesario

### Testing
1. Crear página de prueba "test-landing"
2. Verificar que todos los bloques funcionan
3. Verificar visual editing en TinaCMS
4. Verificar que el home sigue funcionando

## Task Breakdown Preview

- [ ] **Task 1: Extraer templates** - Refactorizar tina/config.ts para reutilizar templates
- [ ] **Task 2: Colección page** - Agregar nueva colección a TinaCMS
- [ ] **Task 3: Routing dinámico** - Crear app/[slug]/page.tsx
- [ ] **Task 4: Testing y docs** - Verificar funcionamiento y documentar

## Dependencies

### Completadas
- TinaCMS configurado y funcionando ✅
- 29 bloques de secciones implementados ✅
- LandingPageClient con visual editing ✅
- Deploy en Vercel funcionando ✅

### Ninguna dependencia externa nueva

## Success Criteria (Technical)

| Criterio | Métrica |
|----------|---------|
| Páginas funcionan | Cualquier página creada en TinaCMS se renderiza correctamente |
| Visual editing | El preview en TinaCMS funciona para nuevas páginas |
| Home intacto | El home (`/`) sigue funcionando sin cambios |
| Performance | Lighthouse > 90 en nuevas páginas |
| Draft pages | Páginas draft no son accesibles públicamente |

## Estimated Effort

| Task | Tiempo |
|------|--------|
| Extraer templates | 1 hora |
| Colección page | 1 hora |
| Routing dinámico | 2 horas |
| Testing y docs | 2 horas |
| **Total** | **6 horas** |

## Risks & Mitigations

| Riesgo | Mitigación |
|--------|------------|
| Query GraphQL muy largo | Reutilizar fragmentos del query existente |
| Conflicto con rutas existentes | [slug] es catch-all, verificar no conflictos |
| Visual editing no funciona | LandingPageClient ya lo maneja, solo adaptar |

## Tasks Created

- [ ] #13 - Extraer templates reutilizables (parallel: true)
- [ ] #14 - Agregar colección page a TinaCMS (parallel: false, depends: #13)
- [ ] #15 - Crear routing dinámico [slug] (parallel: false, depends: #13, #14)
- [ ] #16 - Testing y documentación (parallel: false, depends: #15)

Total tasks: 4
Parallel tasks: 1
Sequential tasks: 3
Estimated total effort: 6 hours
