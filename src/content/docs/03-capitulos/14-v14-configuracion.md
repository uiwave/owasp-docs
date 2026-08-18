---
title: "V14: Configuración"
description: "Capítulo V14 del ASVS 4.0.3: compilación y despliegue, dependencias, divulgación involuntaria, encabezados de seguridad HTTP y validación de encabezados."
---

La configuración es donde los detalles matan: un modo debug activado, un header de versión, un CORS abierto... Cada uno parece inofensivo, pero encadenados, son la diferencia entre un ataque que falla y un ataque que triunfa.

> **Objetivo de control:** la aplicación tiene un **entorno de compilación seguro, repetible y automatizable**; no incluye bibliotecas de terceros obsoletas ni inseguras (gestión de dependencias y configuración). La configuración "desde fábrica" debe ser **segura para estar en Internet**: segura desde la caja.

## V14.1 Compilación y Despliegue

Las pipelines de compilación son la base de la seguridad repetible: cada vez que se detecta algo inseguro, se resuelve en el código fuente o los scripts y se prueba automáticamente. **Los pasos manuales irregulares conducen directamente a errores de seguridad evitables.**

> Con el modelo DevSecOps y la infraestructura definida por software es posible reemplazar rápidamente cualquier sistema comprometido por un "bueno conocido". El cumplimiento de esta categoría **requiere un sistema de compilación automatizado** y acceso a los scripts de compilación e implementación.

### 14.1.1 — Compilación y despliegue repetibles (CWE-16)

> *"Verifique que los procesos de compilación y despliegue de aplicaciones se realizan de forma segura y repetible, como la automatización de CI/CD, la administración de configuración automatizada y los scripts de despliegue automatizado."*

**Explicación:** el despliegue no depende de "que Juan se acuerde de ejecutar el paso 7": CI/CD con scripts automatizados hace que cada despliegue sea idéntico y auditable. **Niveles: L1, L2.**

### 14.1.2 — Protecciones del compilador habilitadas (CWE-120)

> *"Verifique que los indicadores del compilador están configurados para habilitar todas las protecciones y advertencias de desbordamiento de búfer disponibles, incluida la aleatorización de la pila, la prevención de la ejecución de datos y para interrumpir la compilación si se encuentra un puntero no seguro, memoria, cadena de formato, entero u operaciones de cadena."*

**Explicación:** en lenguajes de sistemas: flags de hardening (ASLR, NX, stack canaries) activados, y advertencias tratadas como errores: si el compilador detecta algo inseguro, la compilación se detiene. **Niveles: L1, L2.**

### 14.1.3 — Servidor hardenizado según recomendaciones (CWE-16)

> *"Verifique que la configuración del servidor está hardenizada según las recomendaciones del servidor de aplicaciones y los frameworks en uso."*

**Explicación:** cada servidor y framework publica guías de hardening: seguirlas (parches, permisos, servicios mínimos, cuentas eliminadas) es la base antes de cualquier otra defensa. **Niveles: L1, L2.**

### 14.1.4 — Recuperación automatizada y probada (CWE-16)

> *"Verifique que la aplicación, la configuración y todas las dependencias se pueden volver a implementar mediante scripts de implementación automatizada, crearse a partir de un runbook documentado y probado en un tiempo razonable o restaurarse a partir de copias de seguridad de forma oportuna."*

**Explicación:** frente a un compromiso o desastre: ¿puedes reconstruir todo el sistema desde cero en horas? Solo si los scripts y el runbook existen... y están probados. **Niveles: L1, L2.**

### 14.1.5 — Verificación de integridad de la configuración (CWE-16)

> *"Verifique que los administradores autorizados pueden verificar la integridad de todas las configuraciones relevantes para la seguridad para detectar una posible manipulación."*

**Explicación:** la configuración también se compromete: los administradores deben poder comprobar que nada se modificó (checksums, comparación contra "bueno conocido"). **Nivel: L1.**

## V14.2 Dependencias

La administración de dependencias es fundamental: **no mantenerse al día con dependencias obsoletas o inseguras es la causa raíz de los ataques más grandes y costosos hasta la fecha.**

> *Nota: en el nivel 1, el cumplimiento del 14.2.1 se relaciona con observaciones o detecciones de bibliotecas y componentes del lado del cliente, en lugar del análisis estático en tiempo de compilación (técnicas más precisas, verificables por entrevistas).*

### 14.2.1 — Componentes actualizados (CWE-1026, C2)

> *"Verifique que todos los componentes estén actualizados, preferiblemente utilizando un comprobador de dependencias durante el tiempo de compilación."*

**Explicación:** la vulnerabilidad en una librería vieja es la vía de entrada más común: comprobador de dependencias en el CI (npm audit, Dependabot, OWASP Dependency-Check...) que detecta versiones vulnerables. **Niveles: L1, L2, L3.**

### 14.2.2 — Eliminar lo innecesario (CWE-1002)

