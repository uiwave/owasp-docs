---
title: "V2: Autenticación"
description: "Capítulo V2 del ASVS 4.0.3: autenticación, contraseñas, autenticadores, almacenamiento de credenciales y recuperación."
---

La **autenticación** responde la pregunta *"¿quién eres?"*. Es el acto de establecer o confirmar que alguien (o algo) es auténtico, resistente a la suplantación e impide la recuperación o interceptación de contraseñas.

Este capítulo es **uno de los más cambiados del ASVS**: adopta el estándar moderno **NIST 800-63**, basado en evidencia. Las novedades son revolucionarias para muchos equipos:

- **Usuarios y contraseñas filtradas ya no son "secretos"**: miles de millones de combinaciones `usuario+contraseña` están publicadas en internet, así que NIST las trata como *pre-violadas*.
- **Adiós a la rotación periódica de contraseñas**: cambiarlas cada 3 meses genera contraseñas más débiles.
- **Adiós a las "preguntas secretas"** (autenticación basada en conocimiento): se considera información pública.
- **Mínimo 12 caracteres** en contraseñas nuevas.
- **SMS y email** son autenticadores "restringidos": solo como factor secundario, no como reemplazo.
- El objetivo: **transición a un futuro post-contraseña**, con MFA y autenticadores criptográficos.

**Leyenda de niveles:** `V` = requerido · `o` = recomendado, pero no requerido.

## V2.1 Seguridad de Contraseña

Las contraseñas (llamadas "secretos memorizados" por NIST) incluyen contraseñas, PIN, patrones de desbloqueo e incluso "elegir el gatito correcto" en imágenes. Son "algo que sabes", autenticadores de un solo factor.

### 2.1.1 — Mínimo 12 caracteres (CWE-521, C6)

> *"Verifique que las contraseñas de los usuarios tienen al menos 12 caracteres de longitud (después de combinar varios espacios)."*

**Explicación:** 12 caracteres es el mínimo moderno basado en evidencia: es la longitud en la que el esfuerzo de fuerza bruta se vuelve impráctico. **Niveles: L1, L2, L3.**

### 2.1.2 — Permitir hasta 64, denegar más de 128 (CWE-521, C6)

> *"Verifique que se permitan contraseñas de al menos 64 caracteres y que se denieguen contraseñas de más de 128 caracteres."*

**Explicación:** permite frases largas (passphrases) — el límite superior de 128 previene ataques de denegación de servicio por hash de contraseñas gigantes. **Niveles: L1, L2, L3.**

### 2.1.3 — Sin truncamiento de contraseña (CWE-521, C6)

> *"Verifique que no se realiza el truncamiento de contraseña. Sin embargo, varios espacios consecutivos pueden ser reemplazados por un solo espacio."*

**Explicación:** nunca cortes la contraseña silenciosamente (algunos sistemas viejos solo guardaban los primeros 8 caracteres). El usuario cree que su contraseña es larga, pero en realidad es corta. **Niveles: L1, L2, L3.**

### 2.1.4 — Permitir cualquier carácter Unicode imprimible (CWE-521, C6)

> *"Verifique que cualquier carácter Unicode imprimible, incluidos los caracteres neutros del idioma, como espacios y emojis, está permitido en las contraseñas."*

**Explicación:** bloquear caracteres reduce la complejidad posible y discrimina a usuarios de otros idiomas. Deja que la contraseña sea lo que el usuario quiera (incluidos emojis). **Niveles: L1, L2, L3.**

### 2.1.5 — Los usuarios pueden cambiar su contraseña (CWE-620)

> *"Verifique que los usuarios pueden cambiar su contraseña."*

**Explicación:** si el usuario sospecha que su contraseña fue comprometida, debe poder cambiarla sin trámites imposibles. **Niveles: L1, L2, L3.**

### 2.1.6 — El cambio de contraseña requiere la actual y la nueva (CWE-620)

> *"Verifique que la funcionalidad de cambio de contraseña requiere la contraseña actual y nueva del usuario."*

**Explicación:** pedir la contraseña actual evita que alguien con una sesión robada cambie la contraseña de la víctima sin saber la original. **Niveles: L1, L2, L3.**

