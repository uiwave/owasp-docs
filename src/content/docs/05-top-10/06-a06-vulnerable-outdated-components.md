---
title: "A06: Vulnerable and Outdated Components (Componentes Vulnerables y Desactualizados)"
description: "OWASP Top 10 2021 A06: qué es, escenarios de ataque, cómo prevenirlo y su relación con el ASVS."
---

Imagina que construyes tu casa sobre cimientos de otra época y nunca los revisas: las grietas que aparecieron no se reparan, y cualquiera que conozca el informe técnico sabe exactamente dónde entrar. Así son los **componentes vulnerables**: código que no escribiste tú, que no actualizas, y que los atacantes conocen mejor que tú.

> **A06:2021 Vulnerable and Outdated Components** — antes llamado "Using Components with Known Vulnerabilities" (2017). Es una de las **causas más comunes de brechas masivas**: la mayoría de las aplicaciones modernas son 80% código de terceros, y cada dependencia desactualizada es una puerta conocida. **CWE asociada:** CWE-1104.

## ¿En qué consiste?

El riesgo aparece cuando:

- La aplicación usa **componentes con vulnerabilidades conocidas** (librerías, frameworks, plugins) y no se actualiza.
- No se conoce la **versión exacta** de cada componente ni su estado de mantenimiento.
- Faltan **actualizaciones de seguridad** y parches, o el proceso de parcheo tarda meses.
- Se usan **componentes sin soporte** o abandonados (no hay quién corrija sus vulnerabilidades).
- El inventario de componentes (**SBOM**) no existe: no se sabe qué se está ejecutando.

## Escenarios de ataque comunes

1. **Vulnerabilidad conocida y explotable:** la app usa una versión vieja de Log4j: el atacante envía una cadena mágica por un campo de búsqueda y ejecuta código en el servidor.
2. **Librería abandonada:** el framework de autenticación lleva 3 años sin actualizaciones con una CVE crítica pública: cualquier exploit disponible funciona tal cual.
3. **CDN comprometida:** la página carga jQuery desde una CDN que fue comprometida: cada visitante ejecuta el malware del atacante.

## Cómo prevenirlo

- **Inventario completo (SBOM)** de todos los componentes y sus versiones.
- **Comprobador de dependencias en el CI** (npm audit, Dependabot, OWASP Dependency-Check) que bloquea compilaciones con vulnerabilidades conocidas.
- **Actualizar y parchear** de forma regular y priorizada según severidad.
- **Eliminar componentes sin uso** (superficie de ataque menor) y componentes sin soporte.
- **Repositorios predefinidos y confiables** para las dependencias; verificar integridad (SRI) del código externo.
- **Monitorear** avisos de seguridad (CVE) de los componentes en uso.

## Relación con el ASVS

- **V14.2 Dependencias** — la sección dedicada: componentes actualizados, SBOM, repositorios confiables y SRI (`/capitulos/v14-configuracion`).
- **V10 Código Malicioso** — revisión de librerías de terceros y código sin firmar (`/capitulos/v10-codigo-malicioso`).
- **V12.3 Ejecución de archivos** — no incluir funcionalidad de orígenes no confiables (`/capitulos/v12-archivos`).

## Resumen

> A06 es el riesgo de lo que no escribiste: componentes con
> vulnerabilidades conocidas, sin actualizar y sin inventario. Se previene
> con SBOM, comprobadores de dependencias en el CI, parcheo regular y
> eliminación de todo componente sin uso o sin soporte.