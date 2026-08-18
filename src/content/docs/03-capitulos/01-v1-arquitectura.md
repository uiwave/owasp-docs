---
title: "V1: Arquitectura, Diseño y Modelado de Amenazas"
description: "Capítulo V1 del ASVS 4.0.3: arquitectura de seguridad, diseño y modelado de amenazas, con todos sus requisitos explicados."
---

Imagina que construyes una casa. Puedes poner las mejores cerraduras del mundo, pero si el **plano** está mal hecho (puertas al baño, ventanas en el sótano), la seguridad es imposible. El capítulo V1 trata el "plano" de tu aplicación: **la arquitectura de seguridad** — y es el primero del estándar porque es la base de todo lo demás.

> **Objetivo de control:** la arquitectura de seguridad casi se ha convertido en un arte perdido en muchas organizaciones. El ASVS busca reintroducir los principios de arquitectura entre los profesionales del software: la arquitectura no es una implementación, sino **una forma de pensar** sobre un problema. Las buenas decisiones de hoy ahorran esfuerzo, tiempo y dinero mañana (ej. invertir una vez en identidad federada SAML permite actualizar a NIST 800-63 sin reescribir aplicaciones).

Este capítulo cubre los 5 principios esenciales: **disponibilidad, confidencialidad, integridad, no repudio y privacidad**, y promueve "desplazar a la izquierda": la seguridad debe estar presente desde la habilitación del desarrollador hasta las operaciones y las pruebas independientes.

## V1.1 Ciclo de Vida de Desarrollo de Software Seguro

Esta sección exige que la seguridad no sea un accesorio, sino parte del proceso de desarrollo.

### 1.1.1 — Ciclo de vida de desarrollo seguro (CWE-1053, C1)

> *"Verifique el uso de un ciclo de vida de desarrollo de software seguro que aborde la seguridad en todas las etapas del desarrollo."*

**Explicación:** la seguridad debe estar en cada fase: requisitos, diseño, codificación, pruebas y despliegue. No es un "paso final" antes de publicar.

### 1.1.2 — Modelado de amenazas en cada cambio de diseño (CWE-1053)

> *"Verifique el uso del modelado de amenazas para cada cambio de diseño o planificación de sprint para identificar amenazas, planificar contramedidas, facilitar respuestas de riesgo adecuadas y guiar las pruebas de seguridad."*

**Explicación:** antes de implementar una función nueva, pregúntate: *¿cómo podrían atacarla?* Eso es modelado de amenazas. Se hace en cada sprint, no una vez al año. **Niveles: L2, L3.**

### 1.1.3 — Historias de usuario con restricciones de seguridad (CWE-1110)

> *"Verifique que todas las historias y características de usuario contienen restricciones de seguridad funcionales, como por ejemplo: 'Como usuario, debería poder ver y editar mi perfil. No debería ser capaz de ver o editar el perfil de nadie más'."*

**Explicación:** cada historia de usuario debe decir qué NO puede hacer el usuario. Escribir el "no" desde el inicio evita olvidos de control de acceso. **Niveles: L2, L3.**

### 1.1.4 — Documentar límites de confianza y flujos de datos (CWE-1059)

> *"Verifique la documentación y la justificación de todos los límites de confianza, componentes y flujos de datos significativos de la aplicación."*

**Explicación:** debes poder dibujar un diagrama de tu aplicación: qué componente confía en cuál, y cómo fluyen los datos. Si no puedes dibujarlo, no lo entiendes. **Niveles: L2, L3.**

### 1.1.5 — Análisis de seguridad de la arquitectura de alto nivel (CWE-1059, C1)

> *"Verifique la definición y el análisis de seguridad de la arquitectura de alto nivel de la aplicación y todos los servicios remotos conectados."*

**Explicación:** la arquitectura completa —incluyendo cada API externa conectada— debe estar definida y analizada para detectar riesgos. **Niveles: L2, L3.**

### 1.1.6 — Controles de seguridad centralizados y reutilizables (CWE-637, C10)

> *"Verifique la implementación de controles de seguridad centralizados, simples (economía del diseño), comprobados, seguros y reutilizables para evitar controles duplicados, faltantes, ineficaces o inseguros."*

**Explicación:** una sola librería de autenticación probada, usada en toda la app, es mejor que 10 implementaciones caseras diferentes (una de las cuales seguro está mal). **Niveles: L2, L3.**

### 1.1.7 — Lista de comprobación de codificación segura (CWE-637)