### 2.1.7 — Comprobación contra contraseñas filtradas (CWE-521, C6)

> *"Verifique que las contraseñas enviadas durante el registro de la cuenta, el inicio de sesión y el cambio de contraseña se comprueban localmente contra un conjunto de contraseñas filtradas (como las 1,000 o 10,000 más comunes) o mediante una API externa. Si se utiliza una API, una prueba de zero knowledge u otro mecanismo, asegúrese que la contraseña en texto plano no se envía ni se utiliza para verificar el estado de filtración de la contraseña. Si la contraseña está filtrada, la aplicación debe exigir al usuario que establezca una nueva contraseña no filtrada."*

**Explicación:** si la contraseña elegida está en las listas públicas de contraseñas filtradas (ej. "123456", "password"), se rechaza. Herramientas como *Have I Been Pwned* permiten verificar sin enviar la contraseña completa (técnica de zero knowledge). **Niveles: L1, L2, L3.**

### 2.1.8 — Medidor de fortaleza de contraseña (CWE-521)

> *"Verifique que se proporciona un medidor de fortaleza de la contraseña para ayudar a los usuarios a establecer una contraseña más segura."*

**Explicación:** un medidor orienta al usuario en el momento exacto en que crea la contraseña. **Niveles: L1, L2, L3.**

### 2.1.9 — Sin reglas de composición de caracteres (CWE-521, C6)

> *"Verifique que no hay reglas de composición de contraseñas que limiten el tipo de caracteres permitidos. No debe haber ningún requisito para mayúsculas o minúsculas o números o caracteres especiales."*

**Explicación:** "debe tener mayúscula, número y símbolo" suena seguro, pero la evidencia muestra que produce contraseñas más predecibles (P@ssw0rd1!). La longitud es la que da fuerza. **Niveles: L1, L2, L3.**

### 2.1.10 — Sin rotación periódica de credenciales (CWE-263)

> *"Verifique que no haya rotación periódica de credenciales o solicitud del historial de contraseñas."*

**Explicación:** el cambio forzado cada N meses genera contraseñas débiles ("Marzo2025!", "Abril2025!"). Solo se rota cuando hay sospecha real de compromiso. **Niveles: L1, L2, L3.**

### 2.1.11 — Permitir pegar y gestores de contraseñas (CWE-521)

> *"Verifique que se permite la funcionalidad 'pegar', las aplicaciones auxiliares de contraseñas del browser y los administradores externos de contraseñas."*

**Explicación:** bloquear "pegar" es un mito de seguridad que solo daña: impide usar gestores de contraseñas (la práctica más segura que existe). **Niveles: L1, L2, L3.**

### 2.1.12 — Opción de ver temporalmente la contraseña (CWE-521)

> *"Verifique que el usuario puede elegir entre ver temporalmente toda la contraseña enmascarada o ver temporalmente el último carácter escrito de la contraseña en plataformas que no tienen esto como funcionalidad integrada."*

**Explicación:** el botón "ojito" (mostrar/ocultar) mejora la usabilidad con contraseñas largas y gestores, sin riesgo real: quien mira la pantalla ya es un riesgo en sí. **Niveles: L1, L2, L3.**

## V2.2 Seguridad General del Autenticador

> *"La agilidad del autenticador es esencial para aplicaciones preparadas para el futuro":* el código debe permitir agregar nuevos autenticadores (FIDO, push) y retirar los obsoletos (SMS/email) de forma ordenada.

### 2.2.1 — Controles anti-automatización (CWE-307)

> *"Verifique que los controles anti-automatización son efectivos para mitigar las pruebas de credenciales filtradas, fuerza bruta y ataques de bloqueo de cuentas. Estos controles incluyen el bloqueo de las contraseñas filtradas más comunes, bloqueos suaves, limitación de velocidad, CAPTCHA, retrasos cada vez mayores entre intentos, restricciones de direcciones IP o restricciones basadas en riesgos... Verifique que no sea posible realizar más de 100 intentos fallidos por hora en una sola cuenta."*

