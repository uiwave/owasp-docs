---
title: "V10: Código Malicioso"
description: "Capítulo V10 del ASVS 4.0.3: integridad del código, búsqueda de código malicioso e integridad de la aplicación."
---

La amenaza más silenciosa no viene de afuera: viene **dentro del propio código**. Un empleado descontento, una librería comprometida o una dependencia "envenenada" pueden incluir puertas traseras, bombas de tiempo o funciones que roban datos sin que nadie lo note.

> **Objetivo de control:** la actividad maliciosa se controla de forma segura y adecuada sin afectar al resto de la aplicación; el código **no tiene bombas de tiempo** ni otros ataques basados en el tiempo; **no permite "llamar a casa"** a destinos maliciosos o no autorizados; no tiene puertas traseras, huevos de pascua, salami attacks, rootkits ni código no autorizado controlable por un atacante.
>
> *Encontrar código malicioso es probar lo negativo, imposible de validar por completo: se realizan los mejores esfuerzos para asegurar que el código fuente no contiene código malicioso ni funcionalidades no deseadas.*

## V10.1 Integridad de Código

La mejor defensa contra el código malintencionado es **"confiar, pero verificar"**. Introducir código no autorizado o malicioso en el código fuente es a menudo un delito en muchas jurisdicciones: las políticas deben dejar claras las sanciones. Los líderes de desarrollo deben revisar regularmente el código, especialmente aquel con acceso a funciones de tiempo, I/O o red.

### 10.1.1 — Herramientas de análisis de código (CWE-749)

> *"Verifique que se está utilizando una herramienta de análisis de código que puede detectar código potencialmente malintencionado, como funciones de tiempo, operaciones de archivos no seguras y conexiones de red."*

**Explicación:** SAST y análisis de dependencias detectan patrones sospechosos: `sleep()`, llamadas a red, escritura de archivos en rutas extrañas... Automatiza la búsqueda: el ojo humano no basta. **Nivel: L1.**

## V10.2 Búsqueda de Código Malicioso

El código malicioso es extremadamente raro y difícil de detectar. La revisión manual línea por línea ayuda a buscar bombas lógicas, pero incluso el revisor más experimentado tendrá problemas — **cumplir esta sección es imposible sin acceso completo al código fuente, incluidas las bibliotecas de terceros**.

### 10.2.1 — Sin recopilación de datos no autorizada (CWE-359)

> *"Verifique que el código fuente de la aplicación y las bibliotecas de terceros no contienen capacidades no autorizadas de recopilación de datos o de 'llamadas a casa'. Cuando detecte dicha funcionalidad, obtenga el permiso explícito del usuario para que sea operado así, antes de recopilar cualquier dato."*

**Explicación:** "llamar a casa" es enviar datos a un servidor del atacante (o de un tercero no autorizado): analytics ocultos, telemetría no declarada. Si existe, requiere consentimiento explícito previo. **Niveles: L1, L2.**

### 10.2.2 — Sin permisos innecesarios (CWE-272)

> *"Verifique que la aplicación no solicita permisos innecesarios o excesivos para funciones o sensores relacionados con la privacidad, como contactos, cámaras, micrófonos o ubicación."*

**Explicación:** una app de linterna no necesita tus contactos: los permisos excesivos son el caballo de Troya moderno. Solo se pide lo necesario y justificado. **Niveles: L1, L2.**

### 10.2.3 — Sin puertas traseras (CWE-507)

> *"Verifique que el código fuente de la aplicación y las bibliotecas de terceros no contienen puertas traseras, como cuentas, claves o código ofuscado, blobs binarios no documentados, rootkits o anti-depuración, características de depuración inseguras o de otro modo funcionalidades desactualizadas, inseguras u ocultas que podrían usarse maliciosamente si se descubren."*

**Explicación:** cuenta admin oculta, clave maestra hardcodeada, código ofuscado sin explicar, binarios sin documentar... Cualquier "funcionalidad oculta" es una puerta trasera en potencia. **Nivel: L1.**

### 10.2.4 — Sin bombas de tiempo (CWE-511)