> *"Verifique que se eliminen todas las funciones, documentación, aplicaciones de muestra y configuraciones innecesarias."*

**Explicación:** código de ejemplo, documentación y funciones sin usar son superficie de ataque gratuita: el "default app" de Apache con ejemplos fue el origen de miles de compromisos. Se elimina todo lo que no se usa. **Niveles: L1, L2, L3.**

### 14.2.3 — SRI para activos de CDNs externas (CWE-829)

> *"Verifique que si los activos de la aplicación, como bibliotecas JavaScript, fuentes CSS o web, se hospedan externamente en una red de entrega de contenido (CDN) o un proveedor externo, se usa la integridad de subrecursos (SRI) para validar la integridad del activo."*

**Explicación:** si la CDN que sirve tu jQuery es comprometida, todas tus páginas inyectan código del atacante: SRI verifica el hash de cada recurso externo antes de ejecutarlo. **Niveles: L1, L2, L3.**

### 14.2.4 — Repositorios predefinidos y confiables (CWE-829, C2)

> *"Verifique que los componentes de terceros provienen de repositorios predefinidos, de confianza y mantenidos continuamente."*

**Explicación:** las dependencias solo bajan de repositorios aprobados (con mirrors controlados): impedir "typosquatting" y paquetes de orígenes dudosos en el flujo de compilación. **Niveles: L1, L2.**

### 14.2.5 — SBOM de todas las librerías (CWE-16, C2)

> *"Verifique que se mantenga una Lista de materiales de software (SBOM; por sus siglas en inglés) de todas las bibliotecas de terceros en uso."*

**Explicación:** el SBOM es el inventario de componentes: ante una vulnerabilidad (ej. Log4Shell), sabes en minutos si estás afectado y dónde. Sin inventario, es adivinar. **Niveles: L1, L2.**

### 14.2.6 — Sandboxing de librerías de terceros (CWE-265, C2)

> *"Verifique que la superficie de ataque se reduce mediante sandboxing o encapsular bibliotecas de terceros para exponer solo el comportamiento necesario en la aplicación."*

**Explicación:** la librería de terceros se envuelve y expone solo lo que necesita la app: si se compromete, el daño queda contenido. **Niveles: L1, L2.**

## V14.3 Divulgación de Seguridad Involuntaria

> Las configuraciones de producción deben endurecerse contra ataques comunes: consolas de depuración, XSS, RFI y las "vulnerabilidades" de detección de información trivial. Muchos de estos problemas rara vez se clasifican como riesgo significativo, **pero se encadenan junto con otras vulnerabilidades**. Si no están presentes de forma predeterminada, el nivel de defensa sube antes de que la mayoría de los ataques puedan realizarse con éxito.

### 14.3.1 — [ELIMINADO, DUPLICADO DE 7.4.1]

Requisito eliminado en v4.0.3 por duplicado con el 7.4.1 (mensajes de error genéricos).

### 14.3.2 — Modos de depuración deshabilitados (CWE-497)

> *"Verifique que los modos de depuración del servidor web o de aplicaciones y del framework de aplicaciones están deshabilitados en producción para eliminar las características de depuración, las consolas de desarrollador y las divulgaciones de seguridad no deseadas."*

**Explicación:** el modo debug expone stack traces, rutas internas, credenciales de prueba y consolas interactivas: en producción se desactiva siempre. **Niveles: L1, L2, L3.**

### 14.3.3 — Sin versión de componentes en las respuestas (CWE-200)

> *"Verifique que los encabezados HTTP o cualquier parte de la respuesta HTTP no exponen información detallada de la versión de los componentes del sistema."*

**Explicación:** `Server: Apache/2.4.10` o `X-Powered-By: PHP/5.6` le regalan al atacante el catálogo exacto de vulnerabilidades a probar. Se oculta o suaviza la información de versión. **Niveles: L1, L2, L3.**

## V14.4 Encabezados de Seguridad HTTP

### 14.4.1 — Content-Type con charset seguro (CWE-173)

> *"Verifique que cada respuesta HTTP contenga un encabezado de tipo de contenido. También especifique un conjunto de caracteres seguro (p. ej., UTF-8, ISO-8859-1) si los tipos de contenido son texto/*, /+xml y aplicación/xml. El contenido debe coincidir con el encabezado de tipo de contenido proporcionado."*

**Explicación:** sin `Content-Type`, el navegador "adivina" el tipo (sniffing): un archivo subido se interpreta como HTML y ejecuta script. Siempre `Content-Type` explícito con charset seguro. **Niveles: L1, L2, L3.**

### 14.4.2 — Content-Disposition en respuestas de API (CWE-116)

> *"Verifique que todas las respuestas de API contienen un encabezado Content-Disposition: attachment; filename='api.json' (u otro nombre de archivo apropiado para el tipo de contenido)."*

