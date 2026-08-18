# Changelog

Todas las versiones notables de este proyecto se documentan en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/es/1.1.0/),
y este proyecto se adhiere a [Semantic Versioning](https://semver.org/lang/es/).
Cada versión publicada corresponde a un tag de git (`vX.Y.Z`).

## [Unreleased]

### Added
- (próximos cambios sin publicar)

## [1.1.0] - 2026-08-18

Documentación reescrita en su totalidad: el sitio ahora está dedicado al
estándar OWASP ASVS 4.0.3 (antes documentaba el Top 10 general), e incluye la
nueva sección OWASP Top 10 2021 con enlaces cruzados.

### Added

- Documentación completa del OWASP ASVS 4.0.3: inicio, introducción (4 guías),
  14 capítulos (V1–V14) con los ~300 requisitos explicados uno por uno, y
  apéndices (glosario, referencias e IoT).
- Sección OWASP Top 10 (2021): 10 guías (A01–A10) con escenarios de ataque,
  medidas de prevención y enlaces cruzados a los capítulos ASVS relacionados.

### Changed

- El sitio documenta ahora exclusivamente el ASVS 4.0.3 (antes: Top 10 general).
- Enlace de navegación de la documentación actualizado de `/recursos` a
  `/inicio` en las páginas principal, de políticas e historial.

### Fixed

- Sidebar y tabla de contenidos pegados al borde inferior del viewport: ahora
  mantienen una separación inferior de 16 px.

## [1.0.0] - 2026-08-18

Primera versión de publicación. Documentación del OWASP Top 10 elaborada con
fines académicos (tesis universitaria).

### Added

- Navegación SPA con transiciones de vista (ClientRouter) y precarga de páginas.
- Seguimiento de sección activa en la tabla de contenidos (scrollspy).
- Pie de página con aviso legal y enlace a la página de políticas de uso.
- Página de políticas de uso y derechos (propósito académico, derechos de autor,
  marcas y no afiliación, citas y fuentes, sin garantías).
- Licencia Creative Commons Atribución-NoComercial 4.0 (CC BY-NC 4.0).
- Badge de versión en el encabezado con acceso al historial de versiones.
- Página de historial de versiones (`/historial`).
- Ajuste de quiebre de línea (`overflow-wrap`) para contenido largo en móvil.

### Changed

- Sistema de diseño unificado: paleta de colores centralizada en `:root` y
  tokens de Tailwind v4 (`@theme inline`).
- Estilos de contenido (prose) profesionales: jerarquía tipográfica, ritmo en
  `em`, bloques de código, citas, tablas y teclas.
- Alineación del sidebar y la tabla de contenidos con el encabezado (diseño
  sin huecos, consistente en todas las páginas).

### Fixed

- Desbordes horizontales en móvil causados por URLs largas en código en línea.
- Espaciado inconsistente entre el encabezado y el contenido del sidebar.
- Archivo de contenido dañado en la colección de documentación.

[1.1.0]: https://github.com/usuario/proyecto/releases/tag/v1.1.0
[1.0.0]: https://github.com/usuario/proyecto/releases/tag/v1.0.0