**Explicación:** los atacantes automatizan miles de intentos por minuto. Debes ralentizarlos: límite de intentos, retrasos crecientes, CAPTCHA, y un tope de 100 fallos/hora por cuenta. **Niveles: L1, L2, L3.**

### 2.2.2 — Autenticadores débiles solo como secundarios (CWE-304)

> *"Verifique que el uso de autenticadores débiles (como SMS y correo electrónico) se limita a la verificación secundaria y la aprobación de transacciones y no como un reemplazo para métodos de autenticación más seguros. Verifique que se ofrezcan métodos más fuertes y no métodos débiles, que los usuarios sean conscientes de los riesgos o que se tomen las medidas adecuadas para limitar los riesgos de compromiso de la cuenta."*

**Explicación:** SMS y email pueden ser interceptados (SIM swapping, buzones hackeados). Sirven como segundo factor con riesgo aceptado, nunca como factor principal. **Niveles: L1, L2, L3.**

### 2.2.3 — Notificaciones de cambios de autenticación (CWE-620)

> *"Verifique que las notificaciones seguras se envían a los usuarios después de las actualizaciones de los detalles de autenticación, como restablecimientos de credenciales, cambios de correo electrónico o dirección, inicio de sesión desde ubicaciones desconocidas o de riesgo. Se prefiere el uso de notificaciones push - en lugar de SMS o correo electrónico -, pero en ausencia de notificaciones push, SMS o correo electrónico es aceptable siempre y cuando no se divulgue información confidencial en la notificación."*

**Explicación:** "Tu contraseña fue cambiada" / "Nuevo inicio de sesión desde otra ciudad": el usuario debe enterarse de actividades anómalas. Prefiere push; si usas email/SMS, no reveles datos sensibles en el mensaje. **Niveles: L1, L2, L3.**

### 2.2.4 — Resistencia a la suplantación (phishing) (CWE-308)

> *"Verifique la resistencia a la suplantación contra el phishing, como el uso de la autenticación multifactor, los dispositivos criptográficos con intención (como las claves conectadas con un push para autenticarse) o en niveles AAL más altos, certificados del lado cliente."*

**Explicación:** MFA detiene la mayoría del phishing: aunque el atacante robe la contraseña, no tiene el segundo factor. Los dispositivos "con intención" (claves FIDO con botón) añaden confirmación humana. **Niveles: L3.**

### 2.2.5 — TLS mutuo entre CSP y aplicación (CWE-319)

> *"Verifique que donde se separan un proveedor de servicios de credenciales (CSP) y la aplicación que comprueba la autenticación, el TLS mutuamente autenticado está en su lugar entre los dos endpoints."*

**Explicación:** cuando tu app habla con un proveedor de identidad (Google, Okta, etc.), ambos deben autenticarse mutuamente con certificados: nadie puede hacerse pasar por ninguno de los dos. **Niveles: L3.**

### 2.2.6 — Resistencia a la reproducción (CWE-308)

> *"Verifique la resistencia a la reproducción mediante el uso obligatorio de dispositivos de one-time password (OTP), autenticadores criptográficos o códigos de búsqueda."*

**Explicación:** un código OTP sirve una sola vez: aunque el atacante lo capture, no puede reutilizarlo. Eso es resistencia a la "reproducción" (replay). **Niveles: L3.**

### 2.2.7 — Intención de autenticarse (CWE-308)

> *"Verifique la intención de autenticarse exigiendo la entrada de un token de OTP o una acción iniciada por el usuario, como una pulsación de botón en un teclado de hardware FIDO."*

**Explicación:** el usuario debe confirmar activamente (presionar el botón de la llave, teclear el código). Así un ataque remoto no puede autenticarse sin que la persona lo note. **Niveles: L3.**

## V2.3 Ciclo de Vida del Autenticador

> *"Si alguien puede registrar automáticamente una cuenta sin evidencia de identidad, puede haber poca confianza en la aserción de identidad."* Para Reddit está bien; para un banco, el registro de credenciales y dispositivos debe ser estricto. Nota: las contraseñas **no** deben tener duración máxima ni rotación; se comprueban contra listas filtradas, no se reemplazan periódicamente.

### 2.3.1 — Contraseñas iniciales generadas de forma segura (CWE-330)

