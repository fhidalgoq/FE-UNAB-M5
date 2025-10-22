# Feriados de Chile - Consumo de API (XHR y Fetch)

Proyecto web que consume la API pública de feriados de Chile y muestra los resultados en una **tabla HTML**.
Se implementan **dos enfoques**: **XHR (con jQuery.ajax)** y **Fetch API**, cumpliendo con los requisitos del enunciado.

## API
- Base: `https://www.feriadosapp.com/api/holidays.json`
- (Opcional) Soporta `?year=YYYY` para filtrar por año.

## Requerimientos cubiertos
1. **jQuery** cargado en el proyecto y estructura HTML simple con Bootstrap 5.3.
2. **Consumo de la API** con dos métodos: XHR (jQuery.ajax) y Fetch.
3. **Procesamiento de JSON** y render en **tabla HTML** con filtro de texto y **exportar CSV**.

## Estructura
```
abp_api_feriados/
|-- index.html
|-- assets/
|   |-- css/
|   |   `-- style.css
|   `-- js/
|       `-- app.js
`-- README.md
```

## Cómo ejecutar
1. Abre `index.html` en tu navegador (doble clic).
2. (Opcional) Ingresa un año y elige **XHR** o **Fetch** para cargar.
3. Usa el filtro de texto para buscar por nombre/tipo/fecha.
4. Exporta la tabla a CSV si lo necesitas.

## Notas
- Si el CORS de la API está restringido en tu red, prueba desde un servidor local (por ejemplo `npx serve` o Live Server de VS Code).
- El script tolera que la API devuelva objetos con claves distintas (`data`, `feriados`, etc.).
