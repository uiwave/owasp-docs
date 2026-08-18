---
title: "Niveles de verificación: L1, L2 y L3"
description: "Los tres niveles del ASVS 4.0.3, cuándo usar cada uno y qué significan en la práctica."
---

No todas las aplicaciones necesitan la misma seguridad: no es lo mismo una app para compartir memes que un portal bancario. Por eso el ASVS define **tres niveles de verificación** — piensa en ellos como las "categorías" de un restaurante: **básico, estándar y premium**.

## Nivel 1 (L1) — Primeros pasos, mínimo obligatorio

> *"Una aplicación alcanza ASVS Nivel 1 si logra defenderse contra vulnerabilidades fáciles de descubrir, incluido el Top 10 de OWASP y otras listas de verificación similares."*

- **Es el mínimo que todas las aplicaciones deben esforzarse por cumplir.**
- Cubre vulnerabilidades que los atacantes encuentran con **técnicas simples y de bajo esfuerzo** (herramientas automáticas, exploits conocidos).
- Se puede verificar **sin acceso al código fuente**: solo con pruebas de penetración y herramientas.
- Ideal como primer paso o para aplicaciones que **no manejan datos confidenciales**.
- Se puede comprobar casi por completo con herramientas automatizadas.

**Conclusión:** si tu app está en producción, L1 no es opcional.

## Nivel 2 (L2) — Para la mayoría de las aplicaciones

> *"Una aplicación alcanza ASVS Nivel 2 (o Estándar) si se defiende adecuadamente contra la mayoría de los riesgos asociados con el software hoy en día."*

- Nivel adecuado para aplicaciones que manejan **transacciones B2B importantes**, **información de salud**, **funciones críticas de negocio** u **otros activos sensibles**.
- Asegura que los controles de seguridad **existan, sean eficaces y se usen dentro de la aplicación**.
- Las amenazas aquí son **atacantes calificados y motivados**, que usan herramientas y técnicas practicadas para explotar debilidades específicas.
- Requiere más que pentest: normalmente acceso a **desarrolladores, documentación y código** (revisiones "híbridas").

**Conclusión:** es el nivel predeterminado recomendado para casi todo software que maneja datos de usuarios reales.

## Nivel 3 (L3) — Alto valor, alta garantía

> *"ASVS Nivel 3 es el nivel más alto de verificación... reservado normalmente para aplicaciones que requieren niveles significativos de verificación de seguridad, como las que se encuentran en áreas militares, de salud y seguridad, infraestructura crítica, etc."*

- Para aplicaciones donde **un error podría afectar significativamente las operaciones de la organización, e incluso su supervivencia**.
- Se exige un análisis **más detallado de arquitectura, codificación y pruebas**.
- Demuestra **principios de buen diseño de seguridad**: modularización, capas de defensa (defensa en profundidad), y responsabilidades de seguridad documentadas (confidencialidad, integridad, disponibilidad, autenticación, autorización y auditoría).
- La verificación es de **libro abierto**: acceso a arquitectos, desarrolladores, código, sistemas de prueba y cuentas en cada rol.

**Conclusión:** solo para sistemas de altísimo valor (militar, salud crítica, infraestructura, finanzas centrales).

## Tabla comparativa

| Criterio | L1 | L2 | L3 |
|---|---|---|---|
| Público | Toda aplicación | La mayoría de aplicaciones | Críticas / alto valor |
| Amenaza | Atacantes ocasionales | Atacantes motivados | Atacantes avanzados |
| Acceso al código | No requerido | Requerido | Requerido (libro abierto) |
| Herramientas | Automatizadas | Híbridas | Revisión profunda |
| Alineación NIST | AAL1 | AAL2 | AAL3 |

## Cómo elegir el nivel

El estándar recomienda: **examina los riesgos únicos de tu negocio** (naturaleza, datos que maneja, regulaciones aplicables) y deja que **el riesgo determine el nivel**, no al revés. Las organizaciones pueden:

- Fijar L1 como mínimo en todo.
- Exigir L2 para apps con datos sensibles.
- Reservar L3 para infraestructura crítica.
- **Bifurcar** (adaptar) el ASVS a sus necesidades, manteniendo la trazabilidad de los requisitos.

## Resumen

> L1 = mínimo obligatorio (verificable solo con pentest). L2 = estándar para
> la mayoría (requiere acceso al código). L3 = máximo, para sistemas
> críticos (revisión de arquitectura y libro abierto). El riesgo del negocio
> decide el nivel.