---
title: "V7: Manejo y Registro de Errores"
description: "Capítulo V7 del ASVS 4.0.3: contenido de logs, procesamiento, protección y control de errores."
---

El objetivo del control y registro de errores es proporcionar **información útil** para el usuario, los administradores y los equipos de respuesta a incidentes. No se trata de crear cantidades masivas de registros, sino **registros de alta calidad**, con más señal que ruido.

> Los registros de alta calidad a menudo contendrán datos confidenciales y deben protegerse según las leyes o directivas locales de privacidad: no recopilar información confidencial salvo que sea necesario, manejar lo registrado según su clasificación y **no almacenar registros para siempre**.
>
> Si los registros contienen datos privados, se convierten en parte de la información más sensible de la aplicación... y en un objetivo muy atractivo para los atacantes.

## V7.1 Contenido de Registro de Log

El registro de información confidencial es peligroso: los logs se clasifican a sí mismos — deben cifrarse, sujetarse a políticas de retención y divulgarse en las auditorías. No se registre información de pagos, credenciales, información confidencial o PII.

> *V7.1 cubre OWASP Top 10 2017:A10. No es comprobable por prueba de penetración: los desarrolladores deben asegurar el cumplimiento total (como si todo fuera L1); los probadores lo validan mediante entrevistas, capturas de pantalla o aserción.*

### 7.1.1 — Sin credenciales ni pagos en los logs (CWE-532, C9, C10)

> *"Verifique que la aplicación no registra las credenciales ni los detalles de pago. Los tokens de sesión solo deben almacenarse en registros de forma irreversible y hasheados."*

**Explicación:** jamás contraseñas, números de tarjeta o tokens de sesión en texto plano en los logs. Si un token debe aparecer, solo su hash. **Niveles: L1, L2, L3.**

### 7.1.2 — Sin otros datos confidenciales en logs (CWE-532, C9)

> *"Verifique que la aplicación no registra otros datos confidenciales tal como se definen en las leyes de privacidad locales o la política de seguridad pertinente."*

**Explicación:** los logs no son el lugar de los datos personales: define qué se registra según tu política de privacidad y respétala. **Niveles: L1, L2, L3.**

### 7.1.3 — Registrar eventos relevantes para la seguridad (CWE-778, C5, C7)

> *"Verifique que la aplicación registra eventos relevantes para la seguridad, incluidos los eventos de autenticación correctos y con errores, los errores de control de acceso, los errores de deserialización y los errores de validación de entrada."*

**Explicación:** sin registros de login fallidos o accesos denegados, un ataque masivo pasa desapercibido. Estos eventos son la materia prima del SIEM y del incident response. **Niveles: L1, L2.**

### 7.1.4 — Metadatos que permitan la investigación (CWE-778, C9)

> *"Verifique que cada evento de registro incluye la información necesaria que permitiría una investigación detallada de la escala de tiempo cuando se produce un evento."*

**Explicación:** cada entrada debe responder: *¿qué pasó, cuándo, desde dónde, con qué cuenta, qué petición?* Un log sin contexto es ruido inútil para investigar. **Niveles: L1, L2.**

## V7.2 Procesamiento del Log

El registro oportuno es fundamental para los eventos de auditoría, el triage y la escalada. Los registros deben ser claros y monitoreables, localmente o enviados a un sistema remoto.

### 7.2.1 — Registrar decisiones de autenticación (CWE-778)

> *"Verifique que se registran todas las decisiones de autenticación, sin almacenar tokens o contraseñas de sesión confidenciales. Esto debe incluir solicitudes con los metadatos relevantes necesarios para las investigaciones de seguridad."*

**Explicación:** login correcto, login fallido, cierre de sesión: todo se registra con metadatos (IP, user-agent, timestamp) — pero nunca las credenciales. **Niveles: L1, L2.**

### 7.2.2 — Registrar decisiones de control de acceso (CWE-285)

> *"Verifique que se pueden registrar todas las decisiones de control de acceso y que se registran todas las decisiones erróneas. Esto debe incluir solicitudes con los metadatos pertinentes necesarios para las investigaciones de seguridad."*

