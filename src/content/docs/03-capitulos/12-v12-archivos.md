---
title: "V12: Archivos y Recursos"
description: "Capítulo V12 del ASVS 4.0.3: carga de archivos, integridad, ejecución, almacenamiento, descarga y protección SSRF."
---

Los archivos son un caballo de Troya favorito: un PDF "inofensivo" puede contener una macro, un zip puede ser una bomba, y un nombre de archivo puede ser un comando. Este capítulo trata de manejar los archivos no confiables como lo que son: **peligrosos hasta que se demuestre lo contrario**.

> **Objetivo de control:** los datos de archivo que no son de confianza se manejan de forma segura; los archivos obtenidos de fuentes no confiables se almacenan **fuera de la raíz web** y con **permisos limitados**.

## V12.1 Carga de Archivos

> *Nota: aunque las bombas zip son eminentemente comprobables con pruebas de penetración, se consideran L2 o superior para fomentar la consideración en el diseño y el desarrollo, y evitar que probadores no calificados reporten falsas condiciones de denegación de servicio.*

### 12.1.1 — Límite de tamaño de archivos (CWE-400)

> *"Verifique que la aplicación no aceptará archivos grandes que puedan llenar el almacenamiento o provocar una denegación de servicio."*

**Explicación:** sin límite de tamaño, cualquiera llena tu disco o agota tu ancho de banda: sube un archivo de 100 GB y adiós servicio. Límites de tamaño por archivo, siempre. **Niveles: L1, L2, L3.**

### 12.1.2 — Control de archivos comprimidos (CWE-409)

> *"Verifique que la aplicación compruebe los archivos comprimidos (p. ej. zip, gz, docx, odt) contra el tamaño máximo sin comprimir permitido y con el número máximo de archivos antes de descomprimir el archivo."*

**Explicación:** la "bomba zip": un zip de 10 KB que se descomprime en 100 GB, o que contiene miles de archivos. Se valida tamaño total y número de archivos **antes** de descomprimir. **Niveles: L1, L2.**

### 12.1.3 — Cuotas por usuario (CWE-770)

> *"Verifique que se aplica una cuota de tamaño de archivo y un número máximo de archivos por usuario para asegurarse de que un solo usuario no puede llenar el almacenamiento con demasiados archivos o archivos excesivamente grandes."*

**Explicación:** incluso con límite por archivo, un bot puede subir millones de archivos pequeños: cuotas por usuario (espacio total y cantidad) lo impiden. **Niveles: L1, L2.**

## V12.2 Integridad de Archivos

### 12.2.1 — Validar el tipo real del contenido (CWE-434)

> *"Verifique que los archivos obtenidos de orígenes que no son de confianza se validan para que sean del tipo esperado en función del contenido del archivo."*

**Explicación:** no basta la extensión: un "imagen.png" puede ser un script. Se valida el **contenido real** (magic bytes: PNG, JPEG, PDF) y se convierte/re-procesa cuando sea posible. **Niveles: L1, L2.**

## V12.3 Ejecución de Archivos

### 12.3.1 — Protección contra path traversal (CWE-22)

> *"Verifique que los metadatos del nombre de archivo enviados por el usuario no se utilizan directamente por los sistemas de archivos del sistema o del marco de trabajo y que se utiliza una API de dirección URL para proteger contra el recorrido de ruta de acceso."*

**Explicación:** `../../../../etc/passwd` en el nombre del archivo puede leer o escribir fuera del directorio previsto. El nombre real lo genera el servidor; el del usuario solo como referencia. **Niveles: L1, L2, L3.**

### 12.3.2 — Sin divulgación de archivos locales (CWE-73)

> *"Verifique que los metadatos del nombre de archivo enviados por el usuario se validan o ignoran para evitar la divulgación, creación, actualización o eliminación de archivos locales (LFI)."*

**Explicación:** si el nombre de archivo controla qué se lee del disco, el atacante lee archivos del servidor (LFI) e incluso los modifica o borra. Se valida contra una lista estricta. **Niveles: L1, L2, L3.**

### 12.3.3 — Sin inclusión remota ni SSRF (CWE-98)

> *"Verifique que los metadatos del nombre de archivo enviados por el usuario se validan o omiten para evitar la divulgación o ejecución de archivos remotos a través de ataques de inclusión remota de archivos (RFI) o falsificación de solicitudes del lado del servidor (SSRF)."*

**Explicación:** un nombre de archivo puede ser una URL: `http://malicioso.com/shell` o `http://localhost/secretos`. Se valida o se ignora por completo. **Niveles: L1, L2, L3.**

### 12.3.4 — Protección contra descargas reflectantes (RFD) (CWE-641)

