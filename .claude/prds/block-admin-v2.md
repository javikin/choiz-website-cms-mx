---
name: block-admin-v2
description: Sistema avanzado de administración de bloques con edición visual, IA generativa y gestión de assets
status: backlog
created: 2025-12-26T07:04:52Z
updated: 2025-12-26T07:04:52Z
---

# PRD: Block Admin System v2.0

## Resumen Ejecutivo

Evolucionar el sistema actual de galería de bloques hacia una plataforma completa de edición visual que permita a usuarios no técnicos (marketing/contenido) crear, editar y gestionar bloques de landing pages sin necesidad de código, potenciado por IA generativa.

## Problema

Actualmente:
- Solo desarrolladores pueden crear/modificar bloques
- El equipo de marketing depende del equipo técnico para cambios simples
- No hay forma visual de previsualizar cambios antes de publicar
- Crear variantes de un bloque requiere duplicar código
- No existe un sistema centralizado de assets de marca

## Solución

Un sistema de administración de bloques con:
1. **Edición visual in-line** directamente en el preview
2. **IA generativa** para crear bloques desde prompts y ajustar existentes
3. **Sistema de variantes y temas** para personalización sin código
4. **Drag & drop** para reorganizar secciones
5. **Biblioteca centralizada de assets** (imágenes, iconos, brand kit)

## Usuarios Objetivo

**Primario:** Equipo de Marketing/Contenido
- No técnicos
- Necesitan autonomía para crear landing pages
- Requieren interfaz intuitiva tipo "Webflow/Framer"

**Secundario:** Desarrolladores
- Crean bloques base y variantes avanzadas
- Configuran el brand kit y assets iniciales

---

## Funcionalidades

### Epic 1: Edición Visual In-Line

**Objetivo:** Permitir editar textos, imágenes y CTAs directamente en el preview del bloque.

#### Features:
1. **Click-to-edit en textos**
   - Hacer click en cualquier texto para editarlo
   - Rich text básico (bold, italic, links)
   - Guardar con blur o Cmd+S

2. **Selector de imágenes in-line**
   - Click en imagen abre selector de biblioteca
   - Crop/resize básico
   - Drag & drop desde desktop

3. **Editor de CTAs**
   - Editar texto del botón
   - Cambiar URL destino
   - Selector de estilo (primario, secundario, outline)

4. **Panel de propiedades lateral**
   - Muestra todas las props del bloque seleccionado
   - Formularios tipados según tipo de prop
   - Preview en tiempo real

#### Criterios de Aceptación:
- [ ] Usuario puede editar cualquier texto visible haciendo click
- [ ] Cambios se reflejan en tiempo real en el preview
- [ ] Imágenes se pueden cambiar desde biblioteca o upload
- [ ] Cambios se guardan en el contenido de TinaCMS

---

### Epic 2: Sistema de Variantes y Temas

**Objetivo:** Crear variantes visuales de bloques sin duplicar código.

#### Features:
1. **Variantes de bloque**
   - Selector de variante en cada bloque (default, dark, minimal, etc.)
   - Las variantes modifican estilos, no estructura
   - Preview lado a lado de variantes

2. **Brand Kit centralizado**
   - Paleta de colores de marca
   - Tipografías permitidas
   - Espaciados y radios estándar
   - Tokens de diseño

3. **Override de estilos por bloque**
   - Panel de estilos para el bloque seleccionado
   - Colores, espaciados, fuentes
   - Respeta los límites del brand kit

4. **Temas globales**
   - Tema claro/oscuro
   - Aplicar tema a página completa
   - Preview de temas

#### Criterios de Aceptación:
- [ ] Cada bloque tiene selector de variantes disponibles
- [ ] Brand kit define tokens usables en toda la app
- [ ] Usuario puede cambiar colores/estilos sin código
- [ ] Cambios respetan el sistema de diseño

---

### Epic 3: Drag & Drop de Secciones

**Objetivo:** Reorganizar, duplicar y eliminar secciones arrastrando.

#### Features:
1. **Reordenar secciones**
   - Arrastrar bloques para cambiar orden
   - Indicador visual de posición
   - Undo/redo de cambios

2. **Agregar nuevas secciones**
   - Botón "+" entre secciones
   - Selector de bloques disponibles
   - Preview al hover

3. **Duplicar y eliminar**
   - Menú contextual por sección
   - Duplicar con contenido
   - Eliminar con confirmación

4. **Templates de página**
   - Guardar combinación de bloques como template
   - Cargar templates predefinidos
   - Templates por tipo (landing, producto, etc.)

#### Criterios de Aceptación:
- [ ] Secciones se pueden arrastrar para reordenar
- [ ] Se pueden agregar bloques desde un selector visual
- [ ] Duplicar crea copia con mismo contenido
- [ ] Eliminar requiere confirmación

---

### Epic 4: IA Generativa para Bloques

**Objetivo:** Usar IA para crear bloques nuevos y modificar existentes mediante lenguaje natural.

#### Features:
1. **Chat contextual**
   - Panel de chat flotante
   - Entiende el bloque seleccionado
   - Aplica cambios mediante comandos naturales
   - Ejemplos: "Hazlo más oscuro", "Cambia el CTA a verde", "Agrega un subtítulo"

2. **Prompt por bloque**
   - Campo de texto en panel de propiedades
   - Describir cambios deseados
   - Preview antes de aplicar
   - Historial de prompts

3. **Generador de bloques**
   - Describir la sección deseada en lenguaje natural
   - IA genera código React completo
   - Preview del bloque generado
   - Refinar con prompts adicionales
   - Guardar como nuevo bloque

