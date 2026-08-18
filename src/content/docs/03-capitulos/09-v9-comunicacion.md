---
title: "V9: Comunicación"
description: "Capítulo V9 del ASVS 4.0.3: seguridad de la comunicación del cliente y del servidor con TLS."
---

Imagina que envías una carta con la información de tu cuenta bancaria por correo común: cualquiera en el camino podría leerla. Así es una aplicación sin cifrado: cada salto de red es un espía potencial. Este capítulo exige **TLS (HTTPS) en todo**, siempre.

> **Objetivo de control:** requiere TLS o cifrado fuerte, **independientemente de la sensibilidad del contenido**; seguir la guía más reciente (configuración, algoritmos y cifrados preferidos); evitar los algoritmos débiles u obsoletos; deshabilitar los cifrados en desuso o inseguros.
>
> - Manténgase actualizado con los consejos de configuración segura de TLS: cambian con frecuencia (a menudo por fallas catastróficas de algoritmos).
> - Use las herramientas más recientes de revisión de configuración TLS.
> - Verifique su configuración periódicamente.

## V9.1 Seguridad de la Comunicación del Cliente

Todos los mensajes de los clientes deben enviarse a través de redes cifradas, con **TLS 1.2 o posterior**, revisando la configuración periódicamente con herramientas actualizadas.

### 9.1.1 — TLS en toda la conectividad del cliente (CWE-319, C8)

> *"Verifique que TLS se utilice para toda la conectividad del cliente y que no recurra a comunicaciones inseguras o no cifradas."*

**Explicación:** toda la comunicación navegador-servidor va cifrada, sin excepciones ni "fallbacks" a HTTP. Redirigir HTTPS→HTTP es una puerta abierta. **Niveles: L1, L2, L3.**

### 9.1.2 — Solo conjuntos de cifrado fuertes (CWE-326)

> *"Verifique con herramientas de prueba TLS actualizadas que solo estén habilitados los conjuntos de cifrado fuertes, con los conjuntos de cifrado más fuertes configurados como preferidos."*

**Explicación:** tener TLS no basta: el "cipher suite" importa. Cifrados débiles (RC4, 3DES, export-grade) se deshabilitan y los fuertes se ordenan primero. Herramientas como *Mozilla SSL Config Generator* ayudan. **Niveles: L1, L2, L3.**

### 9.1.3 — Solo versiones recientes de TLS (CWE-326)

> *"Verifique que solo estén habilitadas las últimas versiones recomendadas del protocolo TLS, como TLS 1.2 y TLS 1.3. La última versión del protocolo TLS debería ser la opción preferida."*

**Explicación:** TLS 1.0 y 1.1 están rotos (POODLE, BEAST, Raccoon...): se desactivan. Se habilita TLS 1.2 y 1.3, con la 1.3 como preferida. **Niveles: L1, L2, L3.**

> **Nota sobre "modos aprobados":** en el pasado, la ASVS se refería al estándar estadounidense FIPS 140-2, pero como estándar global aplicar estándares estadounidenses puede resultar difícil o confuso. Un mejor método: revisar guías como la de **Mozilla Server Side TLS**, generar configuraciones correctas conocidas y usar herramientas de evaluación TLS actualizadas.

## V9.2 Seguridad de la Comunicación del Servidor

Las comunicaciones de servidor son algo más que HTTP: conexiones a sistemas de monitoreo, herramientas de administración, acceso remoto (SSH), middleware, bases de datos, mainframes, sistemas de socios... Todas deben cifrarse, para evitar el patrón "dureza exterior, trivialmente fácil de interceptar en el interior".

### 9.2.1 — Certificados TLS de confianza (CWE-295)

> *"Verifique que las conexiones hacia y desde el servidor utilizan certificados TLS de confianza. Cuando se utilizan certificados generados internamente o autofirmados, el servidor debe configurarse para que solo confíe en las CA internas específicas y en los certificados autofirmados específicos. Todos los demás deben ser rechazados."*

**Explicación:** el servidor no debe "confiar en todo": si usas CA internas, configura la lista exacta de CA en las que confías y rechaza el resto. Confiar en cualquier certificado = cualquier atacante puede suplantar tu backend. **Niveles: L1, L2.**

### 9.2.2 — Cifrado en todas las conexiones entrantes y salientes (CWE-319)

> *"Verifique que las comunicaciones cifradas, como TLS, se utilizan para todas las conexiones entrantes y salientes, incluidos los puertos de administración, monitoreo, la autenticación, la API o las llamadas a servicios web, la base de datos, la nube, el serverless, el mainframe, ya sean externos o de conexiones de asociados. El servidor no debe volver a protocolos inseguros o no cifrados."*

**Explicación:** las conexiones internas también se cifran: MySQL, Redis, API de monitoreo, SSH... El atacante que penetra la red externa no debe encontrar tráfico legible dentro. **Niveles: L1, L2.**

### 9.2.3 — Autenticación en conexiones cifradas a sistemas externos (CWE-287)

> *"Verifique que se autentican todas las conexiones cifradas a sistemas externos que implican información o funciones confidenciales."*

**Explicación:** cifrar sin autenticar permite un "man in the middle": hay que verificar la identidad del extremo (certificados, mTLS). **Niveles: L1, L2.**

### 9.2.4 — Revocación de certificados habilitada (CWE-299)

> *"Verifique que la adecuada revocación de certificación, como la comprobación de Online Certificate Status Protocol (OCSP), esté habilitada y configurada."*

**Explicación:** si un certificado interno se compromete, debe poder revocarse y los clientes deben comprobarlo (OCSP). Certificados revocados que siguen funcionando = credencial muerta en uso. **Niveles: L1, L2.**

### 9.2.5 — Logging de errores de conexión TLS (CWE-544)

> *"Verifique que se hace logging de errores de conexión TLS de back-end."*

**Explicación:** los fallos de TLS con backends son síntomas tempranos de problemas de configuración o de ataques (intercepción): se registran para detectarlos. **Nivel: L1.**

## Referencias

OWASP TLS Cheat Sheet, OWASP Pinning Guide, Mozilla Server Side TLS, herramientas de evaluación TLS actualizadas.

## Resumen

> V9 exige que todo el tráfico —cliente y servidor— viaje cifrado con
> TLS 1.2/1.3 y conjuntos de cifrado fuertes, con certificados verificados
> y revocables, sin fallbacks inseguros ni conexiones internas en claro.