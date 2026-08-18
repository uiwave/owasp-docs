---
title: "Otros usos del ASVS"
description: "El ASVS como guía de arquitectura, lista de verificación, soporte ágil, formación y criterio de adquisición de software."
---

El ASVS no sirve solo para auditar aplicaciones. El estándar identifica **seis usos adicionales** que lo convierten en una herramienta versátil para cualquier organización — y para tu formación.

## 1. Como guía detallada de arquitectura de seguridad

Los arquitectos de seguridad lo usan como recurso para **elegir mejores controles** ante problemas comunes: patrones de protección de datos, estrategias de validación de entradas, etc. Cubre las lagunas que dejan otros marcos (como SABSA) al revisar arquitectura de aplicaciones.

**Ejemplo:** si diseñas un sistema nuevo, el capítulo V1 te da la lista de preguntas arquitectónicas: ¿los componentes se autentican entre sí? ¿los secretos viven en un almacén de claves? ¿la app controla el acceso en el servidor?

## 2. Como reemplazo de listas de verificación de codificación segura

En lugar de mantener hojas de verificación caseras desactualizadas, muchas organizaciones **adoptan el ASVS** directamente:

- Eligen uno de los tres niveles.
- O **bifurcan** (adaptan) el ASVS cambiando lo que exige cada nivel según su dominio de riesgo.
- **Condición:** mantener la trazabilidad — que "pasar el requisito 4.1" signifique lo mismo en todas las copias, incluso cuando el estándar evoluciona.

## 3. Como guía para pruebas automatizadas unitarias e integración

El ASVS está diseñado para ser **altamente comprobable** (excepto los requisitos de arquitectura y código malicioso). La idea:

- Crea pruebas de unidad e integración que prueben **casos de fuzz y abuso** específicos.
- Con cada compilación, la aplicación se vuelve **casi autocomprobable**.

**Ejemplo práctico:** para el controlador de inicio de sesión, prueba el parámetro `username` con nombres de usuario predeterminados, enumeración de cuentas, fuerza bruta, inyección SQL/LDAP y XSS. Para `password`: contraseñas comunes, longitud, bytes nulos, eliminación del parámetro, XSS...

## 4. Para la formación en desarrollo seguro

Muchos cursos de "codificación segura" son en realidad **cursos de hacking con barniz de tips**. El ASVS permite lo contrario:

- Enfocar la formación en los **controles proactivos** del estándar.
- Enseñar *qué debe hacer el código* (no solo las 10 cosas prohibidas).

> **Analogía:** no aprendes a conducir seguro solo viendo videos de choques;
> aprendes las reglas de tránsito y las prácticas correctas. El ASVS es el
> reglamento.

## 5. Como conductor para la seguridad ágil (DevSecOps)

El ASVS se integra naturalmente en Scrum/Kanban:

1. Verifica la aplicación contra los requisitos del nivel elegido.
2. Busca **qué controles faltan**.
3. Genera **tickets/tareas en el backlog** para cada uno.

Esto prioriza tareas, hace la seguridad **visible en el proceso ágil** y convierte la deuda de seguridad en algo tangible. También sirve para priorizar auditorías: un requisito específico puede motivar una revisión o refactorización asignada a un miembro del equipo.

## 6. Como marco para la adquisición de software seguro

Si compras software o contratas desarrollo a medida, el ASVS es tu aliado:

- Exige en el contrato que el software se desarrolle en **nivel X de ASVS**.
- Solicita al vendedor que **demuestre el cumplimiento** de ese nivel.
- Funciona muy bien combinado con el **Anexo de Contrato de Software Seguro de OWASP**.

**Ejemplo:** "Este proveedor deberá demostrar cumplimiento de ASVS L2 antes de la aceptación final".

## Resumen

> El ASVS no es solo una lista de auditoría: es guía de arquitectura,
> reemplazo de checklists, base de pruebas automatizadas, currículo de
> formación, conductor de seguridad ágil y cláusula de adquisición de
> software. Seis herramientas en una.