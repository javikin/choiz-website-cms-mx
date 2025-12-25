---
name: block-gallery
description: Sistema completo de galeria de bloques con gestion, previews, documentacion y editor visual
status: backlog
created: 2025-12-24T18:30:03Z
---

# PRD: Block Gallery - Sistema de Gestion de Bloques

## Executive Summary

Sistema integral para visualizar, gestionar y crear bloques de landing pages. Dirigido a desarrolladores y equipo de marketing, permite explorar bloques existentes con previews en vivo, gestionar metadata (favoritos, deprecados), ver documentacion/codigo fuente, y crear nuevos bloques mediante editor visual. Integrado con TinaCMS para almacenamiento y autenticacion.

## Problem Statement

### Problema Actual
- No hay forma facil de ver todos los bloques disponibles y como se ven
- El equipo de marketing no sabe que bloques existen ni como usarlos
- No hay documentacion centralizada de cada bloque
- Crear nuevos bloques requiere conocimiento tecnico profundo
- No hay tracking de que bloques estan en uso vs obsoletos

### Por que es importante ahora
- El catalogo de bloques crece (28+ actualmente)
- Se necesita colaboracion entre dev y marketing
- Duplicacion de esfuerzos al no saber que ya existe
- Tiempo perdido buscando como usar cada bloque

## User Stories

### Persona 1: Desarrollador
- **Como** desarrollador
- **Quiero** ver todos los bloques con su codigo fuente y props
- **Para** entender como funcionan y poder modificarlos o crear nuevos

### Persona 2: Marketing/Contenido
- **Como** miembro del equipo de marketing
- **Quiero** ver previews de todos los bloques disponibles
- **Para** elegir cuales usar en nuevas landing pages sin depender de desarrollo

### Persona 3: Product Owner
- **Como** product owner
- **Quiero** ver que bloques estan en uso y cuales no
- **Para** decidir que mantener, deprecar o mejorar

## Requirements

### Functional Requirements

#### FR1: Visualizacion de Bloques
- **FR1.1**: Mostrar grid/lista de todos los bloques disponibles
- **FR1.2**: Screenshots estaticos para vista rapida (thumbnails)
- **FR1.3**: Render en vivo completo al hacer click/expandir
- **FR1.4**: Filtrar por categoria, estado (en uso, sin usar, favorito, deprecado)
- **FR1.5**: Busqueda por nombre, descripcion, ID

#### FR2: Informacion de Cada Bloque
- **FR2.1**: Nombre, descripcion, categoria
- **FR2.2**: Tracking de uso (que paginas lo usan) - YA IMPLEMENTADO
- **FR2.3**: Historial de cambios (creado, modificado)
- **FR2.4**: Documentacion/guia de uso con props disponibles
- **FR2.5**: Codigo fuente del componente (viewer)
- **FR2.6**: Variantes disponibles del bloque

#### FR3: Gestion de Bloques
- **FR3.1**: Marcar como favorito
- **FR3.2**: Marcar como deprecado
- **FR3.3**: Editar metadata (nombre, descripcion, categoria)
- **FR3.4**: Almacenamiento en TinaCMS

#### FR4: Acciones Rapidas
- **FR4.1**: Copiar ID/nombre del bloque al clipboard
- **FR4.2**: Link directo a TinaCMS para agregar bloque a pagina
- **FR4.3**: Duplicar bloque (crear copia como base para nuevo)
- **FR4.4**: Exportar configuracion como JSON

#### FR5: Creacion de Bloques (Editor Visual)
- **FR5.1**: Interfaz drag-and-drop para crear estructura del bloque
- **FR5.2**: Definir campos/props del bloque
- **FR5.3**: Preview en tiempo real mientras se edita
- **FR5.4**: Generar codigo del componente automaticamente
- **FR5.5**: Generar schema de TinaCMS automaticamente

#### FR6: Autenticacion y Permisos
- **FR6.1**: Requiere login para acceder a cualquier funcion
- **FR6.2**: Integracion con TinaCMS auth
- **FR6.3**: Proteccion de rutas y API endpoints

### Non-Functional Requirements

#### NFR1: Performance
- Carga inicial < 2 segundos
- Screenshots pre-generados para evitar render lento
- Lazy loading de previews en vivo