> *"Verifique que las contraseñas iniciales o los códigos de activación generados por el sistema DEBEN ser generados de forma aleatoriamente segura, DEBE tener al menos 6 caracteres de largo y PUEDE contener letras y números, y expirar después de un corto período de tiempo. Estos secretos iniciales no deben permitirse su re-utilización para convertirse en la contraseña a largo plazo."*

**Explicación:** si el sistema crea una contraseña temporal, debe ser aleatoria, de mínimo 6 caracteres y obligar a cambiarla pronto. Y el usuario no puede quedársela como contraseña definitiva. **Niveles: L1, L2, L3.**

### 2.3.2 — Inscripción de dispositivos del usuario (CWE-308)

> *"Verifique que se admite la inscripción y el uso de dispositivos de autenticación proporcionados por el suscriptor, como tokens U2F o FIDO."*

**Explicación:** deja que el usuario registre sus propias llaves de seguridad (FIDO/U2F): son el autenticador más resistente al phishing. **Niveles: L2, L3.**

### 2.3.3 — Instrucciones de renovación oportunas (CWE-287)

> *"Verifique que las instrucciones de renovación se envían con tiempo suficiente para renovar los autenticadores con límite de tiempo."*

**Explicación:** si el autenticador expira (ej. certificado de 1 año), avisa con anticipación para renovarlo sin dejar al usuario fuera. **Niveles: L2, L3.**

## V2.4 Almacenamiento de Credenciales

> **Importante:** esta sección solo se puede verificar con **revisión de código fuente** o pruebas unitarias — el pentest no puede detectarla. No está marcada L1 porque no es probada por penetración, pero es **vital**: si los atacantes roban tu base de datos, aquí se decide si las contraseñas sobreviven.

### 2.4.1 — Contraseñas almacenadas con hash + salt (CWE-916, C6)

> *"Verifique que las contraseñas se almacenan en una forma que resiste ataques sin conexión. Las contraseñas DEBERÍAN usar hash con salto mediante una derivación de llave de una sola vía aprobada o función de hash de contraseña. Las funciones de derivación de llave y hash de contraseñas toman una contraseña, un salto y un factor de costo como entradas al generar un hash de contraseña."*

**Explicación:** jamás guardes contraseñas en texto plano ni con hash simple (MD5/SHA1). Usa funciones de hash de contraseña (bcrypt, PBKDF2, argon2) con *salt* (salto) y factor de costo. **Niveles: L2, L3.**

### 2.4.2 — Salt único de al menos 32 bits (CWE-916, C6)

> *"Verifique que el salto tiene al menos 32 bits de longitud y que se elige arbitrariamente para minimizar las colisiones de valor de salto entre los hashes almacenados. Para cada credencial, se DEBE almacenar un único valor de salto y el hash resultante."*

**Explicación:** el *salt* aleatorio hace que dos usuarios con la misma contraseña tengan hashes distintos, y rompe las tablas rainbow. Cada contraseña guarda su propio salt. **Niveles: L2, L3.**

### 2.4.3 — PBKDF2 con al menos 100,000 iteraciones (CWE-916, C6)

> *"Verifique que si se utiliza PBKDF2, el recuento de iteraciones DEBE ser tan grande como el rendimiento del servidor de verificación lo permita, normalmente de al menos 100,000 iteraciones."*

**Explicación:** el factor de costo hace que calcular cada hash tarde tiempo (lo cual es bueno: el atacante también tarda). PBKDF2: mínimo 100.000 iteraciones. **Niveles: L2, L3.**

### 2.4.4 — bcrypt con factor de trabajo mínimo 10 (CWE-916, C6)

> *"Verifique que si se utiliza bcrypt, el factor de trabajo DEBE ser tan grande como lo permita el rendimiento del servidor de verificación, con un mínimo de 10."*

**Explicación:** bcrypt tiene un factor de trabajo (cost) configurable; el mínimo aceptable hoy es 10, y debe subirse con el tiempo (el hardware mejora). **Niveles: L2, L3.**

### 2.4.5 — Iteración adicional con salt secreto (CWE-916)