> *"Verifique que el código fuente de la aplicación y las bibliotecas de terceros no contienen bombas de tiempo mediante la búsqueda de funciones relacionadas con la fecha y la hora."*

**Explicación:** el código que se "activa" en una fecha futura (borra datos, muestra mensajes, exige rescate) se detecta buscando funciones de fecha/hora en contextos sospechosos. **Nivel: L1.**

### 10.2.5 — Sin código malintencionado (CWE-511)

> *"Verifique que el código fuente de la aplicación y las bibliotecas de terceros no contienen código malintencionado, como salami attacks, logic bypasses o bombas lógicas."*

**Explicación:** el ataque salami (robar centavos de millones de transacciones), los bypasses de lógica y las bombas lógicas se buscan en la revisión del código y sus dependencias. **Nivel: L1.**

### 10.2.6 — Sin huevos de pascua (CWE-507)

> *"Verifique que el código fuente de la aplicación y las bibliotecas de terceros no contienen huevos de pascua ni ninguna otra funcionalidad potencialmente no deseada."*

**Explicación:** un "easter egg" suena inofensivo, pero es funcionalidad oculta que nadie audita: puede esconder comportamientos peligrosos. Nada de funciones secretas. **Nivel: L1.**

## V10.3 Integridad de Aplicación

Una vez implementada, la aplicación aún puede recibir código malintencionado: ejecución de código sin firmar desde orígenes no confiables y **tomas de control de subdominios**. Cumplir esta categoría es probablemente una tarea operativa y continua.

### 10.3.1 — Actualizaciones firmadas por canales seguros (CWE-16)

> *"Verifique si la aplicación tiene una característica de actualización automática de cliente o servidor, las actualizaciones deben obtenerse a través de canales seguros y firmados digitalmente. El código de actualización debe validar la firma digital de la actualización antes de instalar o ejecutar la actualización."*

**Explicación:** un atacante que suplanta el servidor de actualizaciones controla todas las máquinas. Las actualizaciones viajan por HTTPS y **verifican su firma digital** antes de instalarse. **Niveles: L1, L2, L3.**

### 10.3.2 — Integridad del código cargado (CWE-353)

> *"Verifique que la aplicación emplea protecciones de integridad, como la firma de código o la integridad de subrecursos. La aplicación no debe cargar ni ejecutar código de fuentes que no sean de confianza, como la carga de includes, plugins, módulos, código o bibliotecas de fuentes que no sean de confianza o de Internet."*

**Explicación:** el "supply chain attack" clásico: una CDN comprometida inyecta código a todas las páginas que la usan. SRI (*Subresource Integrity*) verifica el hash de cada script externo. **Niveles: L1, L2, L3.**

### 10.3.3 — Protección contra takeover de subdominios (CWE-350)

> *"Verifique que la aplicación tiene protección contra takeovers de subdominios si la aplicación se basa en entradas DNS o subdominios DNS, como nombres de dominio expirados, punteros DNS obsoletos o CNAME, proyectos expirados en repositorios de código fuente públicos o API de nube transitorias, funciones serverless o buckets de almacenamiento (autogen-bucket-id.cloud.example.com) o similares. Las protecciones pueden incluir asegurarse de que los nombres DNS utilizados por las aplicaciones se comprueban regularmente para comprobar su caducidad o cambio."*

**Explicación:** si un subdominio apunta a un recurso que ya no existe (bucket borrado, repo expirado), un atacante puede **reclamarlo** y servir su código bajo tu dominio: phishing perfecto. Se monitorea el DNS regularmente. **Niveles: L1, L2, L3.**

## Referencias

Hostile Subdomain Takeover (Detectify Labs), Hijacking of abandoned subdomains (Detectify Labs).

## Resumen

> V10 es el capítulo de la confianza: el código propio y el de terceros se
> analiza en busca de llamadas a casa, puertas traseras, bombas de tiempo
> y huevos de pascua; las actualizaciones se firman; el código externo
> verifica su integridad; y los subdominios abandonados se vigilan para
> que nadie los secuestre.