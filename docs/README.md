# Choiz Website Documentation

**Última actualización:** 2025-12-19

---

## Estructura de Documentación

```
docs/
├── README.md                    # Este archivo - índice principal
├── QUICKSTART.md                # Guía de inicio rápido
├── guides/                      # Guías de usuario
│   └── MARKETING_PAGE_BUILDER_GUIDE.md  # Guía principal para Marketing
├── reference/                   # Documentación técnica
│   ├── PAGE_BUILDER_ARCHITECTURE.md     # Arquitectura del sistema
│   └── BLOCK_IMPLEMENTATION_EXAMPLES.md # Ejemplos de código
└── archived/                    # Documentación histórica
    ├── TINACMS_INVESTMENT_CASE.md       # Business case (completado)
    ├── TINACMS_BUSINESS_CASE_EXTENDED.md
    └── TINACMS_PRODUCTION_RESEARCH.md   # Research inicial
```

---

## Navegación Rápida

### Para Marketing (No Técnico)

| Necesitas... | Lee... |
|--------------|--------|
| Crear una landing page | [MARKETING_PAGE_BUILDER_GUIDE.md](./guides/MARKETING_PAGE_BUILDER_GUIDE.md) |
| Ver bloques disponibles | [Catálogo de Bloques](./guides/MARKETING_PAGE_BUILDER_GUIDE.md#catálogo-de-bloques-disponibles) |
| Tutorial paso a paso | [Tutorial](./guides/MARKETING_PAGE_BUILDER_GUIDE.md#tutorial-tu-primera-landing-page) |

### Para Developers (Técnico)

| Necesitas... | Lee... |
|--------------|--------|
| Entender la arquitectura | [PAGE_BUILDER_ARCHITECTURE.md](./reference/PAGE_BUILDER_ARCHITECTURE.md) |
| Implementar un nuevo bloque | [BLOCK_IMPLEMENTATION_EXAMPLES.md](./reference/BLOCK_IMPLEMENTATION_EXAMPLES.md) |
| Inicio rápido | [QUICKSTART.md](./QUICKSTART.md) |

---

## Bloques Disponibles (29 bloques)

| Categoría | Bloques |
|-----------|---------|
| **Hero** | Hero, HeroVideo |
| **Social Proof** | Testimonials, VideoTestimonials, SuccessStories, Reviews, BeforeAfter |
| **Trust** | Certifications, PressLogos, Stats, Guarantee, GuaranteeNew |
| **Products** | Products, ProductComparison, Formulas, Activos |
| **Content** | HowItWorks, HowItWorksNew, FAQ, Benefits |
| **CTAs** | FinalCta, FinalCtaNew, CtaTimer |
| **Footer** | FooterNew |

---

## PRDs (Product Requirements Documents)

Los PRDs están en `.claude/prds/`:

| PRD | Estado | Prioridad |
|-----|--------|-----------|
| tinacms-production-setup | ✅ Completado | - |
| multiple-landings | 📋 Backlog | Alta |
| ab-testing-visual | 📋 Backlog | Media |
| block-gallery | 📋 Backlog | Media |
| device-preview | 📋 Backlog | Baja |
| conditional-fields | 📋 Backlog | Baja |
| editorial-workflow | 📋 Backlog | Media |

---

## Estado del Proyecto

### Completado ✅
- TinaCMS integrado con visual editing
- 29 bloques de secciones implementados
- Guía de Marketing actualizada
- Deploy en Vercel funcionando

### Próximos Pasos
1. Implementar múltiples landing pages (PRD: multiple-landings)
2. A/B testing visual
3. Galería de bloques

---

## Documentación Archivada

Los siguientes documentos están en `archived/` porque su propósito ya fue cumplido:

- **TINACMS_INVESTMENT_CASE.md** - Business case para adoptar TinaCMS (decisión tomada: ✅ Sí)
- **TINACMS_BUSINESS_CASE_EXTENDED.md** - Análisis extendido
- **TINACMS_PRODUCTION_RESEARCH.md** - Research de implementación

---

**Creado:** 2025-12-02
**Mantenedor:** Development Team
