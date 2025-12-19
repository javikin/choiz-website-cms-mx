---
name: tinacms-production-setup
description: Preparar el sitio web de Choiz para producción con TinaCMS Cloud y assets completos
status: backlog
created: 2025-12-19T03:28:06Z
---

# PRD: TinaCMS Production Setup

## Executive Summary

Preparar el sitio web de Choiz (tratamiento de alopecia en México) para producción, habilitando la edición visual de contenido a través de TinaCMS Cloud y completando todos los assets visuales faltantes. El objetivo es que el equipo de marketing pueda actualizar contenido sin intervención de desarrollo.

## Problem Statement

### Problema Actual
- El landing page está **100% implementado** con 10 secciones funcionales
- **Faltan imágenes reales** - el sitio muestra errores 404 en múltiples recursos
- **TinaCMS Cloud no está conectado** - el equipo no puede editar contenido visualmente
- El sitio no puede ir a producción sin resolver estos issues

### Por qué es importante ahora
- El sitio está listo estructuralmente, solo faltan assets y configuración
- El equipo de marketing necesita autonomía para actualizar contenido
- Cada día de retraso impacta el lanzamiento de campañas

## User Stories

### Persona: Marketing Manager (María)
**Como** Marketing Manager de Choiz,
**Quiero** poder editar textos, imágenes y testimonios del sitio web,
**Para** lanzar campañas y actualizar contenido sin depender de desarrollo.

**Criterios de Aceptación:**
- [ ] Puedo acceder a TinaCMS Cloud con mis credenciales
- [ ] Puedo editar cualquier texto del sitio y ver preview en vivo
- [ ] Puedo subir y cambiar imágenes
- [ ] Los cambios se publican automáticamente

### Persona: Visitante del Sitio (Carlos)
**Como** usuario buscando tratamiento para alopecia,
**Quiero** ver un sitio profesional con imágenes reales de resultados,
**Para** confiar en Choiz y comenzar mi tratamiento.

**Criterios de Aceptación:**
- [ ] Todas las imágenes cargan correctamente (sin 404)
- [ ] Los testimonios muestran fotos reales de antes/después
- [ ] El sitio carga en menos de 3 segundos

### Persona: Developer (Equipo)
**Como** desarrollador,
**Quiero** que TinaCMS esté correctamente configurado en producción,
**Para** que el equipo de marketing sea autónomo y no dependa de nosotros.

**Criterios de Aceptación:**
- [ ] Variables de entorno configuradas
- [ ] Documentación de uso creada
- [ ] No hay intervención necesaria para cambios de contenido

## Requirements

### Functional Requirements

#### FR-1: Assets Completos
Subir todas las imágenes faltantes al directorio `/public/images/`:

| Categoría | Archivos | Cantidad |
|-----------|----------|----------|
| Testimonios antes/después | roberto, sergio, fernando, rafael | 8 imágenes |
| Productos | capsulas-1/2/3, locion-1 | 4 imágenes |
| Activos/Ingredientes | dutasterida, minoxidil, finasterida, biotina, tretinoina | 5 imágenes |
| How It Works | step-1 a step-4 | 4 imágenes |
| Video Thumbnails | video-1 a video-3 | 3 imágenes |
| Logos | cofepris, profeco, choiz-gray | 3 imágenes |
| Footer | app-mockup | 1 imagen |
| **Total** | | **28 imágenes** |

#### FR-2: TinaCMS Cloud Connection
- Crear proyecto en TinaCMS Cloud (tina.io)
- Configurar variables de entorno:
  - `NEXT_PUBLIC_TINA_CLIENT_ID`
  - `TINA_TOKEN`
  - `NEXT_PUBLIC_TINA_BRANCH=main`
- Conectar repositorio GitHub
- Verificar edición visual funciona

#### FR-3: Documentación para Marketing
- Crear guía de uso de TinaCMS para el equipo
- Incluir screenshots del proceso de edición
- Documentar flujo de publicación

### Non-Functional Requirements

#### NFR-1: Performance
- Lighthouse Performance Score > 90
- Largest Contentful Paint (LCP) < 2.5s
- First Input Delay (FID) < 100ms
- Cumulative Layout Shift (CLS) < 0.1

