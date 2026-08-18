---
title: "Cómo usar el estándar"
description: "Cómo referenciar requisitos, la postura de OWASP sobre certificaciones y los métodos de prueba del ASVS."
---

Tener una lista de requisitos es fácil; usarla bien es otra cosa. Esta página explica las reglas de uso del ASVS: **cómo referenciar los requisitos**, **qué significa "certificación"** y **qué métodos de prueba se aceptan**.

## Cómo hacer referencia a los requisitos

Cada requisito tiene un identificador con el formato `<capítulo>.<sección>.<requisito>`, por ejemplo `1.11.3`:

- `<capítulo>` — el capítulo de origen. Los requisitos `1.#.#` son del capítulo de Arquitectura.
- `<sección>` — la sección dentro del capítulo. Los requisitos `1.11.#` están en "Arquitectura de la Lógica de Negocio".
- `<requisito>` — el requisito específico, ej. `1.11.3`.

**Regla importante:** los identificadores pueden cambiar entre versiones del estándar, así que siempre que cites un requisito usa el formato con versión:

> `v4.0.3-1.11.3`

Esto significa: requisito 3 de la sección 11 (Arquitectura de la Lógica de Negocio) del capítulo 1 (Arquitectura), de la versión 4.0.3. Sin el prefijo `v`, se asume que haces referencia a la **versión más reciente**, lo que es problemático porque el estándar evoluciona.

> **Analogía:** es como citar un artículo de una revista: no basta el título,
> necesitas la edición y la página. `v4.0.3-1.11.3` es la "página exacta".

## Evaluación y certificación

**La postura de OWASP es clara: no certifica a nadie.**

- OWASP, como organización **neutral y sin fines de lucro**, actualmente **no certifica** proveedores, verificadores ni software.
- Cualquier afirmación de "certificación ASVS", marca de confianza o sello oficial **no está examinada ni avalada** por OWASP — desconfía de quien la use.
- Las organizaciones sí pueden **ofrecer servicios de garantía** usando el ASVS como método, siempre que **no afirmen** tener certificación oficial de OWASP.

**Orientación para organizaciones certificadoras** (si vas a hacer una verificación seria):

1. El ASVS se usa como **verificación de libro abierto**: acceso a arquitectos, desarrolladores, documentación, código y cuentas de prueba (especialmente en L2/L3).
2. El informe debe incluir: **alcance** de la verificación, **resumen de resultados** (pasados y fallidos) e indicaciones claras de cómo resolver los fallos.
3. Si un requisito **no aplica** (ej. una API sin sesiones en V3), puedes reclamar cumplimiento completo pero debes **justificar la inaplicabilidad** en el informe.
4. Guarda **evidencia** (capturas, guiones de explotación, registros de proxy): no basta "ejecuté una herramienta y reporté errores".

## Métodos de prueba

Las organizaciones son libres de elegir sus métodos, pero deben **indicarlos en el informe**:

| Método | En qué consiste | Ideal para |
|---|---|---|
| Pruebas de penetración | Evaluación dinámica de la app en ejecución | L1, hallazgos funcionales |
| Análisis de código (SAST) | Revisión estática del código fuente | Validación de entrada, criptografía, almacenamiento de credenciales |
| Revisión de arquitectura | Evaluación del diseño de seguridad | Capítulo V1, V6 |
| Pruebas unitarias/de integración | Tests de fuzz y abuso en cada compilación | Autoverificación continua |
| Entrevistas y evidencia | Confirmación con el equipo + capturas | Logging (V7), procesos |

### El rol de las herramientas automatizadas

- **Se recomiendan** para la mayor cobertura posible: la gran mayoría de requisitos L1 se pueden probar automáticamente.
- **No son suficientes**: la mayoría general de los requisitos no es susceptible a pruebas automatizadas.
- Los defectos de **lógica de negocio** y **control de acceso** solo se encuentran con **asistencia humana** (deben convertirse en pruebas unitarias).

### El rol de las pruebas de penetración

- En la v4.0, **L1 es verificable solo con pentest** (sin acceso a código), excepto dos elementos de logging que requieren entrevistas/evidencia.
- Para **L2/L3** se requiere acceso a desarrolladores, documentación, código y una app de prueba con datos no reales: a esto se le llama **"revisión híbrida"** o "pentest híbrido".

## Cómo usar el estándar como plano-guía

La mejor manera: úsalo como **plano-guía para crear una lista de verificación de codificación segura** específica de tu aplicación, plataforma u organización. Adaptarlo a tus casos de uso aumenta el enfoque en lo que más importa para tus proyectos.

## Resumen

> Cita siempre con versión (`v4.0.3-X.Y.Z`), desconfía de "certificaciones
> oficiales" que OWASP no otorga, mezcla métodos (herramientas + manual +
> entrevistas) y guarda evidencia de todo.