> *"Verifique que se realiza una iteración adicional de una función de derivación de claves, utilizando un valor de salto que es secreto y que solo conoce el verificador. Genere el valor de salto utilizando un generador de bits aleatorios aprobado y proporcione al menos la fuerza de seguridad mínima especificada. El valor secreto del salto se almacenará por separado de las contraseñas hash (p. ej., en un dispositivo especializado como un módulo de seguridad de hardware)."*

**Explicación:** un *salt* adicional secreto, guardado aparte (HSM), hace que robar la base de datos no baste: el atacante necesita también el secret (doble factor de protección). **Niveles: L2, L3.**

## V2.5 Recuperación de Credenciales

### 2.5.1 — Secretos de activación nunca en texto claro (CWE-640, C6)

> *"Verifique que un secreto de activación o recuperación inicial generado por el sistema no se envía en texto claro al usuario."*

**Explicación:** el enlace o código de recuperación debe llegar por canal seguro (cifrado), y no debe quedar visible en la URL ni en logs. **Niveles: L1, L2, L3.**

### 2.5.2 — Sin preguntas secretas (CWE-640)

> *"Verifique que las sugerencias de contraseña o autenticación basada en conocimientos (las llamadas 'preguntas secretas') no están presentes."*

**Explicación:** "¿nombre de tu primera mascota?" es información pública (redes sociales) o adivinable. NIST las considera inútiles: elimínalas. **Niveles: L1, L2, L3.**

### 2.5.3 — La recuperación no revela la contraseña actual (CWE-640, C6)

> *"Verifique que la recuperación de credenciales de contraseña no revela la contraseña actual de ninguna manera."*

**Explicación:** si el sistema te "muestra" tu contraseña actual, es que la guarda de forma recuperable (mala práctica). La recuperación solo debe permitir *establecer una nueva*. **Niveles: L1, L2, L3.**

### 2.5.4 — Sin cuentas compartidas ni predeterminadas (CWE-16)

> *"Verifique que las cuentas compartidas o predeterminadas no están presentes (por ejemplo, 'root', 'admin', o 'sa')."*

**Explicación:** cuentas tipo `admin/admin` son la primera puerta que prueban los atacantes. Cada persona debe tener su cuenta única; elimina las predeterminadas. **Niveles: L1, L2, L3.**

### 2.5.5 — Notificar al usuario el cambio de factor (CWE-304)

> *"Verifique que si se cambia o reemplaza un factor de autenticación, se notifica al usuario de este evento."*

**Explicación:** si alguien registra un nuevo teléfono o llave en tu cuenta, debes enterarte: la notificación permite detectar la apropiación de la cuenta a tiempo. **Niveles: L1, L2, L3.**

### 2.5.6 — Recuperación con mecanismo seguro (CWE-640, C6)

> *"Verifique que la contraseña olvidada y otras rutas de recuperación utilizan un mecanismo de recuperación seguro, como OTP basado en el tiempo (TOTP) u otro token de software, mobile push u otro mecanismo de recuperación sin conexión."*

**Explicación:** el "olvidé mi contraseña" debe usar TOTP, push o códigos de un solo uso — no preguntas secretas ni solo email reenviable. **Niveles: L1, L2, L3.**

### 2.5.7 — Re-prueba de identidad para perder factores (CWE-308)

> *"Verifique que si se pierden factores de autenticación OTP o multifactor, esa evidencia de prueba de identidad se realiza al mismo nivel que durante la inscripción."*

**Explicación:** perder el teléfono no debe permitir recuperar la cuenta fácilmente: la verificación de identidad debe ser tan rigurosa como el registro inicial. **Niveles: L2, L3.**

## V2.6 Verificador de Secretos de Look-up

Los *secretos de look-up* (búsqueda) son listas pre-generadas de códigos secretos, similares a los números de autorización de transacción (TAN) o los códigos de recuperación de redes sociales: "algo que tienes". Se usan una vez y, agotados, se descarta la lista.

### 2.6.1 — Secretos de búsqueda de un solo uso (CWE-308)

> *"Verifique que los secretos de búsqueda solo se pueden usar una vez."*

**Explicación:** cada código de la lista sirve una única vez. Si se reutilizan, un código capturado vale para siempre. **Niveles: L2, L3.**

