# Guía de Page Builder para Marketing

**Estado:** 🟢 Activo - Guía de Usuario
**Última actualización:** 2025-12-09
**Audiencia:** Equipo de Marketing (no técnico)

---

## Introducción

Esta guía te enseñará a crear landing pages profesionales en **menos de 15 minutos** sin necesidad de saber código. El Page Builder de Choiz usa bloques pre-diseñados que simplemente arrastras, configuras y publicas.

---

## Conceptos Básicos

### ¿Qué es un Bloque?

Un **bloque** es una sección pre-diseñada de una página web. Por ejemplo:

- **Hero Block**: La sección principal con título grande y botón
- **Testimonials Block**: Sección de reseñas de clientes
- **CTA Block**: Llamada a la acción (ej: "Comenzar ahora")
- **FAQ Block**: Preguntas frecuentes

### ¿Qué es una Variante?

Una **variante** es una versión diferente del mismo bloque. Por ejemplo:

**Hero Block** tiene 4 variantes:
- **Default**: Imagen a la derecha, texto a la izquierda
- **Centered**: Todo centrado con imagen de fondo
- **Split**: Imagen y texto 50/50
- **Minimal**: Solo texto, sin imagen

Todas garantizan consistencia de marca (colores, fuentes, etc.).

---

## Tutorial: Tu Primera Landing Page

### Paso 1: Acceder al Editor

1. Abre tu navegador
2. Ve a: `https://choiz.mx/admin`
3. Inicia sesión con tus credenciales de TinaCMS
4. Click en "Páginas" en el menú lateral

### Paso 2: Crear Nueva Página

1. Click en botón verde "Create New Page"
2. Aparecerá un formulario:
   - **Título de la Página**: "Black Friday 2025" (nombre interno)
   - **Estado**: Selecciona "Borrador"
3. Click en "Create" o presiona Enter

El sistema automáticamente crea el archivo `black-friday-2025.json` y genera la URL `/black-friday-2025`

### Paso 3: Configurar SEO

Scroll hasta la sección **"SEO y Meta Tags"**

**Campos importantes:**

| Campo | Qué es | Ejemplo |
|-------|--------|---------|
| **Meta Title** | Título en Google (60 chars max) | "Black Friday Choiz - 50% OFF en Tratamiento Capilar" |
| **Meta Description** | Descripción en Google (160 chars max) | "Aprovecha 50% de descuento en todos los kits Choiz este Black Friday. Recupera tu cabello con ciencia comprobada." |
| **OG Image** | Imagen al compartir en redes | `/images/og/black-friday.jpg` |
| **Tipo de Página** | Categoría de contenido | "Producto" (si vendes) o "Website" |

**Tip SEO:**
- Meta Title debe incluir palabra clave principal
- Meta Description debe convencer a hacer click
- OG Image debe ser 1200x630px

### Paso 4: Agregar tu Primer Bloque

1. Scroll hasta **"Bloques de la Página"**
2. Click en botón azul **"+ Add Block"**
3. Se abre un selector visual con todos los bloques disponibles
4. Click en **"Hero Section"**

Aparecerá el formulario del Hero Block:

**Configurar el Hero:**

1. **Estilo de Hero**: Selecciona "Centered" (todo centrado)
2. **Tema de Color**: "Morado (marca)"
3. **Badge Superior**: "BLACK FRIDAY 2025" (texto pequeño arriba)
4. **Título Principal**: "50% de descuento en todos los kits"
5. **Subtítulo**: "Oferta válida solo del 25 al 30 de noviembre"
6. **Texto del Botón**: "Aprovechar oferta"
7. **Enlace del Botón**: `/quiz?promo=bf2025`
8. **Imagen de Fondo**: Click en selector → elegir `/images/hero/black-friday.jpg`

### Paso 5: Agregar Testimonios

