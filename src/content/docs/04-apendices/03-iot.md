---
title: "Apéndice C: Requisitos de Verificación de Internet de las Cosas"
description: "Apéndice C del ASVS 4.0.3: requisitos de verificación de seguridad para dispositivos IoT (C.1 a C.34)."
---

> *Este capítulo estaba originalmente en la rama principal, pero con el trabajo del equipo de IoT de OWASP no tiene sentido mantener dos subprocesos diferentes. Para la versión 4.0 se trasladó al apéndice, e instamos a quienes lo requieran a usar el **proyecto principal de OWASP IoT**.*

## Objetivo de Control

Los dispositivos embebidos/IoT deben:

- Tener el **mismo nivel de controles de seguridad dentro del dispositivo** que se encuentra en el servidor, aplicando controles de seguridad en un entorno de confianza.
- Almacenar los **datos confidenciales de forma segura**, mediante almacenamiento respaldado por hardware, como elementos seguros.
- Transmitir todos los **datos confidenciales** usando la seguridad de la capa de transporte.

## Requisitos de Verificación de Seguridad

### C.1 — Interfaces de depuración de capa de aplicación

> *"Verifique que las interfaces de depuración de capa de aplicación, como USB, UART y otras variantes seriales, estén deshabilitadas o protegidas por una contraseña compleja."*

**Explicación:** el puerto de depuración es la puerta trasera física del dispositivo: una consola serial sin protección permite tomar control total. **Niveles: L1, L2, L3. Desde: 4.0.**

### C.2 — Claves y certificados únicos por dispositivo

> *"Verifique que las claves criptográficas y los certificados son únicos para cada dispositivo individual."*

**Explicación:** una clave compartida en todos los dispositivos convierte el compromiso de uno en el compromiso de toda la flota. **Niveles: L1, L2, L3. Desde: 4.0.**

### C.3 — Controles de protección de memoria habilitados

> *"Verifique que los controles de protección de memoria como ASLR y DEP están habilitados por el sistema operativo integrado/IoT, si procede."*

**Explicación:** los mismos mecanismos anti-exploit del escritorio (aleatorización de memoria, no ejecución de datos) aplican en el firmware. **Niveles: L1, L2, L3. Desde: 4.0.**

### C.4 — Interfaces de depuración en chip deshabilitadas

> *"Verifique que las interfaces de depuración en chip como JTAG o SWD estén deshabilitadas o que el mecanismo de protección disponible esté habilitado y configurado adecuadamente."*

**Explicación:** JTAG/SWD leen y escriben la memoria del chip directamente: si quedan abiertas, cualquiera con un adaptador barato extrae el firmware y los secretos. **Niveles: L1, L2, L3. Desde: 4.0.**

### C.5 — Ejecución de confianza implementada

> *"Verifique que la ejecución de confianza está implementada y habilitada, si está disponible en el SoC o CPU del dispositivo."*

**Explicación:** los chips modernos tienen modos de "ejecución de confianza" que arrancan solo código verificado: se activan si el hardware lo soporta. **Niveles: L1, L2, L3. Desde: 4.0.**

### C.6 — Secretos en hardware seguro

> *"Verifique que los datos confidenciales, las claves privadas y los certificados se almacenan de forma segura en un elemento seguro, TPM, TEE (Trusted Execution Environment) o se protegen mediante criptografía segura."*

**Explicación:** las claves privadas en la memoria del chip son extraíbles por análisis físico: el almacenamiento respaldado por hardware (elemento seguro, TPM, TEE) las saca del alcance. **Niveles: L1, L2, L3. Desde: 4.0.**

### C.7 — Datos en tránsito con TLS

> *"Verifique que las aplicaciones de firmware protegen los datos en tránsito mediante la seguridad de la capa de transporte."*

**Explicación:** el tráfico del dispositivo (telemetría, comandos) se cifra: un sniffer en la red no debe leer nada. **Niveles: L1, L2, L3. Desde: 4.0.**

### C.8 — Validación de firmas de conexiones de servidor

> *"Verifique que las aplicaciones de firmware validan la firma digital de las conexiones de servidor."*

**Explicación:** el dispositivo verifica los certificados: sin ello, un servidor falso en la red (MITM) controla el dispositivo. **Niveles: L1, L2, L3. Desde: 4.0.**

### C.9 — Comunicaciones inalámbricas autenticadas mutuamente

> *"Verifique que las comunicaciones inalámbricas se autentiquen mutuamente."*

**Explicación:** el dispositivo y el punto de acceso se verifican entre sí: ni un dispositivo falso se une a la red, ni el dispositivo se une a una red falsa. **Niveles: L1, L2, L3. Desde: 4.0.**

### C.10 — Canal inalámbrico cifrado

> *"Verifique que las comunicaciones inalámbricas se envíen a través de un canal cifrado."*

