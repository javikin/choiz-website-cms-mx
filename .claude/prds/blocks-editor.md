---
name: blocks-editor
description: Editor unificado de bloques con preview en vivo y edicion de codigo
status: draft
created: 2025-12-26T19:36:23Z
updated: 2025-12-26T19:36:23Z
---

# PRD: Blocks Editor - Editor Unificado de Bloques

## Resumen Ejecutivo

Crear una ruta unificada `/blocks` que reemplace `/block-gallery` y `/block-admin`, centralizando la visualizacion y edicion de bloques base. El editor permite modificar el codigo fuente de los componentes (TSX), props por defecto, estilos y datos de preview, guardando directamente en los archivos del repositorio.

**Diferencia clave con TinaCMS:** TinaCMS edita *contenido* de landings (textos, imagenes). Este editor modifica los *componentes base* (codigo, estructura, estilos).

## Problema

Actualmente existen dos rutas separadas:
- `/block-gallery` - Solo visualiza bloques, no permite edicion real
- `/block-admin` - Intento de edicion visual que duplica funcionalidad de TinaCMS

Ninguna permite editar el **codigo fuente** de los bloques, que es lo que realmente necesita el desarrollador para:
- Ajustar estilos base de un componente
- Modificar la estructura del bloque
- Cambiar props por defecto
- Actualizar datos de preview

## Solucion Propuesta

Una unica ruta `/blocks` con layout de 3 paneles:

```
+----------------+------------------------+------------------------+
|   TREE VIEW    |     LIVE PREVIEW       |     CODE EDITOR        |
|                |                        |                        |
| > Hero         |  +------------------+  |  [TSX] [Props] [Data]  |
|   - Video      |  |                  |  |                        |
|   - Image      |  |   Rendered       |  |  export function...    |
| > Social Proof |  |   Component      |  |    return (            |
|   - Testimonials|  |   with Preview   |  |      <section>         |
|   - BeforeAfter|  |   Data           |  |        ...             |
| > Trust        |  |                  |  |      </section>        |
|   - Stats      |  +------------------+  |    )                   |
|   - Guarantee  |                        |  }                     |
| > Products     |  [Responsive Toggle]   |                        |
| > Content      |  [Desktop|Tablet|Mobile]|  [Save] [Reset]       |
| > CTA          |                        |                        |
| > Footer       |                        |                        |
+----------------+------------------------+------------------------+
```

## Funcionalidades Core

### 1. Tree View (Panel Izquierdo)
- Lista todos los 28 bloques agrupados por categoria
- Categorias expandibles/colapsables
- Indicador de bloques en uso (badge con count)
- Busqueda rapida de bloques
- Click para seleccionar y cargar en preview/editor

### 2. Live Preview (Panel Central)
- Renderiza el bloque seleccionado con preview data
- Hot reload al guardar cambios
- Toggle de viewport: Desktop (1280px), Tablet (768px), Mobile (375px)
- Zoom controls para ver el bloque completo
- Indicador de estado: "Guardado", "Cambios sin guardar", "Error"

### 3. Code Editor (Panel Derecho)
Editor con tabs para diferentes aspectos del bloque:

#### Tab: TSX (Codigo del Componente)
- Editor Monaco (como VS Code)
- Syntax highlighting para TypeScript/JSX
- Autocompletado basico
- Muestra: `src/components/sections/{BlockName}.tsx`
- Guardar escribe directamente al archivo

#### Tab: Props
- Visualiza interface de props del componente
- Permite editar valores por defecto
- Genera TypeScript types
- Source: Parseado del archivo TSX

#### Tab: Preview Data
- Editor JSON para datos de preview
- Source: `src/lib/block-preview-data.ts`
- Validacion contra props del componente

#### Tab: Styles (Opcional v2)
- Extrae clases Tailwind usadas
- Permite modificar inline styles
- Vista de tokens de diseno usados

## Arquitectura Tecnica

### Archivos Involucrados

```
src/
├── app/blocks/
│   ├── page.tsx              # Server component principal
│   ├── BlocksEditorClient.tsx # Client component con estado
│   ├── components/
│   │   ├── BlockTree.tsx     # Panel izquierdo
│   │   ├── BlockPreview.tsx  # Panel central
│   │   ├── CodeEditor.tsx    # Panel derecho (Monaco)
│   │   └── EditorTabs.tsx    # Tabs del editor
│   └── layout.tsx            # Layout sin navbar
├── lib/
│   ├── block-gallery.ts      # Metadata de bloques (existente)
│   └── block-preview-data.ts # Datos de preview (existente)
├── components/sections/      # 28 bloques (existente)
│   ├── Hero.tsx
│   ├── HeroVideo.tsx
│   └── ...
└── api/blocks/
    ├── [blockId]/
    │   └── route.ts          # GET/PUT codigo del bloque
    └── preview-data/
        └── route.ts          # GET/PUT preview data
```