1. Scroll abajo del Hero Block
2. Click en **"+ Add Block"**
3. Selecciona **"Testimonials Block"**
4. Configurar:
   - **Estilo**: "Carousel" (carrusel deslizable)
   - **Título**: "Lo que dicen nuestros clientes"
   - **Subtítulo**: "Más de 10,000 personas ya vieron resultados"

5. Click en **"+ Add Video"** para agregar testimonios:

   **Testimonio 1:**
   - Nombre: "Carlos M."
   - Foto: `/images/testimonials/carlos.jpg`
   - Video URL: `https://youtube.com/watch?v=...`
   - Calificación: 5 estrellas
   - Producto: "Kit Choiz Premium"

   Repite para 3-5 testimonios

### Paso 6: Agregar CTA Final

1. Click en **"+ Add Block"**
2. Selecciona **"CTA Block"**
3. Configurar:
   - **Variante**: "Highlight" (con fondo de color)
   - **Título**: "¿Listo para recuperar tu cabello?"
   - **Subtítulo**: "Aprovecha 50% OFF solo este Black Friday"
   - **Texto del Botón**: "Comenzar ahora"
   - **Enlace del Botón**: `/quiz?promo=bf2025`

### Paso 7: Preview (Vista Previa)

1. Click en botón **"Preview"** (arriba a la derecha)
2. Se abre una nueva pestaña con tu landing
3. Revisa que todo se vea bien:
   - Textos sin errores
   - Imágenes cargando correctamente
   - Botones con enlaces correctos
   - Mobile responsive (prueba en celular)

### Paso 8: Publicar

**Si todo está listo:**

1. Vuelve al editor (pestaña anterior)
2. Cambia **"Estado"** de "Borrador" a **"Publicada"**
3. Click en botón verde **"Save"** (arriba a la derecha)

**Si quieres programar la publicación:**

1. Selecciona **"Fecha de Publicación"**
2. Elige fecha y hora (ej: 2025-11-25 00:00)
3. Cambia Estado a "Publicada"
4. Click en "Save"

La página se publicará automáticamente en la fecha elegida.

### Paso 9: Verificar y Compartir

1. Abre nueva pestaña
2. Ve a `https://choiz.mx/black-friday-2025`
3. Verifica que esté en vivo
4. Comparte la URL con tu equipo
5. Comparte en redes sociales

**¡Listo! Creaste tu primera landing page.**

---

## Catálogo de Bloques Disponibles

### 1. Hero Blocks

#### Hero Block (Básico)

**Cuándo usar:** Primera sección de cualquier landing

**Variantes:**
- **Default**: Imagen derecha, texto izquierda (ideal para producto)
- **Centered**: Todo centrado, imagen de fondo (ideal para ofertas)
- **Split**: 50/50 imagen y texto (ideal para explicar servicio)
- **Minimal**: Solo texto, sin imagen (ideal para anuncios simples)

**Campos clave:**
- Badge (texto pequeño superior)
- Título (max 100 caracteres)
- Subtítulo (opcional)
- Lista de beneficios (máx 5)
- Botón CTA
- Imagen de fondo o lateral

**Ejemplo de uso:**
```
Variante: Centered
Badge: "+ 10k personas vieron resultados"
Título: "Recupera tu cabello con ciencia"
Beneficios:
  - Fórmulas científicamente comprobadas
  - 100% en línea y envío gratuito
  - Desde $562/mes
CTA: "Ver si soy apto" → /quiz
```

#### Hero Video Block

**Cuándo usar:** Cuando tienes un video explicativo poderoso

**Variantes:**
- **Fullscreen**: Video ocupa toda la pantalla
- **Background**: Video de fondo con texto encima
- **Inline**: Video al lado del texto

**Ejemplo:**
```
Variante: Background
Video: https://vimeo.com/choiz-intro
Título: "Así funciona Choiz"
CTA: "Comenzar tratamiento"
```

---

### 2. Social Proof Blocks

#### Testimonials Block