**Explicación:** las respuestas JSON con `Content-Disposition: attachment` no se renderizan en el navegador: si un atacante logra XSS reflejado vía la API, el navegador no lo ejecuta. **Niveles: L1, L2, L3.**

### 14.4.3 — CSP para mitigar XSS (CWE-1021)

> *"Verifique que existe un encabezado de respuesta de Directiva de Seguridad de Contenido (CSP) que ayuda a mitigar el impacto de los ataques XSS como vulnerabilidades de inyección de HTML, DOM, JSON y JavaScript."*

**Explicación:** la CSP dice qué puede cargar y ejecutar la página (scripts de tu dominio, nada de inline): aunque el XSS exista, la CSP le quita el poder de robar datos. **Niveles: L1, L2, L3.**

### 14.4.4 — X-Content-Type-Options: nosniff (CWE-116)

> *"Verifique que todas las respuestas contienen un encabezado X-Content-Type-Options: nosniff."*

**Explicación:** prohíbe al navegador adivinar el tipo MIME: si dice `text/plain`, no se interpreta como HTML. Cierra el MIME sniffing. **Niveles: L1, L2, L3.**

### 14.4.5 — Strict-Transport-Security (CWE-523)

> *"Verifique que se incluye un encabezado Strict-Transport-Security en todas las respuestas y para todos los subdominios, como Strict-Transport-Security: max-age-15724800; includeSubdomains."*

**Explicación:** HSTS le dice al navegador "solo HTTPS a este dominio, incluso si escribes http://": elimina los ataques de degradación (SSL stripping) y las conexiones en claro accidentales. **Niveles: L1, L2, L3.**

### 14.4.6 — Referrer-Policy (CWE-116)

> *"Verifique que se incluya adecuadamente un encabezado de Referrer-Policy para evitar exponer información confidencial en la URL a través del encabezado de referencia a partes que no son de confianza."*

**Explicación:** al hacer clic en un enlace externo, la URL completa (con tokens o IDs) se envía en el Referer: `Referrer-Policy: no-referrer` o `strict-origin-when-cross-origin` evita la filtración. **Niveles: L1, L2, L3.**

### 14.4.7 — Sin incrustación en sitios de terceros (CWE-1021)

> *"Verifique que el contenido de una aplicación web no se puede incrustar en un sitio de terceros de forma predeterminada y que la inserción de los recursos exactos solo se permite cuando sea necesario mediante el uso adecuado de Content-Security-Policy: frame-ancestors y encabezados de respuesta X-Frame-Options."*

**Explicación:** un sitio malicioso puede incrustar tu app en un iframe transparente y engañar al usuario para que haga clic (clickjacking): `X-Frame-Options: DENY` y `frame-ancestors` lo impiden por defecto. **Niveles: L1, L2, L3.**

## V14.5 Validación de Encabezado de Solicitud HTTP

### 14.5.1 — Solo los métodos HTTP usados (CWE-749)

> *"Verifique que el servidor de aplicaciones solo acepta los métodos HTTP que utiliza la aplicación/API, incluidas las pre-flight OPTIONS, y los Logs/alertas en cualquier solicitud que no sea válida para el contexto de la aplicación."*

**Explicación:** `TRACE`, `PUT` o `DELETE` que la app no usa se rechazan: cada método extra es una puerta (TRACE habilitado = robo de cookies vía XST). Y se alerta cuando llegan. **Niveles: L1, L2, L3.**

### 14.5.2 — Origin no usado para autorización (CWE-346)

> *"Verifique que el encabezado Origin proporcionado no se utiliza para las decisiones de autenticación o control de acceso, ya que un atacante puede cambiar fácilmente el encabezado Origin."*

**Explicación:** `Origin` lo escribe el cliente: confiar en él para decidir quién eres es como confiar en la firma que el atacante escribe a mano. Nunca es base de autorización. **Niveles: L1, L2, L3.**

### 14.5.3 — CORS con lista estricta de orígenes (CWE-346)

> *"Verifique que el encabezado Cross-Origin Resource Sharing (CORS) Access-Control-Allow-Origin utiliza una estricta lista de permisos de dominios y subdominios de confianza para que coincidan entre si, y no se permita el origen 'nulo'."*

**Explicación:** `Access-Control-Allow-Origin: *` o reflejar cualquier origen convierte tu API en lectura libre para cualquier sitio. Solo se permiten los orígenes exactos de tu lista, nunca `null`. **Niveles: L1, L2, L3.**

## Referencias

OWASP Secure Headers Project, OWASP Testing Guide 4.0 (Configuration and Deployment Management Testing).

## Resumen

> V14 asegura el entorno y la configuración: pipelines CI/CD repetibles,
> dependencias actualizadas con SBOM y SRI, sin modo debug ni versiones
> expuestas, todos los encabezados de seguridad (CSP, HSTS, nosniff,
> anti-frame) y validación estricta de métodos, CORS y orígenes.