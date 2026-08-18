---
title: "V4: Control de Acceso"
description: "Capítulo V4 del ASVS 4.0.3: autorización, control de acceso general, a nivel de operación y consideraciones adicionales."
---

Si la autenticación responde *"¿quién eres?"*, la **autorización** responde *"¿qué te dejo hacer?"*. El capítulo V4 (Control de Acceso) es la parte más explotada de las aplicaciones reales — el **A01 del Top 10** ("Broken Access Control") es el riesgo número uno, año tras año.

> **Objetivo de control:** las personas que acceden a los recursos tienen **credenciales válidas**; los usuarios están asociados a un conjunto **bien definido de roles y privilegios**; los metadatos de roles y permisos están **protegidos contra la reproducción o la manipulación**.

## V4.1 Diseño de Control de Acceso General

### 4.1.1 — Reglas de acceso en una capa de servicio confiable (CWE-602)

> *"Verifique que la aplicación aplica las reglas de control de acceso en una capa de servicio de confianza, especialmente si el control de acceso del lado cliente está presente y podría ser bypaseado."*

**Explicación:** la regla de oro del control de acceso: **decide en el servidor**. Cualquier check en el navegador (botones ocultos, menús filtrados) es decorativo: el atacante lo salta con una petición directa. **Niveles: L1, L2, L3.**

### 4.1.2 — Atributos de usuario no manipulables (CWE-639)

> *"Verifique que todos los atributos de usuario y datos y la información de directiva utilizada por los controles de acceso no pueden ser manipulados por los usuarios finales a menos que se autorice específicamente."*

**Explicación:** si el rol viene en un campo del formulario (`<input type="hidden" value="user">`), el atacante cambia `user` por `admin`. Todo atributo que influye en permisos se gestiona en el servidor. **Niveles: L1, L2, L3.**

### 4.1.3 — Principio de privilegios mínimos (CWE-285, C7)

> *"Verifique que existe el principio de privilegios mínimos: los usuarios solo deben poder acceder a funciones, archivos de datos, direcciones URL, controladores, servicios y otros recursos, para los que poseen una autorización específica. Esto implica protección contra la suplantación y elevación de privilegios."*

**Explicación:** cada usuario accede solo a lo que necesita: el de ventas no ve los sueldos, el visitante no ve el panel de admin. Sin privilegios mínimos, una cuenta débil comprometida es una puerta enorme. **Niveles: L1, L2, L3.**

### 4.1.4 — [ELIMINADO, DUPLICADO DE 4.1.3]

Requisito eliminado en v4.0.3 por duplicado con el 4.1.3.

### 4.1.5 — Fallo seguro (fail safe) (CWE-285, C10)

> *"Verifique que los controles de acceso fallan de forma segura, incluso cuando se produce una excepción."*

**Explicación:** si ocurre un error inesperado, el sistema debe **negar el acceso por defecto**, nunca concederlo. Falla = denegado. **Niveles: L1, L2, L3.**

## V4.2 Control de Acceso a Nivel de Operación

### 4.2.1 — Protección contra IDOR (CWE-639)

> *"Verifique que los datos confidenciales y las API están protegidos contra ataques de referencia insegura directa de objetos (IDOR) dirigidos a la creación, lectura, actualización y eliminación de registros, como la creación o actualización del registro de otra persona, la visualización de los registros de todos o la eliminación de todos los registros."*

**Explicación:** el ataque IDOR clásico: `GET /pedido/100` devuelve el pedido 100 sin verificar que sea tuyo. Cambiando el número, se leen pedidos de otros. Toda operación sobre un objeto debe verificar que **ese objeto pertenece al usuario** (permisos por entidad). **Niveles: L1, L2, L3.**

### 4.2.2 — Mecanismo anti-CSRF (CWE-352)

> *"Verifique que la aplicación o el framework aplica un mecanismo anti-CSRF seguro para proteger la funcionalidad autenticada, y eficaz anti-automatización o anti-CSRF protege la funcionalidad no autenticada."*

**Explicación:** el **CSRF** es que otro sitio te haga ejecutar acciones con tu sesión (ej. un formulario oculto que transfiere dinero). Un token anti-CSRF por petición lo impide; también protege funciones públicas (ej. formularios de registro) contra automatización. **Niveles: L1, L2, L3.**

## V4.3 Otras Consideraciones de Control de Acceso

### 4.3.1 — MFA en interfaces administrativas (CWE-419)

> *"Verifique que las interfaces administrativas utilizan la autenticación multifactor adecuada para evitar el uso no autorizado."*

**Explicación:** el panel de administración es la joya de la corona: exige MFA. Un solo usuario admin sin 2FA puede tumbar toda la empresa. **Niveles: L1, L2, L3.**

### 4.3.2 — Exploración de directorios deshabilitada (CWE-548)

> *"Verifique que la exploración de directorios está deshabilitada a menos que se desee deliberadamente. Además, las aplicaciones no deben permitir la detección o divulgación de metadatos de archivos o directorios, como Thumbs.db, .DS_Store, .git o .svn."*

**Explicación:** si `https://sitio.com/images/` lista archivos, el atacante ve todo tu árbol. Desactiva el listado y bloquea los archivos de metadatos (`.git` expuesto = código fuente filtrado). **Niveles: L1, L2, L3.**

### 4.3.3 — Autorización adicional para alto valor (CWE-732)

> *"Verifique que la aplicación tiene autorización adicional (como la autenticación paso a paso o adaptativa) para sistemas de menor valor y/o segregación de tareas para aplicaciones de alto valor para aplicar controles antifraude según el riesgo de aplicación y fraudes previos."*

**Explicación:** para acciones sensibles (transferencias grandes, cambio de beneficiario), refuerza: re-pedir credenciales, aprobación de un segundo usuario (segregación de tareas) o autenticación adaptativa según riesgo. **Niveles: L2, L3.**

## Referencias

OWASP Testing Guide 4.0 (Authorization), OWASP Cheat Sheets de Access Control, CSRF y REST.

## Resumen

> V4 es el capítulo del "qué te dejo hacer": decisiones de acceso solo en el
> servidor, atributos no manipulables, privilegios mínimos, fallo seguro,
> protección contra IDOR y CSRF, MFA en paneles admin y controles
> antifraude para acciones sensibles.