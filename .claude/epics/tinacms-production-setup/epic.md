---
name: tinacms-production-setup
status: backlog
created: 2025-12-19T03:34:07Z
updated: 2025-12-19T03:42:56Z
progress: 0%
prd: .claude/prds/tinacms-production-setup.md
github: https://github.com/javikin/choiz-website-cms-mx/issues/1
---

# Epic: TinaCMS Production Setup

## Overview

Preparar el sitio web de Choiz para producción completando los assets faltantes (28 imágenes) y configurando TinaCMS Cloud para edición visual de contenido. El sitio ya tiene las 10 secciones implementadas y funcionales.

## Architecture Decisions

### AD-1: Mantener Arquitectura Actual
- **Decisión:** No modificar la estructura de componentes existente
- **Rationale:** El sitio ya funciona correctamente, solo necesitamos assets y configuración
- **Impacto:** Minimiza riesgo de regresiones

### AD-2: Optimización de Imágenes con Next.js Image
- **Decisión:** Usar `next/image` para optimización automática
- **Rationale:** Next.js ya incluye optimización, WebP automático, lazy loading
- **Impacto:** Performance mejorada sin trabajo adicional

### AD-3: TinaCMS Cloud vs Self-Hosted
- **Decisión:** Usar TinaCMS Cloud (hosted)
- **Rationale:** Menor mantenimiento, backup automático, UI lista para usar
- **Impacto:** Costo mensual ($29) pero ahorra tiempo de setup y mantenimiento

## Technical Approach

### Assets Management
- Recibir imágenes del equipo de diseño
- Optimizar con herramientas como `squoosh` o similar
- Nombrar consistentemente: `{seccion}-{item}.{ext}`
- Subir a `/public/images/`
- Actualizar rutas en `content/landing/home.json`

### TinaCMS Cloud Setup
1. Crear proyecto en tina.io
2. Conectar repositorio GitHub
3. Obtener credenciales (Client ID, Token)
4. Agregar variables a `.env.local` y plataforma de hosting
5. Verificar edición visual funciona en desarrollo
6. Deploy con credenciales de producción

### Performance Optimization
- Verificar que `next/image` está siendo usado correctamente
- Configurar `sizes` apropiados para cada imagen
- Ejecutar Lighthouse y corregir issues
- Target: Score > 90

## Task Breakdown Preview

| # | Task | Descripción | Esfuerzo |
|---|------|-------------|----------|
| 1 | Recopilar assets | Listar imágenes faltantes y solicitar a diseño | S |
| 2 | Optimizar imágenes | Comprimir y convertir a formatos óptimos | M |
| 3 | Subir assets | Agregar imágenes a /public/images/ | S |
| 4 | Actualizar referencias | Modificar home.json con rutas correctas | S |
| 5 | TinaCMS Cloud setup | Crear proyecto y obtener credenciales | M |
| 6 | Configurar env vars | Agregar variables locales y producción | S |
| 7 | Verificar edición | Probar que todas las secciones son editables | M |
| 8 | Lighthouse audit | Ejecutar audit y corregir issues | M |
| 9 | Documentación | Crear guía para el equipo de marketing | S |
| 10 | Deploy producción | Deploy final con configuración completa | S |

**Leyenda:** S = Small (< 2 hrs), M = Medium (2-4 hrs), L = Large (4-8 hrs)

## Dependencies

### Bloqueantes
- **Equipo de Diseño:** Sin imágenes no se puede avanzar con tasks 2-4
- **Acceso TinaCMS:** Necesario para tasks 5-7
- **Plataforma Hosting:** Necesario para task 10

### No Bloqueantes
- Documentación puede empezar en paralelo
- Lighthouse audit puede hacerse con placeholders

## Success Criteria (Technical)

| Criterio | Métrica | Validación |
|----------|---------|------------|
| Sin 404s | 0 errores en Network tab | Chrome DevTools |
| Performance | Lighthouse > 90 | Lighthouse CLI |
| Edición visual | 10/10 secciones editables | Test manual |
| Build exitoso | CI/CD verde | GitHub Actions |
| Carga rápida | LCP < 2.5s | WebPageTest |

## Estimated Effort

- **Total:** 4-6 días de trabajo
- **Fase 1 (Assets):** 2-3 días (depende de diseño)
- **Fase 2 (TinaCMS):** 1 día
- **Fase 3 (QA/Docs):** 1-2 días

### Critical Path
1. Obtener imágenes de diseño (bloqueante)
2. Subir y verificar assets
3. Configurar TinaCMS Cloud
4. Deploy a producción

## Risks & Mitigations

| Riesgo | Mitigación |
|--------|------------|
| Diseño tarda en entregar imágenes | Usar placeholders de alta calidad, avanzar con TinaCMS |
| TinaCMS tiene issues con schema | Schema ya está probado en desarrollo |
| Performance baja | next/image ya optimiza, solo verificar configuración |

## Tasks Created

| # | Task | Parallel | Depends On |
|---|------|----------|------------|
| #2 | Recopilar lista de assets faltantes | ✅ | - |
| #3 | Optimizar imágenes recibidas | ❌ | #2 |
| #4 | Subir assets a public/images | ❌ | #3 |
| #5 | Actualizar referencias en home.json | ❌ | #4 |
| #6 | Configurar TinaCMS Cloud | ✅ | - |
| #7 | Configurar variables de entorno | ❌ | #6 |
| #8 | Verificar edición visual de secciones | ❌ | #5, #7 |
| #9 | Lighthouse audit y optimización | ✅ | #5 |
| #10 | Crear documentación para Marketing | ✅ | #8 |
| #11 | Deploy a producción | ❌ | #8, #9 |

**Total tasks:** 10
**Parallel tasks:** 4 (#2, #6, #9, #10)
**Sequential tasks:** 6
**Estimated total effort:** 16-22 hours

**Synced:** 2025-12-19T03:42:56Z
