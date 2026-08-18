---
title: "A09: Security Logging and Monitoring Failures (Fallos de Registro y Monitoreo)"
description: "OWASP Top 10 2021 A09: qué es, escenarios de ataque, cómo prevenirlo y su relación con el ASVS."
---

Imagina una tienda sin cámaras ni registro de ventas: un ladrón entra, se lleva todo y nadie puede demostrar qué pasó, cuándo ni quién. Los **fallos de registro y monitoreo** son eso: el ataque ocurre y **nadie se entera**.

> **A09:2021 Security Logging and Monitoring Failures** — antes "Insufficient Logging & Monitoring" (2017). OWASP lo subió de puesto porque la comunidad lo votó como un riesgo crítico: **sin registros, los ataques pasan desapercibidos durante meses** (el tiempo medio de detección de una brecha sigue siendo demasiado largo). **CWEs asociadas:** CWE-117 (inyección de logs), CWE-223, CWE-532 (información sensible en logs), CWE-778 (logging insuficiente).

## ¿En qué consiste?

El riesgo aparece cuando:

- **No se registran** los eventos de seguridad: logins fallidos, accesos denegados, errores de validación, cambios de permisos.
- Los registros son **ilegibles, incompletos o sin contexto** (sin IP, sin usuario, sin timestamp confiable).
- Los logs se pueden **borrar o modificar** trivialmente, o se almacenan en el mismo servidor comprometido.
- No hay **alertas ni monitoreo**: el equipo se entera de la brecha meses después, si se entera.
- Los logs se **rellenan con datos sensibles** (contraseñas, tokens) — o son presa de la **inyección de logs** (un atacante falsifica entradas).

## Escenarios de ataque comunes

1. **Ataque silencioso:** un atacante prueba miles de contraseñas durante semanas. Sin registros de autenticación ni alertas, nadie lo nota hasta que es tarde.
2. **Huellas borradas:** el atacante entra, borra los logs y la investigación no encuentra nada: no hay forma de saber qué datos se robaron.
3. **Logs envenenados:** el atacante envía `usuario\n2026-01-01 Login correcto` en un campo: la entrada falsa confunde a los analistas y hace inútil la evidencia.

## Cómo prevenirlo

- **Registrar los eventos relevantes** para la seguridad con contexto (timestamp, IP, usuario, acción) y en **UTC**.
- **Proteger los logs** contra modificación y eliminación: permisos estrictos, servidores de logs centralizados, inmutabilidad.
- **Codificar los datos** que entran a los logs para evitar inyección de registros.
- **Nunca registrar** credenciales, tokens ni datos de pago (y hashear tokens si deben aparecer).
- **Alertas configurables** y monitoreo activo (SIEM): que la detección sea minutos, no meses.
- **Probar el plan de respuesta** a incidentes con los registros como evidencia.

## Relación con el ASVS

- **V7 Manejo y Registro de Errores** — el capítulo completo: contenido de logs, procesamiento, protección y control de errores (`/capitulos/v7-errores`).
- **V8.3 Datos privados** — auditoría de acceso sin registrar los datos (`/capitulos/v8-proteccion-datos`).
- **V11.1 Lógica de negocio** — monitoreo de actividades inusuales (`/capitulos/v11-logica-negocio`).

## Resumen

> A09 es el riesgo de la invisibilidad: ataques que nadie registra,
> alertas que no existen y logs que se pueden borrar. Se previene con
> logs protegidos y con contexto, monitoreo activo con alertas y
> respuesta a incidentes probada.