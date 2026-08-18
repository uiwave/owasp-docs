---
title: "A05: Security Misconfiguration (Configuración de Seguridad Incorrecta)"
description: "OWASP Top 10 2021 A05: qué es, escenarios de ataque, cómo prevenirlo y su relación con el ASVS."
---

Imagina que compras un auto blindado... y lo dejas con las puertas abiertas y las llaves en el contacto. Así es la **mala configuración**: compraste (o construiste) algo seguro, pero lo dejaste en su configuración "de fábrica", que casi siempre es insegura.

> **A05:2021 Security Misconfiguration** — la configuración de seguridad incorrecta es tan común que OWASP la considera una de las más fáciles de explotar y de prevenir. **CWEs asociadas:** CWE-16 (configuration), CWE-611, CWE-1004 (HttpOnly), CWE-1005, CWE-1007, CWE-1009, CWE-1026. En 2017 incluía también la categoría XXE, ahora absorbida en A05.

## ¿En qué consiste?

La mala configuración aparece cuando:

- Faltan **hardenización del servidor** (parches, permisos, servicios mínimos, cuentas por defecto eliminadas).
- **Errores detallados** o stack traces se muestran al usuario, revelando rutas y versiones.
- El **listado de directorios** está habilitado o archivos de configuración/código fuente son accesibles (`.git`, `.env`, backups `.bak`).
- **Cabeceras de seguridad** ausentes: CSP, HSTS, X-Frame-Options, nosniff.
- **Modo debug/desarrollo** activo en producción, o versiones de componentes expuestas en las respuestas.
- **Permisos excesivos** en almacenamiento en la nube (buckets públicos), CORS abierto (`*`), métodos HTTP innecesarios habilitados.

## Escenarios de ataque comunes

1. **Bucket público:** un bucket S3 mal configurado expone todos los archivos de clientes: el atacante solo necesita la URL.
2. **Stack trace en producción:** un error revela rutas internas y la versión exacta del framework: el atacante busca exploits para esa versión concreta.
3. **Directorio abierto:** `https://app.com/backups/` lista archivos: el atacante descarga el backup de la base de datos.

## Cómo prevenirlo

- **Hardenizar** servidores y frameworks según las guías del fabricante (CIS benchmarks, etc.).
- **Plantillas de despliegue seguras y repetibles** (CI/CD, infraestructura como código) que no dependan de pasos manuales.
- **Deshabilitar** el listado de directorios, el modo debug y la información de versión.
- **Configurar todos los encabezados de seguridad** (CSP, HSTS, nosniff, anti-frame) y revisarlos con herramientas (Security Headers).
- **Repetir y automatizar** el proceso de configuración: la configuración segura debe ser la "configuración por defecto".
- **Escanear y auditar** la configuración periódicamente.

## Relación con el ASVS

- **V14 Configuración** — el capítulo completo: compilación, dependencias, encabezados de seguridad y validación de solicitudes (`/capitulos/v14-configuracion`).
- **V12.5 Descarga de archivos** — solo extensiones permitidas servidas (`/capitulos/v12-archivos`).
- **V7.4 Control de errores** — mensajes genéricos sin revelar detalles (`/capitulos/v7-errores`).
- **V1.14 Seguridad operativa** — requisitos de configuración y parcheo (`/capitulos/v1-arquitectura`).

## Resumen

> A05 es el riesgo de la configuración olvidada: servidores sin
> hardenizar, debug activado, errores detallados, directorios abiertos y
> cabeceras faltantes. Se previene con plantillas seguras, automatización
> y revisiones periódicas: la seguridad debe venir "de fábrica".