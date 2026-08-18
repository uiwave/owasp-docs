---
title: "A08: Software and Data Integrity Failures (Fallos de Integridad de Software y Datos)"
description: "OWASP Top 10 2021 A08: qué es, escenarios de ataque, cómo prevenirlo y su relación con el ASVS."
---

Imagina que el camión que repone las estanterías de tu tienda no verifica que la mercancía sea auténtica: un repartidor falso puede llenar las estanterías con producto envenenado. Los **fallos de integridad** son eso: software y datos que llegan sin verificar su origen ni su firma.

> **A08:2021 Software and Data Integrity Failures** — categoría nueva en 2021, que abarca los **ataques de cadena de suministro (supply chain)**, la deserialización insegura y el código que se ejecuta sin verificar su integridad. **CWEs asociadas:** CWE-345, CWE-353, CWE-426, CWE-502 (deserialización), CWE-829.

## ¿En qué consiste?

La integridad falla cuando:

- La aplicación **carga código sin verificar su origen ni firma**: plugins, bibliotecas, actualizaciones de fuentes no confiables.
- La **pipeline de CI/CD está comprometida**: el código que se despliega no es el que se revisó.
- Se **deserializan objetos no confiables** (insecure deserialization): el atacante envía un objeto serializado malicioso que la app reconstruye.
- Se confía en **plugins o extensiones de terceros** sin auditar (el famoso ataque a los plugins de navegador y de frameworks).
- Faltan **firmas de código, SRI o verificación de integridad** de actualizaciones.

## Escenarios de ataque comunes

1. **Deserialización insegura:** la app deserializa una cookie PHP/Java del cliente: el atacante envía un objeto diseñado para ejecutar código al descomprimirse.
2. **Actualización falsa:** el atacante suplanta el servidor de actualizaciones (o compromete la CDN): millones de dispositivos instalan el malware "firmado" con la firma robada.
3. **CI/CD envenenado:** un paquete "typosquat" (nombre parecido a una librería famosa) se cuela en la compilación: el atacante controla el producto final.

## Cómo prevenirlo

- **Firmas digitales y verificación de integridad** en todo lo que se instala, ejecuta o actualiza.
- **SRI (Subresource Integrity)** para recursos de CDNs; códigos firmados en producción.
- **Repositorios predefinidos y confiables**; auditoría de dependencias (SBOM).
- **Evitar la deserialización de datos no confiables**; si es inevitable, listas de clases permitidas y validación.
- **Proteger la pipeline CI/CD**: acceso restringido, revisión de código, verificaciones de integridad en cada etapa.
- **Actualizaciones por canales seguros** que validen la firma antes de instalar.

## Relación con el ASVS

- **V10 Código Malicioso** — integridad del código, actualizaciones firmadas y protección de la cadena de suministro (`/capitulos/v10-codigo-malicioso`).
- **V5.5 Prevención de Deserialización** — objetos serializados con integridad, sin XXE (`/capitulos/v5-validacion`).
- **V14.1/14.2 Compilación y dependencias** — pipelines seguros, SBOM y SRI (`/capitulos/v14-configuracion`).

## Resumen

> A08 es el riesgo de confiar sin verificar: código sin firmar,
> deserialización de objetos maliciosos y pipelines comprometidas. Se
> previene firmando todo lo que se ejecuta, verificando la integridad de
> cada componente y protegiendo la cadena de suministro completa.