### 2.6.2 — Suficiente aleatoriedad o hash con salt (CWE-330)

> *"Verifique que los secretos de búsqueda tengan suficiente aleatoriedad (112 bits de entropía), o si menos de 112 bits de entropía, saltados con un único y aleatorio salto de 32 bits y hasheados con un hash aprobado de una sola vía."*

**Explicación:** los códigos deben ser impredecibles (alta entropía), o almacenarse con hash + salt para resistir robos de la base. **Niveles: L2, L3.**

### 2.6.3 — Resistentes a ataques sin conexión (CWE-310)

> *"Verifique que los secretos de búsqueda son resistentes a los ataques sin conexión, como los valores predecibles."*

**Explicación:** si el atacante roba la lista, no debe poder adivinar los códigos restantes ni descifrar los almacenados. **Niveles: L2, L3.**

## V2.7 Verificador Fuera de Banda

> En el pasado, el verificador fuera de banda común era un email o SMS con un enlace de restablecimiento — mecanismo débil que los atacantes explotan. Los **autenticadores seguros fuera de banda** son dispositivos físicos que se comunican por un canal secundario seguro (ej. notificaciones push). Son "algo que tienes". No se permiten autenticadores inseguros (email, VoIP); SMS y RTC están "restringidos" y deben ser reemplazados por push.

### 2.7.1 — No ofrecer SMS/PSTN por defecto (CWE-287)

> *"Verifique que los autenticadores de texto sin cifrar fuera de banda tales como PSTN o SMS ('restringido por NIST') no se ofrecen de forma predeterminada, y que en primer lugar se ofrecen alternativas más sólidas, como las notificaciones push."*

**Explicación:** SMS puede ser interceptado (SIM swapping). Ofrece primero push y alternativas fuertes; SMS solo como opción explícita del usuario. **Niveles: L1, L2, L3.**

### 2.7.2 — Expiración en 10 minutos (CWE-287)

> *"Verifique que el verificador fuera de banda expira después de 10 minutos, fuera de las solicitudes de autenticación de banda, códigos o tokens."*

**Explicación:** el código de verificación debe caducar en máximo 10 minutos: una ventana menor reduce el tiempo de reutilización por el atacante. **Niveles: L1, L2, L3.**

### 2.7.3 — Uso único y ligado a la solicitud original (CWE-287)

> *"Verifique que las solicitudes de autenticación, los códigos o los tokens de verificador fuera de banda solo se pueden usar una vez y solo para la solicitud de autenticación original."*

**Explicación:** el código es de un solo uso y solo sirve para la sesión que lo generó: no puede reutilizarse en otro inicio de sesión. **Niveles: L1, L2, L3.**

### 2.7.4 — Canal independiente y seguro (CWE-523)

> *"Verifique que el autenticador y el verificador fuera de banda se comunican a través de un canal independiente seguro."*

**Explicación:** el código viaja por un canal distinto del que se autentica (ej. el push llega a tu teléfono mientras inicias sesión en la computadora). Interceptar ambos es mucho más difícil. **Niveles: L1, L2, L3.**

### 2.7.5 — Solo la versión hasheada del código (CWE-256)

> *"Verifique que el verificador fuera de banda conserva solo una versión hasheada del código de autenticación."*

**Explicación:** el servidor guarda el hash del código (no el código). Así, robar la base no permite generar ni reutilizar códigos. **Niveles: L2, L3.**

### 2.7.6 — Código con al menos 20 bits de entropía (CWE-310)

> *"Verifique que el código de autenticación inicial sea generado por un generador de números aleatorios seguro, que contiene al menos 20 bits de entropía (normalmente un número aleatorio digital de seis es suficiente)."*

**Explicación:** un código de 6 dígitos aleatorios (~20 bits de entropía) es suficiente si se genera con un generador criptográficamente seguro. **Niveles: L2, L3.**

## V2.8 Verificador de Una Sola Vez

Los OTP de un solo factor son tokens físicos o flexibles que muestran un desafío pseudoaleatorio que cambia continuamente: hacen el phishing difícil, pero no imposible. Son "algo que tienes". Los tokens multifactor requieren además PIN, biometría o NFC.