**Explicación:** WiFi, Bluetooth o LoRa en claro son legibles a distancia: todo canal inalámbrico va cifrado. **Niveles: L1, L2, L3. Desde: 4.0.**

### C.11 — Funciones C prohibidas reemplazadas

> *"Verifique que cualquier uso de funciones C prohibidas se sustituye por las funciones equivalentes seguras adecuadas."*

**Explicación:** en el firmware en C, las funciones sin límites (`strcpy`, `sprintf`) se reemplazan por sus versiones seguras: los desbordamientos de buffer en dispositivos conectados son críticos. **Niveles: L1, L2, L3. Desde: 4.0.**

### C.12 — SBOM del firmware

> *"Verifique que cada firmware mantiene una lista de materiales de software que cataloga componentes de terceros, control de versiones y vulnerabilidades publicadas."*

**Explicación:** sin SBOM no sabes qué librerías corre tu dispositivo ni cuáles tienen vulnerabilidades conocidas. **Niveles: L1, L2, L3. Desde: 4.0.**

### C.13 — Revisión de credenciales hardcodeadas

> *"Verifique que todo el código, incluidos los archivos binarios de terceros, las bibliotecas y los marcos de trabajo, se revisen para las credenciales codificadas de forma hardcoded (backdoors)."*

**Explicación:** contraseñas "de fábrica" en el firmware son backdoors conocidas: los análisis de firmware publican estas credenciales y los atacantes las prueban primero. **Niveles: L1, L2, L3. Desde: 4.0.**

### C.14 — Sin inyección de comandos del sistema operativo

> *"Verifique que la aplicación y los componentes de firmware no son susceptibles a la inyección de comandos del sistema operativo invocando contenedores de comandos de shell, scripts o que los controles de seguridad impiden la inyección de comandos del sistema operativo."*

**Explicación:** si el firmware arma comandos shell con datos del dispositivo o de la red, un payload puede tomar el sistema. **Niveles: L1, L2, L3. Desde: 4.0.**

### C.15 — Firmas ancladas a un servidor de confianza

> *"Verifique que las aplicaciones de firmware anclan la firma digital a un servidor de confianza."*

**Explicación:** el "anclaje" (pinning) impide que un certificado de otra CA (o falsa) suplante al servidor legítimo. **Niveles: L1, L2. Desde: 4.0.**

### C.16 — Resistencia a la manipulación

> *"Verifique la presencia de la resistencia a la manipulación y/o las características de detección de manipulaciones."*

**Explicación:** sellos, sensores, borrado de secretos al abrir la carcasa: el atacante con el dispositivo en mano no debe poder inspeccionarlo sin consecuencias. **Niveles: L1, L2. Desde: 4.0.**

### C.17 — Protección de propiedad intelectual del fabricante del chip

> *"Verifique que las tecnologías de protección de propiedad intelectual disponibles proporcionadas por el fabricante del chip estén habilitadas."*

**Explicación:** los fabricantes de chips ofrecen protecciones (bloqueo de lectura, zonas seguras): se activan, no se dejan "por defecto". **Niveles: L1, L2. Desde: 4.0.**

### C.18 — Dificultar la ingeniería inversa del firmware

> *"Verifique que los controles de seguridad estén en su lugar para obstaculizar la ingeniería inversa del firmware (por ejemplo, remueva los símbolos de depuración detallados)."*

**Explicación:** sin símbolos de depuración ni cadenas útiles, extraer el firmware no regala el código a los analistas maliciosos. **Niveles: L1, L2. Desde: 4.0.**

### C.19 — Arranque seguro firmado

> *"Verifique que el dispositivo valida la firma de la imagen de arranque antes de cargarla."*

**Explicación:** "secure boot": el dispositivo solo arranca imágenes firmadas por el fabricante: un atacante no puede inyectar su propio firmware. **Niveles: L1, L2. Desde: 4.0.**

### C.20 — Actualización sin TOCTOU

> *"Verifique que el proceso de actualización del firmware no es vulnerable a los ataques de tiempo de comprobación frente a los ataques de time-of-check vs time-of-use."*

**Explicación:** verificar la firma y luego usar un archivo distinto (cambiado en el ínterin) rompe toda la cadena de confianza: verificación y uso son atómicos. **Niveles: L1, L2. Desde: 4.0.**

### C.21 — Firmas validadas antes de instalar

> *"Verifique que el dispositivo utiliza la firma de código y valida los archivos de actualización de firmware antes de instalar."*

**Explicación:** solo actualizaciones firmadas por el fabricante se instalan: el canal de actualización es el vector favorito de compromiso. **Niveles: L1, L2. Desde: 4.0.**

### C.22 — Anti-rollback del firmware

> *"Verifique que el dispositivo no se pueda degradar a las versiones antiguas (anti-rollback) del firmware válido."*

