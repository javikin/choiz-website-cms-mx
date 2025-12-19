# Guía de TinaCMS para el Equipo de Marketing

**Estado:** Activo
**Última actualización:** 2025-12-19

---

## Acceso al Panel de Administración

### URL del Admin
```
https://choiz-website-crm-mx.vercel.app/admin
```

### Credenciales
Las credenciales de acceso están gestionadas a través de TinaCloud. Contacta al equipo de desarrollo para obtener acceso.

---

## Secciones Editables de la Landing Page

La landing page está dividida en las siguientes secciones que puedes editar visualmente:

### 1. Hero Section
- **Badge Superior**: Texto destacado (ej: "+20,000 personas ya vieron resultados")
- **Título Principal**: El headline principal de la página
- **Lista de Beneficios**: Puntos clave del producto
- **Botón CTA**: Texto y enlace del botón de acción
- **Texto de Precio**: Información de precios (ej: "Desde $467/mes")

### 2. Certificaciones
- **Título**: Texto descriptivo
- Los logos de COFEPRIS, PROFECO y Distintivo Digital son fijos

### 3. Success Stories (Casos de Éxito)
- **Texto Destacado**: Número de usuarios (ej: "+20,000 personas")
- **Texto Normal**: Complemento del título
- **Testimonios Before/After**:
  - Nombre del cliente
  - Edad
  - Testimonio/Cita
  - Imágenes antes y después
  - Duración del tratamiento

### 4. Fórmulas Personalizadas
- **Título**: Encabezado de la sección
- **Texto Destacado**: Palabra resaltada en morado
- **Lista de Fórmulas**:
  - Nombre de la fórmula
  - Imagen del producto
  - Etiquetas (tipo de producto, beneficios)
  - Botón CTA

### 5. Activos Científicos
- **Título y Texto Destacado**
- **Lista de Activos**:
  - Nombre del activo
  - Descripción científica
  - Imagen

### 6. Video Testimonios
- **Título y Texto Destacado**
- **Videos**:
  - Nombre del usuario
  - Imagen de fondo
  - URL del video (YouTube/Vimeo)

### 7. Cómo Funciona Choiz
- **Título de la sección**
- **Pasos**:
  - Título del paso
  - Descripción
  - Imagen del mockup

### 8. Preguntas Frecuentes (FAQ)
- **Título y Texto Destacado**
- **Lista de Preguntas**:
  - Pregunta
  - Respuesta

### 9. CTA Final
- **Título principal**
- **Texto y enlace del botón**
- **Imagen de fondo**

### 10. Footer
- **Información de contacto**
- **Redes sociales**
- **Enlaces legales**
- **Copyright**

---

## Cómo Editar Contenido

### Paso 1: Acceder al Admin
1. Ve a `/admin` en el navegador
2. Inicia sesión con tus credenciales de TinaCloud

### Paso 2: Navegar a la Sección
1. En el panel izquierdo, selecciona "Landing Page"
2. Haz clic en "home" para editar la página principal

### Paso 3: Editar Campos
1. Navega por las secciones en el panel lateral
2. Haz clic en cualquier campo para editarlo
3. Los cambios se previsualizan en tiempo real

### Paso 4: Guardar Cambios
1. Haz clic en "Save" cuando termines
2. Los cambios se guardan automáticamente en el repositorio

---

## Recomendaciones de Contenido

### Longitudes Máximas
| Campo | Máximo |
|-------|--------|
| Texto de botón (CTA) | 30 caracteres |
| Badge | 50 caracteres |
| Headline | 100 caracteres |
| Beneficio | 80 caracteres |
| Meta Title (SEO) | 60 caracteres |
| Meta Description (SEO) | 160 caracteres |

### Límites de Listas
| Elemento | Máximo |
|----------|--------|
| Beneficios | 5 |
| Badges/Certificaciones | 4 |
| Testimonios | 12 |
| Productos | 6 |
| Ingredientes/Activos | 8 |
| Pasos | 6 |
| Redes sociales | 6 |

### Formatos de Imagen Recomendados
| Ubicación | Tamaño Recomendado |
|-----------|-------------------|
| Hero Desktop | 1440 x 645 px |
| Hero Mobile | 375 x 820 px |
| Productos | 500 x 500 px |
| Testimonios | 363 x 589 px |
| CTA Final | 1024 x 318 px |

---

## Manejo de Imágenes

### Ubicación de Imágenes
Las imágenes deben estar en la carpeta `/public/images/` del repositorio.

### Cómo Agregar Nuevas Imágenes
1. Solicita al equipo de desarrollo que suba la imagen
2. Usa la ruta relativa: `/images/nombre-imagen.jpg`

### Carpetas Organizadas
```
/public/images/
├── activos/          # Imágenes de activos científicos
├── products/         # Productos y fórmulas
├── testimonials/     # Fotos de testimonios
├── how-it-works/     # Mockups de pasos
└── ...
```

---

## Edición Visual en Tiempo Real

TinaCMS permite edición visual en tiempo real:

1. **En desarrollo**: Los cambios se ven inmediatamente
2. **En producción**: Los cambios se publican después de guardar

### Flujo de Trabajo Recomendado
1. Realiza cambios pequeños y guarda frecuentemente
2. Revisa la preview antes de guardar
3. Verifica en móvil y desktop

---

## Soporte

Para problemas técnicos o solicitudes de nuevas funcionalidades:
- Contacta al equipo de desarrollo
- Reporta issues en el repositorio del proyecto

---

**Creado:** 2025-12-19
**Autor/Mantenedor:** Equipo de Desarrollo