> *"Verifique la disponibilidad de una lista de comprobación de codificación segura, requisitos de seguridad, directriz o directiva para todos los desarrolladores y evaluadores."*

**Explicación:** los desarrolladores deben tener una guía escrita de reglas de seguridad. Sin documento, cada quien hace lo que puede. **Niveles: L2, L3.**

## V1.2 Arquitectura de Autenticación

> *"Al probar la identidad, todas las vías de autenticación deben tener la misma fuerza."* No importa si tienes MFA por hardware si un atacante puede restablecer tu cuenta llamando al call center y respondiendo preguntas conocidas.

### 1.2.1 — Cuentas de sistema con privilegios bajos (CWE-250, C3)

> *"Verifique el uso de cuentas de sistema operativo únicas o especiales con privilegios bajos para todos los componentes, servicios y servidores de la aplicación."*

**Explicación:** cada componente debe correr con la mínima cuenta posible: un servicio web no necesita ser administrador del sistema. **Niveles: L2, L3.**

### 1.2.2 — Comunicaciones entre componentes autenticadas (CWE-306, C3)

> *"Verifique que las comunicaciones entre los componentes de la aplicación, incluidas las API, el middleware y las capas de datos, se autentican. Los componentes deben tener los mínimos privilegios necesarios."*

**Explicación:** tu base de datos debe verificar la identidad de quien le habla: no basta "cualquiera de la red puede consultarme". **Niveles: L2, L3.**

### 1.2.3 — Un único mecanismo de autenticación probado (CWE-306)

> *"Verifique que la aplicación utiliza un único mecanismo de autenticación comprobado que se sabe que es seguro, se puede ampliar para incluir una autenticación segura y tiene suficiente logging y supervisión para detectar abuso de cuenta o brechas."*

**Explicación:** usa un mecanismo estándar y conocido (ej. un framework probado), no inventes tu propia autenticación. **Niveles: L2, L3.**

### 1.2.4 — Misma fuerza en todas las vías de autenticación (CWE-306)

> *"Verifique que todas las vías de autenticación y las API de administración de identidades implementan una fortaleza coherente del control de seguridad de autenticación, de modo que no haya alternativas más débiles por el riesgo de la aplicación."*

**Explicación:** si el login principal usa MFA pero el "olvidé mi contraseña" solo pide la fecha de nacimiento, el atacante irá por la puerta débil. **Niveles: L2, L3.**

## V1.3 Arquitectura de Gestión de Sesiones

> *"Este es un marcador de posición para los requisitos arquitectónicos futuros."*

No hay requisitos actuales en esta sección: el estándar la reserva para el futuro. La gestión de sesiones se trata a fondo en el capítulo V3.

## V1.4 Arquitectura de Control de Acceso

### 1.4.1 — Controles de acceso en el punto de confianza (CWE-602)

> *"Verifique que los puntos de cumplimiento de confianza, tales como puertas de enlace de control de acceso, servidores y funciones serverless, exijan controles de acceso. Nunca aplique controles de acceso en el cliente."*

**Explicación:** la regla de oro: **el control de acceso se decide en el servidor**. Cualquier control en el navegador (el "cliente") puede ser saltado por el atacante. **Niveles: L2, L3.**

### 1.4.2 — [ELIMINADO, NO ACCIONABLE]

Requisito eliminado de la versión 4.0.3 por no ser accionable.

### 1.4.3 — [ELIMINADO, DUPLICADO CON 4.1.3]

Requisito eliminado: duplicado con el requisito 4.1.3 (privilegios mínimos).

### 1.4.4 — Mecanismo único de control de acceso (CWE-284, C7)

> *"Verifique que la aplicación utilice un mecanismo de control de acceso único y bien comprobado para acceder a datos y recursos protegidos. Todas las solicitudes deben pasar por este único mecanismo para evitar copiar y pegar o rutas alternativas inseguras."*

**Explicación:** una única "policía" de autorización por la que pasa toda petición. Si cada función implementa su propia verificación, alguna quedará olvidada. **Niveles: L2, L3.**

### 1.4.5 — Control de acceso basado en atributos o entidades (CWE-275, C7)

> *"Verifique que se utiliza el control de acceso basado en atributos o entidades mediante el cual el código comprueba la autorización del usuario para un elemento de característica o datos en lugar de solo su rol. Los permisos deben asignarse mediante roles."*

**Explicación:** no basta preguntar "¿es admin?" — debes preguntar "¿este usuario puede ver *este* registro?" (permisos por entidad). Los roles sirven para asignar permisos, no para decidir por sí solos. **Niveles: L2, L3.**