> *"Verifique que la aplicación protege contra la descarga de archivos reflectantes (RFD) validando o ignorando los nombres de archivo enviados por el usuario en un parámetro JSON, JSONP o URL, el encabezado Content-Type de respuesta debe establecerse en text/plain y el encabezado Content-Disposition debe tener un nombre de archivo fijo."*

**Explicación:** el ataque RFD engaña al navegador para que descargue y ejecute una "respuesta" con tu dominio como origen: un nombre de archivo reflejado con `.bat` o `.js` + `Content-Disposition` incorrecto. Nombres fijos y `text/plain` lo neutralizan. **Niveles: L1, L2, L3.**

### 12.3.5 — Sin inyección de comandos por nombre de archivo (CWE-78)

> *"Verifique que los metadatos de archivos que no son de confianza no se utilizan directamente con la API del sistema o las bibliotecas, para proteger contra la inyección de comandos del sistema operativo."*

**Explicación:** un nombre como `foto; rm -rf /` pasado a una API del sistema (ImageMagick, ffmpeg, `mv`) se convierte en comandos. Nunca concatenes nombres de usuario en llamadas al sistema. **Niveles: L1, L2, L3.**

### 12.3.6 — Sin funcionalidad de orígenes no confiables (CWE-829)

> *"Verifique que la aplicación no incluye ni ejecuta funcionalidad desde orígenes que no son de confianza, como redes de distribución de contenido no verificadas, bibliotecas de JavaScript, bibliotecas node npm o archivos DLL server-side."*

**Explicación:** cada librería de terceros es código que ejecutas: solo se incluyen librerías de orígenes verificados y mantenidos, con SRI cuando vienen de CDNs. **Niveles: L1, L2.**

## V12.4 Almacenamiento de Archivos

### 12.4.1 — Archivos fuera de la raíz web (CWE-552)

> *"Verifique que los archivos obtenidos de fuentes no confiables se almacenen fuera de la raíz web, con permisos limitados."*

**Explicación:** un archivo subido dentro de la raíz web se puede **ejecutar o descargar directamente** (`/uploads/shell.php`). Fuera de la raíz, con permisos mínimos, solo el código puede accederlo. **Niveles: L1, L2, L3.**

### 12.4.2 — Escáner antivirus en archivos subidos (CWE-509)

> *"Verifique que los escáneres antivirus analicen los archivos obtenidos de fuentes no confiables para evitar la carga y el servicio de contenido malicioso conocido."*

**Explicación:** un archivo con malware cargado y servido convierte tu sitio en un distribuidor de malware: el antivirus lo detecta antes de almacenarlo o servirlo. **Niveles: L1, L2, L3.**

## V12.5 Descarga de Archivos

### 12.5.1 — Solo extensiones permitidas servidas (CWE-552)

> *"Verifique que la capa web está configurado para transmitir solo archivos con extensiones específicas, para evitar la filtración accidental de información o código fuente. Por ejemplo, los archivos de copia de seguridad (p. ej. .bak), los archivos de trabajo temporales (p. ej. .swp), los archivos comprimidos (.zip, .tar.gz, etc.) y otras extensiones utilizadas comúnmente por los editores deben bloquearse a menos que sea necesario."*

**Explicación:** los `.bak`, `.swp`, `.git` expuestos filtran código fuente y secretos: el servidor solo sirve las extensiones permitidas y bloquea el resto. **Niveles: L1, L2, L3.**

### 12.5.2 — Archivos cargados nunca ejecutados como HTML/JavaScript (CWE-434)

> *"Verifique que las solicitudes directas a los archivos cargados nunca se ejecutarán como contenido HTML/JavaScript."*

**Explicación:** un SVG o HTML "subido" servido directamente puede ejecutar script con tu dominio (stored XSS). Los archivos subidos se sirven con `Content-Disposition: attachment` o tipo de contenido no ejecutable. **Niveles: L1, L2, L3.**

## V12.6 Protección SSRF

### 12.6.1 — Lista de permisos de recursos del servidor (CWE-918)

> *"Verifique que el servidor web o de aplicaciones está configurado con una lista de permisos de recursos o sistemas a los que el servidor puede enviar solicitudes o cargar datos o archivos."*

**Explicación:** el servidor solo se comunica con lo que está en la lista de permitidos: el atacante no puede hacer que la app consulte `169.254.169.254` (metadatos de la nube) ni la red interna. **Niveles: L1, L2, L3.**

## Referencias

File Extension Handling for Sensitive Information, Reflective file download (Oren Hafif), OWASP Third Party JavaScript Management Cheat Sheet.

## Resumen

> V12 trata los archivos como no confiables: límites de tamaño y cuotas
> contra bombas zip, validación por contenido real, nombres de archivo
> nunca usados como rutas ni comandos, almacenamiento fuera de la raíz
> web con antivirus, descargas restringidas por extensión y listas de
> permitidos contra SSRF.