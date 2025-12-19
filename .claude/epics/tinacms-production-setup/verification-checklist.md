# Checklist de Verificación - TinaCMS Cloud

**Estado:** 🟢 Activo
**Última actualización:** 2025-12-19T04:23:19Z

---

## Pre-Configuración

### Verificación del Repositorio

- [ ] Repositorio en GitHub está actualizado
- [ ] Branch `main` es el branch de producción
- [ ] `.gitignore` incluye archivos `.env*`
- [ ] No hay archivos `.env.local` en el repositorio

### Verificación del Schema

- [ ] Archivo `tina/config.ts` existe
- [ ] Schema incluye collection "landing"
- [ ] Branch detection configurado correctamente
- [ ] Variables de entorno configuradas en el código
- [ ] Modo local funciona con `TINA_PUBLIC_IS_LOCAL=true`

### Verificación Local

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar modo local
echo 'TINA_PUBLIC_IS_LOCAL=true' > .env.local

# 3. Iniciar servidor
npm run dev

# 4. Abrir admin
open http://localhost:3000/admin
```

- [ ] Servidor de desarrollo inicia sin errores
- [ ] Admin se abre en `/admin`
- [ ] Contenido es visible y editable
- [ ] Los cambios se guardan en `content/landing/home.json`
- [ ] El sitio refleja los cambios inmediatamente

---

## Configuración en Tina.io

### Crear Cuenta

- [ ] Cuenta creada en https://app.tina.io
- [ ] Login funciona correctamente
- [ ] GitHub autorizado para TinaCMS

### Crear Proyecto

- [ ] Proyecto creado en Tina.io
- [ ] Nombre del proyecto: `choiz-website-crm-mx`
- [ ] Repositorio conectado: `javikins-projects/choiz-website-crm-mx`
- [ ] Framework seleccionado: Next.js
- [ ] Branch configurado: `main`
- [ ] GitHub App instalada en el repositorio

### Obtener Credenciales

- [ ] Client ID obtenido (Settings > API Tokens)
- [ ] Client ID copiado correctamente
- [ ] Token obtenido (Read-Only Token)
- [ ] Token copiado de forma segura
- [ ] Credenciales almacenadas de forma segura

#### Formato de Credenciales

**Client ID**:
```
Formato: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Ejemplo: 311aec47-e715-4391-8dc0-60716c09479b
```

**Token**:
```
Formato: Cadena alfanumérica de ~40 caracteres
Ejemplo: 56a20e063f97b220c1b571a4b82e83796c02ed20
```

---

## Configuración en Vercel

### Agregar Variables de Entorno

#### Production Environment

- [ ] Variable `NEXT_PUBLIC_TINA_CLIENT_ID` agregada
  - Tipo: Plaintext
  - Valor: Tu Client ID de Tina.io
  - Scope: Production

- [ ] Variable `TINA_TOKEN` agregada
  - Tipo: Secret
  - Valor: Tu Token de Tina.io
  - Scope: Production

- [ ] Variable `NEXT_PUBLIC_TINA_BRANCH` agregada
  - Tipo: Plaintext
  - Valor: `main`
  - Scope: Production

#### Preview Environment (Opcional)

- [ ] Variable `NEXT_PUBLIC_TINA_CLIENT_ID` agregada
  - Tipo: Plaintext
  - Valor: Tu Client ID de Tina.io
  - Scope: Preview

- [ ] Variable `TINA_TOKEN` agregada
  - Tipo: Secret
  - Valor: Tu Token de Tina.io
  - Scope: Preview

- [ ] Variable `NEXT_PUBLIC_TINA_BRANCH` agregada
  - Tipo: Plaintext
  - Valor: `HEAD`
  - Scope: Preview

### Re-deploy

- [ ] Re-deploy iniciado en Vercel
- [ ] Build completado sin errores
- [ ] Variables de entorno detectadas en el build
- [ ] Admin compilado correctamente (`/admin/index.html`)

#### Verificar en Build Logs

Buscar en los logs:
```
✓ TinaCMS: Client ID found
✓ TinaCMS: Token found
✓ TinaCMS: Branch detected - main
```

---

## Verificación en Producción

### Acceso al Admin

- [ ] URL del admin: `https://tu-dominio.vercel.app/admin`
- [ ] Admin se carga correctamente
- [ ] Interfaz de login visible
- [ ] Botón "Login with GitHub" funciona

### Autenticación

- [ ] Login con GitHub funciona
- [ ] TinaCMS solicita autorización (primera vez)
- [ ] Autorización completada
- [ ] Redirige de vuelta al admin
- [ ] Usuario autenticado correctamente

### Edición de Contenido

- [ ] Contenido actual es visible
- [ ] Navegación entre secciones funciona
- [ ] Campos son editables
- [ ] Validaciones funcionan correctamente
- [ ] Botón "Save" está disponible

### Guardar Cambios

- [ ] Editar un campo simple (ej: texto del Hero)
- [ ] Click en "Save"
- [ ] Mensaje de confirmación aparece
- [ ] No hay errores en la consola