**Cuándo usar:** Prueba social, generar confianza

**Variantes:**
- **Grid**: Todos visibles en cuadrícula
- **Carousel**: Deslizable (ideal para muchos testimonios)
- **Masonry**: Estilo Pinterest (testimonios de diferente tamaño)

**Campos clave:**
- Título de la sección
- Lista de testimonios (máx 12):
  - Nombre del cliente
  - Foto
  - Video URL (opcional)
  - Calificación (1-5 estrellas)
  - Quote/testimonio
  - Producto usado

**Tip:** Usa al menos 3 testimonios para credibilidad

#### Reviews Block

**Cuándo usar:** Mostrar calificaciones y reviews detalladas

**Variantes:**
- **Compact**: Solo estrellas y nombres
- **Detailed**: Reviews completas con texto
- **Stats**: Número grande + breakdown de estrellas

**Ejemplo:**
```
Variante: Stats
Rating promedio: 4.8/5
Total reviews: 1,247
Breakdown:
  5 estrellas: 89%
  4 estrellas: 8%
  3 estrellas: 2%
  2 estrellas: 1%
  1 estrella: 0%
```

#### Before/After Block

**Cuándo usar:** Resultados visuales (fotos antes/después)

**Variantes:**
- **Slider**: Deslizable para comparar
- **Side by Side**: Dos fotos lado a lado
- **Grid**: Múltiples casos

**Tip:** Usa fotos reales de clientes, no stock

---

### 3. CTA Blocks

#### CTA Block (Básico)

**Cuándo usar:** Cualquier llamada a la acción

**Variantes:**
- **Default**: Fondo blanco, texto negro
- **Highlight**: Fondo morado/color, destaca mucho
- **Minimal**: Solo texto y botón, sin decoración

**Campos:**
- Título
- Subtítulo
- Botón CTA
- Imagen de fondo (opcional)

**Mejores prácticas:**
- Usa verbos de acción: "Comenzar", "Obtener", "Aprovechar"
- Crea urgencia: "Solo por tiempo limitado"
- Sé específico: "Obtén 50% OFF" mejor que "Ver oferta"

#### CTA Timer Block

**Cuándo usar:** Ofertas con tiempo límite (urgencia)

**Variantes:**
- **Countdown**: Cuenta regresiva grande
- **Urgency**: Texto de urgencia destacado
- **Limited**: "Solo X lugares disponibles"

**Ejemplo:**
```
Countdown hasta: 2025-11-30 23:59
Título: "La oferta termina en..."
CTA: "Aprovechar 50% OFF ahora"
```

---

### 4. Product Blocks

#### Products Block

**Cuándo usar:** Mostrar catálogo de productos/kits

**Variantes:**
- **Grid**: Cuadrícula ordenada
- **Carousel**: Deslizable (muchos productos)
- **List**: Lista vertical con más detalles

**Campos por producto:**
- Nombre
- Imagen
- Tags (ej: "Más vendido", "Nuevo")
- Botón "Seleccionar"
- Botón "Ver más"
- Link

**Tip:** Máximo 6 productos para no abrumar

#### Product Comparison Block

**Cuándo usar:** Comparar kits/planes

**Variantes:**
- **Table**: Tabla clásica de comparación
- **Cards**: Tarjetas lado a lado
- **Side by Side**: Solo 2 productos

**Ejemplo:**
```
Kit Básico vs Kit Premium vs Kit Completo
Filas:
  - Precio
  - Minoxidil incluido
  - Finasteride incluido
  - Consultas médicas
  - Envío
```

---

### 5. Content Blocks

#### FAQ Block

**Cuándo usar:** Responder preguntas comunes

**Variantes:**
- **Accordion**: Plegable (recomendado)
- **Grid**: Todas visibles
- **Tabs**: Agrupadas por categoría

**Mejores prácticas:**
- Incluye 5-10 preguntas
- Respuestas cortas (2-3 líneas)
- Usa lenguaje simple
- Categorías: General, Producto, Envío, Pago