### APIs Necesarias

#### GET /api/blocks/[blockId]
Retorna el codigo fuente del bloque:
```json
{
  "id": "heroVideo",
  "name": "Hero con Video",
  "filePath": "src/components/sections/HeroVideo.tsx",
  "source": "export function HeroVideo({ ... }) { ... }",
  "props": {
    "title": { "type": "string", "required": true },
    "videoUrl": { "type": "string", "required": true },
    "variant": { "type": "string", "enum": ["background", "embedded"] }
  }
}
```

#### PUT /api/blocks/[blockId]
Guarda cambios al codigo fuente:
```json
{
  "source": "// nuevo codigo...",
  "previewData": { ... }
}
```
- Escribe a `src/components/sections/{BlockName}.tsx`
- Valida sintaxis antes de guardar
- Retorna error si hay problemas de compilacion

### Dependencias Nuevas

```json
{
  "@monaco-editor/react": "^4.6.0"
}
```

Monaco Editor es la unica dependencia nueva necesaria. Es el mismo editor que usa VS Code.

## Flujo de Usuario

### Caso 1: Desarrollador quiere cambiar estilos de un bloque
1. Abre `/blocks`
2. En tree view, expande "Hero" y selecciona "Hero con Video"
3. Ve el preview del bloque en el centro
4. En el editor, modifica clases de Tailwind en el TSX
5. Click "Save" o Cmd+S
6. Preview se actualiza automaticamente
7. Cambios guardados en `src/components/sections/HeroVideo.tsx`

### Caso 2: Desarrollador quiere ver como se ve un bloque
1. Abre `/blocks`
2. Navega por el tree y selecciona bloques
3. Ve preview en diferentes viewports (desktop/tablet/mobile)
4. No necesita editar nada, solo visualizar

### Caso 3: Actualizar datos de preview
1. Selecciona un bloque
2. Va al tab "Preview Data"
3. Modifica el JSON con nuevos datos de ejemplo
4. Preview se actualiza en tiempo real
5. Guarda cambios a `block-preview-data.ts`

## Migracion

### Eliminar Rutas Antiguas
- Eliminar `/block-gallery` completamente
- Eliminar `/block-admin` completamente
- Redirigir trafico antiguo a `/blocks`

### Conservar
- `src/lib/block-gallery.ts` - Metadata de bloques
- `src/lib/block-preview-data.ts` - Datos de preview
- `src/components/sections/*` - Componentes (no se tocan)

## Criterios de Exito

| Criterio | Metrica |
|----------|---------|
| Carga inicial | < 2s para mostrar tree + primer bloque |
| Guardado | < 1s para escribir archivo y confirmar |
| Preview update | < 500ms despues de guardar |
| Cobertura | 28/28 bloques editables |
| Errores | 0 perdida de datos al guardar |

## Riesgos y Mitigaciones

| Riesgo | Mitigacion |
|--------|------------|
| Guardar codigo con errores | Validar sintaxis con TypeScript antes de escribir |
| Monaco muy pesado | Lazy load del editor, solo cargar cuando se necesite |
| Perder cambios | Auto-save con debounce + indicador visual |
| Conflictos con git | Solo guarda si archivo no ha cambiado desde lectura |

## Fases de Implementacion

### Fase 1: MVP (Core)
- [ ] Layout de 3 paneles
- [ ] Tree view con bloques agrupados
- [ ] Preview basico del bloque seleccionado
- [ ] Editor Monaco con tab TSX
- [ ] API para leer/escribir codigo
- [ ] Guardado a archivos

### Fase 2: Polish
- [ ] Tab de Preview Data
- [ ] Tab de Props (read-only)
- [ ] Responsive preview toggles
- [ ] Busqueda en tree view
- [ ] Indicadores de uso

### Fase 3: Mejoras (Opcional)
- [ ] Tab de Styles
- [ ] Diff view antes de guardar
- [ ] Historial de cambios
- [ ] Undo/redo

## Estimacion de Esfuerzo

| Tarea | Esfuerzo |
|-------|----------|
| Layout 3 paneles | S |
| Tree view | S |
| Preview basico | M |
| Monaco integration | M |
| API read/write | M |
| Tab Preview Data | S |
| Responsive toggles | S |
| Migracion/cleanup | S |

**Total estimado: 2-3 dias de desarrollo**

## Notas Adicionales

- Este editor es para **desarrolladores**, no para marketing
- Marketing usa TinaCMS para editar contenido
- Desarrolladores usan `/blocks` para editar componentes base
- No hay autenticacion especial, es herramienta de desarrollo
