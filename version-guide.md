# Guía de publicación de versiones (explicada paso a paso para estudiantes)

> Esta guía enseña a **entender** cada comando, no solo a copiarlo. Cada
> comando viene con: qué hace, desglose parte por parte, lo que deberías ver
> en la terminal, errores comunes y una analogía para recordarlo.

---

## 0. Antes de empezar: los conceptos que necesitas

### ¿Qué es una terminal?

La terminal (PowerShell en Windows, terminal en Mac/Linux) es una ventana donde
escribes **comandos** (instrucciones de texto) para que la computadora los
ejecute. Tú escribes `git push origin main`, presionas Enter, y git ejecuta la
acción.

### ¿Qué es git?

Git es un sistema de **control de versiones**: guarda el historial de cambios
de tus archivos. Cada punto guardado se llama **commit**.

> **Analogía:** git es como guardar partidas en un videojuego. El commit es la
> "partida guardada": si algo se rompe, puedes volver a esa partida.

### ¿Qué es un repositorio (repo)?

Un repositorio es la carpeta de tu proyecto **vigilada por git**. La carpeta
`owasp` en tu computadora es el repositorio local. GitHub es el repositorio
**remoto** (una copia en la nube).

### ¿Qué es una rama (branch)?

Una rama es una línea de historial independiente. Tu proyecto trabaja en la
rama **`main`** (la principal). Cuando haces commits, van a `main`.

### ¿Qué es el área de preparación (staging)?

Git tiene 3 zonas:
1. **Directorio de trabajo** — tus archivos tal como están en tu editor.
2. **Área de preparación (staging)** — los cambios que ya **seleccionaste**
   para guardar (con `git add`).
3. **Repositorio** — el historial donde quedan los commits (con `git commit`).

> **Analogía:** cocinar. El staging es "los ingredientes en la mesa"
> (`git add`), el commit es "cocinar el plato" (`git commit`).

### ¿Qué es un tag?

Un tag es una **etiqueta** que le pones a un commit para marcarlo como un punto
importante. Cada versión publicada del proyecto (v1.0.0, v1.1.0, ...) es un tag.

> **Analogía:** un post-it en un capítulo importante de un libro.

### ¿Qué es un Release?

Un Release es la **versión pública oficial** en GitHub: une un tag con notas
descriptivas (tu changelog) y queda como referencia oficial de esa versión.

### ¿Qué es semver (Semantic Versioning)?

La versión tiene 3 números: `MAYOR.MENOR.PARCHE` (`major.minor.patch`).

| Tipo de cambio en el proyecto            | Número que sube  | Ejemplo          |
| ---------------------------------------- | ---------------- | ---------------- |
| Corriges un bug (arreglo)                | parche (3º)      | `1.0.0 → 1.0.1`  |
| Agregas una función o mejora             | menor (2º)       | `1.0.0 → 1.1.0`  |
| Cambias algo incompatible con lo anterior| mayor (1º)       | `1.0.0 → 2.0.0`  |

### ¿Qué es el changelog?

El changelog documenta **qué cambió en cada versión**. Vive en dos lugares que
son **espejos** (deben estar sincronizados):
- `CHANGELOG.md` — documento oficial (formato *Keep a Changelog*).
- `src/data/changelog.ts` — los datos que renderiza la página `/historial`.

> **Regla de oro:** cada entrada nueva en uno va también en el otro.

---

## A) Publicar la versión actual (ej. v1.0.0)

### Paso 0 — Verificar el estado del repositorio (opcional pero recomendado)

```bash
git status
```

**¿Qué hace?** Te muestra el estado actual: qué archivos cambiaron, cuáles son
nuevos, en qué rama estás.

**Desglose:**
- `git` → el programa.
- `status` → "muéstrame el estado".

**Lo que deberías ver:**
```
On branch main
Changes not staged for commit:
  modified:   package.json
Untracked files:
  CHANGELOG.md
```
- `modified:` → archivo que ya existía y cambió.
- `Untracked files:` → archivos nuevos que git todavía no vigila (aún no se han
  hecho `add`).

