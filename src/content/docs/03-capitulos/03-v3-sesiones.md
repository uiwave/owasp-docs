---
title: "V3: Gestión de Sesiones"
description: "Capítulo V3 del ASVS 4.0.3: gestión de sesiones, cookies, tokens y defensas contra vulnerabilidades de sesión."
---

Imagina que entras a un edificio de oficinas: te dan una **credencial de visitante** que debes mostrar en cada puerta y que se **invalida al salir**. Eso es una sesión: el mecanismo que mantiene el estado de un usuario mientras interactúa con la aplicación, y que distingue a un usuario de otro.

> **Objetivo de control:** las sesiones son únicas para cada individuo y **no se pueden adivinar ni compartir**; se invalidan cuando ya no son necesarias y se agotan durante la inactividad.

Estos requisitos están alineados con **NIST 800-63b**. Un cambio importante: el bloqueo de sesiones simultáneas ya no se exige (los usuarios modernos tienen muchos dispositivos; y en la mayoría de implementaciones, "el último autenticador gana" — que a menudo es el atacante).

## V3.1 Seguridad Fundamental en la Gestión de Sesiones

### 3.1.1 — Nunca revelar tokens en la URL (CWE-598)

> *"Verifique que la aplicación nunca revela tokens de sesión en parámetros de dirección URL."*

**Explicación:** si el token viaja en la URL (`?session=abc123`), queda en historiales, logs, referidos y capturas de pantalla. El token de sesión va **solo en cookies seguras**, nunca en la URL. **Niveles: L1, L2, L3.**

## V3.2 Binding de Sesión

### 3.2.1 — Nuevo token de sesión al autenticar (CWE-384, C6)

> *"Verifique que la aplicación genera un nuevo token de sesión en la autenticación de usuario."*

**Explicación:** al iniciar sesión, el token viejo (anónimo) se descarta y se crea uno nuevo. Si se mantiene el mismo, un atacante con el token pre-autenticación podría "subir de nivel" (session fixation). **Niveles: L1, L2, L3.**

### 3.2.2 — Tokens con al menos 64 bits de entropía (CWE-331, C6)

> *"Verifique que los tokens de sesión posean al menos 64 bits de entropía."*

**Explicación:** el token debe ser **impredecible**: con 64 bits de aleatoriedad, adivinarlo es inviable. Un token corto o secuencial (123, 124...) se puede adivinar. **Niveles: L1, L2, L3.**

### 3.2.3 — Tokens solo en almacenamiento seguro del navegador (CWE-539, C6)

> *"Verifique que la aplicación solo almacena tokens de sesión en el navegador mediante métodos seguros, como proteger las cookies adecuadamente (consulte la sección 3.4) o el almacenamiento de sesión en HTML 5."*

**Explicación:** nada de localStorage con tokens (persiste y es accesible a XSS). Usa cookies seguras o `sessionStorage`. **Niveles: L1, L2, L3.**

### 3.2.4 — Tokens generados con algoritmos aprobados (CWE-331, C6)

> *"Verifique que los tokens de sesión se generan mediante algoritmos criptográficos aprobados."*

**Explicación:** usa generadores de números aleatorios criptográficamente seguros (CSPRNG), no `Math.random()` ni funciones caseras. **Niveles: L2, L3.**

> *Nota:* TLS u otro canal de transporte seguro es **obligatorio** para la gestión de sesiones (se trata en el capítulo V9).

## V3.3 Terminación de Sesión

> Los tiempos de espera se alinean con NIST 800-63: **más largos que los tradicionales**. Para IAL1/AAL1: 30 días; IAL2/AAL2: 12 horas o 30 min de inactividad (2FA opcional); IAL3/AAL3: 12 horas o 15 min de inactividad con 2FA.

### 3.3.1 — Cierre de sesión invalida el token (CWE-613, C6)

> *"Verifique que el cierre de sesión y la expiración invalidan el token de sesión, de modo que el botón 'Atrás' o un usuario de confianza posterior no reanude una sesión autenticada, incluso entre los usuarios de confianza."*

**Explicación:** al cerrar sesión, el token muere en el servidor. Presionar "Atrás" en el navegador no debe resucitar la sesión anterior. **Niveles: L1, L2, L3.**

