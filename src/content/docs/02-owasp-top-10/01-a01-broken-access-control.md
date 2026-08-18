---
title: "A01: Pérdida de Control de Acceso"
description: "Vulnerabilidades IDOR, bypass de autenticación, elevación de privilegios y políticas CORS."
---

Imagina que entras a un hotel y la llave de tu habitación abre la puerta de tu vecino o la oficina del gerente. Suena absurdo, ¿verdad?

Eso es exactamente la **Pérdida de Control de Acceso** (_Broken Access Control_): un fallo donde la aplicación web no comprueba correctamente **quién eres** ni **qué tienes permitido hacer**.

En la lista global del **OWASP Top 10 (A01:2025)**, esta falla ocupa el **puesto #1**. De hecho, está presente de alguna forma en casi el 100% de las aplicaciones web analizadas.

## 3 Formas sencillas en que ocurre (y cómo probarlas)

### 1. Manipular la URL (Vulnerabilidad IDOR)

A veces las páginas web usan identificadores visibles para mostrar tus datos. Si el servidor no verifica quién solicita la información, cualquiera puede cambiar esos números.

- **El escenario:** Entras a tu perfil y la dirección web muestra:
  `https://mitienda.com/usuario/perfil?id=105`
- **La prueba:** Cambias manualmente la URL a:
  `https://mitienda.com/usuario/perfil?id=106`
- **El fallo:** Si al presionar _Enter_ ves el nombre, teléfono o dirección de otra persona, la aplicación no está validando que la cuenta te pertenezca.

### 2. Adivinar rutas secretas (Navegación Forzada)

Muchas plataformas ocultan el panel de control borrando los botones para los usuarios normales, pero dejan la página web disponible para cualquiera que conozca la dirección exacta.

- **El escenario:** Inicias sesión como un usuario común y corriente.
- **La prueba:** En la barra del navegador intentas adivinar rutas administrativas escribiendo manualmente:
  `https://mitienda.com/admin`
  `https://mitienda.com/dashboard/usuarios`
- **El fallo:** Si la página te abre el panel de administración sin pedirte credenciales de administrador, la seguridad se rompió.

### 3. Engañar los botones ocultos (Bypass del Front-end)

Es común encontrar sistemas que bloquean funciones usando código visual (JavaScript), creyendo que con ocultar un botón el usuario no podrá usarlo.

- **El escenario:** En tu perfil ves un botón de "Eliminar cuenta", pero el botón de "Eliminar a todos los usuarios" solo le aparece al administrador.
- **La prueba:** Abres la consola de comandos de tu computadora (o herramientas del navegador) y envías la petición directamente al servidor mediante una línea de texto:
  `curl -X DELETE https://mitienda.com/api/usuarios/106`
- **El fallo:** Si el servidor ejecuta la orden solo porque "llegó la petición", significa que confiaba a ciegas en lo que la pantalla mostraba.

## ¿Cómo arreglarlo como desarrollador?

Para evitar este problema en tus proyectos, aplica estas reglas de oro:

1. **Denegar por defecto:** Todo recurso debe ser privado a menos que se indique explícitamente lo contrario.
2. **Validar SIEMPRE en el servidor:** Nunca confíes en que el navegador o el JavaScript del usuario bloquearán a un atacante.
3. **Verificar la propiedad de los datos:** Antes de mostrar o borrar información, la base de datos debe responder: _"¿Este registro le pertenece al usuario que lo pide?"_.
4. **Cerrar sesiones de verdad:** Asegúrate de que los tokens y credenciales de acceso queden invalidados en el servidor al cerrar sesión.