**Errores comunes:** si ves `Your branch is up to date with 'origin/main'`,
significa que no hay nada pendiente o que ya subiste todo.

---

### Paso 1 — Commitear los cambios

```bash
git add -A
```

**¿Qué hace?** Mueve **todos** los cambios (modificados, nuevos, eliminados) al
área de preparación (staging).

**Desglose token por token:**
- `git` → el programa.
- `add` → "agrega al área de preparación" (selecciona los cambios a guardar).
- `-A` (all) → "todos los archivos". Sin esto, git solo agrega lo que le digas
  (`git add package.json` agregaría un solo archivo).

**Alternativas que verás en otros tutoriales:**
- `git add .` → agrega todo de la carpeta actual. Casi igual a `-A`, pero
  `-A` también captura **eliminaciones** de archivos; con `.` las eliminaciones
  pueden no registrarse. Por eso se recomienda `-A`.

**Lo que deberías ver:**
```
(nada visible si todo fue bien)
```

**Errores comunes:** si olvidas `git add`, el siguiente comando (`git commit`)
guardará **solo lo que esté en staging** — y posiblemente nada.

---

```bash
git commit -m "feat: v1.0.0 - descripción de los cambios"
```

**¿Qué hace?** Guarda la "foto" del estado actual en el historial, con un
mensaje que describe qué hiciste.

**Desglose token por token:**
- `git` → el programa.
- `commit` → "guarda esta partida en el historial".
- `-m` (message) → "el mensaje viene aquí mismo, en la línea de comando". Sin
  `-m`, git abre un editor de texto para que escribas el mensaje (incomodo si
  no conoces el editor).
- `"feat: v1.0.0 - descripción de los cambios"` → el mensaje entre comillas.
  La palabra inicial es una **convención profesional** (Conventional Commits):
  - `feat:` → agregaste una función nueva.
  - `fix:` → corregiste un bug.
  - `docs:` → cambiaste documentación.
  - `style:` → cambios de formato sin lógica.
  - `refactor:` → reescribiste código sin cambiar su comportamiento.

**Lo que deberías ver:**
```
[main a1b2c3d] feat: v1.0.0 - descripción de los cambios
 5 files changed, 120 insertions(+), 4 deletions(-)
```
- `main` → la rama donde quedó el commit.
- `a1b2c3d` → el **hash** (identificador único) del commit. Sirve para
  referenciarlo (ej. para volver atrás: `git checkout a1b2c3d`).
- `5 files changed` → cuántos archivos tocó este commit.

**Errores comunes:** `nothing to commit, working tree clean` → no hiciste
`git add` (o no hay cambios). `Please tell me who you are` → git no tiene tu
nombre/correo configurado; se arregla con:
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@correo.com"
```

---

### Paso 2 — Crear el tag semver (etiqueta de la versión)

```bash
git tag -a v1.0.0 -m "Versión 1.0.0 - Primera publicación"
```

**¿Qué hace?** Le pone la etiqueta `v1.0.0` al commit actual (el del Paso 1).

**Desglose token por token:**
- `git` → el programa.
- `tag` → el comando para crear o ver etiquetas.
- `-a` (annotated) → crea un **tag anotado**: guarda autor, fecha y mensaje
  (metadata completa, como un commit). La alternativa es un tag **ligero**
  (`git tag v1.0.0`), que solo es un puntero sin información; los proyectos
  profesionales **siempre** usan `-a`.
- `v1.0.0` → el nombre de la etiqueta. **Convención universal:** empieza con
  `v` y usa semver (`v1.0.0`, `v1.0.1`, `v1.1.0`, `v2.0.0`).
- `-m "Versión 1.0.0 - ..."` → el mensaje del tag (qué es esta versión).

**Dato clave:** el tag apunta al commit **actual**. Si mañana haces más
commits, el tag seguirá marcando el commit de v1.0.0 — que es exactamente lo
que queremos (la versión no se mueve).

**Verificación:**
```bash
git tag -l
```
Lista todos los tags. Deberías ver `v1.0.0`.

**Errores comunes:** `fatal: tag 'v1.0.0' already exists` → el tag ya existe
(quizá lo creaste sin querer). Revísalo con `git tag -l`.

---

### Paso 3 — Subir todo a GitHub (¡dos pushes!)

```bash
git push origin main
```

**¿Qué hace?** Sube tus commits locales a GitHub, en la rama `main`.

**Desglose token por token:**
- `git` → el programa.
- `push` → "empuja" (sube) lo local al remoto.
- `origin` → el nombre que git le da a tu repositorio remoto. Se configura al
  clonar o con `git remote add origin URL`. Puedes verlo con `git remote -v` —
  en este proyecto apunta a `https://github.com/uiwave/owasp-docs.git`.