4. **Sugerencias inteligentes**
   - IA analiza contenido actual
   - Sugiere mejoras de copy
   - Recomienda variantes visuales
   - Optimización para conversión

#### Criterios de Aceptación:
- [ ] Chat entiende contexto del bloque seleccionado
- [ ] Cambios de contenido/estilo se aplican desde prompts
- [ ] Puede generar bloques React completos desde descripción
- [ ] Preview de cambios antes de confirmar

---

### Epic 5: Biblioteca de Assets

**Objetivo:** Sistema centralizado de imágenes, iconos y recursos de marca.

#### Features:
1. **Galería de imágenes**
   - Grid visual de todas las imágenes
   - Upload múltiple con drag & drop
   - Organización por carpetas/tags
   - Búsqueda por nombre
   - Optimización automática (WebP, resize)

2. **Biblioteca de iconos**
   - Set de iconos predefinidos
   - Búsqueda por keyword
   - Personalización de color/tamaño
   - Iconos custom uploadables

3. **Brand Kit visual**
   - Editor de paleta de colores
   - Selector de tipografías (de Google Fonts)
   - Preview de combinaciones
   - Exportar/importar configuración

4. **Integración con bloques**
   - Selector de assets en propiedades de imagen
   - Drag & drop desde biblioteca a bloque
   - Reemplazo masivo de assets

#### Criterios de Aceptación:
- [ ] Imágenes se gestionan desde interfaz visual
- [ ] Iconos disponibles para usar en cualquier bloque
- [ ] Brand kit editable y aplicable globalmente
- [ ] Assets accesibles desde cualquier punto de edición

---

## Arquitectura Técnica

### Stack Propuesto

```
Frontend:
- Next.js 15 (actual)
- TinaCMS para persistencia de contenido
- Framer Motion para animaciones
- DnD Kit para drag & drop
- Radix UI para componentes base

IA:
- Claude API para generación de código
- Embeddings para búsqueda semántica de bloques
- Streaming para respuestas en tiempo real

Assets:
- TinaCMS Media Manager (actual)
- Sharp para optimización de imágenes
- SVG sprites para iconos
```

### Flujo de Datos

```
Usuario edita → Preview actualiza →
TinaCMS guarda contenido →
Git commit automático →
Deploy a Vercel
```

### Estructura de Archivos Nueva

```
src/
├── app/
│   └── block-admin/           # Nueva ruta de admin
│       ├── page.tsx           # Dashboard principal
│       ├── editor/            # Editor visual
│       ├── assets/            # Gestión de assets
│       ├── brand-kit/         # Configuración de marca
│       └── ai/                # Interfaz de IA
├── components/
│   └── admin/                 # Componentes del admin
│       ├── InlineEditor/
│       ├── BlockSelector/
│       ├── AssetPicker/
│       ├── AIChat/
│       └── VariantSwitcher/
└── lib/
    ├── ai/                    # Integración con Claude
    ├── assets/                # Gestión de assets
    └── brand-kit/             # Sistema de tokens
```

---

## Fases de Implementación

### Fase 1: Fundamentos (2-3 semanas)
- [ ] Edición in-line de textos
- [ ] Panel de propiedades lateral
- [ ] Selector de imágenes básico
- [ ] Guardar cambios en TinaCMS

### Fase 2: Organización (2-3 semanas)
- [ ] Drag & drop de secciones
- [ ] Agregar/eliminar/duplicar bloques
- [ ] Undo/redo
- [ ] Templates básicos

### Fase 3: Personalización (2-3 semanas)
- [ ] Sistema de variantes
- [ ] Brand kit básico
- [ ] Override de estilos
- [ ] Temas claro/oscuro

### Fase 4: Assets (1-2 semanas)
- [ ] Galería de imágenes mejorada
- [ ] Biblioteca de iconos
- [ ] Integración con editor

### Fase 5: IA (3-4 semanas)
- [ ] Chat contextual
- [ ] Ajustes por prompt
- [ ] Generador de bloques
- [ ] Sugerencias inteligentes

---

## Métricas de Éxito

1. **Adopción**
   - % de landing pages creadas sin intervención de devs
   - Tiempo promedio para crear una landing page

2. **Productividad**
   - Reducción de tiempo de creación de contenido
   - Número de iteraciones antes de publicar

3. **Satisfacción**
   - NPS del equipo de marketing
   - Tickets de soporte relacionados con bloques

---

## Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| IA genera código con bugs | Alta | Alto | Preview + validación + rollback |
| Complejidad abruma usuarios | Media | Alto | Onboarding guiado + modo simple |
| Performance con muchos bloques | Media | Medio | Virtualización + lazy loading |
| Conflictos con TinaCMS | Baja | Alto | Tests de integración exhaustivos |

---

## Dependencias

- TinaCMS configurado y funcionando ✅
- Block Gallery v1 implementada ✅
- API key de Claude para IA
- Diseño de UI/UX del admin (pendiente)

---

## Apéndice: Ejemplos de Prompts de IA

### Ajuste de bloque existente
```
Usuario: "Haz el hero más urgente, con countdown y colores rojos"

IA aplica:
- Cambia variante a "urgent"
- Agrega componente de countdown
- Cambia paleta a rojos/naranjas
- Actualiza copy del CTA
```

### Generación de bloque nuevo
```
Usuario: "Crea una sección de pricing con 3 planes,
el del medio destacado, con toggle mensual/anual"

IA genera:
- Componente PricingTable.tsx completo
- Props tipadas para planes
- Toggle de período
- Estilos responsive
- Integración con TinaCMS
```

---

**Autor:** Claude + equipo Choiz
**Última actualización:** 2025-12-26
