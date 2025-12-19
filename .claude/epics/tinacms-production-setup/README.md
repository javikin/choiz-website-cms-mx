# Epic: Configuración de TinaCMS Cloud para Producción

**Estado:** 🟡 En Progreso
**Última actualización:** 2025-12-19T04:23:19Z

---

## Resumen

Este epic documenta la configuración completa de TinaCMS Cloud para permitir la edición de contenido en producción del sitio web de Choiz.

## Objetivo

Configurar TinaCMS Cloud para que el equipo de marketing/contenido pueda editar el sitio directamente desde producción, sin necesidad de conocimientos técnicos ni acceso al código.

## Issues Relacionados

- #6 - Configurar TinaCMS Cloud

## Estructura del Epic

```
.claude/epics/tinacms-production-setup/
├── README.md                    # Este archivo (índice del epic)
├── tinacms-setup-guide.md       # Guía completa de configuración
└── verification-checklist.md    # Checklist de verificación (próximamente)
```

## Archivos Creados

### Archivos de Configuración

- **/.env.example**: Template con las variables de entorno necesarias
  - Contiene documentación de cada variable
  - Puede ser compartido públicamente
  - Sirve como referencia para nuevos desarrolladores

### Documentación

- **tinacms-setup-guide.md**: Guía completa de configuración
  - Verificación del schema actual
  - Pasos para crear cuenta en Tina.io
  - Configuración de proyecto en TinaCMS Cloud
  - Obtención de credenciales
  - Configuración en Vercel
  - Verificación de funcionamiento
  - Solución de problemas comunes

## Estado del Schema

### Schema Actual (tina/config.ts)

✅ **Configuración Básica**
- Branch detection configurado
- Variables de entorno configuradas
- Modo local soportado

✅ **Collections**
- Landing Page (con bloques reordenables)
- Bloques reutilizables

✅ **Secciones Configuradas**
- Hero con imagen de fondo
- Certificaciones
- Testimoniales (videos)
- Problema (alopecia/DHT)
- Productos
- Ingredientes/Activos
- Efectividad
- Por qué elegirnos
- Garantía
- Cómo funciona
- CTA Final
- Fórmulas personalizadas
- Casos de éxito (Before/After)
- Video testimonios
- FAQ
- Footer

### Campos Reutilizables

- SEO fields (metaTitle, metaDescription, ogImage, etc.)
- CTA fields (ctaText, ctaLink)
- Link fields (text, url)

### Límites Configurados

```typescript
LIMITS = {
  CTA_TEXT_MAX: 30,
  BADGE_MAX: 50,
  HEADLINE_MIN: 10,
  HEADLINE_MAX: 100,
  BENEFIT_MAX: 80,
  META_TITLE_MAX: 60,
  META_DESCRIPTION_MAX: 160,
  MAX_BENEFITS: 5,
  MAX_BADGES: 4,
  MAX_TESTIMONIALS: 12,
  MAX_PRODUCTS: 6,
  MAX_INGREDIENTS: 8,
  MAX_STATS: 5,
  MAX_SCIENCE_CARDS: 6,
  MAX_PHASES: 4,
  MAX_VALUE_PROPS: 4,
  MAX_STEPS: 6,
  MAX_SOCIAL_LINKS: 6,
  MAX_TAGS: 5,
}
```

## Próximos Pasos

### Completar Configuración

1. [ ] Crear cuenta en Tina.io
2. [ ] Crear proyecto en TinaCMS Cloud
3. [ ] Conectar repositorio de GitHub
4. [ ] Obtener credenciales (Client ID y Token)
5. [ ] Configurar variables en Vercel
6. [ ] Probar en producción
7. [ ] Documentar usuarios autorizados

### Verificación

1. [ ] Admin accesible en /admin
2. [ ] Autenticación funcionando
3. [ ] Edición de contenido funcionando
4. [ ] Commits creados en GitHub
5. [ ] Re-deploy automático funcionando
6. [ ] Contenido actualizado en producción

### Documentación Adicional

1. [ ] Crear guía de uso para editores de contenido
2. [ ] Documentar proceso de agregar/remover usuarios
3. [ ] Crear checklist de verificación post-despliegue

## Variables de Entorno Necesarias

### Para TinaCMS Cloud

| Variable | Descripción | Tipo | Ejemplo |
|----------|-------------|------|---------|
| `NEXT_PUBLIC_TINA_CLIENT_ID` | Client ID de Tina.io | Público | `311aec47-...` |
| `TINA_TOKEN` | Token de autenticación | Secreto | `56a20e0...` |
| `NEXT_PUBLIC_TINA_BRANCH` | Branch a usar | Público | `main` |
| `TINA_PUBLIC_IS_LOCAL` | Modo local | Público | `false` |

### Configuración en Vercel

**Production:**
- `NEXT_PUBLIC_TINA_CLIENT_ID`: Tu Client ID
- `TINA_TOKEN`: Tu Token (Secret)
- `NEXT_PUBLIC_TINA_BRANCH`: `main`

**Preview** (Opcional):
- Mismas variables pero con `NEXT_PUBLIC_TINA_BRANCH`: `HEAD`

## Seguridad

### Información Pública (safe to commit)

✅ `.env.example`
✅ Client ID (NEXT_PUBLIC_TINA_CLIENT_ID)
✅ Branch name (NEXT_PUBLIC_TINA_BRANCH)
✅ Documentación

### Información Privada (NEVER commit)

❌ `.env.local`
❌ Token (TINA_TOKEN)
❌ Credenciales de producción

### Verificación de .gitignore

El archivo `.gitignore` incluye:
```
.env*
.env*.local
```

Esto asegura que ningún archivo de entorno se suba accidentalmente a Git.

## Recursos

### Documentación

- [Guía de Setup](./tinacms-setup-guide.md)
- [TinaCMS Official Docs](https://tina.io/docs/)
- [TinaCMS Cloud](https://tina.io/docs/tina-cloud/overview/)

### Links Útiles

- TinaCMS Dashboard: https://app.tina.io
- TinaCMS Discord: https://discord.com/invite/zumN63Ybpf
- Vercel Dashboard: https://vercel.com/dashboard

---

**Creado:** 2025-12-19T04:23:19Z
**Autor/Mantenedor:** Equipo de Desarrollo Choiz