### 3.3.2 — Re-autenticación periódica (CWE-613, C6)

> *"Si los autenticadores permiten a los usuarios permanecer conectados, compruebe que la re-autenticación se produce periódicamente tanto cuando se utiliza activamente o después de un período de inactividad."*

**Explicación:** la sesión larga está bien, pero con límites: 30 días (L1), 12 horas o 30 min inactivo (L2), 12 horas o 15 min inactivo con 2FA (L3). Después, se vuelve a pedir la contraseña. **Niveles: L1, L2, L3.**

### 3.3.3 — Terminar otras sesiones al cambiar contraseña (CWE-613)

> *"Verifique que la aplicación ofrece la opción de terminar todas las demás sesiones activas después de un cambio de contraseña correcto (incluido el cambio mediante el restablecimiento/recuperación de contraseña), y que esto es efectivo en toda la aplicación, el inicio de sesión federado (si está presente) y cualquier usuario de confianza."*

**Explicación:** si tu contraseña fue robada y la cambias, el atacante no debe seguir conectado con la sesión vieja. "Cerrar sesión en todos los dispositivos" es esa función. **Niveles: L2, L3.**

### 3.3.4 — Ver y cerrar sesiones activas (CWE-613)

> *"Verifique que los usuarios pueden ver y (habiendo vuelto a introducir las credenciales de inicio de sesión) cerrar sesión en cualquiera o todas las sesiones y dispositivos activos actualmente."*

**Explicación:** el usuario debe poder ver "sesiones activas" (este teléfono, esta laptop) y cerrarlas, previa confirmación de identidad. **Niveles: L2, L3.**

## V3.4 Gestión de Sesión Basada en Cookie

### 3.4.1 — Atributo 'Secure' (CWE-614, C6)

> *"Verifique que los tokens de sesión basados en cookies tengan el atributo 'Secure' establecido."*

**Explicación:** la cookie solo viaja por HTTPS. En HTTP, cualquiera en la red podría leerla. **Niveles: L1, L2, L3.**

### 3.4.2 — Atributo 'HttpOnly' (CWE-1004, C6)

> *"Verifique que los tokens de sesión basados en cookies tienen el atributo 'HttpOnly' establecido."*

**Explicación:** JavaScript no puede leer la cookie (solo el navegador la envía). Así, un XSS no puede robar la sesión. **Niveles: L1, L2, L3.**

### 3.4.3 — Atributo 'SameSite' (CWE-16, C6)

> *"Verifique que los tokens de sesión basados en cookies utilizan el atributo 'SameSite' para limitar la exposición a ataques de falsificación de solicitudes entre sitios."*

**Explicación:** `SameSite` evita que la cookie se envíe en solicitudes de otros sitios — la defensa clave contra **CSRF** (que otro sitio te haga ejecutar acciones con tu sesión). **Niveles: L1, L2, L3.**

### 3.4.4 — Prefijo '__Host-' (CWE-16, C6)

> *"Verifique que los tokens de sesión basados en cookies utilizan el prefijo '__Host-' para que las cookies solo se envíen al host que configuró inicialmente la cookie."*

**Explicación:** el prefijo `__Host-` obliga a la cookie a ser segura y ligada al host exacto: evita que subdominios o ataques de prefijo la roben. **Niveles: L2, L3.**

### 3.4.5 — Atributo de ruta preciso (CWE-16, C6)

> *"Verifique que si la aplicación se publica bajo un nombre de dominio con otras aplicaciones que establecen o usan cookies de sesión que podrían revelar las cookies de sesión, establezca el atributo de ruta en tokens de sesión basados en cookies utilizando la ruta más precisa posible."*

**Explicación:** si `mibank.com` y `mibank.com/blog` comparten dominio, la cookie de sesión del banco no debe enviarse a la ruta del blog: limita el `Path` al mínimo necesario. **Niveles: L2, L3.**

## V3.5 Administración de Sesiones Basada en Tokens

> La gestión basada en tokens incluye **JWT, OAuth, SAML y API keys**. De estos, se sabe que **las API keys son débiles** y no deben usarse en código nuevo.

