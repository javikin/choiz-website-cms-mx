---
name: block-gallery
status: backlog
created: 2025-12-24T18:32:08Z
progress: 0%
prd: .claude/prds/block-gallery.md
github: https://github.com/javikin/choiz-website-cms-mx/issues/17
---

# Epic: Block Gallery - Sistema de Gestion de Bloques

## Overview

Implementar un sistema completo de galeria de bloques que permita a desarrolladores y marketing visualizar, gestionar y crear bloques de landing pages. Se aprovechara la implementacion existente (galeria basica, API de uso, datos de preview) y se extendera con autenticacion TinaCMS, metadata persistente, documentacion automatica y un editor visual.

## Architecture Decisions

### AD1: Autenticacion via TinaCMS
- **Decision**: Usar el sistema de autenticacion existente de TinaCMS
- **Razon**: Ya esta configurado, evita duplicar logica de auth
- **Implementacion**: Middleware de Next.js + TinaCMS session check

### AD2: Metadata en TinaCMS Collection
- **Decision**: Crear nueva collection "blocks" en TinaCMS para metadata
- **Razon**: Permite edicion visual, versionado con git, consistente con el resto del CMS
- **Alternativa descartada**: JSON local (no tiene UI de edicion)

### AD3: Screenshots con Puppeteer en Build Time
- **Decision**: Generar screenshots estaticos durante el build
- **Razon**: Performance en runtime, imagenes optimizadas por Next.js
- **Implementacion**: Script de build que renderiza cada bloque y captura screenshot

### AD4: Code Viewer con Syntax Highlighting
- **Decision**: Usar prism-react-renderer para mostrar codigo fuente
- **Razon**: Lightweight, no requiere bundle grande, buen soporte TSX

### AD5: Editor Visual Simplificado
- **Decision**: Editor basado en formularios con preview, no drag-and-drop completo
- **Razon**: Drag-and-drop completo es muy complejo; formularios cubren 80% del caso de uso
- **Simplificacion**: Seleccionar tipo de campo, configurar props, generar codigo

## Technical Approach

### Frontend Components

```
src/app/block-gallery/
├── page.tsx                     # Server component con auth check
├── layout.tsx                   # Layout con auth provider
├── BlockGalleryClient.tsx       # EXISTENTE - mejorar
├── [blockId]/
│   └── page.tsx                 # Vista detallada de bloque
├── create/
│   └── page.tsx                 # Editor de creacion
└── components/
    ├── BlockCard.tsx            # Card mejorada con acciones
    ├── BlockDetail.tsx          # Vista completa con tabs
    ├── CodeViewer.tsx           # Visor de codigo con highlight
    ├── PropsDocumentation.tsx   # Documentacion de props
    ├── BlockActions.tsx         # Menu de acciones rapidas
    └── BlockEditor/
        ├── index.tsx            # Editor principal
        ├── FieldSelector.tsx    # Selector de tipos de campo
        ├── PropsConfigurator.tsx # Configurador de props
        └── CodeGenerator.tsx    # Generador de codigo
```

### State Management
- React Context para estado de galeria (filtros, vista activa)
- TinaCMS client para CRUD de metadata
- URL state para filtros (shareable URLs)

### Backend/API

```
src/app/api/
├── blocks/
│   ├── usage/route.ts           # EXISTENTE - tracking de uso
│   ├── metadata/route.ts        # CRUD metadata (proxy a TinaCMS)
│   ├── source/[blockId]/route.ts # Leer codigo fuente
│   └── generate/route.ts        # Generar codigo de nuevo bloque
```

### TinaCMS Schema

```typescript
// tina/collections/blocks.ts
export const blocksCollection = {
  name: "block",
  label: "Block Metadata",
  path: "content/blocks",
  format: "json",
  fields: [
    { name: "blockId", type: "string", required: true },
    { name: "displayName", type: "string" },
    { name: "description", type: "string", ui: { component: "textarea" } },
    { name: "category", type: "string", options: ["hero", "social-proof", ...] },
    { name: "isFavorite", type: "boolean" },
    { name: "isDeprecated", type: "boolean" },
    { name: "deprecationReason", type: "string" },
    { name: "documentation", type: "rich-text" },
    { name: "createdAt", type: "datetime" },
    { name: "updatedAt", type: "datetime" },
  ],
};
```