- `main` → la rama que quieres subir.

```bash
git push origin v1.0.0
```

**¿Por qué hace falta un segundo push?**

Los **tags no se suben solos** con el push de la rama. Hay que empujarlos
explícitamente. Este es el error clásico de principiantes: crean el tag, hacen
push de la rama, y el tag nunca aparece en GitHub.

**Desglose:**
- `origin` → el mismo remoto de antes.
- `v1.0.0` → el **nombre del tag** que quieres subir (nota: no es una rama,
  es una etiqueta).

**Alternativa:** `git push --tags` sube todos los tags de una vez (útil cuando
hay varios), pero lo profesional es subir el tag específico para no arrastrar
tags viejos o experimentales.

**Lo que deberías ver:**
```
Enumerating objects: 12, done.
...
 * [new branch]      main -> main
 * [new tag]         v1.0.0 -> v1.0.0
```
`* [new tag]` confirma que el tag llegó al remoto.

**Errores comunes:** `fatal: 'origin' does not appear to be a git repository`
→ no hay remoto configurado; agrégale con `git remote add origin <URL>`.

---

### Paso 4 — Crear el Release en GitHub

```bash
gh release create v1.0.0 --generate-notes
```

**¿Qué hace?** Crea el Release oficial en GitHub usando el tag `v1.0.0`.