**Explicación:** si el atacante puede volver a una versión vieja con vulnerabilidades conocidas, el arranque seguro no sirve: la degradación se bloquea. **Niveles: L1, L2. Desde: 4.0.**

### C.23 — CSPRNG en el dispositivo

> *"Verifique el uso del generador de números pseudoaleatorios criptográficamente seguro en un dispositivo integrado (p. ej., utilizando generadores de números aleatorios proporcionados por chip)."*

**Explicación:** los dispositivos sin buena entropía generan claves predecibles: se usa el generador aleatorio del propio chip. **Niveles: L1, L2. Desde: 4.0.**

### C.24 — Actualizaciones automáticas programadas

> *"Verifique que el firmware pueda realizar actualizaciones automáticas de firmware según una programación predefinida."*

**Explicación:** un dispositivo que nunca se actualiza queda vulnerable para siempre: la actualización automática programada mantiene la flota parcheada. **Niveles: L1, L2. Desde: 4.0.**

### C.25 — Borrado ante manipulación o mensajes no válidos

> *"Verifique que el dispositivo borra el firmware y los datos confidenciales al detectar la manipulación o la recepción de mensajes no válidos."*

**Explicación:** "wipе": si se detecta manipulación o mensajes inválidos, el dispositivo se autodestruye (borra firmware y secretos) antes que entregarlos. **Nivel: L1. Desde: 4.0.**

### C.26 — Microcontroladores con desactivación de depuración

> *"Verifique que solo se utilicen microcontroladores que admitan la desactivación de interfaces de depuración (por ejemplo, JTAG, SWD)."*

**Explicación:** la elección del hardware importa: se seleccionan chips cuya depuración se puede desactivar físicamente. **Nivel: L1. Desde: 4.0.**

### C.27 — Protección contra decapping y canal lateral

> *"Verifique que solo se utilizan microcontroladores que proporcionan una protección sustancial contra ataques de des encapsulación (decapping) y de canal lateral."*

**Explicación:** el análisis físico (abrir el chip, medir consumo y tiempos) roba secretos: el chip elegido debe resistirlo. **Nivel: L1. Desde: 4.0.**

### C.28 — Trazas sensibles no expuestas

> *"Verifique que las trazas sensibles no estén expuestas a las capas externas."*

**Explicación:** las pistas del PCB que transportan señales sensibles no deben quedar visibles en las capas exteriores de la placa (fáciles de sondear). **Nivel: L1. Desde: 4.0.**

### C.29 — Comunicación entre chips cifrada

> *"Verifique que la comunicación entre chips esté cifrada (p. ej., comunicación de la placa principal a la placa hija)."*

**Explicación:** el bus interno también se espía: el tráfico entre placas se cifra. **Nivel: L1. Desde: 4.0.**

### C.30 — Código firmado y validado antes de ejecutar

> *"Verifique que el dispositivo usa código firmado y valida el código antes de la ejecución."*

**Explicación:** cada módulo de código se valida antes de ejecutarse: nada sin firmar corre en el dispositivo. **Nivel: L1. Desde: 4.0.**

### C.31 — Sobrescritura de memoria sensible

> *"Verifique que la información confidencial mantenida en la memoria se sobrescribe con ceros tan pronto como ya no sea necesaria."*

**Explicación:** claves y secretos en RAM se sobrescriben con ceros al dejar de usarse: el análisis de memoria no los encuentra. **Nivel: L1. Desde: 4.0.**

### C.32 — Contenedores de kernel para aislamiento

> *"Verifique que las aplicaciones de firmware utilizan contenedores de kernel para el aislamiento entre aplicaciones."*

**Explicación:** si una aplicación se compromete, los contenedores limitan el daño al resto del sistema. **Nivel: L1. Desde: 4.0.**

### C.33 — Flags seguros del compilador

> *"Verifique que los indicadores seguros del compilador como -fPIE, -fstack-protector-all, -Wl,-z,noexecstack, -Wl,-z,noexecheap están configurados para compilaciones de firmware."*

**Explicación:** el firmware se compila con todas las protecciones: PIE (aleatorización), stack canaries y memoria no ejecutable. **Nivel: L1. Desde: 4.0.**

### C.34 — Protección de código en microcontroladores

> *"Verifique que los microcontroladores estén configurados con protección de código (si corresponde)."*

**Explicación:** el bloqueo de lectura del chip ("code protection") impide extraer el firmware con un programador. **Nivel: L1. Desde: 4.0.**

## Referencias

OWASP Internet of Things Top 10, OWASP Embedded Application Security Project, OWASP Internet of Things Project, Trudy TCP Proxy Tool.

## Resumen

> El Apéndice C protege los dispositivos IoT: depuración deshabilitada,
> secretos en hardware seguro, arranque firmado, actualizaciones
> anti-rollback, comunicaciones cifradas y autenticadas, y defensas
> físicas contra análisis e ingeniería inversa.