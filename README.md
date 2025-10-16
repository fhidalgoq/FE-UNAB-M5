# ExpressGo · Panel de Rutas ES6+

Aplicación front-end que procesa entregas de la empresa ExpressGo, prioriza las rutas con mayor volumen y genera un panel visual interactivo. El objetivo es demostrar el uso de características modernas de JavaScript (ES6+), Webpack y Babel, manteniendo compatibilidad con navegadores antiguos como IE11.

## Características clave

- **Procesamiento inteligente:** deduplicación por dirección y sumatoria de paquetes usando `Map`, `Set`, `Array.from`, `reduce` y nullish coalescing.
- **Asincronía simulada:** carga del JSON de entregas mediante `async/await`, Promesas y una función flecha con parámetro por defecto para el `delay`.
- **Reporte dinámico:** generación de HTML con template literals, desestructuración y spread para construir el dashboard.
- **Compatibilidad ampliada:** polyfills de `core-js` y `regenerator-runtime` incluidos en el entry point, junto con configuración de Babel (`preset-env`) y Webpack.
- **Nuevo diseño:** panel “neón” con métricas ejecutivas, top de direcciones y tabla de prioridades completamente remozados usando Bootstrap 5 y estilos propios (`public/css/style.css`).

## Estructura del proyecto

```
Modulo5UNABFrontEnd/
├─ public/
│  ├─ index.html          # Documento base servido por webpack-dev-server
│  ├─ css/style.css       # Tema y layout personalizados del panel
│  └─ favicon/favicon.png # Icono usado por la aplicación
├─ src/
│  ├─ index.js            # Punto de entrada, orquesta el flujo de datos → reporte
│  ├─ services/data.js    # Simula la carga asíncrona del JSON de entregas
│  ├─ utils/process.js    # Lógica de agregación, ordenamiento y helpers ES6+
│  ├─ utils/report.js     # Plantilla HTML del dashboard con métricas y tabla
│  └─ data/entregas.json  # Datos de ejemplo (con duplicados)
├─ dist/                  # Salida de la compilación (generada al ejecutar build)
├─ webpack.config.js      # Configuración de Webpack 5
├─ .babelrc               # Configuración de Babel 7 (preset-env + polyfills)
├─ package.json           # Scripts, dependencias y browserslist
└─ README.md              # Este archivo
```

## Requisitos previos

- Node.js >= 16
- npm (incluido con Node)

## Instalación

```bash
npm install
```

## Scripts disponibles

- `npm run start` &nbsp;→ levanta webpack-dev-server en `http://localhost:5174` y abre el navegador automáticamente.
- `npm run build` &nbsp;→ genera el bundle optimizado en `dist/`.