**Ejemplo:**
```
Pregunta: "¿Cuánto tiempo toma ver resultados?"
Respuesta: "Los primeros resultados visibles suelen aparecer entre 3-6 meses de uso constante, según estudios clínicos."

Pregunta: "¿Es seguro el minoxidil?"
Respuesta: "Sí, el minoxidil es aprobado por COFEPRIS y FDA. Tiene más de 30 años de uso seguro documentado."
```

#### Steps Block (Cómo Funciona)

**Cuándo usar:** Explicar proceso paso a paso

**Variantes:**
- **Numbered**: Con números grandes
- **Icons**: Con iconos visuales
- **Cards**: Tarjetas elevadas

**Ejemplo:**
```
Paso 1: Responde el quiz
Paso 2: Consulta médica online
Paso 3: Recibe tu kit en casa
Paso 4: Seguimiento mensual
```

---

## Tips de Diseño y Conversión

### Estructura Ideal de Landing Page

```
1. Hero Block (Centered o Default)
   ↓
2. Trust Badges Block (logos de certificaciones)
   ↓
3. Testimonials Block (Carousel)
   ↓
4. Product/Offer Block
   ↓
5. Benefits Block (por qué elegir Choiz)
   ↓
6. FAQ Block (Accordion)
   ↓
7. CTA Block (Highlight) - Llamada final a la acción
```

### Principios de Conversión

1. **Above the fold**: Lo más importante en Hero (sin scroll)
2. **Prueba social temprano**: Testimonios en los primeros 2-3 bloques
3. **CTAs múltiples**: Al menos 3 botones de "Comenzar" en la página
4. **Urgencia**: Usa timers o "Stock limitado" si es cierto
5. **Mobile first**: Siempre revisa en celular antes de publicar

### Copywriting para CTAs

**Malo:**
- "Enviar"
- "Click aquí"
- "Ver más"

**Bueno:**
- "Comenzar mi tratamiento"
- "Obtener 50% de descuento"
- "Ver si soy candidato"
- "Recuperar mi cabello ahora"

### Checklist Antes de Publicar

- [ ] Meta Title tiene menos de 60 caracteres
- [ ] Meta Description tiene menos de 160 caracteres
- [ ] Todas las imágenes cargan correctamente
- [ ] Todos los enlaces apuntan a páginas correctas
- [ ] No hay errores de ortografía
- [ ] CTAs tienen copy persuasivo
- [ ] Probado en mobile (celular)
- [ ] Probado en desktop
- [ ] OG Image configurada (para redes sociales)
- [ ] Al menos 1 bloque de prueba social (testimonios/reviews)

---

## Casos de Uso Comunes

### Caso 1: Landing de Oferta (Black Friday)

**Objetivo:** Maximizar conversiones con descuento temporal

**Estructura:**
```
1. Hero Block (Centered)
   - Badge: "BLACK FRIDAY 2025"
   - Título: "50% de descuento en todos los kits"
   - CTA: "Aprovechar oferta"

2. CTA Timer Block
   - Countdown hasta fin de oferta
   - Crea urgencia

3. Products Block (Grid)
   - Muestra los 3 kits con precio tachado y nuevo precio

4. Testimonials Block (Carousel)
   - 5-6 testimonios de clientes felices

5. FAQ Block (Accordion)
   - "¿La oferta aplica para suscripciones?"
   - "¿Cuándo expira el descuento?"

6. CTA Block (Highlight)
   - Llamada final a la acción
```

**Tiempo estimado:** 10 minutos

### Caso 2: Landing de Facebook Ads (Tráfico Frío)

**Objetivo:** Educar y generar confianza antes de vender

