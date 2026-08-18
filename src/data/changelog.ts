export interface ChangelogEntry {
  version: string;
  date: string;
  added?: string[];
  changed?: string[];
  fixed?: string[];
}

export const changelog: ChangelogEntry[] = [
  {
    version: "1.0.0",
    date: "2026-08-18",
    added: [
      "Navegación SPA con transiciones de vista (ClientRouter) y precarga de páginas.",
      "Seguimiento de sección activa en la tabla de contenidos (scrollspy).",
      "Pie de página con aviso legal y enlace a la página de políticas de uso.",
      "Página de políticas de uso y derechos (propósito académico, derechos de autor, marcas y no afiliación, citas y fuentes, sin garantías).",
      "Licencia Creative Commons Atribución-NoComercial 4.0 (CC BY-NC 4.0).",
      "Badge de versión en el encabezado con acceso al historial de versiones.",
      "Página de historial de versiones (/historial).",
      "Ajuste de quiebre de línea (overflow-wrap) para contenido largo en móvil.",
    ],
    changed: [
      "Sistema de diseño unificado: paleta de colores centralizada en :root y tokens de Tailwind v4.",
      "Estilos de contenido (prose) profesionales: jerarquía tipográfica, ritmo en em, bloques de código, citas, tablas y teclas.",
      "Alineación del sidebar y la tabla de contenidos con el encabezado (diseño sin huecos, consistente en todas las páginas).",
    ],
    fixed: [
      "Desbordes horizontales en móvil causados por URLs largas en código en línea.",
      "Espaciado inconsistente entre el encabezado y el contenido del sidebar.",
      "Archivo de contenido dañado en la colección de documentación.",
    ],
  },
];