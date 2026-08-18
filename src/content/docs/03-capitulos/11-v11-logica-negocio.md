---
title: "V11: Lógica de Negocio"
description: "Capítulo V11 del ASVS 4.0.3: seguridad de la lógica de negocio contra abusos y automatización."
---

La lógica de negocio es el corazón de tu aplicación: transferencias, descuentos, puntos de fidelidad, carritos... Es también el ataque favorito de los atacantes sofisticados, porque **ningún firewall ni WAF la puede proteger**: solo el diseño correcto.

> **Objetivo de control:** el flujo de lógica de negocios es **secuencial**, se procesa en orden y **no se puede omitir**; la lógica empresarial incluye **límites para detectar y prevenir ataques automatizados** (transferencias continuas de montos pequeños, agregar un millón de amigos de uno en uno...); los flujos de alto valor consideran casos de abuso y actores malintencionados, con protecciones contra suplantación, manipulación, divulgación de información y elevación de privilegios.

> **La seguridad de la lógica de negocio es tan individual en cada aplicación que ningún checklist se puede aplicar.** Debe diseñarse contra amenazas externas probables. Se recomienda el **modelado de amenazas** durante los sprints de diseño (por ejemplo, con la herramienta Cornucopia de OWASP).

## V11.1 Seguridad de la Lógica de Negocio

### 11.1.1 — Flujos secuenciales sin omitir pasos (CWE-841)

> *"Verificar que la aplicación solo procesará flujos de la lógica de negocio para el mismo usuario en orden de pasos secuenciales y sin omitir pasos."*

**Explicación:** el atacante salta al paso 4 sin pasar por el 1: enviar el formulario final de compra sin pagar, activar una cuenta sin verificarla. El servidor valida que cada paso se completó en orden. **Niveles: L1, L2, L3.**

### 11.1.2 — Pasos procesados en tiempo humano realista (CWE-799)

> *"Verificar que la aplicación solo procesará flujos de lógica de negocios con todos los pasos que se procesan en tiempo humano realista, es decir, las transacciones no se envían demasiado rápido."*

**Explicación:** un humano no llena un formulario de 10 campos en 0,2 segundos: el ritmo superhumano delata bots (registros masivos, compras exprés). Los flujos se procesan a velocidad humana realista. **Niveles: L1, L2, L3.**

### 11.1.3 — Límites por usuario para acciones de negocio (CWE-770)

> *"Verificar que la aplicación tiene límites adecuados para acciones o transacciones de negocio específicas, y que se aplican correctamente con base en los usuarios."*

**Explicación:** límites por usuario: máximo de transferencias por día, máximo de pedidos, máximo de "amigos" por hora. Sin límites, un bot agota el inventario o drena fondos. **Niveles: L1, L2, L3.**

### 11.1.4 — Controles anti-automatización (CWE-770)

> *"Verifique que la aplicación tenga controles anti-automatización para proteger contra llamadas excesivas, como exfiltración masiva de datos, solicitudes de lógica empresarial, carga de archivos o ataques de denegación de servicio."*

**Explicación:** rate limiting, CAPTCHA, verificación de comportamiento: herramientas para que un script no pueda llamar a la API mil veces por segundo, exfiltrar la base de datos o tumbar el servicio. **Niveles: L1, L2, L3.**

### 11.1.5 — Validación contra riesgos identificados en modelado de amenazas (CWE-841)

> *"Verificar que la aplicación tiene límites de lógica empresarial o validación para protegerse contra riesgos o amenazas empresariales probables, identificados mediante el modelado de amenazas o metodologías similares."*

**Explicación:** antes de codificar, se piensa *¿cómo abusaría un atacante de esta función?* (descuento acumulable infinito, cupones reutilizables, puntos canjeables dos veces) y se diseña la protección. **Niveles: L1, L2, L3.**

### 11.1.6 — Sin problemas TOCTOU ni race conditions (CWE-367)

> *"Verifique que la aplicación no tenga problemas de 'Time Of Check to Time Of Use' (TOCTOU) u otras race conditions para operaciones sensibles."*

**Explicación:** TOCTOU es verificar algo y usarlo después, con un cambio por el medio: "¿tiene saldo?" y luego "girar" — dos solicitudes simultáneas pueden gastar el saldo dos veces. Las operaciones sensibles son atómicas (bloqueos, transacciones). **Niveles: L1, L2.**

### 11.1.7 — Monitoreo de actividades inusuales (CWE-754, C9)

> *"Verificar que la aplicación supervisa eventos o actividades inusuales desde una perspectiva de lógica de negocios. Por ejemplo, los intentos de realizar acciones fuera de servicio o acciones que un usuario normal nunca intentaría."*

**Explicación:** un usuario que intenta comprar "cantidad negativa" o acceder a un paso sin pasar por el flujo es una señal de ataque: se monitorea y se alerta. **Niveles: L1, L2.**

### 11.1.8 — Alertas configurables (CWE-390)

> *"Verificar que la aplicación tiene alertas configurables cuando se detectan ataques automatizados o actividad inusual."*

**Explicación:** detectar sin alertar no sirve: las alertas configurables (por umbral, canal, frecuencia) permiten al equipo reaccionar antes de que el daño sea masivo. **Niveles: L1, L2.**

## Referencias

OWASP Web Security Testing Guide 4.1 (Business Logic Testing), OWASP AppSensor, OWASP Automated Threats to Web Applications, OWASP Cornucopia.

## Resumen

> V11 defiende el corazón del negocio: flujos que no se pueden saltar,
> límites por usuario, anti-automatización, validación contra abusos
> pensados en el modelado de amenazas, operaciones atómicas libres de
> race conditions y monitoreo con alertas configurables.