## V1.5 Arquitectura de Entradas y Salidas

En v4.0 se define "capa de servicio de confianza" (*trusted service layer*) como **cualquier punto de aplicación de confianza** (microservicio, serverless, servidor, API confiable) e "cliente no confiable" (*untrusted client*) como las tecnologías front-end.

### 1.5.1 — Requisitos de entrada y salida según tipo y ley (CWE-1029)

> *"Verifique que los requisitos de entrada y salida definan claramente cómo manejar y procesar datos en función del tipo, contenido y las leyes, regulaciones y otras normas de cumplimiento de políticas aplicables."*

**Explicación:** define por escrito cómo se procesa cada tipo de dato (tarjetas, DNI, emails) y qué regulaciones aplican. **Niveles: L2, L3.**

### 1.5.2 — Sin serialización hacia clientes no confiables (CWE-502)

> *"Verifique que no se usa serialización al comunicarse con clientes que no son de confianza. Si esto no es posible, asegúrese de que se apliquen controles de integridad adecuados (y posiblemente cifrado si se envían datos confidenciales) para evitar ataques de deserialización, incluida la inyección de objetos."*

**Explicación:** enviar objetos serializados al navegador permite al atacante modificarlos para inyectar objetos maliciosos. Si es inevitable, firmalos/cifralos. **Niveles: L2, L3.**

### 1.5.3 — Validación de entrada en la capa de servicio confiable (CWE-602, C5)

> *"Verifique que la validación de datos de entrada (input) se aplica en una capa de servicio de confianza."*

**Explicación:** los datos se validan **en el servidor**, nunca solo con JavaScript en el navegador (que se puede desactivar o modificar). **Niveles: L2, L3.**

### 1.5.4 — Codificación de salida cerca del intérprete (CWE-116, C4)

> *"Verifique que la codificación de salida (output encode) se produce cerca o en el intérprete para el que está destinada."*

**Explicación:** escapa los datos en el punto donde se interpretan (HTML, SQL, URL...), con el codificador correcto para cada contexto. **Niveles: L2, L3.**

## V1.6 Arquitectura Criptográfica

> *"Cifrar todo es un desperdicio, no cifrar nada es una negligencia legal."* Se debe lograr un equilibrio, y diseñar la criptografía desde el principio — modernizarla después cuesta mucho más.

### 1.6.1 — Política de gestión de claves (CWE-320)

> *"Verifique que existe una política explícita para la administración de claves criptográficas y que un ciclo de vida de clave criptográfica sigue un estándar de administración de claves como NIST SP 800-57."*

**Explicación:** las claves tienen ciclo de vida: creación, uso, rotación y destrucción. Sin política escrita, nadie sabe cuándo ni cómo rotarlas. **Niveles: L2, L3.**

### 1.6.2 — Protección del material clave (CWE-320)

> *"Verifique que los consumidores de servicios criptográficos protegen el material clave y otros secretos mediante el uso de almacenes de claves o alternativas basadas en API."*

**Explicación:** las claves no van en el código ni en archivos de configuración: van en un almacén seguro (key store). **Niveles: L2, L3.**

### 1.6.3 — Claves reemplazables y re-cifrado (CWE-320)

> *"Verifique que todas las claves y contraseñas son reemplazables y forman parte de un proceso bien definido para volver a cifrar los datos confidenciales."*

**Explicación:** si una clave se filtra, debes poder cambiarla y re-cifrar los datos con la nueva. Si eso es imposible, tu diseño es frágil. **Niveles: L2, L3.**

### 1.6.4 — Secretos del lado cliente nunca confiables (CWE-320)

> *"Verifique que la arquitectura trata los secretos del lado cliente (como claves simétricas, contraseñas o tokens de API) como inseguros y nunca los usa para proteger o acceder a datos confidenciales."*

**Explicación:** todo lo que vive en el navegador puede ser leído por el atacante. Si tu "seguridad" depende de un secreto en el cliente, no es seguridad. **Niveles: L2, L3.**

## V1.7 Arquitectura de Errores, Logging y Auditoría

### 1.7.1 — Formato común de logging (CWE-1009, C9)

> *"Verifique que se utilice un formato común y un enfoque de logging en todo el sistema."*

**Explicación:** todos los componentes deben registrar en el mismo formato (misma estructura de campos). Si cada módulo usa su propio formato, nadie puede analizar los logs. **Niveles: L2, L3.**

### 1.7.2 — Logs transmitidos a sistema remoto (CWE-1009, C9)

