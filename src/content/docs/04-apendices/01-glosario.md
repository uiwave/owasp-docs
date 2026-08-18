---
title: "Apéndice A: Glosario"
description: "Glosario de términos del OWASP ASVS 4.0.3 en español."
---

Este glosario reúne los términos definidos en el Apéndice A del ASVS 4.0.3, para que la lectura de los capítulos sea clara de principio a fin.

## A

- **Aleatorización del diseño del espacio de direcciones (ASLR):** una técnica para dificultar la explotación de errores de corrupción de memoria.
- **Autenticación:** la verificación de la identidad reclamada de un usuario de la aplicación.
- **Autenticación de dos factores (2FA):** agrega un segundo nivel de autenticación al inicio de sesión de una cuenta.
- **Arquitectura de seguridad:** una abstracción del diseño de una aplicación que identifica y describe dónde y cómo se utilizan los controles de seguridad, y la ubicación y sensibilidad de los datos del usuario y de la aplicación.

## C

- **Certificado X.509:** certificado digital que utiliza la norma internacional de infraestructura de clave pública (PKI) X.509, ampliamente aceptada, para verificar que una clave pública pertenece a la identidad contenida en el certificado.
- **Claves en código duro:** claves criptográficas almacenadas en el sistema de archivos, ya sea en código, comentarios o archivos.
- **Código malicioso:** código introducido en una aplicación durante su desarrollo sin que lo sepa el propietario, que elude la directiva de seguridad prevista. No es lo mismo que un malware, así como un virus es diferente de un gusano.
- **Componente:** una unidad de código autónoma, con interfaces de disco y de red asociadas, que se comunica con otros componentes.
- **Configuración de seguridad:** la configuración en tiempo de ejecución de una aplicación que afecta a cómo se utilizan los controles de seguridad.
- **Contraseña de un solo uso (OTP):** contraseña generada de manera única para usarse en una sola ocasión.
- **Control de seguridad:** una función o componente que realiza una comprobación de seguridad (por ejemplo, un control de acceso) o cuya ejecución resulta en un efecto de seguridad (por ejemplo, un registro de auditoría).
- **Cross-Site Scripting (XSS):** vulnerabilidad típica de las aplicaciones web que permite la inyección de scripts del lado del cliente en el contenido.
- **Ciclo de vida del desarrollo de software (SDLC):** proceso paso a paso por el cual el software se desarrolla, desde los requerimientos iniciales hasta el despliegue y mantenimiento.

## E

- **Enumeración de debilidades comunes (CWE):** lista desarrollada por la comunidad con las debilidades comunes de seguridad de software. Sirve como lenguaje común, vara de medir para las herramientas de seguridad y línea base para la identificación, mitigación y prevención de debilidades.
- **Entidad eXterna XML (XXE):** tipo de entidad XML que puede acceder a contenido local o remoto mediante un identificador de sistema declarado; puede dar lugar a varios ataques de inyección.

## F

- **Falsificación de Peticiones del Lado del Servidor (SSRF):** ataque que abusa de la funcionalidad del servidor para leer o actualizar recursos internos, suministrando o modificando una URL que el código que se ejecuta en el servidor leerá o a la que enviará datos.
- **Fast IDentity Online (FIDO):** conjunto de normas de autenticación que permite usar métodos variados, como biometría, módulos de plataformas de confianza (TPM) o tokens de seguridad USB.

## G

- **Gráficos vectoriales escalables (SVG):** formato de imagen vectorial; el contenido SVG puede ejecutar scripts, por lo que debe sanitizarse o servirse como texto plano.
- **Identificador globalmente único (GUID):** número de referencia único usado como identificador en el software.

## H

- **Hibernate Query Language (HQL):** lenguaje de consulta de apariencia similar al SQL, utilizado por la biblioteca Hibernate ORM.

## I

- **Infraestructura de Clave Pública (PKI):** arreglo que vincula las claves públicas con las identidades de las entidades; el vínculo se establece mediante el registro y la emisión de certificados por una autoridad de certificación (CA).
- **Información de identificación personal (PII):** información que puede utilizarse por sí sola o junto con otra para identificar, contactar o localizar a una sola persona, o para identificar a un individuo en un contexto.
- **Inyección SQL (SQLi):** técnica de inyección de código que ataca aplicaciones basadas en datos, insertando sentencias SQL maliciosas en un punto de entrada.

## L

- **Lista de permitidos:** lista de datos u operaciones permitidas (por ejemplo, los caracteres que pueden pasar la validación de entrada).

## M

