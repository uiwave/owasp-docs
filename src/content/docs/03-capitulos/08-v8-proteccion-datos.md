---
title: "V8: Protección de Datos"
description: "Capítulo V8 del ASVS 4.0.3: protección general de datos, datos en el cliente y datos privados confidenciales."
---

Hay tres elementos clave para una protección de datos sólida: **Confidencialidad, Integridad y Disponibilidad (CIA)**. El estándar asume que la protección se aplica en un sistema de confianza (el servidor, reforzado).

> Las aplicaciones deben asumir que **todos los dispositivos de usuario están comprometidos de alguna manera**. Cuando se transmite o almacena información confidencial en dispositivos inseguros (ordenadores compartidos, teléfonos, tabletas), la aplicación es responsable de garantizar que esos datos estén cifrados y no puedan obtenerse, modificarse o divulgarse de forma ilícita.
>
> - **Confidencialidad:** los datos se protegen de la observación no autorizada, en tránsito y en reposo.
> - **Integridad:** los datos se protegen de ser creados, alterados o eliminados maliciosamente.
> - **Disponibilidad:** los datos están disponibles para los usuarios autorizados según sea necesario.

## V8.1 Protección General de Datos

### 8.1.1 — Datos confidenciales fuera de cachés de servidor (CWE-524)

> *"Verifique que la aplicación protege los datos confidenciales de la caché en componentes del servidor, como balanceadores de carga y cachés de aplicaciones."*

**Explicación:** las respuestas con datos sensibles no deben quedar cacheadas en el servidor (Varnish, Redis, proxy inverso): otro usuario —o un atacante con acceso a la caché— podría leerlas. **Niveles: L1, L2.**

### 8.1.2 — Copias temporales purgadas (CWE-524)

> *"Verifique que todas las copias almacenadas en caché o temporales de datos confidenciales almacenados en el servidor están protegidas contra el acceso no autorizado o purgadas/invalidadas después de que el usuario autorizado acceda a los datos confidenciales."*

**Explicación:** tras servir un dato sensible, las copias temporales (caché, archivos intermedios, buffers) se invalidan o eliminan. Los datos sensibles no "viven" más de lo necesario. **Niveles: L1, L2.**

### 8.1.3 — Minimizar parámetros de la solicitud (CWE-233)

> *"Verifique que la aplicación minimiza el número de parámetros de una solicitud, como campos ocultos, variables Ajax, cookies y valores de encabezado."*

**Explicación:** cada parámetro extra que viaja con la petición es una superficie de ataque más (manipulación, fugas). Mientras menos se envía del lado del cliente, mejor. **Niveles: L1, L2.**

### 8.1.4 — Detección de solicitudes anormales (CWE-770)

> *"Verifique que la aplicación puede detectar y alertar sobre números anormales de solicitudes, como por IP, usuario, total por hora o día, o lo que tenga sentido para la aplicación."*

**Explicación:** cientos de peticiones por minuto desde una IP o descargas masivas de registros son señales de ataque (scraping, extracción). Detecta y alerta: la extracción masiva es un ataque silencioso. **Niveles: L1, L2.**

### 8.1.5 — Backups periódicos probados (CWE-19)

> *"Verifique que se realizan copias de seguridad periódicas de datos importantes y que se realizan pruebas de la restauración de datos."*

**Explicación:** un backup sin prueba de restauración es una promesa vacía: frente a ransomware o borrado accidental, el backup que no se puede restaurar no sirve. **Nivel: L1.**

### 8.1.6 — Backups almacenados de forma segura (CWE-19)

> *"Verifique que las copias de seguridad se almacenan de forma segura para evitar que los datos sean robados o se dañen."*

**Explicación:** los backups suelen estar cifrados o no: un backup en claro es una fuga de datos de todo el sistema. Cifra, protege y controla el acceso a las copias. **Nivel: L1.**

## V8.2 Protección de Datos del Lado del Cliente

### 8.2.1 — Encabezados anti-caché (CWE-525)

> *"Verifique que la aplicación establece suficientes encabezados anti-almacenamiento en caché para que los datos confidenciales no se almacenen en caché en los navegadores modernos."*

**Explicación:** en un ordenador compartido, una página con datos sensibles cacheados en el navegador queda disponible para el siguiente usuario. Usa `Cache-Control: no-store` en respuestas sensibles. **Niveles: L1, L2, L3.**

### 8.2.2 — Sin datos confidenciales en el almacenamiento del navegador (CWE-922)

> *"Verifique que los datos almacenados en el almacenamiento del navegador (como localStorage, sessionStorage, IndexedDB o cookies) no contengan datos confidenciales."*

**Explicación:** el dispositivo del usuario es territorio hostil: localStorage es accesible a cualquier XSS y persiste. Los datos sensibles viven en el servidor, no en el cliente. **Niveles: L1, L2, L3.**

### 8.2.3 — Datos autenticados borrados al terminar la sesión (CWE-922)

> *"Verifique que los datos autenticados se borran del almacenamiento del cliente, como el DOM del explorador, después de que se termine el cliente o la sesión."*

**Explicación:** al cerrar sesión (o expirar), se limpia todo resto de datos de la sesión en el cliente: nada de "huellas" para el siguiente usuario del equipo. **Niveles: L1, L2, L3.**