> *"Verifique que los registros de log se transmitan de forma segura a un sistema preferentemente remoto para análisis, detección, alertas y escalamiento."*

**Explicación:** si el atacante entra a tu servidor, borrará los logs locales. Enviarlos a un sistema remoto (SIEM) los protege y permite detección. **Niveles: L1, L2, L3.**

## V1.8 Arquitectura de Protección de Datos y Privacidad

### 1.8.1 — Clasificación de datos confidenciales (CWE-200)

> *"Verifique que todos los datos confidenciales se identifiquen y clasifiquen en niveles de protección."*

**Explicación:** antes de proteger datos, debes saber cuáles son sensibles (PII, tarjetas, salud) y en qué nivel. Clasificar es el primer paso de toda protección. **Niveles: L2, L3.**

### 1.8.2 — Niveles de protección con requisitos asociados (CWE-200)

> *"Verifique que todos los niveles de protección tienen un conjunto asociado de requisitos de protección, como los requisitos de cifrado, los requisitos de integridad, la retención, la privacidad y otros requisitos de confidencialidad, y que estos se aplican en la arquitectura."*

**Explicación:** cada nivel de datos tiene reglas: cuánto tiempo se guardan, cómo se cifran, quién los ve. Y esas reglas se aplican de verdad en el diseño. **Niveles: L2, L3.**

## V1.9 Arquitectura de Comunicaciones

### 1.9.1 — Cifrar comunicaciones entre componentes (CWE-319, C3)

> *"Verifique que la aplicación cifra las comunicaciones entre componentes, especialmente cuando estos componentes se encuentran en contenedores, sistemas, sitios o proveedores de nube diferentes."*

**Explicación:** no basta cifrar entre el navegador y el servidor: tu app también debe hablar cifrado con su base de datos, sus microservicios y la nube. **Niveles: L2, L3.**

### 1.9.2 — Verificación de autenticidad en el enlace (CWE-295)

> *"Verifique que los componentes de la aplicación verifican la autenticidad de cada lado en un vínculo de comunicación para evitar ataques de 'persona en el medio'. Por ejemplo, los componentes de la aplicación deben validar certificados y cadenas TLS."*

**Explicación:** debes verificar que el servidor con el que hablas es realmente el tuyo (validar el certificado). Sin esa validación, un intermediario puede hacerse pasar por él. **Niveles: L2, L3.**

## V1.10 Arquitectura de Software Malicioso

### 1.10.1 — Control de código fuente con trazabilidad (CWE-284)

> *"Verifique que un sistema de control de código fuente está en uso, con procedimientos para garantizar que los check-ins estén respaldados por tickets de issues o solicitudes de cambio. El sistema de control de código fuente debe tener control de acceso y usuarios identificables para permitir la trazabilidad de cualquier cambio."*

**Explicación:** todo cambio al código se registra en un repositorio (git), ligado a un ticket y a una persona identificable. Así se puede rastrear quién introdujo cada línea — y detectar código malicioso. **Niveles: L2, L3.**

## V1.11 Arquitectura de la Lógica de Negocio

### 1.11.1 — Componentes documentados por función (CWE-1059)

> *"Verifique la definición y documentación de todos los componentes de la aplicación en términos de las funciones de negocio o de seguridad que proporcionan."*

**Explicación:** cada componente documenta qué función cumple (negocio o seguridad). Sin documentación, nadie sabe qué hace cada pieza ni qué protege. **Niveles: L2, L3.**

### 1.11.2 — Flujos de alto valor sin estado no sincronizado (CWE-362)

> *"Verifique que todos los flujos de lógica de negocio de alto valor, incluida la autenticación, la administración de sesiones y el control de acceso, no compartan estados no sincronizados."*

**Explicación:** dos componentes no deben compartir estado sin coordinación (ej. sesión duplicada en dos servidores). Si un servidor dice "autenticado" y otro "no", hay una falla explotable. **Niveles: L2, L3.**

### 1.11.3 — Flujos seguros para subprocesos y sin race conditions (CWE-367)

> *"Verifique que todos los flujos de lógica de negocio de alto valor, incluida la autenticación, la administración de sesiones y el control de acceso, sean seguros para subprocesos y resistentes a condiciones de carrera time-of-check y time-of-use."*

**Explicación:** los "time-of-check vs time-of-use" (TOCTOU): la app verifica algo y, antes de usarlo, cambió. Ej. verificar el saldo y luego descontar; entre ambos pasos otro proceso puede alterar la cuenta. **Niveles: L3.**

