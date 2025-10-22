# ABP4 — JavaScript Asíncrono (Callbacks, Promesas, Async/Await)

Este proyecto resuelve la actividad de asincronía: simulamos una consulta a un servidor que devuelve
un usuario tras **2 segundos** y mostramos cómo manejarla con **callbacks**, **promesas** y **async/await**.

## Requerimientos (resumen)
- **Callbacks**: `obtenerUsuarioCallback(callback)` → tras 2s retorna usuario; se imprime **nombre** y **correo**.
- **Promesas**: `obtenerUsuarioPromesa()` → Promise que resuelve tras 2s; consumir con `.then()/.catch()` e imprimir **nombre** y **ciudad**.
- **Async/Await**: `obtenerUsuarioAsync()` → `async`, usa la promesa anterior y muestra **todos** los datos.

## Estructura
```
abp4/
├─ index.html
├─ assets/
│  ├─ css/
│  │  └─ style.css
│  └─ js/
│     └─ main.js
└─ README.md
```

## Cómo ejecutar
1. Abre `index.html` en tu navegador.
2. Haz clic en cada botón para observar el flujo.
3. Revisa la **consola integrada** (y también la del navegador) para los logs.

## Notas
- Bootstrap 5.3 vía CDN para estilo y grilla responsive.
- Para simular un error, modifica `obtenerUsuarioPromesa()` para retornar `Promise.reject(...)` y verifica el manejo con `.catch()` y `try/catch`.