- **Malware:** código ejecutable introducido en una aplicación durante el tiempo de ejecución, sin conocimiento del usuario o administrador.
- **Mapeo Objeto-Relación (ORM):** sistema que permite referenciar y consultar una base de datos relacional desde un programa de aplicación usando un modelo de objetos.
- **Modelado de amenazas:** técnica que desarrolla arquitecturas de seguridad cada vez más refinadas para identificar agentes de amenaza, zonas de seguridad, controles de seguridad y activos técnicos y comerciales importantes.
- **Módulo criptográfico:** hardware, software y/o firmware que implementa algoritmos criptográficos y/o genera claves criptográficas.
- **Módulo de plataforma de confianza (TPM):** tipo de HSM, habitualmente conectado a una placa madre, que actúa como la "raíz de la confianza" del sistema.
- **Módulo de seguridad de hardware (HSM):** componente de hardware que puede almacenar claves criptográficas y otros secretos de forma protegida.

## O

- **Open Web Application Security Project (OWASP):** fundación abierta y gratuita a nivel mundial enfocada en mejorar la seguridad de las aplicaciones de software, haciendo la seguridad "visible" para que personas y organizaciones tomen decisiones informadas sobre el riesgo. Ver: https://www.owasp.org/
- **OTP basado en el tiempo (TOTP):** método de generación de OTP en el que el tiempo actual forma parte del algoritmo de generación.

## P

- **Password-Based Key Derivation Function 2 (PBKDF2):** algoritmo unidireccional que crea una clave criptográfica robusta a partir de una contraseña y un valor de "salto" aleatorio adicional; dificulta el descifrado fuera de línea si el resultado se almacena en lugar de la contraseña original.
- **Position-independent executable (PIE):** cuerpo de código máquina que se ejecuta correctamente independientemente de su dirección absoluta en la memoria.
- **Prueba de caja negra:** método de prueba de software que examina la funcionalidad de una aplicación sin mirar sus estructuras internas ni su funcionamiento.
- **Pruebas de seguridad de aplicaciones dinámicas (DAST):** tecnologías diseñadas para detectar condiciones indicativas de vulnerabilidades en una aplicación en estado de ejecución.
- **Pruebas de seguridad de aplicaciones estáticas (SAST):** tecnologías que analizan el código fuente, el bytecode y los binarios para condiciones de codificación y diseño indicativas de vulnerabilidades; analizan "de adentro hacia afuera", en estado de "no ejecución".
- **Protocolo de transferencia de hipertexto (HTTPS):** protocolo de aplicación para sistemas de información hipermedia distribuidos y colaborativos; la base de la comunicación de datos en la World Wide Web.

## R

- **Red telefónica pública conmutada (PSTN):** la red telefónica tradicional, que incluye teléfonos de línea fija y móviles.
- **Relying Party (RP):** aplicación que confía en que un usuario se autenticó contra un proveedor de autenticación independiente, basándose en un token o conjunto de afirmaciones firmadas de ese proveedor.

## S

- **Seguridad de la aplicación:** seguridad centrada en el análisis de los componentes de la capa de aplicación del modelo OSI, en lugar de centrarse en el sistema operativo subyacente o las redes conectadas.
- **Seguridad de la capa de transporte (TLS):** protocolos criptográficos que proporcionan seguridad a las comunicaciones a través de una conexión de red.
- **Autenticación de inicio de sesión único (SSO):** ocurre cuando un usuario inicia sesión en una aplicación y queda conectado automáticamente a otras sin volver a autenticarse (ej. iniciar sesión en Google y entrar a YouTube, Docs y Gmail).

## U

- **URI/URL/URL fragmento:** un Identificador Uniforme de Recursos (URI) es una cadena usada para identificar un nombre o recurso web; un Localizador Uniforme de Recursos (URL) se usa a menudo como referencia a un recurso.

## V

- **Validación de entrada:** la canonicalización y validación de entradas de usuario que no son de confianza.
- **Verificación automatizada:** uso de herramientas automatizadas (dinámicas, estáticas o ambas) que utilizan firmas de vulnerabilidad para encontrar problemas.
- **Verificación de seguridad de aplicaciones:** la evaluación técnica de una aplicación contra el ASVS de OWASP.
- **Verificación del diseño:** la evaluación técnica de la arquitectura de seguridad de una aplicación.
- **Informe de verificación de seguridad en la aplicación:** informe que documenta los resultados generales y el análisis de soporte generado por el verificador para una aplicación determinada.
- **Verificador:** la persona o equipo que revisa una aplicación contra los requerimientos de OWASP ASVS.

## W

- **Lo que ves es lo que obtienes (WYSIWYG):** tipo de editor de contenido enriquecido que muestra cómo se verá el contenido al renderizarse, en lugar de mostrar la codificación que gobierna la renderización.

## 2

- **2do Factor Universal (U2F):** norma creada por FIDO para permitir el uso de una llave de seguridad USB o NFC como segundo factor de autenticación.