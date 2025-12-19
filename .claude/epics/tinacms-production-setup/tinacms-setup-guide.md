# Guía de Configuración de TinaCMS Cloud

**Estado:** 🟢 Activo
**Última actualización:** 2025-12-19T04:23:19Z

---

## Índice

1. [Resumen](#resumen)
2. [Verificación del Schema](#verificación-del-schema)
3. [Configuración de TinaCMS Cloud](#configuración-de-tinacms-cloud)
4. [Configuración en Vercel](#configuración-en-vercel)
5. [Verificación de Funcionamiento](#verificación-de-funcionamiento)
6. [Solución de Problemas](#solución-de-problemas)
7. [Recursos Adicionales](#recursos-adicionales)

---

## Resumen

Esta guía documenta el proceso de configuración de TinaCMS Cloud para el sitio web de Choiz. TinaCMS Cloud permite editar el contenido del sitio a través de una interfaz visual en producción, sincronizando los cambios directamente con el repositorio de GitHub.

## Verificación del Schema

Antes de conectar a TinaCMS Cloud, verifica que el schema esté correctamente configurado:

### Estado Actual del Schema

El archivo `tina/config.ts` contiene:

- ✅ **Branch detection**: Configurado para usar `VERCEL_GIT_COMMIT_REF` en producción
- ✅ **Client ID**: Configurado con variable de entorno `NEXT_PUBLIC_TINA_CLIENT_ID`
- ✅ **Token**: Configurado con variable de entorno `TINA_TOKEN`
- ✅ **Local development mode**: Soporta modo local con `TINA_PUBLIC_IS_LOCAL`
- ✅ **Content collections**:
  - Landing Page (con bloques reordenables)
  - Bloques reutilizables
- ✅ **Schema completo**: Incluye todas las secciones (Hero, Testimoniales, Productos, etc.)

### Verificación Local

Para verificar que el schema funciona correctamente en modo local:

```bash
# 1. Asegúrate de tener un .env.local con:
TINA_PUBLIC_IS_LOCAL=true

# 2. Inicia el servidor de desarrollo
npm run dev

# 3. Abre el admin en http://localhost:3000/admin
# 4. Verifica que puedas:
#    - Ver el contenido actual
#    - Editar campos
#    - Guardar cambios (se guardan en content/landing/home.json)
```

## Configuración de TinaCMS Cloud

### Paso 1: Crear Cuenta en Tina.io

1. Ve a [https://app.tina.io](https://app.tina.io)
2. Haz clic en "Sign Up" o "Login with GitHub"
3. Autoriza a TinaCMS a acceder a tu cuenta de GitHub
4. Completa el proceso de registro

### Paso 2: Crear Proyecto en TinaCMS

1. En el dashboard de Tina.io, haz clic en "Create Project"
2. Selecciona el repositorio: `javikins-projects/choiz-website-crm-mx`
3. Configura el proyecto:
   - **Project Name**: `choiz-website-crm-mx`
   - **Framework**: Next.js
   - **Branch**: `main` (o la rama que uses para producción)
   - **Build Command**: `npm run build`
   - **Public Directory**: `public`

### Paso 3: Conectar el Repositorio

1. TinaCMS te pedirá permisos para acceder al repositorio
2. Autoriza a TinaCMS para:
   - Leer contenido del repositorio
   - Crear commits
   - Crear pull requests (opcional)
3. TinaCMS instalará automáticamente un GitHub App en el repositorio

### Paso 4: Obtener Credenciales

Una vez creado el proyecto, encontrarás las credenciales en:

**Project Settings > API Tokens**

Deberías ver:

1. **Client ID** (público):
   - Formato: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
   - Este ID identifica tu proyecto
   - Puede ser compartido públicamente
   - Ejemplo actual: `311aec47-e715-4391-8dc0-60716c09479b`

2. **Read-Only Token** (privado):
   - Formato: cadena alfanumérica de ~40 caracteres
   - Este token permite editar contenido
   - **NUNCA** lo compartas públicamente
   - **NUNCA** lo subas a Git
   - Ejemplo actual (privado): almacenado en `.env.local`

### Paso 5: Configurar Variables de Entorno

Copia las credenciales al archivo `.env.local`:

```bash
# TinaCMS Cloud Configuration
NEXT_PUBLIC_TINA_CLIENT_ID=tu_client_id_aqui
TINA_TOKEN=tu_token_aqui

# Branch de Git (opcional)
NEXT_PUBLIC_TINA_BRANCH=main

# Desactiva el modo local
TINA_PUBLIC_IS_LOCAL=false
```

### Paso 6: Probar Localmente con TinaCMS Cloud

```bash
# 1. Asegúrate de tener las credenciales en .env.local
# 2. Inicia el servidor de desarrollo
npm run dev

# 3. Abre http://localhost:3000/admin
# 4. Deberías poder:
#    - Autenticarte con TinaCMS Cloud
#    - Ver el contenido actual
#    - Editar y guardar (se creará un commit en GitHub)
```

## Configuración en Vercel

### Paso 1: Agregar Variables de Entorno en Vercel

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Ve a **Settings > Environment Variables**
3. Agrega las siguientes variables:

#### Para Production

| Variable | Valor | Tipo |
|----------|-------|------|
| `NEXT_PUBLIC_TINA_CLIENT_ID` | Tu Client ID de Tina.io | Plaintext |
| `TINA_TOKEN` | Tu Token de Tina.io | Secret |
| `NEXT_PUBLIC_TINA_BRANCH` | `main` | Plaintext |

#### Para Preview (Opcional)

Si quieres que los deployments de preview también tengan TinaCMS:

| Variable | Valor | Tipo |
|----------|-------|------|
| `NEXT_PUBLIC_TINA_CLIENT_ID` | Tu Client ID de Tina.io | Plaintext |
| `TINA_TOKEN` | Tu Token de Tina.io | Secret |
| `NEXT_PUBLIC_TINA_BRANCH` | `HEAD` (o branch específico) | Plaintext |

#### Para Development (Local)

Las variables de desarrollo se manejan en `.env.local` y **NO** deben subirse a Vercel.

### Paso 2: Re-deploy en Vercel

Después de agregar las variables de entorno:

1. Ve a **Deployments**
2. Haz clic en los tres puntos del último deployment
3. Selecciona "Redeploy"
4. Asegúrate de que esté marcado "Use existing Build Cache"

O simplemente haz un nuevo push a la rama `main`:

```bash
git push origin main
```

### Paso 3: Verificar Variables en el Build

En los logs de Vercel, deberías ver:

```
✓ Compiling /admin/index.html
✓ TinaCMS: Client ID found
✓ TinaCMS: Token found
✓ TinaCMS: Branch detected - main
```

## Verificación de Funcionamiento

### En Producción

1. Ve a tu sitio en producción: `https://tu-dominio.vercel.app/admin`
2. Deberías ver:
   - Login de TinaCMS
   - Opción para autenticarte con GitHub
3. Después de autenticarte:
   - Deberías poder editar el contenido
   - Los cambios se guardan automáticamente en GitHub
   - Vercel detecta los cambios y re-deploya

### Flujo de Edición

```
1. Usuario abre /admin en producción
   ↓
2. Se autentica con TinaCMS Cloud
   ↓
3. Edita contenido en la UI
   ↓
4. Guarda cambios
   ↓
5. TinaCMS crea commit en GitHub
   ↓
6. Vercel detecta el cambio
   ↓
7. Vercel re-deploya automáticamente
   ↓
8. Sitio actualizado con nuevo contenido
```

### Prueba Completa

1. **Abre el admin**:
   ```
   https://tu-dominio.vercel.app/admin
   ```

2. **Autentícate** con GitHub

3. **Edita algo simple**:
   - Abre "Landing Page"
   - Cambia el texto del Hero
   - Haz clic en "Save"

4. **Verifica en GitHub**:
   - Ve a tu repositorio
   - Deberías ver un nuevo commit de "TinaCMS"
   - El commit contiene los cambios en `content/landing/home.json`

5. **Verifica el re-deploy**:
   - Ve a Vercel Dashboard
   - Deberías ver un nuevo deployment en progreso
   - Espera a que complete

6. **Verifica el sitio**:
   - Abre tu sitio en producción
   - Los cambios deberían estar visibles

## Solución de Problemas

### Error: "Client ID not found"

**Causa**: La variable `NEXT_PUBLIC_TINA_CLIENT_ID` no está configurada o no es visible en el cliente.

**Solución**:
1. Verifica que la variable esté en Vercel (Settings > Environment Variables)
2. Asegúrate de que empiece con `NEXT_PUBLIC_` (esto la hace visible en el cliente)
3. Re-deploya para que Next.js la incluya en el build

### Error: "Token not found"

**Causa**: La variable `TINA_TOKEN` no está configurada en el servidor.

**Solución**:
1. Verifica que la variable esté en Vercel
2. Asegúrate de que NO empiece con `NEXT_PUBLIC_` (debe ser secreta)
3. Re-deploya

### Error: "Branch not found"

**Causa**: TinaCMS no puede determinar qué branch usar.

**Solución**:
1. Configura explícitamente `NEXT_PUBLIC_TINA_BRANCH=main` en Vercel
2. O asegúrate de que Vercel esté configurado para deploying desde `main`

### Error: "GitHub App not installed"

**Causa**: La GitHub App de TinaCMS no está instalada en el repositorio.

**Solución**:
1. Ve a Project Settings en Tina.io
2. Ve a la sección "GitHub Integration"
3. Haz clic en "Install GitHub App"
4. Selecciona el repositorio correcto

### Los cambios no se guardan en GitHub

**Causa**: Falta de permisos o token inválido.

**Solución**:
1. Verifica que el token sea correcto en Vercel
2. Revisa los permisos de la GitHub App en GitHub
3. Re-genera el token en Tina.io si es necesario

### El sitio no re-deploya automáticamente

**Causa**: Vercel no está configurado para deploying en cambios.

**Solución**:
1. Ve a Settings > Git en Vercel
2. Asegúrate de que "Auto Deploy" esté habilitado
3. Verifica que la rama configurada sea correcta

## Recursos Adicionales

### Documentación Oficial

- [TinaCMS Documentation](https://tina.io/docs/)
- [TinaCMS Cloud Setup](https://tina.io/docs/tina-cloud/overview/)
- [Next.js Integration](https://tina.io/docs/frameworks/next/)
- [Vercel Deployment](https://vercel.com/docs/environment-variables)

### Links Útiles

- **TinaCMS Dashboard**: https://app.tina.io
- **TinaCMS Community**: https://discord.com/invite/zumN63Ybpf
- **GitHub App Settings**: https://github.com/settings/installations

### Contacto y Soporte

Si necesitas ayuda:

1. **TinaCMS Discord**: Comunidad activa para preguntas
2. **TinaCMS GitHub**: https://github.com/tinacms/tinacms/issues
3. **Documentación**: https://tina.io/docs/

---

## Checklist de Configuración

Usa este checklist para asegurarte de que todo esté configurado correctamente:

- [ ] Cuenta creada en Tina.io
- [ ] Proyecto creado y repositorio conectado
- [ ] Client ID obtenido
- [ ] Token obtenido
- [ ] Variables configuradas en `.env.local` para desarrollo
- [ ] Variables configuradas en Vercel para producción
- [ ] Schema verificado localmente
- [ ] Admin accesible en `/admin` localmente
- [ ] Admin accesible en `/admin` en producción
- [ ] Prueba de edición completada exitosamente
- [ ] Commit creado en GitHub
- [ ] Re-deploy automático funcionando
- [ ] Cambios visibles en producción

---

**Creado:** 2025-12-19T04:23:19Z
**Autor/Mantenedor:** Equipo de Desarrollo Choiz