**Estructura:**
```
1. Hero Block (Default)
   - Título: "¿Estás perdiendo cabello? No estás solo"
   - Beneficios: estadísticas y solución
   - CTA suave: "Conocer mi solución"

2. Stats Block
   - "70% de hombres experimentan pérdida de cabello"
   - Números de impacto

3. Video Block
   - Video explicativo de 2 min sobre ciencia

4. Testimonials Block (Grid)
   - Before/after de clientes

5. Steps Block (Numbered)
   - Cómo funciona el proceso

6. FAQ Block
   - Responde objeciones comunes

7. CTA Block (Minimal)
   - CTA suave: "Hacer quiz gratuito"
```

**Tiempo estimado:** 12 minutos

### Caso 3: Landing de Producto Específico

**Objetivo:** Vender un kit específico

**Estructura:**
```
1. Hero Block (Split)
   - Imagen del producto a la derecha
   - Beneficios del kit
   - Precio y CTA

2. Product Ingredients Block
   - Ingredientes activos (Minoxidil, Finasteride, etc.)

3. Before/After Block (Slider)
   - Resultados visuales

4. Reviews Block (Detailed)
   - Reviews específicas de este producto

5. Product Comparison Block
   - Este kit vs competencia

6. CTA Block
   - "Comenzar con Kit Premium"
```

**Tiempo estimado:** 15 minutos

---

## Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Ctrl/Cmd + S` | Guardar cambios |
| `Ctrl/Cmd + P` | Abrir preview |
| `Ctrl/Cmd + Z` | Deshacer |
| `Ctrl/Cmd + Shift + Z` | Rehacer |
| `Esc` | Cerrar modal/selector |

---

## Troubleshooting

### Problema: "No puedo ver la página publicada"

**Solución:**
1. Verifica que Estado esté en "Publicada" (no "Borrador")
2. Espera 2-3 minutos después de guardar (tiempo de deploy)
3. Refresca la página con `Ctrl+F5` (fuerza recarga)
4. Revisa que la URL sea correcta

### Problema: "La imagen no carga"

**Solución:**
1. Verifica que la ruta comience con `/` (ej: `/images/hero.jpg`)
2. Verifica que el archivo exista en la carpeta `public/images/`
3. Pide a desarrollo que suba la imagen si no existe
4. Formatos soportados: JPG, PNG, WebP, SVG

### Problema: "El bloque se ve mal en mobile"

**Solución:**
1. Los bloques son responsive por defecto
2. Evita textos muy largos en títulos
3. Usa imágenes con aspect ratio correcto
4. Si persiste, reporta a desarrollo

### Problema: "No aparece en Google"

**Solución:**
1. Google toma días/semanas en indexar
2. Verifica que "Ocultar de buscadores (noindex)" esté DESACTIVADO
3. Comparte la URL en redes sociales para acelerar
4. Pide a desarrollo que envíe sitemap a Google

---

## Recursos Adicionales

### Imágenes Disponibles

Todas las imágenes están en `public/images/`:

```
/images/
├── hero/              # Imágenes para Hero Blocks
├── products/          # Imágenes de productos
├── testimonials/      # Fotos de clientes
├── icons/             # Iconos SVG
├── og/                # Imágenes para redes sociales
└── bg/                # Fondos y texturas
```

**Pregunta a desarrollo** si necesitas nuevas imágenes.

### Videos de Tutorial

1. **"Crear tu primera landing (10 min)"**
   → Link: (próximamente)

2. **"Guía completa de bloques disponibles"**
   → Link: (próximamente)

3. **"Tips de SEO para landings"**
   → Link: (próximamente)

### Ayuda y Soporte

- **Documentación técnica**: `/docs/reference/PAGE_BUILDER_ARCHITECTURE.md`
- **Slack**: #marketing-web
- **Email**: dev@choiz.mx

---

## Changelog

### 2025-12-09
- Versión inicial de la guía
- 24 bloques documentados
- 3 casos de uso incluidos

---

**Próxima actualización:** Cuando se agreguen nuevos bloques
**Mantenedor:** Equipo de Producto