### 2.8.1 — OTP con duración definida (CWE-613)

> *"Verifique que los OTP basados en el tiempo tienen una duración definida antes de expirar."*

**Explicación:** el código TOTP caduca (normalmente 30–60 segundos): una ventana finita evita reutilización prolongada. **Niveles: L1, L2, L3.**

### 2.8.2 — Claves simétricas altamente protegidas (CWE-320)

> *"Verifique que las claves simétricas utilizadas para comprobar los OTP enviados están altamente protegidas, por ejemplo, mediante el uso de un módulo de seguridad de hardware o almacenamiento seguro de claves basadas en el sistema operativo."*

**Explicación:** las claves que verifican OTP no viven en archivos planos: se guardan en almacenes seguros (HSM o servicios de clave del SO). **Niveles: L2, L3.**

### 2.8.3 — Algoritmos criptográficos aprobados (CWE-326)

> *"Verifique que los algoritmos criptográficos aprobados se utilizan en la generación, siembra y verificación de OTP."*

**Explicación:** usa estándares probados (TOTP/HOTP del RFC 6238/4226), no algoritmos caseros. **Niveles: L2, L3.**

### 2.8.4 — OTP de un solo uso dentro de su validez (CWE-287)

> *"Verifique que el OTP basado en el tiempo se puede utilizar solamente una vez dentro del período de validez."*

**Explicación:** aunque el código siga vigente unos segundos, usarlo dos veces debe ser imposible. **Niveles: L2, L3.**

### 2.8.5 — Reutilización de token multifactor: log + rechazo (CWE-287)

> *"Verifique que si se reutiliza un token OTP multifactor basado en el tiempo durante el período de validez, se registra en logs y se rechaza con notificación segura enviada al titular del dispositivo."*

**Explicación:** si alguien intenta reutilizar tu código OTP, es sospecha de ataque: rechaza, registra y avisa al dueño del token. **Niveles: L2, L3.**

### 2.8.6 — Revocación del generador OTP (CWE-613)

> *"Verifique que el generador OTP de un solo factor físico pueda ser revocado en caso de robo u otra pérdida. Asegúrese de que la revocación es efectiva inmediatamente en todas las sesiones iniciadas, independientemente de la ubicación."*

**Explicación:** si pierdes el token, debes poder anularlo al instante y que el efecto se aplique en todas las sesiones activas. **Niveles: L2, L3.**

### 2.8.7 — Biometría solo como factor secundario (CWE-308, o)

> *"Verifique que los autenticadores biométricos se limitan a usarlos solo como factores secundarios junto con algo que Ud. tiene y algo que Ud. sabe."*

**Explicación:** la biometría (huella, rostro) no debe ser el único factor: se usa como segundo factor junto a contraseña/llave. **Nivel: L3 (recomendado, no requerido).**

## V2.9 Verificador Criptográfico

Las claves de seguridad criptográficas son tarjetas inteligentes o llaves FIDO que el usuario conecta/empareja para autenticarse. El verificador envía un desafío y el dispositivo responde usando una clave almacenada de forma segura.

### 2.9.1 — Claves almacenadas de forma segura (CWE-320)

> *"Verifique que las claves criptográficas utilizadas en la verificación se almacenan de forma segura y protegidas contra la divulgación, como el uso de un módulo de plataforma segura (TPM) o un módulo de seguridad de hardware (HSM) o un servicio de sistema operativo que puede utilizar este almacenamiento seguro."*

**Explicación:** las claves viven en hardware seguro (TPM/HSM) o servicios de clave del SO, de donde no pueden extraerse. **Niveles: L2, L3.**

### 2.9.2 — Desafío de al menos 64 bits, único (CWE-330)

> *"Verifique que el mensaje de desafío tenga al menos 64 bits de longitud y sea estadísticamente único o sea único a lo largo de la vida útil del dispositivo criptográfico."*

**Explicación:** el desafío no debe repetirse: si se reutiliza, el atacante puede reenviar la respuesta capturada (ataque de replay). **Niveles: L2, L3.**

### 2.9.3 — Algoritmos aprobados (CWE-327)

