---
title: "A07: Identification and Authentication Failures (Fallos de Identificación y Autenticación)"
description: "OWASP Top 10 2021 A07: qué es, escenarios de ataque, cómo prevenirlo y su relación con el ASVS."
---

Imagina una discoteca donde el portero solo mira la entrada sin verificar la foto, y además las entradas se pueden copiar: cualquiera entra como cualquiera. Los **fallos de identificación y autenticación** son eso: la app no verifica bien quién es quién.

> **A07:2021 Identification and Authentication Failures** — antes llamado "Broken Authentication" (2017). Los ataques como el **relleno de credenciales (credential stuffing)** con listas de contraseñas filtradas lo convierten en un riesgo permanente. **CWEs asociadas:** CWE-255, CWE-259, CWE-287, CWE-288, CWE-522 (credenciales expuestas), CWE-620.

## ¿En qué consiste?

La autenticación falla cuando:

- Se permiten **contraseñas débiles, conocidas o por defecto** (admin/admin, 123456).
- **Brute force y credential stuffing** no encuentran defensa: sin límites de intentos, sin bloqueo.
- Las **credenciales se transmiten o almacenan inseguras** (en claro, hashes débiles sin salt).
- La **recuperación de contraseña** es insegura: preguntas adivinables, tokens débiles o predecibles.
- Las **sesiones** no se invalidan correctamente: tokens sin expiración, sin rotación, sesiones compartidas.
- **Falta MFA** (autenticación multifactor) en cuentas y funciones sensibles.

## Escenarios de ataque comunes

1. **Credential stuffing:** el atacante prueba en tu app las contraseñas filtradas de otros sitios: sin límite de intentos, miles de cuentas caen en horas.
2. **Contraseña por defecto:** un dispositivo o panel de administración con `admin/admin` entra directamente.
3. **Token de sesión débil:** la sesión se genera con un número secuencial: el atacante la adivina y toma la sesión de otro usuario.

## Cómo prevenirlo

- **Política de contraseñas** sólida (y comprobación contra listas de contraseñas conocidas).
- **Límite de intentos fallidos** con bloqueo temporal y registro de los intentos.
- **MFA** obligatorio donde importe: paneles de administración, cuentas de alto valor.
- **Almacenar contraseñas con hash fuerte** (Argon2, bcrypt, PBKDF2) con salt e iteraciones.
- **Sesiones seguras:** tokens aleatorios, rotación al autenticar, expiración e invalidación real al cerrar sesión.
- **Recuperación de cuenta segura:** verificación robusta de identidad, tokens de un solo uso.
- **Notificar** cambios de credenciales y factores de autenticación.

## Relación con el ASVS

- **V2 Autenticación** — el capítulo completo: contraseñas, MFA, OTP, recuperación (`/capitulos/v2-autenticacion`).
- **V3 Gestión de Sesiones** — tokens impredecibles, cookies seguras y terminación de sesión (`/capitulos/v3-sesiones`).
- **V4.3 Otras consideraciones** — MFA en interfaces administrativas (`/capitulos/v4-control-acceso`).

## Resumen

> A07 es el riesgo de las puertas mal vigiladas: contraseñas débiles,
> brute force sin freno, sesiones inseguras y recuperación adivinable.
> Se previene con MFA, límites de intentos, hashes fuertes y sesiones
> bien gestionadas.