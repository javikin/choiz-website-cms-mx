# PRD: TinaCMS Production Setup

**Estado:** 🟢 Activo
**Última actualización:** 2025-12-19

---

## Resumen Ejecutivo

Preparar el sitio web de Choiz para producción con TinaCMS, permitiendo edición visual de contenido por el equipo de marketing sin necesidad de código.

## Contexto

### Estado Actual
- ✅ Landing page completamente implementada con todas las secciones
- ✅ TinaCMS schema configurado para todas las secciones
- ✅ Componentes React funcionando con datos estáticos de `content/landing/home.json`
- ✅ Responsive design implementado (desktop/mobile)
- ⚠️ Faltan imágenes reales (testimonios, productos, activos)
- ⚠️ TinaCMS Cloud no está conectado para edición visual

### Secciones Implementadas
1. Hero (con badge, headline, benefits, CTA)
2. Certifications (COFEPRIS, PROFECO)
3. SuccessStories (testimonios antes/después)
4. Formulas (productos con tags)
5. Activos (ingredientes activos)
6. VideoTestimonials (videos de usuarios)
7. HowItWorksNew (proceso de 4 pasos)
8. FinalCtaNew (CTA final con imagen de fondo)
9. FAQ (preguntas frecuentes con acordeón)
10. FooterNew (footer completo con enlaces y redes sociales)

## Objetivos

### Objetivo Principal
Habilitar la edición de contenido en producción a través de TinaCMS Cloud.

### Objetivos Secundarios
1. Agregar todas las imágenes reales del sitio
2. Configurar TinaCMS Cloud para el equipo
3. Optimizar imágenes para performance
4. Configurar dominio de producción

## Alcance

### Incluido
- [ ] Configuración de TinaCMS Cloud
- [ ] Subida de imágenes reales a `/public/images/`
- [ ] Optimización de imágenes (WebP, lazy loading)
- [ ] Configuración de variables de entorno para producción
- [ ] Pruebas de edición visual en TinaCMS
- [ ] Documentación para el equipo de marketing

### Fuera de Alcance
- Nuevas secciones o funcionalidades
- CRM o backend de usuarios
- Integración con sistemas de pago
- Analytics avanzados

## Requerimientos Técnicos

### 1. TinaCMS Cloud Setup
```bash
# Variables de entorno requeridas
NEXT_PUBLIC_TINA_CLIENT_ID=<tina-cloud-client-id>
TINA_TOKEN=<tina-cloud-token>
NEXT_PUBLIC_TINA_BRANCH=main
```

### 2. Imágenes Faltantes
| Sección | Imagen | Estado |
|---------|--------|--------|
| Testimonials | roberto-before.jpg, roberto-after.jpg | ❌ Pendiente |
| Testimonials | sergio-before.jpg, sergio-after.jpg | ❌ Pendiente |
| Testimonials | fernando-before.jpg, fernando-after.jpg | ❌ Pendiente |
| Testimonials | rafael-before.jpg, rafael-after.jpg | ❌ Pendiente |
| Products | capsulas-1.png, capsulas-2.png, capsulas-3.png | ❌ Pendiente |
| Products | locion-1.png | ❌ Pendiente |
| Activos | dutasterida.png, minoxidil.png, finasterida.png, biotina.png, tretinoina.png | ❌ Pendiente |
| How It Works | step-1.png, step-2.png, step-3.png, step-4.png | ❌ Pendiente |
| Video Testimonials | video-1.jpg, video-2.jpg, video-3.jpg | ❌ Pendiente |
| Footer | app-mockup.png | ❌ Pendiente |
| Navbar | choiz-logo.svg | ✅ Existe |
| Footer | choiz-logo-gray.svg | ❌ Pendiente |
| Certifications | cofepris-logo.png, profeco-logo.png | ❌ Pendiente |

### 3. Optimización de Imágenes
- Convertir imágenes a WebP donde sea posible
- Implementar lazy loading con Next.js Image component
- Configurar sizes apropiados para responsive

## Entregables

1. **Proyecto conectado a TinaCMS Cloud**
   - Credenciales configuradas
   - Edición visual funcionando

2. **Assets completos**
   - Todas las imágenes en `/public/images/`
   - Optimizadas para web

3. **Documentación**
   - Guía de uso de TinaCMS para el equipo
   - Instrucciones de deployment

## Criterios de Éxito

- [ ] El equipo puede editar contenido desde TinaCMS Cloud
- [ ] No hay imágenes 404 en la página
- [ ] Lighthouse score > 90 en performance
- [ ] Tiempo de carga < 3 segundos en 4G

## Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Imágenes no optimizadas | Alta | Medio | Usar herramientas de compresión |
| TinaCMS Cloud limits | Baja | Alto | Revisar plan y límites |
| Problemas de permisos | Media | Bajo | Documentar roles y accesos |

## Timeline Sugerido

### Fase 1: Assets (2-3 días)
- Recopilar todas las imágenes del equipo de diseño
- Optimizar y subir a `/public/images/`

### Fase 2: TinaCMS Cloud (1 día)
- Crear proyecto en TinaCMS Cloud
- Configurar variables de entorno
- Probar edición visual

### Fase 3: QA y Documentación (1-2 días)
- Pruebas de todas las secciones
- Crear guía para el equipo
- Deployment a producción

---

**Creado:** 2025-12-19
**Autor:** Development Team