> *"Verifique que se utilizan algoritmos criptográficos aprobados en la generación, la semilla y la verificación."*

**Explicación:** nada de criptografía inventada: usa estándares aprobados (FIDO2, PIV, etc.). **Niveles: L2, L3.**

## V2.10 Autenticación de Servicio

> Esta categoría no es comprobable con test de penetración (no tiene requisitos L1), pero en revisiones de arquitectura/código se asume que el software mínimo es el requisito L1. **El almacenamiento de texto claro de los secretos no es aceptable bajo ninguna circunstancia.**

### 2.10.1 — Sin credenciales invariables en servicios (CWE-287)

> *"Verifique que los secretos dentro del servicio no se basan en credenciales invariables, como contraseñas, claves de API o cuentas compartidas con acceso con privilegios."*

**Explicación:** los servicios no deben autenticarse entre sí con credenciales fijas que nunca rotan. Usa identidades dinámicas/rotables (ej. OAuth de servicio, certificados). **Niveles: L2 (OS assisted), L3 (HSM).**

### 2.10.2 — Sin credenciales predeterminadas en cuentas de servicio (CWE-255)

> *"Verifique que si las contraseñas son necesarias para la autenticación de servicio, la cuenta de servicio utilizada no es una credencial predeterminada. (p. ej., root/root o admin/admin son predeterminados en algunos servicios durante la instalación)."*

**Explicación:** cambia toda credencial predeterminada de servicios internos (bases de datos, colas) antes de usarlos. **Niveles: L2 (OS assisted), L3 (HSM).**

### 2.10.3 — Contraseñas de servicio protegidas sin conexión (CWE-522)

> *"Verifique que las contraseñas se almacenan con suficiente protección para evitar ataques de recuperación sin conexión, incluido el acceso al sistema local."*

**Explicación:** aunque un atacante acceda al sistema, no debe poder recuperar las contraseñas de servicio: guardadas con protección fuerte (key store). **Niveles: L2 (OS assisted), L3 (HSM).**

### 2.10.4 — Secretos fuera del código y repositorios (CWE-798)

> *"Verifique que las contraseñas, las integraciones con bases de datos y sistemas de terceros, las semillas y los secretos internos y las claves de API se administran de forma segura y no se incluyen en el código fuente ni se almacenan en los repositorios de código fuente. Dicho almacenamiento DEBE resistir ataques fuera de línea. Se recomienda el uso de un almacén de claves de software seguro (L1), TPM de hardware o un HSM (L3) para el almacenamiento de contraseñas."*

**Explicación:** los secretos nunca van en el código ni en git (un repositorio filtrado no debe revelar claves de producción). Usa gestores de secretos (vault, key store, HSM). **Niveles: L2 (OS assisted), L3 (HSM).**

## Requisitos adicionales de agencias de EE.UU.

El ASVS es un subconjunto estricto de NIST 800-63 (especialmente para IAL1/2 y AAL1/2), pero **no es suficiente para IAL3/AAL3**: las agencias de EE.UU. deben implementar NIST 800-63 completo.

## Glosario de términos del capítulo

| Término | Significado |
|---|---|
| CSP | Proveedor de servicios de credenciales (también llamado proveedor de identidades) |
| Authenticator | Código que autentica: contraseña, token, MFA, aserción federada |
| Verifier | Entidad que verifica la identidad del reclamante verificando la posesión y control de uno o dos autenticadores |
| OTP | Contraseña de una sola vez |
| SFA | Autenticadores de un solo factor (algo que sabes, eres o tienes) |
| MFA | Autenticación multifactor (dos o más factores) |

## Referencias

NIST 800-63 (A, B, C), OWASP Testing Guide 4.0 (Authentication), OWASP Cheat Sheets de Password Storage, Forgot Password y Choosing and using security questions.

## Resumen

> V2 es el capítulo más renovado: contraseñas largas sin rotación ni
> preguntas secretas, comprobación contra listas filtradas, almacenamiento
> con hash + salt + factor de costo, recuperación segura, autenticadores
> modernos (FIDO, push, OTP) y secretos de servicio fuera del código. Es la
> guía hacia el futuro post-contraseña.