---
name: blocks-editor
status: in-progress
created: 2025-12-26T19:38:21Z
updated: 2025-12-26T19:38:21Z
progress: 0%
prd: .claude/prds/blocks-editor.md
---

# Epic: Blocks Editor - Editor Unificado de Bloques

## Overview

Crear ruta `/blocks` que unifique `/block-gallery` y `/block-admin` en un editor de codigo de bloques con:
- Tree view de bloques por categoria
- Preview en vivo con responsive toggles
- Monaco editor para editar TSX, props y preview data
- Guardado directo a archivos del repo

## Tasks

### Task 1: Setup y Layout Base
- Crear ruta `/blocks` con layout de 3 paneles
- Eliminar rutas antiguas (`/block-gallery`, `/block-admin`)
- Setup basico de componentes

### Task 2: Tree View de Bloques
- Listar bloques agrupados por categoria
- Expandir/colapsar categorias
- Seleccionar bloque para cargar en preview/editor
- Busqueda rapida

### Task 3: Preview del Bloque
- Renderizar bloque seleccionado con preview data
- Toggle responsive: Desktop/Tablet/Mobile
- Indicador de estado (guardado/cambios pendientes)

### Task 4: API de Bloques
- GET /api/blocks/[blockId] - Leer codigo fuente
- PUT /api/blocks/[blockId] - Guardar cambios
- Parsear props del componente

### Task 5: Monaco Editor
- Integrar @monaco-editor/react
- Tab TSX con syntax highlighting
- Guardar con Cmd+S
- Hot reload del preview

### Task 6: Tabs Adicionales
- Tab Preview Data (editar JSON)
- Tab Props (visualizar interface)
- Sincronizar cambios entre tabs

## Dependencies

- Monaco Editor: `@monaco-editor/react`
- Bloques existentes: `src/components/sections/*`
- Metadata: `src/lib/block-gallery.ts`
- Preview data: `src/lib/block-preview-data.ts`

## Success Criteria

- [ ] Ruta /blocks funcional
- [ ] 28 bloques visibles en tree
- [ ] Preview renderiza correctamente
- [ ] Editar y guardar codigo funciona
- [ ] Rutas antiguas eliminadas
