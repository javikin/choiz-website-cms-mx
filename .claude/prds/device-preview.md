---
name: device-preview
description: Controles de preview para ver la landing en móvil, tablet y desktop
status: complete
created: 2025-12-20T00:08:32Z
updated: 2025-12-23T06:09:17Z
---

# PRD: Preview por Dispositivo

## Executive Summary

Agregar controles de preview para que Marketing pueda ver cómo se ve la landing en diferentes dispositivos (móvil, tablet, desktop) directamente en el editor de TinaCMS.

## Problem Statement

### Problema Actual
- Marketing no sabe cómo se ve la página en móvil hasta publicar
- El preview actual solo muestra desktop
- 60%+ del tráfico es móvil, pero se diseña en desktop
- Errores de layout móvil se descubren tarde

### Alternativa actual
TinaCMS ya abre preview en nueva pestaña. Se puede usar DevTools de Chrome para simular dispositivos. Esta funcionalidad es mejora de UX, no crítica.

## User Stories

### Persona: Marketing Manager (María)
**Como** Marketing Manager,
**Quiero** ver cómo se ve mi landing en móvil,
**Para** asegurar buena experiencia antes de publicar.

**Criterios de Aceptación:**
- [x] Botones para cambiar entre móvil/tablet/desktop
- [x] El preview cambia de tamaño instantáneamente
- [x] Veo el viewport actual

## Requirements

### Functional Requirements

#### FR-1: Barra de Controles
```typescript
// tina/components/DevicePreview.tsx
const viewports = {
  mobile: { width: 375, height: 667, label: '📱 Móvil' },
  tablet: { width: 768, height: 1024, label: '📱 Tablet' },
  desktop: { width: 1440, height: 900, label: '🖥️ Desktop' }
};
```

#### FR-2: Iframe Responsive
```typescript
<iframe
  src={previewUrl}
  style={{
    width: viewports[device].width,
    height: viewports[device].height,
    transform: device === 'mobile' ? 'scale(0.8)' : 'none'
  }}
/>
```

## Success Criteria

| Métrica | Actual | Objetivo |
|---------|--------|----------|
| Bugs móvil post-publicación | ~3/mes | 0 |
| Tiempo revisando en móvil | Manual | Integrado |

## Constraints & Assumptions

### Constraints
- Requiere hook en preview iframe de TinaCMS
- Baja prioridad vs otras features

### Assumptions
- Los CSS modules ya son responsive

## Out of Scope

- Emulación de touch events
- Orientación landscape/portrait

## Implementation Phases

### Completado ✅
- [x] Componente DevicePreviewClient con controles
- [x] Selector de dispositivos (móvil/tablet/desktop)
- [x] Control de escala (zoom in/out)
- [x] Rotación landscape/portrait
- [x] Indicador de viewport actual
- [x] Bezel visual para dispositivos móviles
- [x] Enlaces rápidos a páginas

## Implementación Completada

### Archivos Creados
- `src/app/preview/page.tsx` - Redirect a home
- `src/app/preview/[slug]/page.tsx` - Página de preview dinámica
- `src/app/preview/[slug]/DevicePreviewClient.tsx` - Cliente con controles
- `src/app/preview/[slug]/DevicePreview.module.css` - Estilos dark mode

### Características
| Feature | Descripción |
|---------|-------------|
| **Dispositivos** | Móvil (375×667), Tablet (768×1024), Desktop (1440×900) |
| **Escala** | Zoom desde 25% hasta 200% |
| **Rotación** | Portrait/Landscape para móvil y tablet |
| **Bezel** | Marco visual simulando dispositivo |
| **Fullscreen** | Modo pantalla completa |
| **Quick Links** | Navegación rápida entre páginas |

### Uso
- Acceder a `/preview/home` para ver la landing principal
- Acceder a `/preview/{slug}` para cualquier página
- Usar los botones para cambiar dispositivo
- Usar +/- para ajustar escala

## Risks

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Preview no refleja producción | Baja | Bajo | Usar mismo CSS |
