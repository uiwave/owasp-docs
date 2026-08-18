---
title: "A02: Cryptographic Failures (Fallos Criptográficos)"
description: "OWASP Top 10 2021 A02: qué es, escenarios de ataque, cómo prevenirlo y su relación con el ASVS."
---

Imagina que guardas tus joyas en una caja **sin llave** o con una cerradura de juguete que se abre con cualquier alambre: estás "protegiendo" tus datos sin protegerlos de verdad. Así son los **fallos criptográficos**: crees que tus datos están seguros, pero la criptografía es débil, está mal usada o simplemente no existe.

> **A02:2021 Cryptographic Failures** — antes llamado "Sensitive Data Exposure" (2017). Subió al segundo puesto: si un atacante roba datos que deberían estar cifrados y no lo están, la brecha es total.

## ¿En qué consiste?

La criptografía falla cuando:

- Los datos confidenciales se transmiten o almacenan **en texto claro** (sin cifrar): contraseñas, tarjetas, datos de salud.
- Se usan **algoritmos débiles o rotos**: MD5, SHA-1, DES, 3DES, RSA de 1024 bits, ECB.
- Se usa **criptografía casera** o configuración incorrecta (IV reutilizado, modos inseguros).
- Las **claves están mal gestionadas**: hardcodeadas en el código, en repositorios, sin rotación, o compartidas.
- Falta el cifrado en reposo, o el cifrado se hace solo "en tránsito".

**CWEs asociadas:** CWE-259 (contraseñas hardcodeadas), CWE-327 (algoritmos rotos), CWE-331 (entropía insuficiente), CWE-798 (credenciales embebidas).

## Escenarios de ataque comunes

1. **Base de datos en claro:** un atacante roba la copia de seguridad de la base de datos y encuentra contraseñas y datos personales **legibles sin esfuerzo**.
2. **HTTP sin TLS:** en un café, el atacante con el WiFi captura el tráfico y lee la contraseña que el usuario envía en texto plano.
3. **Algoritmo roto:** la app "cifra" contraseñas con MD5 sin salt: el atacante las compara contra tablas de arcoíris y las recupera en segundos.

## Cómo prevenirlo

- **Clasificar los datos** según sensibilidad y aplicar cifrado según esa clasificación (en reposo y en tránsito).
- **TLS 1.2/1.3 en todo** el tráfico, con conjuntos de cifrado fuertes.
- **Algoritmos probados** por la industria (AES-GCM, ChaCha20, Argon2/bcrypt/PBKDF2 para contraseñas) — nunca criptografía propia.
- **Almacenar contraseñas hasheadas** con salt e iteraciones suficientes.
- **Gestionar claves** con almacenes de secretos (vaults, HSM), rotación y claves únicas.
- **Deshabilitar algoritmos obsoletos** y poder intercambiar los algoritmos cuando se rompan.

## Relación con el ASVS

- **V6 Criptografía Almacenada** — cifrado en reposo, algoritmos, aleatoriedad y gestión de secretos (`/capitulos/v6-criptografia`).
- **V8 Protección de Datos** — confidencialidad, integridad y disponibilidad de los datos (`/capitulos/v8-proteccion-datos`).
- **V9 Comunicación** — TLS en toda la comunicación (`/capitulos/v9-comunicacion`).
- **V2.4 Almacenamiento de contraseñas** — hash con salt e iteraciones (`/capitulos/v2-autenticacion`).

## Resumen

> A02 es el riesgo de la criptografía que no protege: datos en claro,
> algoritmos rotos, claves mal guardadas. La defensa es clasificar los
> datos, cifrarlos en reposo y en tránsito con algoritmos probados y
> gestionar las claves como secretos de verdad.