## V8.3 Datos Privados Confidenciales

Esta sección protege los datos confidenciales de la creación, lectura, actualización o eliminación sin autorización, **especialmente en cantidades masivas**. Cumplirla implica cumplir el control de acceso V4 (y en particular V4.2).

> *Nota: las regulaciones de privacidad (GDPR, Principios de Privacidad de Australia APP-11...) afectan directamente al almacenamiento, uso y transmisión de información personal. Consulte sus leyes locales y a un especialista en privacidad o abogado calificado.*

### 8.3.1 — Datos sensibles nunca en la URL (CWE-319)

> *"Verifique que los datos confidenciales se envían al servidor en el cuerpo o encabezados del mensaje HTTP y que los parámetros de cadena de consulta de cualquier verbo HTTP no contienen datos confidenciales."*

**Explicación:** los datos en la URL (query string) quedan en logs, historial y cabecera Referer. Los datos sensibles viajan en el cuerpo del mensaje. **Niveles: L1, L2, L3.**

### 8.3.2 — Eliminar o exportar datos bajo demanda (CWE-212)

> *"Verifique que los usuarios tienen un método para eliminar o exportar sus datos sobre demanda (on demand)."*

**Explicación:** el derecho al olvido y la portabilidad: el usuario puede pedir "borra mis datos" o "dame una copia" y la app lo cumple. **Niveles: L1, L2, L3.**

### 8.3.3 — Lenguaje claro y consentimiento (CWE-285)

> *"Verifique que se proporciona a los usuarios un lenguaje claro con respecto a la recopilación y el uso de la información personal suministrada y que los usuarios han proporcionado el consentimiento de aceptación para el uso de esos datos antes de que se utilicen de alguna manera."*

**Explicación:** antes de recopilar, se explica (en lenguaje simple) qué se recoge y para qué, y se obtiene el consentimiento. Sin consentimiento, no hay uso. **Niveles: L1, L2, L3.**

### 8.3.4 — Inventario y política de datos confidenciales (CWE-200, C8)

> *"Verifique que se han identificado todos los datos confidenciales creados y procesados por la aplicación, y asegúrese de que existe una política sobre cómo tratar los datos confidenciales."*

**Explicación:** no puedes proteger lo que no sabes que existe: haz inventario de los datos confidenciales y define una política de tratamiento. **Niveles: L1, L2, L3.**

### 8.3.5 — Auditoría de acceso a datos confidenciales (CWE-532)

> *"Verifique que el acceso a los datos confidenciales se audita (sin registrar los datos confidenciales en sí), si los datos se recopilan en las directivas de protección de datos pertinentes o donde se requiere el registro del acceso."*

**Explicación:** se registra *quién accedió y cuándo*, pero no el contenido: la auditoría de acceso sin exponer los datos. **Niveles: L1, L2.**

### 8.3.6 — Sobrescribir memoria sensible (CWE-226)

> *"Verifique que la información confidencial contenida en la memoria se sobrescribe tan pronto como ya no sea necesaria para mitigar los ataques de volcado de memoria, utilizando ceros o datos aleatorios."*

**Explicación:** las contraseñas y claves en memoria se "borran" sobrescribiéndolas con ceros: un volcado de memoria (malware, crash dump) no debe revelar secretos. **Niveles: L1, L2.**

### 8.3.7 — Cifrado con confidencialidad e integridad (CWE-327, C8)

> *"Verifique que la información confidencial o privada que se requiere que se cifre, se cifra mediante algoritmos aprobados que proporcionan confidencialidad e integridad."*

**Explicación:** cifrar no basta: hace falta integridad. Algoritmos autenticados (AES-GCM, ChaCha20-Poly1305) que garantizan que el dato no se modificó. **Niveles: L1, L2.**

### 8.3.8 — Retención de datos con eliminación automática (CWE-285)

> *"Verifique que la información personal confidencial está sujeta a la clasificación de retención de datos, de forma que los datos antiguos o desactualizados se eliminen automáticamente, según una programación o según la situación lo requiera."*

**Explicación:** los datos personales no se guardan para siempre: política de retención con borrado automático (90 días, 1 año... según lo que exija la ley). **Niveles: L1, L2.**

> **Al considerar la protección de datos**, el foco debe estar en la extracción masiva, la modificación o el uso excesivo: muchas redes sociales limitan a 100 amigos nuevos por día; una plataforma bancaria bloquea más de 5 transferencias por hora a instituciones externas. Decidir qué es "anormal" depende del modelo de amenaza y del riesgo empresarial. Lo importante: **detectar, disuadir o bloquear las acciones masivas anormales.**

## Referencias

Security Headers (check de encabezados anti-caché), OWASP Secure Headers project, OWASP Privacy Risks Project, OWASP User Privacy Protection Cheat Sheet, GDPR (Unión Europea), Internet Privacy Engineering Network (EDPS).

## Resumen

> V8 asume que el dispositivo del usuario está comprometido: los datos
> sensibles viven cifrados en el servidor, no viajan en URLs ni se guardan
> en cachés o en el navegador; el usuario tiene control de sus datos
> (borrado/exportación) y las políticas de retención los eliminan cuando
> dejan de ser necesarios.