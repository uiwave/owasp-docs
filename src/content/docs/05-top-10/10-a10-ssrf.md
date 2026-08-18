---
title: "A10: Server-Side Request Forgery (SSRF - Falsificación de Solicitudes del Lado del Servidor)"
description: "OWASP Top 10 2021 A10: qué es, escenarios de ataque, cómo prevenirlo y su relación con el ASVS."
---

Imagina que le das a un empleado la llave del correo interno y le dices "envía este paquete a donde te indique la dirección que te escribe un desconocido". El **SSRF** es eso: tu servidor, que sí puede entrar a la red interna, hace solicitudes a direcciones que el **atacante elige**.

> **A10:2021 Server-Side Request Forgery** — categoría nueva en 2021, añadida por votación de la comunidad. El atacante abusa de una función del servidor (descargar una URL, importar una imagen, verificar un enlace) para que el servidor consulte **recursos internos** o la nube. **CWE asociada:** CWE-918.

## ¿En qué consiste?

El SSRF ocurre cuando la aplicación **toma una URL del usuario y la solicita desde el servidor** sin controlar el destino:

- `importar imagen desde: [URL]`, `verificar enlace: [URL]`, webhooks, parsers de documentos con URLs embebidas.
- El atacante apunta a **localidades internas**: `http://localhost`, `http://169.254.169.254` (metadatos de la nube), IPs de la red interna, `file://`, `gopher://`.
- Según la respuesta (o el error), el atacante **lee datos internos**: credenciales de la nube, archivos del servidor, información de servicios internos.

## Escenarios de ataque comunes

1. **Metadatos de la nube:** `http://169.254.169.254/latest/meta-data/` devuelve las credenciales temporales de AWS de la instancia: el atacante toma la identidad del servidor.
2. **Servicios internos:** `http://localhost:6379` (Redis) o `http://db-interna:3306`: el servidor se convierte en puente para atacar la red interna.
3. **Lectura de archivos:** `file:///etc/passwd` o `file:///proc/self/environ`: el servidor lee y devuelve archivos locales.

## Cómo prevenirlo

- **Validar la URL** contra listas de permitidos: protocolos (`https`), dominios y puertos aprobados.
- **Bloquear resoluciones internas**: prohibir IPs privadas, `localhost`, rangos de metadatos de nube (169.254.0.0/16), y resolver el DNS para verificar la IP final (evitando DNS rebinding).
- **Autenticar y autorizar** las funciones que hacen solicitudes a otros sistemas.
- **Deshabilitar protocolos** no necesarios (`file://`, `gopher://`, etc.).
- **Aislar la red** del servidor: egress filtering para que el servidor solo hable con lo que debe.
- **No reflejar respuestas** de destinos no confiables al usuario.

## Relación con el ASVS

- **V12.6 Protección SSRF** — lista de permisos de recursos del servidor (`/capitulos/v12-archivos`).
- **V5.2.6 Protección contra SSRF** — validación de URLs y listas de protocolos/dominios/puertos (`/capitulos/v5-validacion`).
- **V13.1.1 Parsing coherente** — evitar confusión de analizadores de URL (`/capitulos/v13-api`).

## Resumen

> A10 es el riesgo del servidor convertido en puente: el atacante elige a
> quién llama el servidor (metadatos de la nube, red interna, archivos
> locales) usando funciones legítimas. Se previene con listas de
> permitidos estrictas, bloqueo de destinos internos y aislamiento de
> red.