### 3.5.1 — Revocación de tokens OAuth (CWE-290)

> *"Verifique que la aplicación permite a los usuarios revocar tokens de OAuth que forman relaciones de confianza con aplicaciones vinculadas."*

**Explicación:** "¿Quieres que Google Docs acceda a tu cuenta?" — el usuario debe poder **quitar ese acceso** ("revocar") cuando quiera. **Niveles: L2, L3.**

### 3.5.2 — Tokens de sesión en lugar de API keys estáticas (CWE-798)

> *"Verifique que la aplicación utiliza tokens de sesión en lugar de claves y secretos de API estáticos, excepto con implementaciones heredadas."*

**Explicación:** una API key fija vale para siempre y no distingue usuarios: un token de sesión se expira, se revoca y se rota. **Niveles: L2, L3.**

### 3.5.3 — Tokens sin estado protegidos contra manipulación (CWE-345)

> *"Verifique que los tokens de sesión sin estado utilizan firmas digitales, cifrado y otras contramedidas para protegerse contra ataques de manipulación, envolvente, reproducción, cifrado nulo y sustitución de claves."*

**Explicación:** los JWT y similares viven en el cliente: deben estar **firmados** (que nadie pueda modificarlos) y usar algoritmos seguros (nada de `alg: none` ni clave débil). **Niveles: L2, L3.**

## V3.6 Reautenticación Federada

> Esta sección aplica a quienes escriben el código de **partes de confianza (RP)** o **proveedores de credenciales (CSP)** — el "Google/Okta" que autentica y la app que confía en él.

### 3.6.1 — Tiempo máximo de autenticación entre RP y CSP (CWE-613)

> *"Verifique que las partes de confianza (RP) especifican el tiempo máximo de autenticación para los proveedores de servicios de credenciales (CSP) y que los CSP vuelven a autenticar al usuario si no han utilizado una sesión dentro de ese período."*

**Explicación:** si el usuario no usó la sesión federada en X tiempo, el proveedor de identidad debe pedir credenciales otra vez, sin importar la "sesión recordada". **Nivel: L3.**

### 3.6.2 — CSP informa del último evento de autenticación (CWE-613)

> *"Verifique que los proveedores de servicios de credenciales (CSP) informan a las partes de confianza (RP) del último evento de autenticación, para permitir que los RP determinen si necesitan volver a autenticar al usuario."*

**Explicación:** la app (RP) debe saber *cuándo* se autenticó el usuario, para decidir si exigir re-autenticación según su propia política. **Nivel: L3.**

## V3.7 Defensas Contra las Vulnerabilidades de Gestión de Sesiones

> El estándar explica el **ataque "semi-abierto"** (2018): atacantes explotaban apps que reutilizan los objetos de sesión del perfil de usuario entre estados *no autenticado* y *semi-autorizado* (restablecimiento de contraseña, "usuario olvidado"). Si el control de acceso no verifica que el usuario inició sesión **completamente**, el atacante puede actuar como la víctima: cambiar contraseñas, correos, deshabilitar MFA, robar claves API...

### 3.7.1 — Sesión completa antes de transacciones confidenciales (CWE-306)

> *"Verifique que la aplicación garantiza una sesión de inicio de sesión completa y válida o requiere una re-autenticación o verificación secundaria antes de permitir cualquier transacción confidencial o modificaciones de la cuenta."*

**Explicación:** cambiar contraseña, correo o datos de pago exige sesión completa (o re-pedir credenciales). Un usuario a mitad de camino (ej. en "olvidé contraseña") no debe poder hacer cambios sensibles. **Niveles: L1, L2, L3.**

## Referencias

OWASP Testing Guide 4.0 (Session Management Testing), OWASP Session Management Cheat Sheet, detalles del prefijo `__Host-` de Set-Cookie.

## Resumen

> V3 exige sesiones impredecibles y únicas, generadas nuevas al autenticar,
> almacenadas en cookies seguras (Secure + HttpOnly + SameSite), con cierre
> que invalida el token, tiempos de espera alineados a NIST y defensa contra
> el robo de sesión en flujos parcialmente autenticados.