#### NFR2: Usabilidad
- Interfaz intuitiva para usuarios no tecnicos
- Mobile-friendly para consulta rapida
- Acciones en maximo 2 clicks

#### NFR3: Mantenibilidad
- Metadata de bloques versionada en TinaCMS
- Screenshots auto-generados en build
- Documentacion auto-generada desde codigo

## Success Criteria

### Metricas Cuantitativas
- 100% de bloques documentados en la galeria
- Tiempo para encontrar un bloque < 10 segundos
- Tiempo para crear un nuevo bloque basico < 5 minutos

### Metricas Cualitativas
- Marketing puede crear landing pages sin ayuda de desarrollo
- Reduccion de bloques duplicados
- Mejor comunicacion entre equipos sobre que bloques usar

## Constraints & Assumptions

### Constraints
- Debe integrarse con TinaCMS existente
- No puede romper el flujo actual de edicion de paginas
- Debe funcionar con el sistema de bloques actual (27+ bloques)

### Assumptions
- TinaCMS puede almacenar metadata adicional de bloques
- El equipo de marketing tiene acceso a TinaCMS
- Los bloques actuales seguiran la misma estructura

## Out of Scope

- Versionado de bloques (rollback a versiones anteriores)
- Marketplace de bloques externos
- Colaboracion en tiempo real entre usuarios
- Integracion con Figma u otras herramientas de diseno
- A/B testing de bloques

## Dependencies

### Externas
- TinaCMS para autenticacion y almacenamiento
- Next.js App Router para routing protegido

### Internas
- Sistema de bloques existente (src/components/sections/)
- API de uso de bloques (/api/blocks/usage) - YA IMPLEMENTADO
- Datos de preview (src/lib/block-preview-data.ts) - YA IMPLEMENTADO

## Technical Considerations

### Arquitectura Propuesta

```
src/app/block-gallery/
├── page.tsx                    # Pagina principal (protegida)
├── BlockGalleryClient.tsx      # Componente cliente principal
├── components/
│   ├── BlockCard.tsx           # Card de bloque en grid
│   ├── BlockDetail.tsx         # Vista detallada de bloque
│   ├── BlockEditor.tsx         # Editor visual de bloques
│   ├── CodeViewer.tsx          # Visor de codigo fuente
│   └── ScreenshotGenerator.tsx # Generador de screenshots
├── hooks/
│   ├── useBlockMetadata.ts     # CRUD de metadata via TinaCMS
│   └── useBlockAuth.ts         # Autenticacion
└── lib/
    ├── block-registry.ts       # Registro central de bloques
    └── screenshot-service.ts   # Servicio de screenshots

src/lib/
├── block-gallery.ts            # YA EXISTE - definiciones
├── block-preview-data.ts       # YA EXISTE - datos preview

content/blocks/                 # TinaCMS content
├── hero.json                   # Metadata de cada bloque
├── testimonials.json
└── ...

tina/
├── collections/
│   └── blocks.ts               # NUEVO - collection de metadata
```

### Stack Tecnologico
- Next.js 16 App Router
- TinaCMS para CMS y auth
- React Server Components donde sea posible
- CSS Modules (consistente con proyecto)
- Puppeteer/Playwright para screenshots (build time)

## Phases

### Phase 1: Foundation (MVP)
- Autenticacion con TinaCMS
- Vista de galeria mejorada con screenshots
- Metadata basica (favoritos, deprecados) en TinaCMS
- Acciones rapidas (copiar ID, ir a TinaCMS)

### Phase 2: Documentation
- Visor de codigo fuente
- Documentacion auto-generada de props
- Historial de cambios

### Phase 3: Editor Visual
- Interfaz drag-and-drop
- Generacion de codigo
- Preview en tiempo real

## Estimated Effort

### Phase 1: ~3-4 dias desarrollo
- Auth integration: 1 dia
- TinaCMS blocks collection: 1 dia
- UI improvements + screenshots: 1-2 dias

### Phase 2: ~2-3 dias desarrollo
- Code viewer: 0.5 dias
- Props documentation: 1 dia
- Change history: 0.5-1 dia

### Phase 3: ~5-7 dias desarrollo
- Editor visual base: 3-4 dias
- Code generation: 1-2 dias
- Testing y polish: 1 dia

**Total estimado: 10-14 dias de desarrollo**
