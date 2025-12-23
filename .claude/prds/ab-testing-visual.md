---
name: ab-testing-visual
description: Crear y comparar variantes de landing pages para optimizar conversiones
status: complete
created: 2025-12-20T00:08:32Z
updated: 2025-12-23T05:54:25Z
---

# PRD: A/B Testing Visual

## Executive Summary

Permitir que Marketing cree y compare variantes de landing pages para optimizar conversiones. Aprovecha la capacidad existente de duplicar bloques y páginas en TinaCMS.

## Problem Statement

### Problema Actual
- No hay forma estructurada de probar variantes de contenido
- Las decisiones de copy/diseño se basan en intuición, no en datos
- Duplicar manualmente páginas es propenso a errores
- No hay tracking de qué variante performa mejor

### Por qué es importante ahora
- Con múltiples landings (PRD 002), se necesita comparar efectividad
- Marketing quiere optimizar conversiones basado en datos

## User Stories

### Persona: Marketing Manager (María)
**Como** Marketing Manager,
**Quiero** crear variantes de mis landing pages,
**Para** comparar qué versión convierte mejor.

**Criterios de Aceptación:**
- [x] Puedo duplicar una landing como variante
- [x] El sistema genera nombre único automáticamente
- [x] Puedo editar la variante independientemente
- [x] Puedo comparar métricas de ambas versiones

## Requirements

### Functional Requirements

#### FR-1: Duplicación de Páginas
```typescript
ui: {
  itemActions: [
    {
      name: 'duplicate',
      label: 'Duplicar como variante',
      action: async (item) => {
        // Crear copia con sufijo -v2, -v3, etc.
      }
    }
  ]
}
```

**Resultado:**
- `black-friday-2025` (original)
- `black-friday-2025-v2` (variante A)
- `black-friday-2025-v3` (variante B)

#### FR-2: Metadata de A/B Test
```typescript
{
  type: "object",
  name: "abTest",
  fields: [
    { type: "string", name: "testId", label: "ID del Test" },
    { type: "string", name: "variant", options: ["control", "variant-a", "variant-b"] },
    { type: "number", name: "trafficPercentage", label: "% de Tráfico" }
  ]
}
```

#### FR-3: Tracking con Analytics
```typescript
// components/ABTestWrapper.tsx
export function ABTestWrapper({ testId, variant, children }) {
  useEffect(() => {
    trackEvent('ab_test_view', { test_id: testId, variant });
  }, []);
  return <>{children}</>;
}
```

### Non-Functional Requirements

#### NFR-1: Analytics Integration
- Eventos enviados a GA4
- Agrupación por test_id

## Success Criteria

| Métrica | Actual | Objetivo |
|---------|--------|----------|
| Tests A/B por mes | 0 | 2-4 |
| Tiempo para crear variante | N/A | 5 minutos |
| Decisiones basadas en datos | 0% | 50%+ |

## Constraints & Assumptions

### Constraints
- Fase 1 es manual (sin split automático de tráfico)
- Análisis en Google Analytics

### Assumptions
- PRD 002 (Múltiples Landings) implementado
- GA4 configurado

## Out of Scope

- Split testing automático con edge middleware
- Dashboard de resultados integrado
- Significancia estadística automática

## Dependencies

- PRD 002: Múltiples Landings (requerido)

## Implementation Phases

### Fase 1: Duplicación (4 horas) ✅
- [x] Agregar API para duplicar páginas (`/api/pages/duplicate`)
- [x] Generar slug único automáticamente (-v2, -v3, etc.)
- [x] API para listar páginas con info de variantes (`/api/pages`)

### Fase 2: Metadata (4 horas) ✅
- [x] Agregar campos de A/B test a schema TinaCMS
- [x] Campos: testId, variant, trafficPercentage, isActive, startDate, endDate

### Fase 3: Analytics (4 horas) ✅
- [x] Componente ABTestWrapper con tracking automático
- [x] Integración con Google Analytics 4
- [x] Funciones helper para tracking de conversiones

## Implementación Completada

### Archivos Creados
- `src/app/api/pages/duplicate/route.ts` - API para duplicar páginas
- `src/app/api/pages/route.ts` - API para listar páginas
- `src/components/analytics/ABTestWrapper.tsx` - Wrapper para tracking
- `src/components/analytics/GoogleAnalytics.tsx` - Componente GA4
- `src/components/analytics/index.ts` - Exports

### Archivos Modificados
- `tina/config.ts` - Agregados campos abTest al schema de pages
- `src/components/PageClient.tsx` - Integrado ABTestWrapper
- `src/app/layout.tsx` - Agregado GoogleAnalytics
- `.env.example` - Agregada variable NEXT_PUBLIC_GA_MEASUREMENT_ID

### Uso

#### Duplicar una página
```bash
curl -X POST http://localhost:3000/api/pages/duplicate \
  -H "Content-Type: application/json" \
  -d '{"sourceSlug": "ejemplo"}'
```

#### Configurar A/B Test en TinaCMS
1. Ir a la página en TinaCMS
2. Abrir sección "A/B Testing"
3. Configurar: Test ID, Variante, % de Tráfico, Fechas

#### Configurar Google Analytics
1. Agregar `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` a `.env.local`
2. Los eventos se envían automáticamente cuando el test está activo

## Risks

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Poco uso por Marketing | Media | Bajo | Capacitación y ejemplos |
| Datos no concluyentes | Media | Bajo | Guía de interpretación |