**Explicación:** cada "acceso denegado" queda registrado: son la señal temprana de un atacante probando permisos (escalada de privilegios, IDOR). **Niveles: L1, L2.**

## V7.3 Protección de Logs

Los registros que se pueden modificar o eliminar trivialmente son inútiles para investigaciones y procesamientos. La divulgación de logs puede exponer detalles internos de la aplicación o de sus datos.

### 7.3.1 — Codificación para evitar inyección de logs (CWE-117, C9)

> *"Verifique que todos los componentes de registro codifiquen adecuadamente los datos para evitar la inyección de registros."*

**Explicación:** un usuario que escribe su nombre con `\nError Falso` puede falsificar o contaminar los logs (log injection), engañando a los analistas. Todo dato que entra a un log se codifica/neutraliza. **Niveles: L1, L2.**

### 7.3.2 — [ELIMINADO, DUPLICADO DE 7.3.1]

Requisito eliminado en v4.0.3 por duplicado con el 7.3.1.

### 7.3.3 — Logs protegidos contra acceso no autorizado (CWE-200)

> *"Verifique que los registros de seguridad están protegidos contra el acceso y la modificación no autorizados."*

**Explicación:** los logs son evidencia: el atacante que puede borrarlos borra su rastro. Protege con permisos estrictos, inmutabilidad o envío a un sistema centralizado. **Niveles: L1, L2.**

### 7.3.4 — Sincronización de tiempo (C9)

> *"Verifique que la fuente donde se lee el tiempo están sincronizados con la hora y la zona horaria correctas. Considere firmemente el registro solo en UTC si los sistemas son globales para ayudar con el análisis forense posterior al incidente."*

**Explicación:** logs con horas desfasadas (NTP no sincronizado) rompen la reconstrucción del ataque. Usa UTC para poder correlacionar eventos entre sistemas. **Niveles: L1, L2.**

> *Nota: la codificación de registros (7.3.1) es difícil de probar con herramientas dinámicas; arquitectos, desarrolladores y revisores de código deben considerarla requisito L1.*

## V7.4 Control de Errores

El propósito del control de errores es permitir que la aplicación proporcione **eventos relevantes para la seguridad** para el monitoreo, el triage y la escalada — no crear registros masivos. Cada evento registrado debe distinguirse por el SIEM o software de análisis.

### 7.4.1 — Mensajes de error genéricos (CWE-210, C10)

> *"Verifique que se muestra un mensaje genérico cuando se produce un error inesperado o sensible a la seguridad, potencialmente con un identificador único que el personal de soporte técnico puede usar para investigar."*

**Explicación:** "No se pudo completar la operación" al usuario (con un ID de error: `ERR-7F3A`), y el detalle completo solo en los logs. Nunca revelar stack traces ni SQL internos al usuario. **Niveles: L1, L2, L3.**

### 7.4.2 — Control de excepciones en todo el código (CWE-544, C10)

> *"Verifique que el control de excepciones (o un equivalente funcional) se utiliza en todo el código base para tener en cuenta las condiciones de error esperadas e inesperadas."*

**Explicación:** try/catch por todas partes, con manejo consciente de cada error: si una excepción se traga sin más, una falla de seguridad (o un fallo silencioso) pasa desapercibida. **Niveles: L1, L2.**

### 7.4.3 — Controlador de errores de último recurso (CWE-431, C10)

> *"Verifique que se define un controlador de errores de 'último recurso' que detectará todas las excepciones no controladas."*

**Explicación:** un "catch-all" global garantiza que ninguna excepción escape sin registro ni con mensaje peligroso. Lenguajes sin excepciones (Swift, Go, funcionales) deben usar su patrón equivalente. **Niveles: L1, L2.**

## Referencias

OWASP Testing Guide 4.0 (Testing for Error Handling), OWASP Authentication Cheat Sheet (sección sobre mensajes de error).

## Resumen

> V7 logra logs de alta calidad y fallos seguros: nada de credenciales ni
> pagos en registros, eventos de seguridad con contexto, logs protegidos
> contra inyección y manipulación, y errores genéricos con detalle solo
> para los que deben investigar.