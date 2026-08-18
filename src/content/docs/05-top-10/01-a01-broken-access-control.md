---
title: "A01: Broken Access Control (Control de Acceso Roto)"
description: "OWASP Top 10 2021 A01: qué es, escenarios de ataque, cómo prevenirlo y su relación con el ASVS."
---

Imagina un edificio donde las puertas de las oficinas no verifican quién entra: cualquier empleado puede entrar al despacho del director, a la caja fuerte o al archivo de sueldos. Eso es el **control de acceso roto**: la aplicación olvida preguntar *"¿tienes permiso para hacer esto?"*.

> **A01:2021 Broken Access Control** — el riesgo número uno del Top 10 2021. Según el análisis de OWASP, **el 94% de las aplicaciones evaluadas** presentaba alguna forma de fallo de control de acceso, con una incidencia media de 3,81 vulnerabilidades por aplicación.

## ¿En qué consiste?

El control de acceso **limita qué puede hacer cada usuario** (roles, permisos, propietario de los datos). Se rompe cuando la aplicación:

- No verifica la autorización en operaciones sensibles (cambiar datos de otra persona, leer registros ajenos).
- Confía en el cliente: oculta botones o menús en la interfaz, pero no protege el servidor.
- Permite manipular identificadores de objetos (IDOR): cambiar `id=100` por `id=101` para ver el registro de otro.
- Usa el encabezado `Origin` o `Referer` para decidir la autorización (falsificables).
- Permite escalada de privilegios: actuar como admin, o actuar sin iniciar sesión.

**CWEs asociadas:** CWE-22 (path traversal), CWE-23, CWE-35, CWE-352 (CSRF), CWE-611, CWE-200, CWE-201, CWE-862 (authorization missing), CWE-863 (incorrect authorization).

## Escenarios de ataque comunes

1. **IDOR clásico:** `GET https://app.com/pedido/100` devuelve el pedido 100 **sin verificar que sea tuyo**. Un atacante recorre los números y lee todos los pedidos de todos los clientes.
2. **Rol manipulado:** el perfil del usuario incluye `role: "usuario"` y el servidor confía en ese campo. El atacante cambia `role: "admin"` en la petición y obtiene privilegios administrativos.
3. **Elevación por método HTTP:** `GET` está protegido, pero `DELETE /pedidos/100` o `POST` no: el atacante cambia de método y la operación sensible se ejecuta sin autorización.

## Cómo prevenirlo

- **Decidir siempre en el servidor:** el control de acceso es una capa de servicio confiable; lo que se oculta en el cliente es decorativo.
- **Denegar por defecto:** si no hay una regla que permita, se rechaza (fail safe).
- **Permisos por entidad:** cada operación sobre un objeto verifica que el objeto pertenece al usuario o que su rol lo autoriza.
- **Nunca confiar en campos manipulables** (rol en formularios, `Origin`, `Referer`).
- **Proteger contra CSRF** con tokens anti-CSRF en funciones autenticadas.
- **Registrar los accesos denegados** para detectar intentos de escalada.

## Relación con el ASVS

El ASVS cubre este riesgo principalmente en:

- **V4 Control de Acceso** — el capítulo completo: reglas en el servidor, atributos no manipulables, privilegios mínimos, IDOR y CSRF (`/capitulos/v4-control-acceso`).
- **V12 Archivos y Recursos** — path traversal y permisos de archivos (`/capitulos/v12-archivos`).
- **V13 API** — métodos HTTP restringidos y autorización en capas (`/capitulos/v13-api`).

## Resumen

> A01 es el riesgo número uno porque la autorización es difícil de
> automatizar y fácil de olvidar: cada operación sensible debe preguntar
> "¿quién eres y qué te dejo hacer?" en el servidor, con denegación por
> defecto y sin confiar en nada que venga del cliente.