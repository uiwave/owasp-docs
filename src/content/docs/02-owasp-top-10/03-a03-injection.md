---
title: "A03: Injection (Inyecciones)"
description: "Análisis detallado de ataques por inyección: SQL, NoSQL, Command Injection y Cross-Site Scripting (XSS)."
---

## 🗄️ 1. Inyección SQL (SQL Injection - SQLi)

Ocurre cuando se manipulan consultas a bases de datos relacionales (PostgreSQL, MySQL, SQL Server, Oracle).

### 📹 Video Explicativo: Visualizando SQL Injection

Para entender de manera práctica cómo se explota esta vulnerabilidad en tiempo real, mira la siguiente explicación paso a paso:

<div class="my-6 aspect-video w-full overflow-hidden rounded-lg border-2 border-border-grid shadow-md">
  <iframe 
    class="w-full h-full"
    src="https://www.youtube.com/embed/ciNHn38EyRc" 
    title="Explicación de SQL Injection"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    allowfullscreen>
  </iframe>
</div>

### Ejemplo de Vulnerabilidad

Imagina un formulario de inicio de sesión con el siguiente código backend:

```javascript
// CÓDIGO VULNERABLE: Concatena la variable directamente en la consulta
const query = `SELECT * FROM usuarios WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;
```
