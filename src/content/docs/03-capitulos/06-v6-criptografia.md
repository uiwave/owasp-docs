---
title: "V6: Criptografía Almacenada"
description: "Capítulo V6 del ASVS 4.0.3: clasificación de datos, algoritmos criptográficos, valores aleatorios y gestión de secretos."
---

Cuando hablamos de criptografía *almacenada* nos referimos a los datos **en reposo**: la base de datos, los discos, los backups. El objetivo es que, si un atacante roba el disco, no pueda leer la información.

> **Objetivo de control:** todos los módulos criptográficos **fallan de forma segura** y los errores se gestionan correctamente; se utiliza un **generador de números aleatorios adecuado**; el **acceso a las claves** se administra de forma segura.

## V6.1 Clasificación de Datos

El activo más importante son los datos procesados, almacenados o transmitidos por una aplicación. Realice siempre una evaluación de impacto en la privacidad para clasificar correctamente las necesidades de protección de los datos almacenados.

### 6.1.1 — Datos privados regulados cifrados en reposo (CWE-311)

> *"Verifique que los datos privados regulados se almacenan cifrados mientras están en reposo, como información de identificación personal (PII), información personal confidencial o datos evaluados que puedan estar sujetos al RGPD de la UE."*

**Explicación:** si por ley tus datos personales están regulados (GDPR, etc.), deben viajar cifrados incluso en el disco: una fuga de base de datos no debe convertirse en una fuga de datos personales. **Niveles: L1, L2.**

### 6.1.2 — Datos de salud regulados cifrados en reposo (CWE-311)

> *"Verifique que los datos de salud regulados se almacenen cifrados mientras están en reposo, como registros médicos, detalles de dispositivos médicos o registros de investigación anonimizados."*

**Explicación:** la información de salud es de las más sensibles que existen; exige el mismo cifrado en reposo que la PII. **Niveles: L1, L2.**

### 6.1.3 — Datos financieros regulados cifrados en reposo (CWE-311)

> *"Verifique que los datos financieros regulados se almacenen cifrados mientras están en reposo, como cuentas financieras, impagos o historial de crédito, registros fiscales, historial de pagos, beneficiarios o registros de mercado o de investigación anonimizados."*

**Explicación:** cuentas, impagos, historial fiscal... si caen en malas manos en claro, el daño es inmediato. Cifrado en reposo obligatorio. **Niveles: L1, L2.**

## V6.2 Algoritmos

Los avances recientes en criptografía significan que los algoritmos y longitudes de clave previamente seguros ya no lo son. Por lo tanto, **debe ser posible cambiar algoritmos**.

> *Aunque esta sección no es fácil de demostrar con prueba de penetración, los desarrolladores deben considerar toda esta sección como obligatoria, aunque L1 falta en la mayoría de los elementos.*

### 6.2.1 — Fallo seguro contra ataques de Padding Oracle (CWE-310)

> *"Verifique que todos los módulos criptográficos fallan de forma segura y que los errores se gestionan de forma que no se habiliten los ataques 'Padding Oracle'."*

**Explicación:** el ataque *Padding Oracle* usa la diferencia entre "error de padding" y "padding correcto" para descifrar mensajes a ciegas. Los errores criptográficos deben ser genéricos y uniformes. **Niveles: L1, L2, L3.**

### 6.2.2 — Algoritmos probados por la industria (CWE-327, C8)

> *"Verifique que se utilicen algoritmos, modos y bibliotecas criptográficas probados por la industria o aprobados por el gobierno, en lugar de criptografía codificada personalizada."*

**Explicación:** nunca inventes tu propio cifrado: usa AES, ChaCha20 y librerías auditadas. La criptografía casera siempre está rota, solo que no lo sabes todavía. **Niveles: L1, L2.**

### 6.2.3 — Configuración de cifrado según las últimas guías (CWE-326)

> *"Verifique que los modos de vector de inicialización de cifrado, configuración de cifrado y bloque están configurados de forma segura mediante los últimos consejos vigentes."*

**Explicación:** el modo de bloque (CBC, GCM...), el IV y la configuración importan tanto como el algoritmo: una mala configuración (reusar IV, modo ECB) rompe el cifrado. Sigue las guías vigentes. **Niveles: L1, L2.**

### 6.2.4 — Algoritmos intercambiables (CWE-326, C8)

> *"Verifique que los algoritmos de número aleatorio, cifrado o hash, longitudes de clave, rondas, cifrados o modos, se puedan reconfigurar, actualizar o intercambiar en cualquier momento, para protegerse contra rupturas criptográficas."*

**Explicación:** el diseño debe permitir cambiar de algoritmo sin reescribir la app (ej. configurable): cuando SHA-1 se rompa, migrarás sin pánico. **Niveles: L1, L2.**

### 6.2.5 — Prohibir algoritmos y modos inseguros (CWE-326)

> *"Verifique que los modos de bloque inseguros conocidos (i.e., ECB, etc.), los modos de relleno (i.e. PKCS#1 v1.5, etc.), los cifrados con tamaños de bloque pequeños (i.e. Triple-DES, Blowfish, etc.), y los algoritmos de hashing débiles (i.e. MD5, SHA1, etc.) no se utilizan a menos que sea necesario para la compatibilidad con versiones anteriores."*

