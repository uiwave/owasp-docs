---
title: "¿Qué es el ASVS?"
description: "Prefacio del estándar ASVS 4.0.3: qué es, para qué sirve y qué trae de nuevo la versión 4.0."
---

Antes de declarar que un puente es seguro, contratas a un **inspector** que revisa cada viga con una lista de verificación. El **ASVS** (_Application Security Verification Standard_) es esa lista de verificación, pero para aplicaciones web: un **marco de requisitos y controles de seguridad** creado por la comunidad OWASP para diseñar, desarrollar y probar software de forma segura.

## ¿Qué es el ASVS?

El ASVS es un **estándar impulsado por la comunidad**: no lo escribe una sola empresa, sino expertos de todo el mundo que lo revisan y mejoran. Su propósito:

1. **Definir requisitos** de seguridad funcionales y no funcionales para aplicaciones web y servicios web.
2. **Establecer niveles** de verificación (L1, L2, L3) según el riesgo de cada aplicación.
3. **Servir de base** para auditorías, desarrollo seguro, adquisición de software y formación.

> **Analogía:** si el OWASP Top 10 te dice *qué puede estar mal* (los riesgos),
> el ASVS te dice *qué debes comprobar* (los requisitos) y *cuánto exiges*
> (los niveles).

## ¿Qué hay de nuevo en la versión 4.0?

El cambio más importante es la adopción de las pautas **NIST 800-63-3** (estándar moderno de autenticación basado en evidencia). Esto significa:

- **Fin de la rotación de contraseñas**: ya no se exige cambiar la contraseña cada 3 meses (hoy se sabe que eso genera contraseñas más débiles).
- **MFA (multifactor) flexible**: se recomienda y se fomenta, pero no siempre se obliga.
- **Mínimo 12 caracteres** para contraseñas nuevas (antes 8).
- **Nueva numeración**: los capítulos se renumeraron de punta a punta (V1–V14).
- **Mapeo completo a CWE**: cada requisito se asocia con su debilidad estándar, lo que permite comparar resultados entre herramientas.
- **Segmentación de capítulos**: por ejemplo, si tu aplicación no usa JWT, la sección de JWT no te aplica — no tienes que leer requisitos inútiles.

## ¿Qué no es el ASVS?

Es importante entender sus límites:

- **No certifica**: OWASP no certifica proveedores, verificadores ni software (la sección "Evaluación y Certificación" lo deja explícito).
- **No es una guía de hacking**: no enseña a atacar, enseña a *verificar*.
- **No es un checklist de un solo uso**: se adapta a cada aplicación (puedes "bifurcarlo" y ajustar los niveles según tu riesgo, manteniendo la trazabilidad).
- **Cubre todo**: no solo el Top 10 — cumple y supera sus requisitos.

## ¿Cómo está organizado?

El estándar tiene **14 capítulos (V1–V14)**:

| Capítulo | Tema |
|---|---|
| V1 | Arquitectura, diseño y modelado de amenazas |
| V2 | Autenticación |
| V3 | Gestión de sesiones |
| V4 | Control de acceso |
| V5 | Validación, desinfección y codificación |
| V6 | Criptografía almacenada |
| V7 | Manejo y registro de errores |
| V8 | Protección de datos |
| V9 | Comunicación |
| V10 | Código malicioso |
| V11 | Lógica de negocio |
| V12 | Archivos y recursos |
| V13 | API y servicios web |
| V14 | Configuración |

Más los apéndices: **A** (glosario), **B** (referencias) y **C** (requisitos de IoT).

## Resumen

> El ASVS 4.0.3 es el estándar de verificación de seguridad de aplicaciones
> de OWASP: 14 capítulos, 3 niveles y más de 300 requisitos, alineado con
> NIST 800-63 y mapeado a CWE. No certifica: verifica.