## Implementation Strategy

### Simplificaciones Clave
1. **Reusar galeria existente**: BlockGalleryClient.tsx ya tiene 80% de la UI
2. **Auth simple**: Redirigir a /admin/login si no autenticado
3. **Screenshots opcionales**: Empezar con render en vivo, screenshots como mejora
4. **Editor basado en formularios**: No drag-and-drop complejo

### Testing Approach
- Unit tests para utilidades de generacion de codigo
- Integration tests para API endpoints
- E2E tests para flujos criticos (ver bloque, marcar favorito)

## Task Breakdown Preview

- [ ] **Task 1**: Autenticacion y proteccion de rutas
- [ ] **Task 2**: TinaCMS collection para metadata de bloques  
- [ ] **Task 3**: UI mejorada con acciones rapidas
- [ ] **Task 4**: Vista detallada de bloque con tabs
- [ ] **Task 5**: Code viewer y documentacion de props
- [ ] **Task 6**: Sistema de screenshots (opcional/mejora)
- [ ] **Task 7**: Editor de bloques basado en formularios
- [ ] **Task 8**: Generador de codigo y schema TinaCMS

## Dependencies

### Externas
- TinaCMS (ya configurado)
- prism-react-renderer (nueva dependencia para code viewer)
- @types/prismjs (tipos)

### Internas (Ya Existentes)
- `src/app/block-gallery/` - Galeria basica funcional
- `src/lib/block-gallery.ts` - Definiciones de bloques
- `src/lib/block-preview-data.ts` - Datos de preview
- `src/app/api/blocks/usage/route.ts` - API de uso

### Prerequisitos
- TinaCMS funcionando con autenticacion
- Acceso a TinaCloud para deploy

## Success Criteria (Technical)

### Performance
- Galeria carga en < 2s (con screenshots pre-generados)
- Vista detallada carga en < 1s
- Editor responde en < 100ms

### Quality Gates
- 100% de bloques con metadata en TinaCMS
- Codigo generado compila sin errores
- Tests E2E pasan para flujos criticos

### Acceptance Criteria
- Usuario puede ver todos los bloques con previews
- Usuario puede marcar favoritos/deprecados
- Usuario puede ver codigo fuente de cualquier bloque
- Usuario puede crear nuevo bloque basico desde editor

## Estimated Effort

| Task | Esfuerzo |
|------|----------|
| Auth + rutas protegidas | S |
| TinaCMS blocks collection | M |
| UI acciones rapidas | S |
| Vista detallada + tabs | M |
| Code viewer + docs | M |
| Screenshots (opcional) | L |
| Editor formularios | L |
| Generador codigo | M |

**Total: 8 tareas, ~8-10 dias de desarrollo**

## Tasks Created

- [ ] #18 - Autenticacion y proteccion de rutas (parallel: true)
- [ ] #19 - TinaCMS collection para metadata de bloques (parallel: true)
- [ ] #20 - UI mejorada con acciones rapidas (parallel: true)
- [ ] #21 - Vista detallada de bloque con tabs (parallel: true)
- [ ] #22 - Code viewer y documentacion de props (parallel: false, depends: #21)
- [ ] #23 - Sistema de screenshots (parallel: true, opcional)
- [ ] #24 - Editor de bloques basado en formularios (parallel: false, depends: #19, #21)
- [ ] #25 - Generador de codigo y schema TinaCMS (parallel: false, depends: #24)

Total tasks: 8
Parallel tasks: 4 (pueden ejecutarse simultaneamente)
Sequential tasks: 4 (tienen dependencias)
Estimated total effort: 46-54 hours