#### NFR-2: Optimización de Imágenes
- Formato WebP donde sea posible
- Lazy loading implementado
- Sizes responsivos configurados
- Compresión sin pérdida visible de calidad

#### NFR-3: Seguridad
- Tokens de TinaCMS almacenados como secrets
- No exponer credenciales en código
- HTTPS obligatorio en producción

## Success Criteria

| Métrica | Objetivo | Cómo medir |
|---------|----------|------------|
| Imágenes 404 | 0 | Chrome DevTools Network |
| Lighthouse Performance | > 90 | Lighthouse audit |
| Tiempo de carga | < 3s | WebPageTest |
| Edición funcional | 100% | Test manual de todas las secciones |
| Marketing autónomo | Sí | Cambio de contenido sin dev |

## Constraints & Assumptions

### Constraints
- **Presupuesto TinaCMS:** Plan Team ($29/mo) es suficiente para 2-5 editores
- **Timeline:** Objetivo de completar en 1 semana
- **Imágenes:** Depende del equipo de diseño para entregar assets

### Assumptions
- El equipo de diseño tiene las imágenes listas o puede crearlas rápidamente
- El repositorio GitHub ya está conectado y funcional
- El equipo de marketing tiene emails corporativos para acceso a TinaCMS

## Out of Scope

- Nuevas secciones o funcionalidades del sitio
- CRM o backend de gestión de usuarios
- Sistema de pagos o checkout
- Analytics avanzados (GA4 básico sí está en scope)
- Pruebas A/B (fase posterior)
- Internacionalización / multi-idioma
- Blog o páginas adicionales

## Dependencies

### Externas
- **TinaCMS Cloud** - Servicio de edición visual
- **Vercel/Hosting** - Plataforma de deployment (por definir)
- **GitHub** - Repositorio de código

### Internas
- **Equipo de Diseño** - Entregar imágenes finales
- **Marketing** - Definir contenido final de testimonios
- **Legal** - Aprobar uso de fotos de clientes (si aplica)

## Implementation Phases

### Fase 1: Assets (2-3 días)
- [ ] Recopilar lista de imágenes necesarias
- [ ] Obtener imágenes del equipo de diseño
- [ ] Optimizar imágenes (WebP, compresión)
- [ ] Subir a `/public/images/`
- [ ] Actualizar referencias en `home.json`
- [ ] Verificar 0 errores 404

### Fase 2: TinaCMS Cloud (1 día)
- [ ] Crear cuenta/proyecto en tina.io
- [ ] Obtener credenciales (Client ID, Token)
- [ ] Configurar variables de entorno localmente
- [ ] Probar edición visual en desarrollo
- [ ] Configurar para producción

### Fase 3: QA y Documentación (1-2 días)
- [ ] Pruebas de todas las secciones editables
- [ ] Lighthouse audit y optimización
- [ ] Crear guía para Marketing
- [ ] Capacitación al equipo
- [ ] Deploy a producción

## Risks

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Imágenes no listas a tiempo | Media | Alto | Usar placeholders de alta calidad temporalmente |
| Problemas con TinaCMS Cloud | Baja | Alto | Documentar proceso, tener backup de contenido |
| Performance baja por imágenes | Media | Medio | Optimización agresiva, lazy loading |
| Equipo no adopta TinaCMS | Baja | Medio | Capacitación hands-on, documentación clara |

## Appendix: Secciones Implementadas

El landing page tiene 10 secciones completamente funcionales:

1. **Hero** - Banner principal con badge, headline, benefits y CTA
2. **Certifications** - Logos COFEPRIS, PROFECO con textos
3. **SuccessStories** - Grid de testimonios antes/después
4. **Formulas** - Carousel de productos con tags
5. **Activos** - Ingredientes activos con evidencia científica
6. **VideoTestimonials** - Videos de usuarios reales
7. **HowItWorksNew** - Proceso de 4 pasos
8. **FinalCtaNew** - CTA final con imagen de fondo
9. **FAQ** - Preguntas frecuentes con acordeón
10. **FooterNew** - Footer completo con app promo, enlaces, social