**Explicación:** ECB, 3DES, Blowfish, MD5, SHA-1... son historia: están rotos o al borde. No se usan en código nuevo. **Niveles: L1, L2.**

### 6.2.6 — Nonces e IV sin reutilización (CWE-326)

> *"Verifique que los 'nonces', los vectores de inicialización y otros números de uso único no se deben usar más de una vez con una clave de cifrado determinada. El método de generación debe ser adecuado para el algoritmo que se está utilizando."*

**Explicación:** reutilizar un nonce/IV con la misma clave anula la seguridad (especialmente en GCM, donde puede revelar la clave de autenticación). Cada cifrado, nonce nuevo. **Niveles: L1, L2.**

### 6.2.7 — Texto cifrado autenticado (CWE-326)

> *"Verifique que los datos cifrados se autentiquen a través de firmas, modos de cifrado autenticados, o HMAC para asegurarse de que el texto cifrado no sea alterado por una parte no autorizada."*

**Explicación:** cifrar sin autenticar permite manipular el texto cifrado (bit-flipping). Usa modos autenticados (GCM, ChaCha20-Poly1305) o añade un HMAC. **Nivel: L1.**

### 6.2.8 — Operaciones en tiempo constante (CWE-385)

> *"Verifique que todas las operaciones criptográficas son de tiempo constante, sin operaciones de 'cortocircuito' en comparaciones, cálculos o devoluciones, para evitar fugas de información."*

**Explicación:** comparar contraseñas o MACs con `==` falla más rápido en el carácter incorrecto: midiendo el tiempo, el atacante adivina carácter a carácter. Compara siempre con funciones de tiempo constante. **Nivel: L1.**

## V6.3 Valores Aleatorios

La generación de números pseudoaleatorios (PRNG) es increíblemente difícil de hacer bien: las buenas fuentes de entropía se agotan si se usan en exceso, y las fuentes pobres generan claves y secretos predecibles.

### 6.3.1 — CSPRNG para valores que no deben adivinarse (CWE-338)

> *"Verifique que todos los números aleatorios, nombres de archivo aleatorios, GUID aleatorios y cadenas aleatorias se generan utilizando el generador de números aleatorios criptográficamente seguro aprobado por el módulo criptográfico cuando estos valores aleatorios están destinados a no ser adivinables por un atacante."*

**Explicación:** tokens, salt, nombres de archivo temporales: todo lo aleatorio que protege algo se genera con un CSPRNG, nunca con `Math.random()`. **Niveles: L1, L2.**

### 6.3.2 — GUID v4 con CSPRNG (CWE-338)

> *"Verifique que los GUID aleatorios se crean mediante el algoritmo GUID v4 y un generador de números pseudoaleatorio (CSPRNG) criptográficamente seguro. Los GUID creados con otros generadores de números pseudoaleatorios pueden ser predecibles."*

**Explicación:** si un GUID se usa como token (restablecimiento de contraseña, etc.), debe ser v4 y aleatorio de verdad: los GUID predecibles (v1, secuenciales) se pueden adivinar. **Niveles: L1, L2.**

### 6.3.3 — Entropía bajo carga pesada (CWE-338)

> *"Verifique que los números aleatorios se crean con la entropía adecuada incluso cuando la aplicación está bajo carga pesada, o que la aplicación se degrada correctamente en tales circunstancias."*

**Explicación:** bajo alta carga, los generadores pobres "agotan" entropía y producen valores repetidos o predecibles. La app debe degradarse con elegancia (ej. encolar, no repetir). **Nivel: L1.**

## V6.4 Gestión de Secretos

> *Aunque esta sección no se demuestra fácilmente con prueba de penetración, los desarrolladores deben considerar toda esta sección como obligatoria, aunque L1 falta en la mayoría de los elementos.*

### 6.4.1 — Solución de gestión de secretos (CWE-798, C8)

> *"Verifique que una solución de gestión de secretos, como un almacén de claves, se utiliza para crear, almacenar, controlar el acceso y destruir secretos de forma segura."*

**Explicación:** claves API, contraseñas de base de datos y certificados viven en un *secret vault* (HashiCorp Vault, AWS KMS...), no en el código ni en archivos de configuración del repositorio. **Niveles: L1, L2.**

### 6.4.2 — Material de claves aislado (CWE-320, C8)

> *"Verifique que el material de claves no está expuesto a la aplicación, sino que utiliza un módulo de seguridad aislado como un almacén para operaciones criptográficas."*

**Explicación:** lo ideal: la aplicación **nunca ve la clave**; le pide al HSM/módulo seguro que cifre o firme por ella. Así, comprometer la app no expone las claves. **Niveles: L1, L2.**

## Referencias

OWASP Testing Guide 4.0 (Testing for weak Cryptography), OWASP Cheat Sheet: Cryptographic Storage, FIPS 140-2.

## Resumen

> V6 protege los datos en reposo: clasifica qué datos requieren cifrado,
> usa algoritmos probados y configurables (nada de criptografía casera ni
> algoritmos rotos), genera aleatoriedad con CSPRNG y guarda los secretos
> en almacenes aislados y auditados.