## V1.12 Arquitectura de Carga Segura de Archivos

### 1.12.1 — [ELIMINADO, DUPLICADO CON 12.4.1]

Requisito eliminado: duplicado con el requisito 12.4.1 (archivos fuera de la raíz web).

### 1.12.2 — Archivos subidos servidos de forma segura (CWE-646)

> *"Verifique que los archivos subidos por el usuario, si es necesario que se muestren o descarguen desde la aplicación, se hace mediante descargas de secuencias de octetos o desde un dominio no relacionado, como un almacenamiento de archivos en la nube. Implemente una directiva de seguridad de contenido (CSP) adecuada para reducir el riesgo de vectores XSS u otros ataques desde el archivo cargado."*

**Explicación:** nunca sirvas archivos subidos desde el mismo dominio y contexto de tu app: un archivo malicioso podría ejecutar JavaScript. Sírvelos desde otro dominio/almacenamiento o como descarga forzada. **Niveles: L2, L3.**

## V1.13 Arquitectura de API

> *"Este es un marcador de posición para los requisitos arquitectónicos futuros."*

Sin requisitos actuales; las APIs se tratan en el capítulo V13.

## V1.14 Arquitectura de Configuración

### 1.14.1 — Segregación de componentes por nivel de confianza (CWE-923)

> *"Verifique la segregación de componentes de diferentes niveles de confianza a través de controles de seguridad bien definidos, reglas de cortafuegos, pasarelas de API, proxies reversos, grupos de seguridad basados en nube, o mecanismos similares."*

**Explicación:** los componentes de distinta confianza no deben estar en la misma red sin separación. Un firewall/grupo de seguridad entre ellos limita el daño si uno es comprometido. **Niveles: L2, L3.**

### 1.14.2 — Firmas y conexiones verificadas para despliegue (CWE-494)

> *"Verifique que las firmas binarias, las conexiones de confianza y los puntos de conexión verificados se usan para el despliegue de archivos binarios a dispositivos remotos."*

**Explicación:** los binarios que se despliegan en dispositivos remotos deben estar firmados y viajar por canales verificados: nadie debe poder inyectar un binario falso. **Niveles: L2, L3.**

### 1.14.3 — El canal de compilación advierte de componentes inseguros (CWE-1104)

> *"Verifique que el canal de compilación advierte de componentes obsoletos o inseguros y realiza las acciones adecuadas."*

**Explicación:** el pipeline de build debe avisar (o bloquear) si una dependencia es vieja o vulnerable. Es el momento automático de aplicar el control. **Niveles: L2, L3.**

### 1.14.4 — Despliegue seguro automatizado en el build

> *"Verifique que el canal de compilación contiene un paso para compilar y comprobar automáticamente el despliegue seguro de la aplicación, especialmente si la infraestructura de la aplicación está definida por software, como los scripts de compilación del entorno en la nube."*

**Explicación:** el build debe verificar automáticamente que el despliegue será seguro (configuración correcta, sin secretos expuestos). **Niveles: L2, L3.**

### 1.14.5 — Aislamiento de despliegues (CWE-265, C5)

> *"Verifique que los despliegues de aplicaciones sean en sandbox, contenedores y/o aislados a nivel de red para retrasar e impedir que los atacantes vulneren otras aplicaciones, especialmente cuando realizan acciones sensibles o peligrosas, como la deserialización."*

**Explicación:** cada aplicación vive en su contenedor/red aislada: si una cae, las demás no la acompañan. **Niveles: L2, L3.**

### 1.14.6 — Sin tecnologías de cliente obsoletas (CWE-477)

> *"Verifique que la aplicación no utiliza tecnologías del lado cliente no compatibles, inseguras o en desuso, como NSAPI plugins, Flash, Shockwave, ActiveX, Silverlight, NACL o client-side java applets."*

**Explicación:** esas tecnologías tienen vulnerabilidades conocidas y no se mantienen. Si tu app aún depende de alguna, es una puerta abierta. **Niveles: L2, L3.**

## Referencias

Para profundizar: *OWASP Threat Modeling Cheat Sheet*, *OWASP Attack Surface Analysis Cheat Sheet*, *OWASP Software Assurance Maturity Model Project*, *Microsoft SDL* y *NIST SP 800-57*.

## Resumen

> V1 es el capítulo de los planos: ciclo de vida seguro, modelado de
> amenazas, arquitectura de autenticación/control de acceso/criptografía,
> segregación de confianza y despliegue seguro. Si el plano está bien,
> el resto del estándar tiene dónde apoyarse.