**Desglose token por token:**
- `gh` → la herramienta de línea de comandos de **GitHub** (el "CLI de
  GitHub"). Si no está instalada, se hace por la web: repositorio → *Releases*
  → *Draft a new release*.
- `release` → subcomando para gestionar releases.
- `create` → "crea uno nuevo".
- `v1.0.0` → "usa el tag v1.0.0" (ya debe existir en el remoto — por eso el
  Paso 3 va antes).
- `--generate-notes` → GitHub genera las notas automáticamente a partir de los
  commits desde el último release. Si prefieres notas manuales (pegando tu
  changelog, más cuidadas), **omite** esta bandera: se abrirá un editor donde
  escribes las notas.

**¿Qué es un Release en concreto?** Es la "vitrina" de la versión: muestra las
notas, queda como referencia oficial y aparece en la pestaña *Releases* del
repositorio. Los proyectos profesionales publican un Release por cada tag.

**Lo que deberías ver:**
```
https://github.com/uiwave/owasp-docs/releases/tag/v1.0.0
```
(la URL de tu release).

---

### Paso 5 — Desplegar el sitio (publicarlo en internet)

```bash
pnpm build
```

**¿Qué hace?** Compila el proyecto y genera la carpeta `dist/` con el sitio
completo (HTML, CSS, JS) listo para servirse en cualquier hosting.

**Desglose token por token:**
- `pnpm` → el gestor de paquetes de JavaScript (como npm, pero más rápido y
  eficiente; guarda los paquetes en un almacén global).
- `build` → ejecuta el script `build` definido en `package.json`. Puedes verlo
  ahí: `"build": "astro build"`. El script llama a **Astro**, el framework del
  sitio, que genera páginas estáticas.

**¿Qué es `dist/`?** La carpeta del sitio final. Puedes abrirla y verás
`index.html`, `owasp-top-10/...` — todo el sitio en archivos estáticos. Esa
carpeta es lo que se sube al hosting.

**Lo que deberías ver al final:**
```
16 page(s) built in 1.60s
Complete!
```

**Después del build, dos caminos para publicar:**

1. **Hosting con interfaz web** (Netlify, Vercel, Cloudflare Pages): arrastras
   `dist/` a la página, o conectas el repositorio y el hosting hace el build
   solo en cada push.

2. **GitHub Pages (opción profesional):** un workflow de GitHub Actions — un
   archivo `.github/workflows/deploy.yml` que automatiza el ciclo:
   `pnpm build` → sube `dist/` → publica. Con cada `git push`, el sitio se
   republica solo.

---

## B) Crear una segunda versión (ej. v1.1.0)

### Paso 1 — Hacer los cambios

Trabaja normalmente: nuevo contenido, features o correcciones. **No pienses en
la versión todavía** — primero termina los cambios, después versionas.

---

### Paso 2 — Actualizar `CHANGELOG.md`

Abre `CHANGELOG.md` y verás arriba:

```markdown
## [Unreleased]

### Added
- (próximos cambios sin publicar)
```

**Paso 2.1 — Rellena `[Unreleased]`** con los cambios que hiciste, en sus
secciones: `### Added` (nuevo), `### Changed` (modificado), `### Fixed`
(corregido). Ejemplo:

```markdown
## [Unreleased]

### Added
- Nueva guía sobre autenticación multifactor.
```

**Paso 2.2 — Convierte el bloque en la nueva versión**: cambia el título a
`## [1.1.0] - 2026-09-01`. La fecha es el día de publicación en **formato ISO**
(año-mes-día): sin ambigüedades y ordenable cronológicamente.

**Paso 2.3 — Crea un `[Unreleased]` vacío arriba** (siempre queda uno para los
próximos cambios):

```markdown
## [Unreleased]

## [1.1.0] - 2026-09-01

### Added
- Nueva guía sobre autenticación multifactor.
```

**¿Por qué el formato Unreleased?** El changelog se escribe *mientras*
trabajas: cada cambio entra en `[Unreleased]` y al publicar ese bloque "se
convierte" en la versión. Así nunca olvidas documentar.

---

### Paso 3 — Actualizar `src/data/changelog.ts`

Abre el archivo. Verás el array con la entrada de `1.0.0`. Agrega la nueva al
**inicio** (la página `/historial` muestra la más reciente primero):

```ts
{
  version: "1.1.0",
  date: "2026-09-01",
  added: ["Nueva guía sobre autenticación multifactor."],
  changed: [],
  fixed: [],
},
```

**Desglose campo por campo:**
- `version` → el número **sin la `v`** (la `v` la agrega la página al renderizar
  `v1.1.0`).
- `date` → la misma fecha ISO del Paso 2.
- `added` / `changed` / `fixed` → arrays de strings con los textos de cada
  sección. La página `/historial` los pinta con sus puntos de color (teal,
  ámbar, rojo).

> **Regla de oro (repetición deliberada):** cada entrada de `CHANGELOG.md`
> tiene su gemela en `changelog.ts`. Si olvidas una, el documento oficial y la
> página dejan de coincidir.

---

### Paso 4 — Subir la versión en `package.json`

Abre `package.json` y verás:

```json
"version": "1.0.0",
```

Cámbiala según la tabla de semver. Para una feature nueva (minor):

```json
"version": "1.1.0",
```

**¿Por qué la versión existe en dos lugares?**
- `package.json` → **fuente técnica**: el badge del header (`v1.0.0`) la
  importa con `import pkg from "../../package.json"` y se actualiza solo.
  Cambias aquí y el badge cambia solo en el próximo build.
- `changelog.ts` → **fuente documental**: alimenta la página `/historial`.

---

### Paso 5 — Verificar

```bash
pnpm build
```

Revisa en el navegador (o en el HTML generado):
1. El badge del header ahora dice `v1.1.0` (salió de `package.json`).
2. `/historial` lista la nueva versión con fecha y cambios (salió de
   `changelog.ts`).
3. El resto del sitio sigue intacto.

---

### Paso 6 — Publicar

Repite los pasos A1 a A4 con el nuevo número:

```bash
git add -A
git commit -m "feat: v1.1.0 - descripción de los cambios"
git tag -a v1.1.0 -m "Versión 1.1.0 - descripción"
git push origin main
git push origin v1.1.0
gh release create v1.1.0 --generate-notes
```

Resumen de qué hace cada línea (recordatorio):
1. `git add -A` — selecciona todos los cambios (ingredientes a la mesa).
2. `git commit -m "..."` — guarda la foto con mensaje descriptivo.
3. `git tag -a v1.1.0 -m "..."` — etiqueta ese commit como la versión 1.1.0.
4. `git push origin main` — sube el código a GitHub.
5. `git push origin v1.1.0` — sube el tag (¡no olvidar este!).
6. `gh release create v1.1.0 --generate-notes` — crea el Release oficial.

---

## Ciclo de vida completo de una versión (resumen visual)

```
Trabajas en cambios ──► Documentas en CHANGELOG.md y changelog.ts
        │
        ▼
Subes versión en package.json (semver) ──► pnpm build (verificas)
        │
        ▼
git add -A ──► git commit ──► git tag -a vX.Y.Z ──► git push origin main
        │
        ▼
git push origin vX.Y.Z ──► gh release create vX.Y.Z ──► deploy (dist/)
```

---

## Errores comunes y sus soluciones

| Error en la terminal                          | Qué significa                                  | Solución                                      |
| --------------------------------------------- | ---------------------------------------------- | --------------------------------------------- |
| `nothing to commit, working tree clean`       | No hay cambios preparados                      | Haz cambios o `git add -A` primero            |
| `Please tell me who you are`                  | Git no tiene tu nombre/correo                  | `git config --global user.name/email`         |
| `fatal: tag 'v1.0.0' already exists`          | El tag ya existe                               | `git tag -l` para verlo; `git tag -d v1.0.0` para borrarlo local |
| `fatal: 'origin' does not appear...`          | No hay remoto configurado                      | `git remote add origin <URL del repo>`        |
| Tag no aparece en GitHub después del push     | No se subió el tag explícitamente              | `git push origin v1.0.0`                      |
| `gh` no se reconoce                            | GitHub CLI no está instalado                   | Instálalo o crea el Release por la web        |
| `v1.1.0` no aparece en el badge               | No actualizaste `package.json` o no rebuildaste| Cambia `version` y corre `pnpm build`         |

---

## Preguntas de autoevaluación

Responde mentalmente y verifica al final:

1. ¿Por qué son **dos** `git push` al publicar? (pista: commits vs tags)
2. ¿Qué número de semver sube si solo arreglas un bug? ¿Y si agregas una
   página nueva? ¿Y si cambias algo incompatible?
3. ¿Dónde se actualiza el badge del header: en `package.json` o en
   `changelog.ts`? ¿Por qué?
4. ¿Qué pasa si ejecutas `gh release create v2.0.0` sin haber subido el tag
   antes? (pista: GitHub no encontrará el tag)
5. ¿Cuál es la diferencia entre `git add .` y `git add -A`?

**Respuestas:**
1. Uno sube los commits de la rama (`main`), otro sube el tag (`v1.0.0`); los
   tags no viajan con el push de la rama.
2. Bug → `patch` (1.0.1). Página nueva → `minor` (1.1.0). Incompatible →
   `major` (2.0.0).
3. En `package.json`, porque el badge la importa desde ahí; `changelog.ts` solo
   alimenta la página `/historial`.
4. El comando fallará porque el tag debe existir primero en el remoto.
5. `git add .` agrega desde la carpeta actual; `git add -A` agrega todo el
   repositorio **incluyendo eliminaciones**.