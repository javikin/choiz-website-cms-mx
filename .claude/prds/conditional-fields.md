---
name: conditional-fields
description: Mostrar/ocultar campos del editor según selecciones previas del usuario
status: complete
created: 2025-12-20T00:08:32Z
updated: 2025-12-23T06:15:00Z
---

# PRD: Campos Condicionales

## Executive Summary

Implementar campos condicionales en TinaCMS para mostrar/ocultar opciones del editor según las selecciones previas del usuario. Esto simplifica la interfaz y reduce errores de configuración.

## Problem Statement

### Problema Actual
- El editor muestra TODOS los campos siempre, aunque no apliquen
- Marketing se confunde con campos irrelevantes
- Ejemplo: si variant es "minimal", no debería mostrar campos de "cards"
- Configuraciones inválidas son posibles

### Por qué considerar
- TinaCMS ya soporta esto nativamente con templates
- Es mejora de UX, no blocker

## User Stories

### Persona: Marketing Manager (María)
**Como** Marketing Manager,
**Quiero** ver solo los campos relevantes para mi selección,
**Para** no confundirme con opciones que no aplican.

**Criterios de Aceptación:**
- [ ] Al seleccionar variant "video", veo campos de video
- [ ] Al seleccionar variant "default", veo campos de imagen
- [ ] Campos irrelevantes están ocultos

## Requirements

### Functional Requirements

#### FR-1: Templates Separados (Recomendado)
En lugar de condicionales, usar templates:

```typescript
templates: [
  {
    name: "heroDefault",
    label: "Hero - Default",
    fields: [
      { type: "image", name: "image" },
      { type: "string", name: "headline" }
    ]
  },
  {
    name: "heroVideo",
    label: "Hero - Video",
    fields: [
      { type: "string", name: "videoUrl" },
      { type: "string", name: "headline" }
    ]
  }
]
```

#### FR-2: Custom Field Component (Alternativa)
```typescript
const ConditionalField = (props) => {
  const variant = form.getState().values?.variant;
  if (field.showWhen && !field.showWhen(variant)) return null;
  return <DefaultFieldComponent {...props} />;
};
```

## Casos de Uso

| Campo | Default | Video | Minimal |
|-------|---------|-------|---------|
| headline | ✅ | ✅ | ✅ |
| backgroundImage | ✅ | ❌ | ✅ |
| videoUrl | ❌ | ✅ | ❌ |
| ctaButtons | ✅ | ✅ | ❌ |

## Success Criteria

| Métrica | Actual | Objetivo |
|---------|--------|----------|
| Campos visibles por bloque | 15-20 | 5-10 |
| Errores de configuración | Frecuentes | Raros |

## Constraints & Assumptions

### Constraints
- Refactorizar bloques existentes
- Mantener backwards compatibility

### Assumptions
- Templates separados es más mantenible

## Out of Scope

- Validación cross-field
- Campos calculados

## Implementation Phases

### Fase 1: Identificar bloques ✅
- [x] Listar bloques con variantes
- [x] Definir campos por variante

### Fase 2: Mejorar UX de campos ✅
- [x] Agregar descripciones claras a campos condicionales
- [x] Indicar en opciones de variante qué campos habilitan
- [x] Usar emojis para identificación visual

## Implementación Completada

### Enfoque Adoptado
En lugar de separar templates (mayor complejidad, requiere migración), se mejoró la UX:
1. **Descripciones claras**: Campos condicionales indican "⚠️ SOLO se muestra con variante X"
2. **Opciones descriptivas**: Las variantes que habilitan campos extra lo indican
3. **Iconos visuales**: Emojis para identificar campos relacionados

### Bloques Actualizados
| Bloque | Campo Condicional | Variante Requerida |
|--------|-------------------|-------------------|
| ctaTimer | `limitedText` | "Stock limitado" |
| benefits | `competitorName` | "Comparacion" |
| benefits | `competitorHas` | "Comparacion" |

### Archivos Modificados
- `tina/config.ts` - Descripciones mejoradas en campos condicionales

### Ventajas de este enfoque
1. **Sin migración**: No requiere modificar contenido existente
2. **Compatible**: Mantiene estructura actual del schema
3. **Claro para usuarios**: Marketing ve qué campos aplican a qué

## Risks

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Campos ignorados | Baja | Bajo | Descripciones claras guían al usuario |
