---
title: "A04: Insecure Design (Diseño Inseguro)"
description: "OWASP Top 10 2021 A04: qué es, escenarios de ataque, cómo prevenirlo y su relación con el ASVS."
---

Imagina un puente diseñado sin pensar en el viento: no importa cuánto refuerces los materiales después, la falla está **en el diseño**. El **diseño inseguro** es lo mismo: la arquitectura no contempla las amenazas, y ninguna corrección de código la salva.

> **A04:2021 Insecure Design** — categoría nueva en 2021. A diferencia de las demás, **no se arregla con un parche**: se previene con modelado de amenazas, patrones de diseño seguros y controles pensados *antes* de escribir código. **CWEs asociadas:** CWE-209, CWE-256, CWE-501, CWE-611.

## ¿En qué consiste?

El diseño inseguro aparece cuando:

- No se realiza **modelado de amenazas** durante el diseño: nadie preguntó *"¿cómo abusaría un atacante de esto?"*.
- Faltan **controles por diseño**: límites de uso, verificación de pasos, segregación de tareas, cuotas.
- La **lógica de negocio es abusable**: cupones ilimitados, transferencias sin confirmación, flujos que se pueden saltar.
- El contexto de confianza está mal definido (el cliente se trata como confiable).
- Los **perfiles de riesgo** no existen: todo se protege igual (o nada).

## Escenarios de ataque comunes

1. **Flujo de compra saltado:** el atacante envía directamente el paso "confirmar" sin pasar por "pagar" — la app no valida la secuencia.
2. **Cuotas inexistentes:** un script crea miles de cuentas o consume el inventario completo porque el diseño no contempló límites por usuario.
3. **Falta de segregación de tareas:** una sola persona aprueba y ejecuta una transferencia bancaria sin segunda verificación — el fraude interno es trivial.

## Cómo prevenirlo

- **Modelado de amenazas** en cada sprint de diseño (herramientas como OWASP Cornucopia).
- **Controles por diseño:** límites por usuario, secuencias obligatorias, antiautomatización, segregación de tareas.
- **Perfiles de riesgo y autenticación adaptativa** para funciones de alto valor.
- **Bibliotecas de patrones seguros** y componentes reutilizables probados.
- **Pruebas de "casos de abuso"** además de casos de uso normales.
- **Fail safe:** si algo sale mal, negar antes que permitir.

## Relación con el ASVS

- **V1 Arquitectura** — requisitos de diseño y arquitectura de seguridad (`/capitulos/v1-arquitectura`).
- **V11 Lógica de Negocio** — flujos secuenciales, límites y antiautomatización (`/capitulos/v11-logica-negocio`).
- **V4.1 Diseño de control de acceso** — privilegios mínimos y fallo seguro (`/capitulos/v4-control-acceso`).

## Resumen

> A04 es la categoría del "no se puede parchear": la seguridad se piensa
> en el diseño, con modelado de amenazas, controles por defecto y
> protección de la lógica de negocio. Es la base sobre la que funcionan
> los demás controles.