### Verificar Commit en GitHub

- [ ] Ir al repositorio en GitHub
- [ ] Nuevo commit visible en `main`
- [ ] Autor del commit: "TinaCMS" o similar
- [ ] Mensaje del commit describe el cambio
- [ ] Archivo modificado: `content/landing/home.json`
- [ ] Cambios en el JSON son correctos

### Verificar Re-deploy

- [ ] Vercel detectó el nuevo commit
- [ ] Nuevo deployment iniciado automáticamente
- [ ] Build completado exitosamente
- [ ] Deployment promovido a producción

### Verificar Sitio Actualizado

- [ ] Abrir sitio en producción
- [ ] Cambios visibles en el sitio
- [ ] No hay errores en la consola
- [ ] Sitio funciona correctamente

---

## Pruebas Adicionales

### Edición de Diferentes Tipos de Contenido

- [ ] Editar texto simple (string)
- [ ] Editar texto largo (textarea)
- [ ] Editar número
- [ ] Editar lista (array)
- [ ] Agregar item a lista
- [ ] Eliminar item de lista
- [ ] Reordenar items en lista
- [ ] Editar campos anidados (object)
- [ ] Subir imagen (si configurado)

### Validaciones

- [ ] Validación de campos requeridos funciona
- [ ] Validación de longitud máxima funciona
- [ ] Validación de longitud mínima funciona
- [ ] Validación de URLs funciona
- [ ] Mensajes de error son claros

### Bloques Reordenables

- [ ] Secciones pueden ser reordenadas (drag & drop)
- [ ] Orden se guarda correctamente
- [ ] Sitio refleja el nuevo orden

### Diferentes Usuarios

- [ ] Múltiples usuarios pueden acceder al admin
- [ ] Permisos de GitHub App funcionan correctamente
- [ ] No hay conflictos al editar simultáneamente

---

## Solución de Problemas

### Si el Admin no carga

- [ ] Verificar que las variables estén en Vercel
- [ ] Verificar que las variables empiecen con `NEXT_PUBLIC_` (las públicas)
- [ ] Verificar que el build incluyó `/admin/index.html`
- [ ] Re-deploy forzado
- [ ] Limpiar caché del navegador

### Si la autenticación falla

- [ ] Verificar que GitHub App esté instalada
- [ ] Verificar permisos de la GitHub App
- [ ] Regenerar token en Tina.io
- [ ] Actualizar token en Vercel
- [ ] Re-deploy

### Si no se pueden guardar cambios

- [ ] Verificar token en Vercel
- [ ] Verificar permisos de escritura en GitHub
- [ ] Verificar que el branch sea correcto
- [ ] Revisar logs en Tina.io
- [ ] Revisar logs en Vercel

### Si el sitio no se actualiza

- [ ] Verificar que el commit se creó en GitHub
- [ ] Verificar que Vercel detectó el commit
- [ ] Verificar configuración de auto-deploy en Vercel
- [ ] Verificar que el branch sea el correcto
- [ ] Trigger manual deploy en Vercel

---

## Checklist de Seguridad

### Variables de Entorno

- [ ] `.env.local` NO está en Git
- [ ] `.env.example` SÍ está en Git
- [ ] Token es secreto en Vercel (no visible)
- [ ] Client ID es público (visible)

### GitHub App

- [ ] Permisos son mínimos necesarios
- [ ] Solo usuarios autorizados pueden acceder
- [ ] Commits de TinaCMS son identificables

### Acceso al Admin

- [ ] Solo usuarios con acceso al repositorio pueden editar
- [ ] Autenticación con GitHub es obligatoria
- [ ] No hay acceso anónimo al admin

---

## Documentación Final

### Documentos Creados

- [ ] `.env.example` creado y documentado
- [ ] Guía de setup completa (`tinacms-setup-guide.md`)
- [ ] README del epic actualizado
- [ ] Este checklist completado

### Documentación Adicional Recomendada

- [ ] Guía para editores de contenido (no técnicos)
- [ ] Video tutorial de cómo usar el admin
- [ ] Proceso de agregar nuevos usuarios
- [ ] Proceso de emergencia si algo falla

---

## Sign-off

### Desarrollo

- [ ] Configuración completada
- [ ] Pruebas locales pasadas
- [ ] Pruebas en producción pasadas
- [ ] Documentación completa

### QA/Testing

- [ ] Admin funciona correctamente
- [ ] Edición de contenido funciona
- [ ] Commits se crean correctamente
- [ ] Re-deploy automático funciona
- [ ] Sitio se actualiza correctamente

### Product Owner

- [ ] Funcionalidad cumple requisitos
- [ ] Interfaz es intuitiva
- [ ] Proceso es confiable
- [ ] Listo para uso por equipo de contenido

---

**Completado el:** _[Fecha a completar]_
**Por:** _[Nombre]_

---

**Creado:** 2025-12-19T04:23:19Z
**Autor/Mantenedor:** Equipo de Desarrollo Choiz
