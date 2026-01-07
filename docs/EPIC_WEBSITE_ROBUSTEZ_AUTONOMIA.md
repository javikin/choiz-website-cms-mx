# Website Robusto y Autónomo

**Estado:** 🟡 Arrancando Fase 1

---

## TL;DR

| Fase | El goal | Tiempo |
|------|---------|--------|
| **1. Que sea rápida** | Página rápida + analytics jalando | 3-5 días |
| **2. Piezas lego** | Componentes listos para armar páginas nuevas | 2-3 días |
| **3. Sin depender de Tech** | Marketing edita sin ayuda de Tech | 2-3 días |

---

## Fase 1: Que la página sea rápida

Ahorita las imágenes pesan, los scripts bloquean, y no tenemos idea de qué hace la gente en el sitio.

**Lo que vamos a hacer:**

- **Imágenes** → Comprimirlas, lazy load, formatos modernos (WebP)
- **Scripts pesados** → Moverlos para que no bloqueen la carga inicial
- **Analytics** → Meter las herramientas para ver qué onda con los usuarios
- **Cross-browser** → Probar que jale en Chrome, Safari, Firefox, móvil, etc.

**Herramientas que metemos:**
- Google Analytics → visitas, de dónde vienen
- Crazy Egg / Hotjar → mapas de calor, dónde le pican
- Sentry → cachar errores antes que los usuarios
- GrowthBook → tests A/B

**¿Cómo sabemos que está listo?**
- Lighthouse > 90
- Analytics reportando datos
- Funciona en todos los navegadores y dispositivos

---

## Fase 2: Armar piezas reutilizables

Cada vez que hacemos una página nueva, reinventamos la rueda. La idea es tener componentes listos que solo armamos.

**Lo que creamos:**
- Botones, cards, badges → mismos estilos en todo el sitio
- Modales → para confirmaciones, formularios
- Carruseles → para productos, testimonios
- Storybook → catálogo visual donde ves todos los componentes

**¿Cómo sabemos que está listo?**
- Armar una página nueva en horas, no días

---

## Fase 3: Marketing edita sin depender de Tech

Hoy marketing depende de tech para cambiar un texto o una imagen. La idea es que puedan hacerlo solos.

**Lo que mejoramos:**
- Editor más intuitivo
- Preview responsive → ver cómo queda en cel antes de publicar
- Guía paso a paso
- Ambiente de pruebas → experimentar sin romper producción

**¿Cómo sabemos que está listo?**
- Marketing edita sin pedir ayuda
- Menos tickets de "cámbienme este texto"

---

## Dónde estamos

- [x] 10 bloques funcionando
- [x] Editor visual operativo
- [x] Código limpio
- [ ] Performance optimizado
- [ ] Analytics integrados
- [ ] Componentes documentados
