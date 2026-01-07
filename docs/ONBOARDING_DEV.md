# Onboarding Dev

## Setup

```bash
git clone git@github.com:choiz/choiz-website-crm-mx.git
cd choiz-website-crm-mx
npm install
cp .env.example .env.local  # Pedir valores al equipo tech
npm run dev
```

- http://localhost:3000 → Sitio
- http://localhost:3000/admin → Editor TinaCMS

---

## Estructura

```
src/
├── app/                  # Next.js 16 App Router
├── components/
│   ├── sections/         # Bloques de contenido
│   ├── layout/           # Navbar, Footer
│   ├── ui/               # Button, Card, Badge
│   └── PageClient.tsx    # Renderiza bloques
tina/
├── config.ts             # Schema (define bloques y campos)
└── __generated__/        # Tipos TS auto-generados
content/
└── pages/*.json          # Contenido de cada página
```

---

## Cómo Funciona TinaCMS

### El flujo

```
tina/config.ts     →  Define qué bloques existen y qué campos tienen
        ↓
content/pages/*.json  →  Guarda el contenido (cada bloque tiene _template)
        ↓
PageClient.tsx     →  Lee el JSON y renderiza el componente según _template
```

### Ejemplo concreto

**1. Schema define el bloque** (`tina/config.ts`):
```typescript
{
  name: "hero",
  label: "Hero",
  fields: [
    { name: "headline", type: "string" },
    { name: "ctaText", type: "string" },
    { name: "backgroundImage", type: "image" },
  ]
}
```

**2. Contenido se guarda en JSON** (`content/pages/home.json`):
```json
{
  "sections": [
    {
      "_template": "hero",
      "headline": "Recupera tu cabello",
      "ctaText": "Ver Tratamientos",
      "backgroundImage": "/images/hero.jpg"
    }
  ]
}
```

**3. PageClient renderiza** (`src/components/PageClient.tsx`):
```tsx
switch (section._template) {
  case "hero":
    return <Hero headline={section.headline} ctaText={section.ctaText} ... />
}
```

### Agregar nuevo bloque

1. Crear `src/components/sections/NuevoBloque.tsx`
2. Agregar template en `tina/config.ts` (fields del bloque)
3. Exportar en `src/components/sections/index.ts`
4. Agregar case en `PageClient.tsx`
5. `npm run tina:generate`

### Agregar campo a bloque existente

1. Agregar field en `tina/config.ts`
2. `npm run tina:generate`
3. Usar el nuevo campo en el componente

---

## Bloques Activos (10)

hero, certifications, successStories, formulas, activos, videoTestimonials, howItWorksNew, faq, finalCtaNew, footerNew

---

## Convenciones

- **Código:** Inglés
- **UI:** Español (textos visibles)
- **Estilos:** Tailwind + `cn()` para clases condicionales

---

## Comandos

```bash
npm run dev           # Desarrollo
npm run build         # Build producción
npm run tina:generate # Regenerar tipos después de cambiar schema
```
