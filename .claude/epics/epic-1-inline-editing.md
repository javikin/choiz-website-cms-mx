---
name: epic-1-inline-editing
description: Edición visual in-line de bloques directamente en el preview
status: completed
created: 2025-12-26T14:24:49Z
updated: 2025-12-26T20:30:00Z
progress: 100%
---

# Epic 1: Edición Visual In-Line

## Objetivo
Permitir editar textos, imágenes y CTAs directamente en el preview del bloque sin necesidad de formularios separados.

## Issues

### Issue 1: Estructura base del editor visual
- Crear ruta `/block-admin` con layout de editor
- Panel izquierdo: lista de secciones de la página
- Centro: preview editable del bloque seleccionado
- Panel derecho: propiedades del bloque
- Cargar página desde TinaCMS

### Issue 2: Click-to-edit en textos
- Detectar elementos de texto editables en el preview
- Activar modo edición al hacer click
- Guardar con blur o Cmd+S
- Soporte para rich text básico (bold, italic)

### Issue 3: Selector de imágenes in-line
- Click en imagen abre modal de selección
- Integrar con TinaCMS Media Manager
- Permitir upload directo con drag & drop
- Preview de imagen antes de confirmar

### Issue 4: Editor de CTAs/botones
- Detectar botones y links en el bloque
- Editar texto del botón inline
- Panel para cambiar URL destino
- Selector de variante de botón

### Issue 5: Panel de propiedades tipado
- Mostrar todas las props del bloque seleccionado
- Generar formularios según tipo de prop
- Sincronizar cambios con preview en tiempo real
- Validación de campos requeridos

### Issue 6: Persistencia con TinaCMS
- Guardar cambios en el contenido de la página
- Auto-save con debounce
- Indicador de cambios sin guardar
- Publicar cambios a Git

## Dependencias
- Block Gallery v1 ✅
- TinaCMS configurado ✅
- API de bloques ✅

## Definición de Completado
- [x] Usuario puede editar textos haciendo click
- [x] Imágenes se cambian desde selector visual
- [x] CTAs editables (texto + URL)
- [x] Panel muestra props tipadas
- [x] Cambios persisten en TinaCMS (archivos JSON)
