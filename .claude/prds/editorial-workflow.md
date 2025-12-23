---
name: editorial-workflow
description: Flujo editorial con roles y aprobaciones antes de publicar contenido
status: backlog
created: 2025-12-20T00:08:32Z
---

# PRD: Editorial Workflow

## Executive Summary

Implementar un flujo editorial con roles y aprobaciones para que Marketing pueda crear contenido que sea revisado antes de publicarse. Requiere TinaCMS Team+ ($49/mes).

## Problem Statement

### Problema Actual
- Cualquier editor puede publicar cambios directamente
- No hay proceso de revisión antes de producción
- Errores de contenido llegan a producción sin filtro
- No hay historial de quién aprobó qué cambios
- Falta accountability en el proceso editorial

### Por qué considerar
- Reduce errores en producción
- Proporciona audit trail
- Profesionaliza el proceso editorial

## User Stories

### Persona: Editor Jr (Ana)
**Como** editor junior,
**Quiero** enviar mi contenido para revisión,
**Para** asegurar que un senior lo valide antes de publicar.

**Criterios de Aceptación:**
- [ ] Puedo crear contenido y enviarlo para revisión
- [ ] Recibo notificación cuando es aprobado/rechazado
- [ ] No puedo publicar directamente

### Persona: Reviewer (Carlos)
**Como** reviewer,
**Quiero** aprobar o solicitar cambios a contenido,
**Para** mantener la calidad antes de publicar.

**Criterios de Aceptación:**
- [ ] Veo lista de contenido pendiente
- [ ] Puedo aprobar o solicitar cambios
- [ ] El editor recibe feedback

## Requirements

### Functional Requirements

#### FR-1: Roles y Permisos (TinaCMS Team+)
```typescript
const roles = {
  editor: {
    can: ["create", "edit", "submit-for-review"],
    cannot: ["publish", "delete"]
  },
  reviewer: {
    can: ["create", "edit", "approve", "request-changes"],
    cannot: ["publish"]
  },
  publisher: {
    can: ["create", "edit", "approve", "publish"],
    cannot: ["delete"]
  },
  admin: { can: ["*"] }
};
```

#### FR-2: Estados del Contenido
```
Draft → In Review → Approved → Published
                ↓
         Changes Requested
```

#### FR-3: Notificaciones
- Nuevo contenido para revisar → Reviewers
- Cambios solicitados → Editor original
- Contenido aprobado → Publishers
- Contenido publicado → Todos

## Success Criteria

| Métrica | Actual | Objetivo |
|---------|--------|----------|
| Errores en producción | Variables | -80% |
| Tiempo de revisión | N/A | < 24 horas |
| Accountability | Ninguna | 100% |

## Constraints & Assumptions

### Constraints
- Requiere TinaCMS Team+ ($49/mes)
- Proceso más lento (revisión añade tiempo)

### Assumptions
- El equipo acepta el proceso adicional
- Hay al menos 2 personas en el flujo

## Out of Scope

- Workflow personalizado por tipo de contenido
- Aprobación multi-nivel
- Programación de publicación

## Dependencies

- Suscripción TinaCMS Team+ ($49/mes)

## Costs

| Concepto | Costo |
|----------|-------|
| TinaCMS Team+ | $49/mes |
| Setup | 2-4 horas |

## Alternativas Sin Team+

### Opción 1: Git-based
- Editores en branch `content/draft`
- PR para merge a `main`
- Revisor aprueba en GitHub

**Desventaja:** Requiere conocimiento de Git

### Opción 2: Manual
- Editores guardan como draft
- Notifican por Slack
- Revisor publica manualmente

**Desventaja:** Proceso propenso a errores

## Implementation Phases

### Día 1
- [ ] Actualizar suscripción TinaCMS
- [ ] Configurar roles en dashboard

### Día 2
- [ ] Invitar usuarios con roles
- [ ] Capacitación básica

### Día 3-4
- [ ] Período de prueba
- [ ] Ajustes y documentación

## Risks

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Proceso lento | Media | Bajo | SLAs de revisión |
| Resistencia al cambio | Media | Medio | Capacitación, ejemplos |

## Decision Required

**¿Invertir $49/mes en TinaCMS Team+?**

| Pros | Contras |
|------|---------|
| Flujo profesional | Costo mensual |
| Reducción de errores | Proceso más lento |
| Accountability | Requiere más personas |
